var cex = {};


var UNIQUE_DROPDOWN_VIEWER_ID = 'cex_iframe';

/**
 * Here is where you want to render a latitude and longitude. We create an iframe so we
 * we can inject it. We just want to maintain a single instance of it though.
 */
function drawDropDownIframe() {
	dropdownDom = document.createElement('iframe');
	dropdownDom.setAttribute('id', UNIQUE_DROPDOWN_VIEWER_ID);
	dropdownDom.setAttribute('class', 'hidden animated fast fadeInLeft');
	dropdownDom.setAttribute('src', chrome.extension.getURL('dropdown_viewer.html'));
	dropdownDom.setAttribute('frameBorder', '0');
	//dropdownDom.setAttribute('style', 'position: fixed; top: 0; right: 0; height: 20em; overflow: hidden; z-index: 99999');
	document.body.appendChild(dropdownDom);
}

cex.showMessage = function(){
	var $viewer = $('#' + UNIQUE_DROPDOWN_VIEWER_ID);
	$viewer.removeClass('hidden');
	/*window.setTimeout(function(){
		$viewer.addClass('hidden');
	}, 3000);*/
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
	var descriptionHolder = $('#rhs_block .kno-rdesc');
	if (descriptionHolder && descriptionHolder.length > 0) {
		var descriptionText = descriptionHolder ? descriptionHolder.children('span')[0].innerHTML : null;
		var summaryTextHolder = descriptionHolder ? descriptionHolder.parents('.mod').prev('.mod').find('span:last') : null;
		var summaryText = summaryTextHolder.text();
		console.log('summaryText:', summaryText)
		console.log('fullText:', descriptionText)
	}
	var name = $('.kno-ecr-pt').clone().children().remove().end().text();
	var image = $('#rhs img:eq(0)').attr('src');
	chrome.runtime.sendMessage({
		target: 'background',
		method: 'runFunction',
		methodName: "foundObjectInfo",
		data: {
			name: name,
			image: image,
			lat: lat,
			lng: lng,
			mapLinks: mapLinks,
			externalLinks: externalLinks,
			descriptionText: descriptionText,
			summaryText: summaryText
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
	checkRHS();
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


function startup() {
	startRHSChecker();
	drawDropDownIframe();
}

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
