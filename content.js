var cex = {};



var UNIQUE_MAP_VIEWER_ID = 'cex_iframe';
var latitude = -1;
var longitude = -1;

/**
 * Here is where you want to render a latitude and longitude. We create an iframe so we
 * we can inject it. We just want to maintain a single instance of it though.
 */
function showMap() {
	var mapViewerDOM = document.getElementById(UNIQUE_MAP_VIEWER_ID);
	if (mapViewerDOM) {
		$(mapViewerDOM).removeClass('hidden');
		chrome.runtime.sendMessage({
			target: 'map_viewer',
			method: 'runFunction',
			methodName: "focusSearchBar"
		});
	} else {

		mapViewerDOM = document.createElement('iframe');
		mapViewerDOM.setAttribute('id', UNIQUE_MAP_VIEWER_ID);
		mapViewerDOM.setAttribute('src', chrome.extension.getURL('map_viewer.html'));
		mapViewerDOM.setAttribute('frameBorder', '0');
		mapViewerDOM.setAttribute('width', '99.90%');
		mapViewerDOM.setAttribute('height', '100%');
		mapViewerDOM.setAttribute('style', 'position: fixed; top: 0; left: 0; overflow: hidden; z-index: 99999');
		mapViewerDOM.onload = function (e) {


			chrome.runtime.sendMessage({
				target: 'map_viewer',
				method: 'runFunction',
				methodName: "renderMap",
				data: {
					latitude: latitude,
					longitude: longitude
				}
			});
			chrome.runtime.sendMessage({
				target: 'map_viewer',
				method: 'runFunction',
				methodName: "focusSearchBar"
			});
		}
		document.body.appendChild(mapViewerDOM);

	}
	// Send message to iframe to focus on search bar
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.target == 'content' && request.method == "runFunction") {
			cex[request.methodName](request.data)
		}
	});

cex.closeIframe = function(){
	var mapViewerDOM = document.getElementById(UNIQUE_MAP_VIEWER_ID);
	if (mapViewerDOM) $(mapViewerDOM).addClass('hidden')
};

function rhsDidChange(){
	console.log('code is now:', cex.rhsCode)
	console.log($('#rhs_block a').toArray().map(function(el){ return el.href}))
	var allLinks = $('#rhs_block a').toArray().map(function(el){ return el.href});
	var mapLinks = allLinks.filter(function(link){
		return link.indexOf('www.google.com/maps/')> -1
	});
	var coordLinks = mapLinks.filter(function(link){
		return link.indexOf('/@') > -1
	});
	var externalLinks = allLinks.filter(function(link){
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
		var summaryTextHolder = descriptionHolder ? descriptionHolder.parents('.mod').prev('.mod') : null;
		console.log('summaryText:', summaryTextHolder.text())
		console.log('fullText:', descriptionText)
	}

}

function checkRHS(){
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

function resetRHSCheckString(){
	window.clearInterval(cex.checkStringInterval);
	cex.checkRHSIntervalIndex = 0;
	cex.checkStringInterval = window.setInterval(checkRHS, 100)
}

function startRHSChecker(){
	// There are a number of events that can trigger a search result load - typing stuff into the search bar, or pressing enter or selecting with the mouse
	$(document).on('keydown', function() {
		resetRHSCheckString();
		console.log('key down!')
	});
	$(document).on('mouseup', function(){
		resetRHSCheckString();
		console.log('mouse up!')
	});
	$('#searchform input[aria-label="Search"]').on('keydown', function(){
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


function startup(){
	startRHSChecker();
}

if(window.attachEvent) {
	window.attachEvent('onload', startup);
} else {
	if(window.onload) {
		var curronload = window.onload;
		var newonload = function(evt) {
			curronload(evt);
			startup();
		};
		window.onload = newonload;
	} else {
		window.onload = startup;
	}
}

