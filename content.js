var cex = {};


var UNIQUE_DROPDOWN_VIEWER_ID = 'cex_iframe_' + Math.random();


/**
 * Here is where you want to render a latitude and longitude. We create an iframe so we
 * we can inject it. We just want to maintain a single instance of it though.
 */
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

}

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

cex.showMessage = function(trackingStatus){
	if (trackingStatus) {
		if (cex.hideMessageTimer) window.clearTimeout(cex.hideMessageTimer);
		var $viewer = $(document.getElementById(UNIQUE_DROPDOWN_VIEWER_ID));
		$viewer.removeClass('hidden');
		cex.hideMessageTimer = window.setTimeout(function () {
			$viewer.addClass('hidden');
		}, 3000);
	}
	updateRhsStatus(trackingStatus);
};

cex.hideMessage = function(){
	var $viewer = $('#' + UNIQUE_DROPDOWN_VIEWER_ID);
	$viewer.addClass('hidden');
};

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.target == 'content' && request.method == "runFunction") {
			cex[request.methodName](request.data)
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
	console.log('code is now:', cex.rhsCode)
	console.log($('#rhs_block a').toArray().map(function (el) {
		return el.href
	}))
	var lat, lng, descriptionText, summaryText;
	var allLinks = $('#rhs_block a').toArray().map(function (el) {
		return el.href
	});
	var mapLinks = allLinks.filter(function (link) {
		return link.indexOf('www.google.com/maps/') > -1
	});
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
		var summaryTextHolders = descriptionHolder ? descriptionHolder.parents('.mod').prev('.mod').find('span') : null;
		var summaryText = longest(summaryTextHolders.toArray().map(function(el){ return $(el).text()}))
		console.log('summaryText:', summaryText)
		console.log('fullText:', descriptionText)
	}
	var name = $('.kno-ecr-pt').clone().children().remove().end().text();
	var nameForSearch = name;
	$mapElem = $('.rhsmap5col')
	if ($mapElem && $mapElem.length > 0){
		nameForSearch = decodeURI($mapElem.find('a').attr('href').match(/\/maps\/place\/([^\/]*)/)[1]).replace(/\+/," ")
	}
	var image = $('#rhs img:eq(0)').attr('src');
	var searchLinks = $('h3.r a').toArray().map(function(el){ return el.href});
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
			descriptionText: descriptionText,
			summaryText: summaryText,
			targetMsgId: UNIQUE_DROPDOWN_VIEWER_ID
		}
	});

}

function checkRHS() {
	if (cex.checkRHSIntervalIndex > 15) {
		window.clearInterval(cex.checkStringInterval);
		cex.rhsDidChange = false;
		cex.searchTermDidChange = false;
	}
	cex.checkRHSIntervalIndex++;
	console.log('checking the RHS', cex.checkRHSIntervalIndex)
	var rhs = $('#rhs_block');
	var rhsAsString = rhs.html();
	var rhsCode = rhsAsString ? hashCode(rhsAsString) : null;
	var currentSearchTerm = $('#searchform input[aria-label="Search"]').get(0).value;
	if (rhsCode != cex.rhsCode) {
		cex.rhsCode = rhsCode;
		console.log('rhs changed to:', rhsCode)
		cex.rhsDidChange = true;
	}
	if (cex.lastSearchTerm != currentSearchTerm) {
		cex.lastSearchTerm = currentSearchTerm;
		console.log('searchTerm changed to:', currentSearchTerm)
		cex.searchTermDidChange = true;
	}
	if (cex.rhsDidChange && cex.searchTermDidChange) {
		cex.searchTermDidChange = false;
		cex.rhsDidChange = false;
		rhsDidChange();
	}
}

function resetRHSCheckString() {
	window.clearInterval(cex.checkStringInterval);
	cex.checkRHSIntervalIndex = 0;
	cex.checkStringInterval = window.setInterval(checkRHS, 100)
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
	drawDropDownIframe();
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
