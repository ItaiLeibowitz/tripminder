var anypage_cex = anypage_cex || {};


var UNIQUE_DROPDOWN_VIEWER_ID = 'cex_iframe_' + Math.random();


/**
 * Here is where you want to render a latitude and longitude. We create an iframe so we
 * we can inject it. We just want to maintain a single instance of it though.
 */
function anypage_drawDropDownIframe() {
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

anypage_cex.showMessage = function(trackingStatus){
	if (trackingStatus) {
		if (anypage_cex.hideMessageTimer) window.clearTimeout(anypage_cex.hideMessageTimer);
		var $viewer = $(document.getElementById(UNIQUE_DROPDOWN_VIEWER_ID));
		$viewer.removeClass('hidden');
		anypage_cex.hideMessageTimer = window.setTimeout(function () {
			$viewer.addClass('hidden');
		}, 3000);
	}
};

anypage_cex.hideMessage = function(){
	var $viewer = $('#' + UNIQUE_DROPDOWN_VIEWER_ID);
	$viewer.addClass('hidden');
};

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.target == 'content' && request.method == "runFunction") {
			anypage_cex[request.methodName](request.data)
		}
	});

anypage_registerUrl = function(){
	var title = document.title,
		description = $('meta[name="description"]').attr('content'),
		image = $('meta[property="og:image"]').attr('content');
   	if (!image){
		var firstImageResource = window.performance.getEntriesByType('resource').filter(function(r){return r.name.indexOf('.jpg')>-1})[0];
		if (firstImageResource) image = firstImageResource.name
	}
	chrome.runtime.sendMessage({
		target: 'background',
		method: 'runFunction',
		methodName: "registerUrl",
		data: {
			url: document.location.toString().replace(/(http:)|(https:)/,''),
			title: title,
			description: description,
			image: image,
			targetMsgId: UNIQUE_DROPDOWN_VIEWER_ID
		}
	});
}

function anypage_setupButtons(){
}

function anypage_startup() {
	anypage_setupButtons();
	anypage_drawDropDownIframe();
	anypage_registerUrl();
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
