

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		//console.log(request)
		if (request.target == 'dropdown_viewer' && request.method == "runFunction") {
			window[request.methodName](request.data)
		}
	});


function closeMessage(){
	chrome.runtime.sendMessage({
			target: 'content-viewer',
			method: 'runFunction',
			methodName: "hideMessage"
		}
	);
}


function cancelClose(){
	chrome.runtime.sendMessage({
			target: 'content-viewer',
			method: 'runFunction',
			methodName: "cancelHide"
		}
	);
}

function updateMessageContent(data){
	var $message = $('#message');
	$message.find('.message-title').html(data.title);
	$message.find('.name').html(data.name);
	$message.find('.type').html(data.itemType ? data.itemType.replace(/_/g, " ") : "");
	$message.find('.long-desc')[0].value = data.longDesc;
	$message.find('.image').attr('src', data.imageSource);
	$message.removeClass('hidden');
	window.setTimeout(function(){
		$message.addClass('hidden');
	}, 3000)
}

function showFeedback(data){
	var $feedback = $('.feedback');
	$feedback.html(data.message);
	$feedback.addClass('visible');
	if (data.type){
		$feedback.addClass(data.type)
	} else {
		$feedback.removeClass('failure success message');
	}
	window.setTimeout(function(){
		$feedback.removeClass('visible');
	}, 2000)
}

function updateMessageForItem(data) {
	if (data.trackingStatus) {
		updateMessageContent({
			title: 'Keeping track of:',
			name: data.item.name,
			longDesc: data.item.longDesc,
			itemType: data.item.itemType,
			imageSource: data.item.image
		})
	}

	chrome.runtime.sendMessage({
			target: 'content-viewer',
			method: 'runFunction',
			methodName: "showMessage",
			data: data.trackingStatus
		}
	);
}

function autosave(field, value){
	chrome.runtime.sendMessage({
			target: 'background',
			method: 'runFunction',
			methodName: "updateValue",
			data: {
				field: field,
				value: value
			}
		}
	);
}



function setupCloseButtons(){
	$(document).on('click.closeBtn', '.close-btn', function(){
		closeMessage();
	})
}

function setupOtherClicks() {
	$(document).on('click.stopClosing', '#container', function(){
		cancelClose();
	});
	$(document).on('click.openLink', '.open-link', function(){
		chrome.runtime.sendMessage({
				target: 'background',
				method: 'runFunction',
				methodName: "openCurrentInTripmind"
			}
		);
	});
	$(document).on('click.cancelTrack', '.cancel-btn', function(){
		chrome.runtime.sendMessage({
			target: 'background',
			method: 'runFunction',
			methodName: "toggleTracking",
			data: {
				name: $('.name').text(),
				state: false
			}
		}, function(){
			closeMessage();
		});
	})

}

function setupAutoSave() {
	$(document).on('blur', '.autosave', function(e){
		autosave($(e.target).attr('data-field'), e.target.value);
	})
}



function startup() {
	setupCloseButtons();
	setupOtherClicks();
	setupAutoSave();
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




