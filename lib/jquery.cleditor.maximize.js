(function($) {

	// Define the maximize button
	$.cleditor.buttons.incheight = {
		name: "incheight",
		image: "incheight.gif",
		title: "incheight",
		command: "",
		popupName: "",
		buttonClick: incheightButtonClick
	};
	$.cleditor.defaultOptions.controls =
	$.cleditor.defaultOptions.controls.replace(" icon", " icon incheight");

	function incheightButtonClick(e, data) {
		var editor = data.editor;
		editor.$main.height(editor.$main.height() + 150);

		editor.updateTextArea();
		editor.refresh();
		editor.focus();

		return false;
	}

})(jQuery);
(function($) {

	// Define the findandreplace button
	$.cleditor.buttons.findandreplace = {
		name: "findandreplace",
		image: "findandreplace.gif",
		title: "Find And Replace",
		command: "",
		popupName: "findandreplace",
		popupClass: "cleditorPrompt",
		popupContent: "<table>" +
		"<tr><td>Find:</td><td><input type=text value='' /></td></tr>" +
		"<tr><td>Replace:</td><td><input type=text value='' /></td></tr>" +
		"</table><input type=button value=\"Find and replace\" />",
		buttonClick: findandreplaceButtonClick
	};
	$.cleditor.defaultOptions.controls =
	$.cleditor.defaultOptions.controls.replace("print", "print findandreplace");

	// Find And Replace button click event handler
	function findandreplaceButtonClick(e, data) {

		$(data.popup).children(":button")
		.unbind("click")
		.bind("click", function(e) {

			var editor = data.editor;

			var $text = $(data.popup).find(":text"),
			textfind = $text[0].value,
			textreplace = $text[1].value;

			content = editor.$area.html();

			if (textfind != "" && textreplace != "") {
				content =
				content.replace(eval("/" + textfind + "/gi"), textreplace)
			}

			editor.$area.html(content);
			$text[0].value = "";
			$text[1].value = "";
			editor.hidePopups();
			editor.focus();
			editor.refresh();

		});

	}

})(jQuery);


(function($) {

	// Define the maximize button
	$.cleditor.buttons.maximize = {
		name: "maximize",
		image: "maximize.gif",
		title: "Maximize",
		command: "",
		popupName: "",
		buttonClick: maximizeButtonClick
	};

	$.cleditor.defaultOptions.controls =
	$.cleditor.defaultOptions.controls.replace(" icon", " icon maximize");

	function maximizeButtonClick(e, data) {

		var editor = data.editor;
		if (!editor.options.originalWidth) {
			editor.options.originalWidth = editor.options.width;
			editor.options.originalHeight = editor.options.height;
			editor.options.maximize = true;


		}

		if (editor.options.maximize == true) { // check current width status

			//$("body").css({ overflow: "hidden" })
			/*editor.$main.css({ position: "absolute", top: 0, left: 0, width: $
(window).width() - 4, height: $(window).height() - 4 });
editor.$main.css('z-index', '1002');*/
			editor.$main.addClass('cloverlay');
			//editor.$main.offset({ top: 0, left: 0 });
			editor.$main.width($(window).width() - 4);
			editor.options.width = $(window).width() - 4;
			editor.$main.height($(window).height() - 4);
			editor.options.height = $(window).height() - 4;
			editor.options.maximize = false;

		} else { // check current width status

			//$("body").css({ overflow: "auto" })
			editor.$main.removeClass('cloverlay');
			editor.$main.css({
				width: editor.options.originalWidth, 
				height: editor.options.originalHeight
			});
			editor.$main.width(editor.options.originalWidth);
			editor.options.width = editor.options.originalWidth;
			editor.$main.height(editor.options.originalHeight);
			editor.options.height = editor.options.originalHeight;
			editor.options.maximize = true;

		}

		editor.updateTextArea();
		editor.refresh();
		editor.focus(); 
		return false;

	}
})(jQuery); 

