var google_cex = google_cex || {};


//var UNIQUE_DROPDOWN_VIEWER_ID = 'cex_iframe_' + Math.random();

/*
*//**
 * Here is where you want to render a latitude and longitude. We create an iframe so we
 * we can inject it. We just want to maintain a single instance of it though.
 *//*
function drawDropDownIframe() {
	dropdownDom = document.createElement('iframe');
	dropdownDom.setAttribute('id', UNIQUE_DROPDOWN_VIEWER_ID);
	dropdownDom.setAttribute('class', 'cex-iframe hidden animated fast fadeInLeft');
	dropdownDom.setAttribute('src', chrome.extension.getURL('dropdown_viewer.html'));
	dropdownDom.setAttribute('frameBorder', '0');
	dropdownDom.onload = function (e) {
		chrome.runtime.sendMessage({
			target: 'background',
			method: 'runFunction',
			methodName: "updateMessageReadyState",
			data: UNIQUE_DROPDOWN_VIEWER_ID
		});
	};
	document.body.appendChild(dropdownDom);

}*/

function updateRhsStatus(trackingStatus){
	var rhsStatusElem = $('#rhs-tripmind-status');
	if (!rhsStatusElem || rhsStatusElem.length == 0) {
		rhsStatusElem = $('<div id="rhs-tripmind-status"><div class="toggle-tracking"></div><div class="tripmind-open"></div></div>');
		$('#rhs_block').prepend(rhsStatusElem);
	}
	if (trackingStatus) {
		rhsStatusElem.addClass('tracked');
	} else {
		rhsStatusElem.removeClass('tracked');
	}
}

/*google_cex.showMessage = function(trackingStatus){
	if (trackingStatus) {
		if (google_cex.hideMessageTimer) window.clearTimeout(google_cex.hideMessageTimer);
		var $viewer = $(document.getElementById(UNIQUE_DROPDOWN_VIEWER_ID));
		$viewer.removeClass('hidden');
		google_cex.hideMessageTimer = window.setTimeout(function () {
			$viewer.addClass('hidden');
		}, 3000);
	}
	updateRhsStatus(trackingStatus);
};

google_cex.hideMessage = function(){
	var $viewer = $('#' + UNIQUE_DROPDOWN_VIEWER_ID);
	$viewer.addClass('hidden');
};*/

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
		return el.href.replace(/(http:)|(https:)/,'');
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
			var lat = coordsMatch[1],
				lng = coordsMatch[2];
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
	var name = $('.kno-ecr-pt').clone().children().remove().end().text().trim();
	var nameForSearch = name;
	$mapElem = $('.rhsmap5col a,.rhsmap4col a, .rhsmap3col a').first();
	if ($mapElem && $mapElem.length > 0){
		nameForSearch = decodeURI($mapElem.attr('href').match(/\/maps\/place\/([^\/]*)/)[1]).replace(/\+/g," ")
	}
	var addedLocation = summaryText ? summaryText.split(" in ")[1] : null;
	if (addedLocation && nameForSearch.indexOf(',') == -1) nameForSearch = nameForSearch + ", " + addedLocation;
	var image = $('#rhs img:eq(0)').attr('src');
	var searchLinks = $('h3.r a').toArray().map(function(el){ return el.href.replace(/(http:)|(https:)/,'')});
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
			targetMsgId: UNIQUE_DROPDOWN_VIEWER_ID
		}
	});

}

function checkRHS() {
	if (google_cex.checkRHSIntervalIndex > 15) {
		window.clearInterval(google_cex.checkStringInterval);
		google_cex.rhsDidChange = false;
		google_cex.searchTermDidChange = false;
	}
	google_cex.checkRHSIntervalIndex++;
	console.log('checking the RHS', google_cex.checkRHSIntervalIndex)
	var rhs = $('#rhs_block');
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
		console.log('searchTerm changed to:', currentSearchTerm)
		google_cex.searchTermDidChange = true;
	}
	if (google_cex.rhsDidChange && google_cex.searchTermDidChange) {
		google_cex.searchTermDidChange = false;
		google_cex.rhsDidChange = false;
		rhsDidChange();
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
				name: $('.kno-ecr-pt').clone().children().remove().end().text(),
				state: newState
			}
		}, function(){
			$rhsTripmindStatus.toggleClass('tracked');
		});
	})
}

function setupButtons(){
	$(document).on('click', '.tripmind-open', function(){
		chrome.runtime.sendMessage({
			target: 'background',
			method: 'runFunction',
			methodName: "openTripmindTab"
		});
	})
}

function startup() {
	startRHSChecker();
	setupTrackToggle();
	setupButtons();
	//drawDropDownIframe();
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
