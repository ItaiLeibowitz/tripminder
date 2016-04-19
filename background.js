TripMinder = {
	readyState: {},
	trackedPlaces: {}
};

Constants = {
	allowedLocationTypes: [
		"country",
		"locality",
		"administrative_area_level_1",
		"administrative_area_level_2",
		"administrative_area_level_3",
		"administrative_area_level_4",
		"administrative_area_level_5",
		"colloquial_area",
		"sublocality"
	],
	allowedLocationTypesLimited: [
		"country",
		"locality",
		"administrative_area_level_1"
	]
};

function relayRequest(request, sender, sendResponse) {
	//console.log('trying to relay request', request)
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, request, function (response) {
			sendResponse(response);
		});
	});
}

function renderMap(data) {
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		center: {lat: data.latitude, lng: data.longitude},
		zoom: 8
	});
	gmaps = {
		map: map,
		placesAutocompleteService: new google.maps.places.AutocompleteService,
		placesService: new google.maps.places.PlacesService(map)
	}
}

function toggleTracking(data, callback){
	if (data.name == TripMinder.currentItem.get('name')){
		TripmindStore.findRecord('item', TripMinder.currentItem.get('id'),{reload: true})
			.then(function(itemRecord) {
				itemRecord.set('trackingStatus', data.state);
				itemRecord.save();
			}).then(function(){
				callback();
			});
	}
}

function updateValue(data){
	TripmindStore.findRecord('item', TripMinder.currentItem.get('id'),{reload: true})
		.then(function(itemRecord){
			itemRecord.set(data.field, data.value);
			itemRecord.save().then(function () {
				chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {
						target: 'dropdown_viewer',
						method: 'runFunction',
						methodName: "showFeedback",
						data: {message: 'Changes saved!', type: 'success'}
					});
				});
			});
		})
		.catch(function(notFound){
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					target: 'dropdown_viewer',
					method: 'runFunction',
					methodName: "showFeedback",
					data: {message: 'Could not save...', type: 'failure'}
				});
			});
		})

}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		relayRequest(request, sender, sendResponse)
	});

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.target == 'background' && request.method == "runFunction") {
			window[request.methodName](request.data, sendResponse);
		}
	});

function buildItemInfoFromResults(data, result) {
	//console.log('original item data:', data)
	var item = data;
	// This function reshapes item data into the Ember item model structure
if (!item.lat && result.geometry) {
		item.lat = result.geometry.location.lat();
		item.lng = result.geometry.location.lng();
	}
	if (result.photos && result.photos.length > 0) {
		item.image = result.photos[0].getUrl({maxWidth: 3000});
		item.image_attribution = result.photos[0].html_attributions[0]
	}
	if (result.types && result.types.length > 0) {
		item.itemType = result.types[0];
	}
	item.place_id = result.place_id;
	item.address = result.formatted_address;
	item.rating = result.rating;
	if (!item.name) item.name = result.name;
	return item
}

function updateMessageReadyState(msgIframeId) {
	TripMinder.readyState[msgIframeId] = true;
}

function sendItemDataMessage(item, trackingStatus, targetMsgId, counter) {
	//console.log('trying to send message', counter, targetMsgId, TripMinder)
	if (TripMinder.readyState[targetMsgId]) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
					target: 'dropdown_viewer',
					method: 'runFunction',
					methodName: "updateMessageForItem",
					data: {item: item, trackingStatus: trackingStatus}}
			);
		});
	} else if (counter <= 20) {
		window.setTimeout(function () {
			sendItemDataMessage(item, trackingStatus, targetMsgId, counter + 1)
		}, 200);
	}
}




// A Promise that finds a place based on a query. It then checks if the store has this place
// If it exists, then it resolves with it. If not, it creates the record and resolves with that.
function findPlaceFromQuery(query, data){
	return new Promise(function (resolve, reject) {
		gmaps.placesService.textSearch(query, function (results, status, next_page_token) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				if (results && results.length > 0) {
					var item = buildItemInfoFromResults(data || {}, results[0]);
					TripmindStore.findRecord('item', item.place_id, {reload: true})
						.then(function(itemRecord){
							return itemRecord;
						})
						.catch(function(notFound){
							var itemRecord = TripmindStore.createRecord('item', $.extend(item, {id: item.place_id}));
							return itemRecord.save();
						})
						.then(function(itemRecord){
							resolve(itemRecord);
						});
				} else {
					reject({message: 'no results found'});
				}
			} else {
				reject(status);
			}
		});
	});
}

