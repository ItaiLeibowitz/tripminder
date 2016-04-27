var getPageContents = function(){
	var note = $('.ttd__section--description')[0].innerHTML,
		image = $('.slider__img:eq(0)')[0].src;
	return {note: note, image: image};
}