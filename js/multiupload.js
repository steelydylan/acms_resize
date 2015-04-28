(function($){
	var $action = $("[name^='ACMS_POST_Entry_Insert'], [name^='ACMS_POST_Entry_Update']");
	if (0 !== $action.size()) {
		//ランダムな文字列を取得
		var getRand = function(a,b){
			return ~~(Math.random() * (b - a + 1)) + a;
		};
		var getRandText = function(limit){
			var ret = "";
	        var strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	        var length = strings.length;
	        for(var i = 0; i < limit; i++){
	            ret += strings.charAt(Math.floor(getRand(0,length)));
	        }
	        return ret;
		};
		$("[name*='image_file']").imageResize({
			size:0.5,
			appendTo:function(){
				return $(this).parent('.entryFormFileControl');
			},
			name:function(){
				return $(this).attr("name").replace("image_file","image_replace").replace("[]","");
			},
			callback:function(){
				//input type="file"の中身を空に
				$(this).wrap("<span></span>");
				var $span = $(this).parent("span")
				var html = $span.html();
				$span.html(html);
				$(this).unwrap();
			}
		});
		$("#entryForm").submit(function(e){
			$("[name*='image_replace']").each(function(){
				var id = getRandText(20);
				var $parent = $(this).parents(".entryFormColumnItem");
				var edit = $parent.find("[name*='image_edit']").eq(0).val();
				var caption = $parent.find("[name*='image_caption']").eq(0).val();
				var old = $parent.find("[name*='image_old']").eq(0).val();
				var link = $parent.find("[name*='image_link']").eq(0).val();
				var alt = $parent.find("[name*='image_alt']").eq(0).val();
				var align = $parent.find("[name='align[]']").eq(0).val();
				var group = $parent.find("[name='group[]']").eq(0).val();
				var sort = $parent.find("[name='sort[]']").eq(0).val();
				$(this).attr("name","image_replace_"+id);
				$parent.append("<input type='hidden' name='sort[]' value='"+sort+"'>");
				$parent.append("<input type='hidden' name='id[]' value='"+id+"'>");
				$parent.append("<input type='hidden' name='align[]' value='"+align+"'>");
				$parent.append("<input type='hidden' name='group[]' value='"+group+"'>");
				$parent.append("<input type='hidden' name='type[]' value='image'>");
				$parent.append("<input type='hidden' name='image_edit_"+id+"' value='"+edit+"'>");
				$parent.append("<input type='hidden' name='image_caption_"+id+"' value='"+caption+"'>");
				$parent.append("<input type='hidden' name='image_old_"+id+"' value='"+old+"'>");
				$parent.append("<input type='hidden' name='image_link_"+id+"' value='"+link+"'>");
				$parent.append("<input type='hidden' name='image_alt_"+id+"' value='"+alt+"'>");					
			});
			var i = 1;
			$("[name='sort[]']").each(function(){
				if($(this).prop("tagName") == "SELECT"){
					$(this).find('option[value='+i+']').remove();
					$(this).append('<option value="'+i+'">'+i+'</option>');
				}
				$(this).val(i);
				i++;
			});
		});
	}
})(jQuery);