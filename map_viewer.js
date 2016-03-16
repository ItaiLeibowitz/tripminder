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
		if (request.target == 'map_viewer' && request.method == "runFunction") {
			window[request.methodName](request.data)
		}
	});


function closeIframe() {
	chrome.runtime.sendMessage({
		target: 'content',
		method: 'runFunction',
		methodName: "closeIframe"
	});
}

function clearSearch() {
	document.getElementById("cex-search").value = ''
}

function buildObjectFromResult(result, searchName) {
	if (result.photos && result.photos.length > 0) {
		var photoResult = result.photos[0].getUrl({maxHeight: 70});
	} else {
		var photoResult = result.icon;
	}
	return {
		name: result.name,
		searchName: searchName,
		photo: photoResult
	}
}

function focusSearchBar() {
	$('#cex-search').focus();
}

function setupAutocomplete() {
	$('#cex-search').autocomplete({
		source: function (request, response) {
			gmaps.placesAutocompleteService.getQueryPredictions({ input: request.term }, function (predictions, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					gmaps.placesAutocompleteCache = predictions;
					response($.map(predictions, function (prediction, i) {
							return {
								label: prediction.description
							}
						})
					);
				} else {
					reject(status);
				}
			});
		},
		select: function(event, ui){
			// find the relevant prediction from the full set
			var selectedPrediction = gmaps.placesAutocompleteCache.find(function(prediction){
				return prediction.description == ui.item.value;
			});

			// run wanderant search on the selected place_id
			var self = this;
			$(this).autocomplete('close');
			$(this).blur();

			// if user selected a specific place, we immediately look for it in Wanderant's db then google's
			if (selectedPrediction.place_id) {
				gmaps.placesService.getDetails({placeId: selectedPrediction.place_id}, function (result, status) {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						console.log(result)
						var resultObject = buildObjectFromResult(result, ui.item.value);
						chrome.runtime.sendMessage({
							target: 'content',
							method: 'runFunction',
							methodName: "insertObjectCard",
							data: resultObject
						});
					}
				})


			}
		}
	});
}

function setupKeyboardShortcuts(){
	$(document).on('keydown', function(e){
		// Esc key
		if (e.keyCode == 27){
			closeIframe();
		}
	})
}

function startup() {
	$('.close-btn').on('click', closeIframe);
	$('.cex-clear-search').on('click', clearSearch);
	setupKeyboardShortcuts();
	setupAutocomplete();
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