function foundObjectInfo(data) {
	//console.log('got info from content: ', data)
	if (data.lat && data.lng) {
		var query = {query: data.nameForSearch, location: new google.maps.LatLng(data.lat, data.lng), radius: 1000};
	} else {
		var query = {query: data.nameForSearch};
	}
	findPlaceFromQuery(query, data)
		.then(function (itemRecord) {
			TripMinder.currentItem = itemRecord;

			// Add the potential links to the store if the item is being tracked
			var trackingStatus = itemRecord.get('trackingStatus');
			if (trackingStatus) {
				var now = moment().format("X");
				var allLinks = data.searchLinks.concat(data.externalLinks),
					formattedLinks = allLinks.map(function (link) {
						return {id: link,
							type: 'potentialLink',
							attributes: {
								itemId: itemRecord.get('id'),
								createdAt: now
							}
						};
					});
				TripmindStore.push({data: formattedLinks});
			}
			sendItemDataMessage(itemRecord, trackingStatus, data.targetMsgId, 0);
			ItemDetailsService.getAdditionalItemInfo(itemRecord.get('id'));
		}, function(){
			alert('did not get back proper place results');
			TripMinder.currentItem = null;
		});

}


function registerUrl(data){
	var potentialLink = TripmindStore.peekRecord('potentialLink', data.url);
	if (potentialLink){
		var itemId = potentialLink.get('itemId'),
			itemRecord = TripmindStore.peekRecord('item', itemId),
			trackingStatus = itemRecord.get('trackingStatus');
		//console.log('found link for:', itemId);
		sendItemDataMessage(itemRecord, trackingStatus, data.targetMsgId, 0);
		potentialLink.setProperties({
			title: data.title,
			description: data.description,
			image: data.image,
			lastVisited: moment().format("X")
		})
		potentialLink.save();
	} else {
		console.log('url not found linked to anywhere...')
	}
}

chrome.webNavigation.onBeforeNavigate.addListener(function (event) {
	//console.log('before: ', event)
});
chrome.webNavigation.onCommitted.addListener(function (event) {
	//console.log('committed: ', event)
});

function openTripmindTab(addedRoute){
	if (!addedRoute || typeof(addedRoute) != 'string') addedRoute = "";
	var url = chrome.extension.getURL('index.html') + addedRoute;
	chrome.tabs.query({}, function (tabs) {
		tripMindTabs = tabs.filter(function (tab) {
			return tab.url == url
		});
		if (tripMindTabs.length > 0) {
			chrome.tabs.update(tripMindTabs[0].id, {active: true});
		} else {
			chrome.tabs.create({
				url: url
			})
		}
	})
}

function openCurrentInTripmind() {
	var addedRoute = '#/items/' + TripMinder.currentItem.get('slug');
	openTripmindTab(addedRoute);
}

chrome.browserAction.onClicked.addListener(openTripmindTab);


function updateLocalStorage(){
	/*// prevent deleting local storage if it hasn't been loaded yet...
	if (TripMinder.loadedDataFromLocalStorage) {
		chrome.storage.local.set({trackedPlaces: TripMinder.trackedPlaces});
	}*/
}

function loadDataFromLocalStorage(){
	/*localforage.getItem('DS.LFAdapter').then(function(value) {
		// The same code, but using ES6 Promises.
		console.log(value);
		value.item.records
	});
	chrome.storage.local.get("trackedPlaces", function(results){
		TripMinder.trackedPlaces = $.extend(TripMinder.trackedPlaces,results.trackedPlaces);
		TripMinder.loadedDataFromLocalStorage = true;
	})*/
}


function startup() {
	renderMap({latitude: 42, longitude: -2});
	loadDataFromLocalStorage();
}

if (window.attachEvent) {
	window.attachEvent('onload', yourFunctionName);
} else {
	if (window.onload) {
		var curronload = window.onload;
		var newonload = function (evt) {
			curronload(evt);
			startup();
		};
		window.onload = newonload;
	} else {
		window.onload = startup;
	}
}


