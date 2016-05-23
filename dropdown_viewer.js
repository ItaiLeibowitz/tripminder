

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
	if (data.clearAll){
		console.log('clearing all')
		$message.find('.message-title, .name, .type, .editable').html('');
		$message.find('.editable').attr('data-record-type', '');
		$message.find('.editable').attr('data-id', '');
		$message.find('.editable').attr('data-field', '');
		$message.find('.image').attr('src', '');
		$('.hide-if-empty').addClass('hidden');
		$('.search-field-holder').removeClass('hidden');
		return;
	}
	if (data.title) $message.find('.message-title').html(data.title);
	if (data.name) $message.find('.name').html(data.name);
	if (data.itemType) $message.find('.type').html(data.itemType ? data.itemType.replace(/_/g, " ") : "");
	// Setup the main editable field
	$message.find('.editable').html(data.editableDesc);
	if (data.recordType) $message.find('.editable').attr('data-record-type', data.recordType);
	if (data.recordId)	$message.find('.editable').attr('data-id', data.recordId);
	if (data.fieldName)	$message.find('.editable').attr('data-field', data.fieldName);


	if (data.imageSource) $message.find('.image').attr('src', data.imageSource);
	$message.removeClass('hidden');
	$('.hide-if-empty').removeClass('hidden');
	$('.search-field-holder').addClass('hidden');
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
			editableDesc: data.item.longDesc,
			recordType: 'item',
			recordId: data.item.gmapsReference,
			fieldName: 'longDesc',
			itemType: data.item.itemType,
			imageSource: data.item.image
		})
	}

	chrome.runtime.sendMessage({
			target: 'content-viewer',
			method: 'runFunction',
			methodName: "showMessage",
			data: {trackingStatus: data.trackingStatus, itemData: data.item}
		}
	);
}

function updateMessageForLink(data, keepOpen) {
	if (data.trackingStatus) {
		updateMessageContent({
			title: 'Keeping track of:',
			name: data.item.name,
			editableDesc: data.link.note,
			recordType: 'potentialLink',
			recordId: data.link.id,
			fieldName: 'note',
			itemType: data.item.itemType,
			imageSource: data.item.image
		})
	}

	chrome.runtime.sendMessage({
			target: 'content-viewer',
			method: 'runFunction',
			methodName: "showMessage",
			data: {trackingStatus: data.trackingStatus, keepOpen: keepOpen}
		}
	);
}





function autosave(field, value, recordType, id){
	chrome.runtime.sendMessage({
			target: 'background',
			method: 'runFunction',
			methodName: "updateValue",
			data: {
				field: field,
				value: value,
				recordType: recordType,
				id: id
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
	$(document).on('click.openTm', '.open-tm', function(){
		chrome.runtime.sendMessage({
				target: 'background',
				method: 'runFunction',
				methodName: "openTripmindTab"
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
			console.log('message back received!')
			closeMessage();
		});
	});
	$(document).on('click.fixWrongLink', '.unlink-btn', function(){
		chrome.runtime.sendMessage({
			target: 'background',
			method: 'runFunction',
			methodName: "deregisterUrl",
			data: {
				url: document.referrer
			}
		}, function(){
			console.log('message back received!')
			closeMessage();
		});
	})

}

function setupAutoSave() {
	$(document).on('blur', '.autosave', function(e){
		var $target = $(e.target);
		autosave($target.attr('data-field'), $target.html(), $target.attr('data-record-type'), $target.attr('data-id'));
	})
}

function setupSearchField(){
	var field = $('#search-field');
	field.autocomplete({
		source: function(request, response){
			chrome.runtime.sendMessage({
				target: 'background',
				method: 'runFunction',
				methodName: "updateSearch",
				data: request.term
			}, function(results){
				response($.map(results, function (prediction, i) {
					return {
						label: prediction.description
					}
				}));
			});
		},
		select: function(event, ui){
			updateMessageForLink({
				item: {name: ui.item.label},
				link: {note: null, id: document.referrer},
				trackingStatus: true
			});
			chrome.runtime.sendMessage({
				target: 'background',
				method: 'runFunction',
				methodName: "selectSearch",
				data: {
					selection: ui.item.label
				}
			});
		}
	});
}



function startup() {
	setupCloseButtons();
	setupOtherClicks();
	setupSearchField();
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




