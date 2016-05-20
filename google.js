var google_cex = google_cex || {};
var inFlightStatusElem = $('<div id="tm_status_elem" style="display:none" data-in-flux="true"></div>');
$('body').append(inFlightStatusElem);

var tmPreventAnypageScripts = true;

function updateRhsStatus(trackingStatus, itemData){
	var rhsStatusElem = $('#rhs-tripmind-status');
	if (rhsStatusElem) rhsStatusElem.remove();

		rhsStatusElem = $(`<div id="rhs-tripmind-status"><div class="toggle-tracking"></div><div class="tripmind-open" data-target="${"#/items/" + itemData.gmapsReference}"></div></div><style>._ZNf{top:80px}</style>`);
		$('.kp-header').prepend(rhsStatusElem);
		$('#tm_status_elem').attr('data-in-flux', false);

	if (trackingStatus) {
		rhsStatusElem.addClass('tracked');
	} else {
		rhsStatusElem.removeClass('tracked');
	}
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.target == 'content-source' && request.method == "runFunction") {
			google_cex[request.methodName](request.data)
		}
	});


function longest(array){
	var maxLength = 0,
		maxString = "";
	for (var i = 0; i < array.length; i++) {
		if (array[i].length > maxLength) {
			maxLength = array[i].length;
			maxString = array[i];
		}
	}
	return maxString
}

function rhsDidChange() {
	var lat, lng, descriptionText, summaryText;
	var allLinks = $('#rhs_block a').toArray().map(function (el) {
		return el.href; // used to have: .replace(/(http:)|(https:)/,'')
	});
	allLinks= allLinks.filter(function(link){
		return link.length > 3;
	});
	var mapLinks = allLinks.filter(function (link) {
		return link.indexOf('www.google.com/maps/') > -1
	});
	console.log('mapLinks length: ' + mapLinks.length)
	if (mapLinks.length == 0) {
		// Check for other signs this is a place
		var POIs = $('a:contains("Points of interest")');
		var anyMapLink = $('a').toArray().map(function(el){ return $(el).attr('href')}).filter(function(l){return l && l.match(/\/maps\/place/)});
		if (POIs.length == 0 && anyMapLink.length == 0) return;
	}
	var coordLinks = mapLinks.filter(function (link) {
		return link.indexOf('/@') > -1
	});

	//TODO: we could add here related search terms from the rest of the links
	//TODO: Get the image
	var externalLinks = allLinks.filter(function (link) {
		return link.indexOf('google') == -1 && link.indexOf('javascript:void(0)');
	});
	console.log('external links:', externalLinks);
	if (coordLinks && coordLinks.length > 0) {
		var coordsMatch = coordLinks[0].match(/\/\@([^,]*),([^,]*)/);
		if (coordsMatch.index && coordsMatch.index > 0) {
			lat = coordsMatch[1];
			lng = coordsMatch[2];
			console.log('coords:', lat, lng);
		}
	}
	// If this is a google maps page then we check the coords this way:
	if (!lat && window.location.href.indexOf('&tbm=lcl') > -1){
	   var coordsString = window.location.href.match(/&rllag=([^,]*),([^,]*)/);
		if (coordsString.index && coordsString.index > 0) {
			var latString = coordsMatch[1],
				lngString = coordsMatch[2];
			lat = latString.slice(0,-6) + "." + latString.slice(-6);
			lng = lngString.slice(0,-6) + "." + lngString.slice(-6);
			console.log('coords:', lat, lng);
		}
	}
	var descriptionHolder = $('#rhs_block').find('.kno-rdesc, ._VKi, ._cgc');
	if (descriptionHolder && descriptionHolder.length > 0) {
		var descriptionText = descriptionHolder ? descriptionHolder.children('span').text() : null;
		if (descriptionText) {
			descriptionText = descriptionText.replace(/(… More)/,'');
			descriptionText = descriptionText.replace(/( Wikipedia)/,'');
		}
		console.log('fullText:', descriptionText)
	}
	var summaryTextHolders = $('#rhs_block').find('._gdf._LAf, ._mr._Wfc.vk_gy').find('span');
	var summaryText = longest(summaryTextHolders.toArray().map(function(el){ return $(el).text()}));
	//console.log('summaryText:', summaryText)
	var name = $('.kno-ecr-pt:eq(0)').clone().children().remove().end().text().trim();
	var nameForSearch = name;
	$mapElem = $('.rhsmap5col a,.rhsmap4col a, .rhsmap3col a').first();
	if ($mapElem && $mapElem.length > 0){
		nameForSearch = decodeURI($mapElem.attr('href').match(/\/maps\/place\/([^\/]*)/)[1]).replace(/\+/g," ")
	}
	var addedLocation = summaryText ? summaryText.split(" in ")[1] : null;
	if (addedLocation && nameForSearch.indexOf(',') == -1) nameForSearch = nameForSearch + ", " + addedLocation;
	var addressDiv = $('[data-dtype=d3adr] ._Xbe');
	if (addressDiv){
		var address = addressDiv.text();
		nameForSearch = nameForSearch + ", " + address;
	}
	var image = $('#rhs img:eq(0)').attr('src');
	var searchLinks = $('h3.r a').toArray().map(function(el){ return el.href});  // used to have: .replace(/(http:)|(https:)/,'')
	chrome.runtime.sendMessage({
		target: 'background',
		method: 'runFunction',
		methodName: "foundObjectInfo",
		data: {
			nameForSearch: nameForSearch,
			name: name,
			image: image,
			lat: lat,
			lng: lng,
			mapLinks: mapLinks,
			externalLinks: externalLinks,
			searchLinks: searchLinks,
			longDesc: descriptionText,
			oneliner: summaryText,
			targetMsgId: UNIQUE_DROPDOWN_VIEWER_ID,
			skipAddedDetails: $('.scrape-btn').length > 0
		}
	});

}

