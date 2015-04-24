(function($){
	function readFile(file) {
	    var reader = new FileReader();
	    var deferred = $.Deferred();
	    reader.onload = function(event) {
	        deferred.resolve(event.target.result);
	    };
	    reader.onerror = function() {
	        deferred.reject(this);
	    };
	    if (/^image/.test(file.type)) {
	        reader.readAsDataURL(file);
	    }
	    return deferred.promise();
	}
	function loadImage(src){
		var image = new Image();
		var deferred = $.Deferred();
		image.onload = function(){
			deferred.resolve(image);
		}
		image.src = src;
		return deferred.promise();
	}
	$.fn.extend({
		imageResize:function(opt){
			var opt = $.extend({
				format:"png",
				size:0.5,
				name:"canvasImg",
				appendTo:"body",
				callback:function(){}
			},opt);
			$(document).on("change",$(this).selector,function(){
				var files = $(this).prop("files");
				var promises = [];
				var nextPromises = [];
				var $that = $(this);
				var that = this;
				for(var i = 0; i < files.length; i++){
					promises.push(readFile(files[i]));
				}
				/*ファイルの読み込みが終われば*/
				$.when.apply(window, promises).then(function(){
					for (var i = 0; i < arguments.length; i++) {
						nextPromises.push(loadImage(arguments[i]));
					}
					/*画像のロードが終われば*/
					$.when.apply(window,nextPromises).then(function(){
						for(var i = 0; i < arguments.length; i++){
							var canvas = document.createElement('canvas');
							var image = arguments[i];
							var by = opt.size;
							var width = image.width * by;
							var height = image.height * by;
							canvas.width = width;
							canvas.height = height;
							var ctx = canvas.getContext("2d");
							ctx.drawImage(image,0,0,width,height);
							var url = canvas.toDataURL().replace(/^data:image\/png;base64,/, '');
							var name = typeof opt.name === "function" ? opt.name.apply(that) : opt.name;
							var $appendTo = typeof opt.appendTo === "function" ? opt.appendTo.apply(that) : $(opt.append);
							$('<input accept="image/*">').attr({
	                			type: "hidden",
	                			name: name,
	                			value: url
	            			}).appendTo($appendTo);
							var resize = canvas.toDataURL("image/"+opt.format);
							if(opt.dest){
								$(opt.dest).attr("src",resize);
							}else{
								var $img = $("<img>");
	            				$img.attr("src",resize);
	            				$img.insertBefore($that);
							}
						}
						opt.callback.apply(that);
					});
				});
			});
		}
	});
})(jQuery);