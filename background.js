function relayRequest(request, sender, sendResponse) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, request, function(response){
			sendResponse(response);
		});
	});
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		relayRequest(request, sender, sendResponse)
	});

