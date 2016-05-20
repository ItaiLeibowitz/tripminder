var anypage_cex = anypage_cex || {};


var UNIQUE_DROPDOWN_VIEWER_ID = 'cex_iframe_' + Math.random();



function anypage_drawDropDownIframe() {
	console.log('draw iframe')
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

anypage_cex.showMessage = function(options){
	if (options.trackingStatus) {
		if (anypage_cex.hideMessageTimer) window.clearTimeout(anypage_cex.hideMessageTimer);
		var $viewer = $(document.getElementById(UNIQUE_DROPDOWN_VIEWER_ID));
		if (!options.keepOpen) {
			options.keepOpen = !$viewer.hasClass('hidden');
		}
		$viewer.removeClass('hidden');
		if (!options.keepOpen) {
			anypage_cex.hideMessageTimer = window.setTimeout(function () {
				$viewer.addClass('hidden');
			}, 3000);
		}
	}
	if (typeof(updateRhsStatus) == 'function' && !options.keepOpen){
		updateRhsStatus(options.trackingStatus, options.itemData);
	}
};

anypage_cex.hideMessage = function(){
	var $viewer =  $(document.getElementById(UNIQUE_DROPDOWN_VIEWER_ID));
	$viewer.addClass('hidden');
};

anypage_cex.cancelHide = function(trackingStatus){
	window.clearTimeout(anypage_cex.hideMessageTimer);
};

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.target == 'content-viewer' && request.method == "runFunction") {
			anypage_cex[request.methodName](request.data)
		}
	});

handleVisibilityChange = function(e){
	e.target.removeEventListener(e.type, arguments.callee);
	anypage_startupWhenVisible();
}

anypage_registerUrl = function(forcedItemPlaceId){
	var title = document.title,
		description = $('meta[name="description"]').attr('content'),
		image = $('meta[property="og:image"]').attr('content');
   	if (!image){
		var imageResources = window.performance.getEntriesByType('resource').filter(function(r){return r.name.indexOf('.jpg')>-1});
		var minDuration = 0,
			bestImageName = "";
		for (var i = 0; i < imageResources.length; i++) {
			var image = imageResources[i];
			if (image.duration > minDuration){
				minDuration = image.duration;
				bestImageName = image.name;
			}
		}
		if (bestImageName) image = bestImageName
	}
	var specificPageData = {};
	if (typeof(getPageContents) == "function") specificPageData = getPageContents();
	chrome.runtime.sendMessage({
		target: 'background',
		method: 'runFunction',
		methodName: "registerUrl",
		data: {
			url: document.location.toString(), //.replace(/(http:)|(https:)/,''),
			title: specificPageData.title || title,
			description: specificPageData.description || description,
			image: specificPageData.image || image,
			note: specificPageData.note || null,
			targetMsgId: UNIQUE_DROPDOWN_VIEWER_ID,
			forcedItemPlaceId: forcedItemPlaceId
		}
	});
}

anypage_cex.registerUrl = anypage_registerUrl;

function anypage_setupButtons(){
}

function anypage_startupWhenVisible(){
	if (document.hidden) {
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return;
	}
	if (typeof(tmPreventAnypageScripts) == "undefined") {
		anypage_registerUrl();
	}
}

function anypage_startup() {
	anypage_setupButtons();
	anypage_drawDropDownIframe();
	anypage_startupWhenVisible();
}



if (document.readyState === "complete") {
	anypage_startup();
} else {
	if (window.attachEvent) {
		window.attachEvent('onload', anypage_startup);
	} else {
		if (window.onload) {
			var curronload = window.onload;
			var newonload = function (evt) {
				curronload(evt);
				anypage_startup();
			};
			window.onload = newonload;
		} else {
			window.onload = anypage_startup;
		}
	}
}
