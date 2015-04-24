(function($){
	$("[name*='image_file']").imageResize({
		size:0.5,
		appendTo:function(){
			return $(this).parent('.entryFormFileControl');
		},
		name:function(){
			return $(this).attr("name").replace("image_file","image_replace").replace("[]","");
		},
		callback:function(){
			$(this).wrap("<span></span>");
			var $span = $(this).parent("span")
			var html = $span.html();
			$span.html(html);
			$(this).unwrap();
		}
	});
})(jQuery);