(function($) {
	// Define the table button
	$.cleditor.buttons.altimage = {
		name: "altimage",
		image: "altimage.gif",
		title: "Insert Image",
		command: "inserthtml",
		popupName: "altimage",
		popupClass: "cleditorPrompt",
		popupContent: 'Enter image URL:<br><input type=text class=fileurl value="http://" size=35><br>Enter thumb URL:<br><input type=text class=thumbeurl value="http://" size=35><br>'+
		'Alt/Title<br><input type=text class=filetitle size=35><br><br>'+
		'Width <input type=text class=filew maxlength=3 size=3 /> Height <input type=text class=fileh maxlength=3 size=3 /><br>'+
		'Thumb Width <input type=text class=thumbw maxlength=3 size=3 /> Thumb Height <input type=text class=thumbh maxlength=3 size=3 /><br>'+
		'<br><input type=button class="file" value="Upload" /> <input type=button class="view" value="View" /> <input class="send" type=button value="Submit">',
		buttonClick: altimageButtonClick
	};

	// Add the button to the default controls
	$.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
	.replace("image ", "altimage ");

	// Table button click event handler
	function altimageButtonClick(e, data) {

		// Wire up the submit button click event handler



		$(data.popup).children(":button.view")
		.unbind("click")
		.bind("click", function() {
			var $text = $(data.popup).find(":text.fileurl");
			($text.val().length >0 ) ? window.open($text.val()) : alert("Enter URL of image to view");
			return false;
		});
		$(data.popup).children(":button.file")
		.upload( {
			name: '12w',
			autoSubmit: false,
			action: ocupath,
			method: 'post',
			onSelect: function() {
				var file = this.filename();
				var ext = (/[.]/.exec(file)) ? /[^.]+$/.exec(file.toLowerCase()) : '';
				if(!(ext && /^(jpg|png|jpeg|gif|zip|rar)$/.test(ext))){
					alert('Invalid file extension');
					return;
				}
				this.params({
					x: $("input[name='x'][type='hidden']").eq(0).val(), 
					width: $(data.popup).find(":text.filew").eq(0).val(),
					height: $(data.popup).find(":text.fileh").eq(0).val(),
					thwidth: $(data.popup).find(":text.thumbw").eq(0).val(),
					thheight: $(data.popup).find(":text.thumbh").eq(0).val(),
					filetitle: $(data.popup).find(":text.filetitle").eq(0).val()			
				});
				this.submit();
			},
			onComplete: function(response) { 
				if(response.length <= 0)
					return;
						
				response	= eval("(" + response + ")");
				if(response.error && response.error.length > 0)
					alert(response.error);
				else
				{
					$(data.popup).find(":text.fileurl").val((response.file && response.file.length > 0) ? response.file : '');
					$(data.popup).find(":text.thumbeurl").val((response.thumb && response.thumb.length > 0) ? response.thumb : '');
				}
			}
		});
		$(data.popup).children(":button.send")
		.unbind("click")
		.bind("click", function() {
			var editor = data.editor;
			// Insert the image or link if a url was entered
			var $text = $(data.popup).find(":text.fileurl"),
			url = $.trim($text.val());
			var $thtext = $(data.popup).find(":text.thumbeurl"),
			thurl = $.trim($thtext.val());			
			if (url !== "" && url !== "http://" && url.length > 10){
				var ext = (/[.]/.exec(url)) ? /[^.]+$/.exec(url.toLowerCase()) : '';
				if(thurl !== "" && thurl !== "http://" && thurl.length > 10)
					url = '<a href="'+url+'"><img alt="'+$(data.popup).find(":text.filetitle").val()+'" src="'+thurl+'" /></a>';	
				else
				{
					if(/^(zip|rar)$/.test(ext))
						url = '<a href="'+url+'">'+url+'</a>';
					else
						url = '<img alt="'+$(data.popup).find(":text.filetitle").val()+'" src="'+url+'" />';
				}
				editor.execCommand(data.command, url, null, data.button);
			}
			else
			{
				editor.showMessage("Empty url", data.button);
				return;
			}

			// Reset the text, hide the popup and set focus
			$text.val("http://");
			$thtext.val("http://");
			editor.hidePopups();
			editor.focus();

		});

	}

})(jQuery);