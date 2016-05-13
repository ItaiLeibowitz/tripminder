var getPageContents = function(){
	var rating = $('.rs.rating')[0].innerHTML,
		image = $('#PHOTO_CELL_HERO_PHOTO img:eq(0)')[0].src,
		descriptionContainer = $('#OVERLAY_CONTENTS .listing_details')[0],
		description = descriptionContainer ? descriptionContainer.innerHTML : null;

	var ratingSpan = $(rating)[0],
		ratingCount = $(rating)[2].text,
		ratingCountSpan = $('<span>' + ratingCount +'</span>'),
		descSpan = description ? $(description): null,
		ratingForOutput =  ratingCountSpan[0].outerHTML,
		descForOutput = descSpan ? descSpan[0].outerHTML : null;

	var note = [ratingSpan.outerHTML, ratingForOutput, descForOutput].join(" ");
	return {note: note, image: image};
};