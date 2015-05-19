/*
* @name: CLEDITOR ybembedding Plugin
* @version: 1.5
* @author: Logander4 Tutorials
* @author_email: logander4@icqmail.com
* @author_website: http://log4-tutorials.de
* @description: This plugin added a button, that implements a function to generate a youtube-embedding text!
* @toDo: add "ybembedding" to your controlslist!
*/

/* Changelog
v1.5
->Stable Version
->Added two text fields for the width and height!
v1.0
->Release Candidate 1
->General Embedding Code generating function
*/
(function($) {
      
 
  // Define the hello button
  $.cleditor.buttons.ybembedding = {
    name: "ybembedding",
    image: "ybembedding.gif",
    title: "Add a YouTube Video",
    command: "inserthtml",
    popupName: "ybembedding",
    popupClass: "cleditorPrompt",
    popupContent: "Enter the YouTube Video ID:<br><input type='text' size='10' id='ybid'><br /><br />Width: <input type='text' size='3' value='480' id='width' /><br /><br /> Height: <input type='text' size='3' id='height' value='385' /><br /><input type='button' value='Add'>",
    buttonClick: ybembeddingClick
  };
      
   // Add the button to the default controls
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
    .replace("image ", "image ybembedding ");
 
  // Add the button to the default controls before the bold button
  /* $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
     .replace("unlink ", "unlink ybembedding"); */
     
  // Handle the hello button click event
  function ybembeddingClick(e, data) {
      
 
    // Wire up the submit button click event
    $(data.popup).children(":button")
      .unbind("click")
      .bind("click", function(e) {
      
 
        // Get the editor
        var editor = data.editor;
      
 
        // Get the entered name
        var ybId = $(data.popup).find("#ybid").val();
        var width = $(data.popup).find("#width").val();
        var height = $(data.popup).find("#height").val();
      
 
        // Insert some html into the document
        var html = '<object width="'+width+'" height="'+height+'"><param name="movie" value="http://www.youtube.com/v/'+ybId+'?fs=1&amp;hl=de_DE"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'+ybId+'?fs=1&amp;hl=de_DE" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+width+'" height="'+height+'"></embed></object>';
        editor.execCommand(data.command, html, null, data.button);
		$('body').append('<div id="ybembedding_message" style="position: fixed; top: 40%; left: 40%; width: 160px; height: 130px; border: 3px solid lightgray; background-color: #b3c3b2;"><b>Code successfully added!</b><br />ID: '+ybId+'<br /> Width: '+width+'<br /> Height: '+height+'<br /> <button onclick="$(\'#ybembedding_message\').remove();">Okay</button></div>');
 
        // Hide the popup and set focus back to the editor
        editor.hidePopups();
        editor.focus();
      
 
      });
      
 
  }
      
 
})(jQuery);