function checkRHS() {
	if(! $('#searchform input[aria-label="Search"]')[0]) return;
	if (google_cex.checkRHSIntervalIndex > 15) {
		window.clearInterval(google_cex.checkStringInterval);
		google_cex.rhsDidChange = false;
		google_cex.searchTermDidChange = false;
		if (google_cex.runRhsChange) {
			google_cex.runRhsChange = false;
			rhsDidChange();
		}

	}
	google_cex.checkRHSIntervalIndex++;
	console.log('checking the RHS', google_cex.checkRHSIntervalIndex, google_cex.rhsCode, google_cex.lastSearchTerm)
	var currentLocation = window.location.href;
	var inGoogleMaps = currentLocation.indexOf('&tbm=lcl') > -1
	var rhs = $('#rhs_block');
	// If this is a maps page then we remove the map itself from the string because it changes frequently
	if (inGoogleMaps) {
		rhs = rhs.find('.akp_uid_0')
	}
	var rhsAsString = rhs.html();
	var rhsCode = rhsAsString ? hashCode(rhsAsString) : null;
	var currentSearchTerm = $('#searchform input[aria-label="Search"]').get(0).value;

	if (rhsCode != google_cex.rhsCode) {
		google_cex.rhsCode = rhsCode;
		console.log('rhs changed to:', rhsCode)
		google_cex.rhsDidChange = true;
	}
	if (google_cex.lastSearchTerm != currentSearchTerm) {
		google_cex.lastSearchTerm = currentSearchTerm;
		$('#tm_status_elem').attr('data-in-flux', true);
		console.log('searchTerm changed to:', currentSearchTerm)
		google_cex.searchTermDidChange = true;
	}
	if (google_cex.rhsDidChange && (google_cex.searchTermDidChange || inGoogleMaps)) {
		google_cex.searchTermDidChange = false;
		google_cex.rhsDidChange = false;
		console.log('RHS did change!!', currentSearchTerm)
		google_cex.runRhsChange = true;

	}
}

function resetRHSCheckString() {
	window.clearInterval(google_cex.checkStringInterval);
	google_cex.checkRHSIntervalIndex = 0;
	google_cex.checkStringInterval = window.setInterval(checkRHS, 100)
}

function startRHSChecker() {
	// There are a number of events that can trigger a search result load - typing stuff into the search bar, or pressing enter or selecting with the mouse
	$(document).on('keydown', function () {
		resetRHSCheckString();
		console.log('key down!')
	});
	$(document).on('mouseup', function () {
		resetRHSCheckString();
		console.log('mouse up!')
	});
	$('#searchform input[aria-label="Search"]').on('keydown', function () {
		resetRHSCheckString();
		console.log('search form key down!!')
	});
	resetRHSCheckString();
}


function hashCode(string) {
	var hash = 0, i, chr, len;
	if (string.length === 0) return hash;
	for (i = 0, len = string.length; i < len; i++) {
		chr = string.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

function setupTrackToggle(){
	$(document).on('click.trackToggle', '.toggle-tracking', function(){
		var $rhsTripmindStatus = $('#rhs-tripmind-status'),
			currentState = $rhsTripmindStatus.hasClass('tracked'),
			newState = !currentState;
		chrome.runtime.sendMessage({
			target: 'background',
			method: 'runFunction',
			methodName: "toggleTracking",
			data: {
				name: $('.kno-ecr-pt').clone().children().remove().end().text().trim(),
				state: newState
			}
		}, function(){
			$rhsTripmindStatus.toggleClass('tracked');
		});
	})
}

function google_setupButtons(){
	// Setup the 'open in tripmind' button
	$(document).on('click', '.tripmind-open', function(el){
		var addedRoute = $(el.target).attr('data-target');
		chrome.runtime.sendMessage({
			target: 'background',
			method: 'runFunction',
			methodName: "openTripmindTab",
			data: addedRoute
		});
	})
}

function startup() {
	startRHSChecker();
	setupTrackToggle();
	google_setupButtons();
}



if (document.readyState === "complete") {
	startup();
} else {
	if (window.attachEvent) {
		window.attachEvent('onload', startup);
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
}
