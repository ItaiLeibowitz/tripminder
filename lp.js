
lp_registerUrl = function(){
	var note = $('.ttd__section--description')[0].innerHTML;
	chrome.runtime.sendMessage({
		target: 'background',
		method: 'runFunction',
		methodName: "registerUrl",
		data: {
			url: document.location.toString(), //.replace(/(http:)|(https:)/,''),
			note: note
		}
	});
}

function lp_startup() {
	lp_registerUrl();
}



if (document.readyState === "complete") {
	lp_startup();
} else {
	if (window.attachEvent) {
		window.attachEvent('onload', lp_startup);
	} else {
		if (window.onload) {
			var curronload = window.onload;
			var newonload = function (evt) {
				curronload(evt);
				lp_startup();
			};
			window.onload = newonload;
		} else {
			window.onload = lp_startup;
		}
	}
}
