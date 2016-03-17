
TripMinder = {};

function relayRequest(request, sender, sendResponse) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, request, function(response){
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

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		relayRequest(request, sender, sendResponse)
	});

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.target == 'background' && request.method == "runFunction") {
			window[request.methodName](request.data)
		}
	});

function buildItemInfoFromResults(data, result){
	var item = data;
	if (!item.lat) {
		item.lat = result.geometry.location.lat();
		item.lng = result.geometry.location.lng();
	}
	if (result.photos && result.photos.length > 0) {
		item.image = result.photos[0].getUrl({maxWidth: 3000});
		item.image_attribution = result.photos[0].html_attributions[0]
	}
	if (result.types && result.types.length > 0){
		item.type = result.types[0];
	}
	item.place_id = result.place_id;
	item.address = result.formatted_address;
	item.rating = result.rating;
	return item
}


function foundObjectInfo(data) {
	if (data.lat && data.lng) {
		var query = {query: data.name, location: new google.maps.LatLng(data.lat, data.lng), radius: 1000};
	} else {
		var query = {query: data.name};
	}
	gmaps.placesService.textSearch(query, function (results, status, next_page_token) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			console.log(results, status, next_page_token)
			if (results && results.length > 0) {
				var item = buildItemInfoFromResults(data, results[0]);
				console.log(item)
				TripMinder.currentItem = item;
				chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {
							target: 'dropdown_viewer',
							method: 'runFunction',
							methodName: "updateMessageForItem",
							data: item}
					);
				});
			} else{
				TripMinder.currentItem = null;
			}
		} else {
			alert('did not get back proper place results')
			TripMinder.currentItem = null;
		}
	})
}


function startup() {
	renderMap({latitude: 42, longitude: -2});
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


