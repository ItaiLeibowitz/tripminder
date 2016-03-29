

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		//console.log(request)
		if (request.target == 'dropdown_viewer' && request.method == "runFunction") {
			window[request.methodName](request.data)
		}
	});


function closeMessage(){
	chrome.runtime.sendMessage({
			target: 'content',
			method: 'runFunction',
			methodName: "hideMessage"
		}
	);
}

function updateMessageContent(data){
	var $message = $('#message');
	$message.children('.message-title').html(data.title);
	$message.find('.name').html(data.name);
	$message.find('.description').html(data.summaryText);
	$message.find('.image').attr('src', data.imageSource);
	$message.removeClass('hidden');
	window.setTimeout(function(){
		$message.addClass('hidden');
	}, 3000)
}

function updateMessageForItem(data) {
	if (data.trackingStatus) {
		updateMessageContent({title: 'TripMind keeping track of:', name: data.item.name, summaryText: data.item.summaryText, imageSource: data.item.image})
	}

	chrome.runtime.sendMessage({
			target: 'content',
			method: 'runFunction',
			methodName: "showMessage",
			data: data.trackingStatus
		}
	);
}


function setupCloseButtons(){
	$(document).on('click', '.close-btn', function(){
		closeMessage();
	})
}


function startup() {
   setupCloseButtons();
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




