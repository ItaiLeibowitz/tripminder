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

function toggleTracking(data, callback) {
	if (data.name == TripMinder.currentItem.get('name')) {
		TripmindStore.findRecord('item', TripMinder.currentItem.get('id'), {reload: true})
			.then(function (itemRecord) {
				itemRecord.set('trackingStatus', data.state);
				itemRecord.save();
			}).then(function () {
				callback();
			});
	}
}

function updateValue(data) {
	TripmindStore.findRecord(data.recordType || 'item', data.id || TripMinder.currentItem.get('id'), {reload: true})
		.then(function (record) {
			record.set(data.field, sanitizeHtml(data.value));
			record.save().then(function () {
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
		.catch(function (notFound) {
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
		if (sendResponse) return true;
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
	item.gmapsReference = result.place_id;
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

function sendLinkDataMessage(item, trackingStatus, link, targetMsgId, counter) {
	//console.log('trying to send message', counter, targetMsgId, TripMinder)
	if (TripMinder.readyState[targetMsgId]) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
					target: 'dropdown_viewer',
					method: 'runFunction',
					methodName: "updateMessageForLink",
					data: {item: item, trackingStatus: trackingStatus, link: link}}
			);
		});
	} else if (counter <= 20) {
		window.setTimeout(function () {
			sendLinkDataMessage(item, trackingStatus, link, targetMsgId, counter + 1)
		}, 200);
	}
}


// A Promise that finds a place based on a query. It then checks if the store has this place
// If it exists, then it resolves with it. If not, it creates the record and resolves with that.
function findPlaceFromQuery(query, data) {
	return new Promise(function (resolve, reject) {
		gmaps.placesService.textSearch(query, function (results, status, next_page_token) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				if (results && results.length > 0) {
					var item = buildItemInfoFromResults(data || {}, results[0]);
					TripmindStore.findRecord('item', item.gmapsReference, {reload: true})
						.then(function (itemRecord) {
							return itemRecord;
						})
						.catch(function (notFound) {
							var itemRecord = TripmindStore.createRecord('item', $.extend(item, {id: item.gmapsReference}));
							return itemRecord.save();
						})
						.then(function (itemRecord) {
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
			var allLinks = data.searchLinks.concat(data.externalLinks).uniq();
			//send a note to the server about the new links
			promiseFromAjax({
				url: 'https://www.wanderant.com/api/tm/tm_links/',
				type: 'POST',
				data: {
					gmaps_reference: itemRecord.get('id'),
					links: allLinks
				}
			});

			// Add the potential links to the store if the item is being tracked
			var trackingStatus = itemRecord.get('trackingStatus');
			if (trackingStatus) {
				var now = moment().format("X");

				allLinks.forEach(function (link) {
					if (!TripmindStore.hasRecordForId('potentialLink', link)) {
							var newLinkRecord = TripmindStore.createRecord('potentialLink', {
								id: link,
								createdAt: now,
								item: itemRecord
							});
							newLinkRecord.save();
						}
				});
				/*formattedLinks = allLinks.map(function (link) {
				 return {id: link,
				 type: 'potentialLink',
				 attributes: {
				 itemId: itemRecord.get('id'),
				 createdAt: now
				 }
				 };
				 });
				 TripmindStore.push({data: formattedLinks});*/
			}
			sendItemDataMessage(itemRecord, trackingStatus, data.targetMsgId, 0);
			ItemDetailsService.getAdditionalItemInfo(itemRecord.get('id'));
		}, function () {
			TripMinder.currentItem = null;
		});

}


function registerUrl(data) {
	console.log('incoming data:', data)
	TripmindStore.findRecord('potentialLink', data.url, {reload: true})
		//First we check if the potential link is already in the local store
		.then(function (potentialLink) {
			console.log('link found in local store')
			return potentialLink.get('item').then(function (itemRecord) {
				return {
					itemRecord: itemRecord,
					potentialLink: potentialLink
				}
			});
		})
		//if url wasn't found in the local storage, we check on the server:
		.catch(function () {
			console.log('link not found in local store')
			return promiseFromAjax({
				url: 'https://www.wanderant.com/api/tm/tm_links/find',
				type: 'GET',
				data: {
					id: data.url
				}
			})
				// if the link was found on the server, we have a gmaps reference for it and can connect it to an item
				.then(function (linkData) {
					if (linkData.data) {
						console.log('link found on server', linkData)
						var gmapsReference = linkData.data.attributes['gmaps-reference'];
						// now we check if this item exists in the store:
						return TripmindStore.findRecord('item', gmapsReference)
							.then(function (itemRecord) {
								console.log('item found in store')
								return itemRecord;
							})
							//or if the item doesn't exist in the store, we create it
							.catch(function () {
								console.log('item not found in store')
								var itemRecord = TripmindStore.createRecord('item', {id: gmapsReference});
								itemRecord.save();
								return ItemDetailsService.getAdditionalItemInfo(gmapsReference);
							})
							// finally we create a link record and link that with the item record
							.then(function (itemRecord) {
								// we need to create a link record for this item now:
								var now = moment().format("X");
								var newLinkRecord = TripmindStore.createRecord('potentialLink', {
									id: data.url,
									createdAt: now,
									item: itemRecord
								});
								newLinkRecord.save();
								itemRecord.save();
								return {
									itemRecord: itemRecord,
									potentialLink: newLinkRecord
								}
							});
						// otherwise, this is a new url we don't know about yet...
					} else {
						console.log('i have no information about this link...')
						return null
					}

				});
		})
		// Finally when we have a result for the link, we record a visit to it
		.then(function (result) {
			if (result) {
				//record a visit
				$.ajax({
					url: 'https://www.wanderant.com/api/tm/tm_links/increment_visits',
					type: 'GET',
					data: {
						id: data.url
					}
				});
				trackingStatus = result.itemRecord.get('trackingStatus');
				if (trackingStatus) {
					TripMinder.currentItem = result.itemRecord;
					//console.log('found link for:', itemId);
					var currentTime = moment().format("X");
					result.potentialLink.setProperties({
						title: result.potentialLink.get('title') || data.title,
						description: result.potentialLink.get('description') || data.description,
						image: data.overwrite ? data.image : (result.potentialLink.get('image') || data.image),
						note: result.potentialLink.get('note') || data.note,
						lastVisited: currentTime,
						createdAt: result.potentialLink.get('createdAt') || currentTime
					});
					result.potentialLink.save();
					if (data.targetMsgId) sendLinkDataMessage(result.itemRecord, trackingStatus, $.extend(result.potentialLink.toJSON(), {id: data.url}), data.targetMsgId, 0);
				}
			}
		})

}

chrome.webNavigation.onBeforeNavigate.addListener(function (event) {
	//console.log('before: ', event)
});
chrome.webNavigation.onCommitted.addListener(function (event) {
	//console.log('committed: ', event)
});

function openTripmindTab(addedRoute) {
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


function updateLocalStorage() {
	/*// prevent deleting local storage if it hasn't been loaded yet...
	 if (TripMinder.loadedDataFromLocalStorage) {
	 chrome.storage.local.set({trackedPlaces: TripMinder.trackedPlaces});
	 }*/
}

function loadDataFromLocalStorage() {
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


