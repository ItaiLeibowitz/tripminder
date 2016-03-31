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
	if (data.name == TripMinder.currentItem.name){
		TripMinder.trackedPlaces[TripMinder.currentItem.place_id].track = data.state;

		updateLocalStorage();
		callback();
	}
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

// This function reshapes item data into the Ember item model structure
function buildItemInfoFromResults(data, result) {
	//console.log('original item data:', data)
	var item = data;
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

function getAncestryFromAddress(addr, name){
	var ancestryArray = [];
	for (var i = addr.length - 1; i >= 0 ; i--) {
		var obj = addr[i];
		if (obj.long_name
			&& obj.long_name.length > 1
			&& obj.long_name != name
			&& obj.types && obj.types[0]
			&& Constants.allowedLocationTypesLimited.indexOf(obj.types[0]) > -1) {
			ancestryArray.push(obj.long_name)
		}
	}
	return ancestryArray.join("/")
}

// Returns a promise that resolves to a parent record based on ancestry
function findParentFromAncestry(ancestryNames, lat, lng, item){
	return new Promise(function (resolve, reject) {
		// If there's not ancestry, we resolve quickly with a null item
		if (ancestryNames.length == 0) {
			resolve(null);
		// Else there should be a parent
		} else {
			// If we find the parent in the store based on its path index then we resolve with it
			var parentPlaceId = TripmindStore.peekRecord('pathIndex', ancestryNames);
			if (parentPlaceId) {
				var parentItem = TripmindStore.peekRecord('item', parentPlaceId.get('itemId'));
				resolve(parentItem);
			// If we don't find it already in the store then we have to find it first:
			} else {
				// first, query it
				var ancestryNamesArr = ancestryNames.split("/"),
					types = ancestryNamesArr.length > 1 ? '(cities)' : null;
				var query = {input: ancestryNamesArr.reverse().join(", "), location: new google.maps.LatLng(lat, lng), radius: 10000};
				findParentFromQuery(query)
					// then we have to find its full info so that its'  path is filled in
					.then(function (itemRecord) {
						return getAdditionalItemInfo(itemRecord.get('id'))
					})
					// only then we can resolve it.
					.then(function (filledInItem) {
						resolve(filledInItem)
					})
			}

		}
	});
}

// A Promise that finds a place based on a query. It then checks if the store has this place
// If it exists, then it resolves with it. If not, it creates the record and resolves with that.
function findPlaceFromQuery(query, data){
	return new Promise(function (resolve, reject) {
		gmaps.placesService.textSearch(query, function (results, status, next_page_token) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				if (results && results.length > 0) {
					var item = buildItemInfoFromResults(data || {}, results[0]);
					var itemRecord = TripmindStore.peekRecord('item', item.place_id);
					//if it doesn't exist, create it.
					if (!itemRecord){
						itemRecord = TripmindStore.createRecord('item', $.extend(item, {id: item.place_id}));
					}
					resolve(itemRecord)
				} else {
					reject({message: 'no results found'});
				}
			} else {
				reject(status);
			}
		});
	});
}

// This find request uses autocomplete, where we can scope the results by destinations only.
function findParentFromQuery(query){
	return new Promise(function (resolve, reject) {
		gmaps.placesAutocompleteService.getPlacePredictions(query, function (results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				if (results && results.length > 0) {
					var	filteredResults = results.filter(function(r){return Constants.allowedLocationTypes.indexOf(r.types[0]) > -1;});
					var topResult = filteredResults[0];
					var massagedResult = $.extend(topResult, {name: topResult.description});
					var item = buildItemInfoFromResults({}, massagedResult);
					var itemRecord = TripmindStore.peekRecord('item', item.place_id);
					//if it doesn't exist, create it.
					if (!itemRecord){
						itemRecord = TripmindStore.createRecord('item', $.extend(item, {id: item.place_id}));
					}
					resolve(itemRecord)
				} else {
					reject({message: 'no results found'});
				}
			} else {
				reject(status);
			}
		});
	});
}


// This function gets additional information about an item, then saves it. It then resolves with that filled in item.
function getAdditionalItemInfo(placeId){
	return new Promise(function (resolve, reject) {
		// First check if the item is already in the store - if it is no need to bring it again!
		var itemRecord = TripmindStore.peekRecord('item', placeId);
		if (itemRecord && itemRecord.get('additionalInfoComplete')) resolve(itemRecord);
		// Otherwise, we will get additional information with a delay to prevent overloading the quota
		Ember.run.later(function() {
			gmaps.placesService.getDetails({placeId: placeId}, function (result) {
				//console.log(result);
				var item = TripmindStore.peekRecord('item', placeId);
				if (!item || !result) reject({message: "didn't find the item or its representation in the store"});
				item.set('phone', result.international_phone_number);
				//TODO: save additional photos
				//TODO: Save reviews
				if (result.address_components) {
					var ancestryNames = getAncestryFromAddress(result.address_components, result.name);
					//console.log('ancestryNames', ancestryNames);
					// Update the item record with the proper ancestry names
					item.set('ancestryNames', ancestryNames);
					// Save an index in the store to easily find this item based on its pathname
					var pathNames = item.get('pathNames');
					TripmindStore.push({data: {id: pathNames,
						type: 'pathIndex',
						attributes: {
							itemId: placeId
						}}
					});
					findParentFromAncestry(ancestryNames, item.get('lat'), item.get('lng'), item)
						.then(function (parent) {
							if (parent) {
								item.set('ancestryNames', parent.get('pathNames'));
								item.set('ancestry', parent.get('path'));
							}
							item.save()
								.then(function (savedItem) {
									resolve(savedItem);
								});
						});
				} else {
					item.save()
						.then(function (savedItem) {
							resolve(savedItem);
						});
				}
			});
		}, 1100);

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
			getAdditionalItemInfo(itemRecord.get('id'));
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

function openTripmindTab(){
	var url = chrome.extension.getURL('index.html');
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


