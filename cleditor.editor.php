<?php
/* ====================
[BEGIN_COT_EXT]
Hooks=editor
[END_COT_EXT]
==================== */

/**
 * cleditor connector for Cotonti
 *
 * @package cleditor
 * @version 0.9.0
 * @author esclkm
 * @copyright Copyright (c) esclkm 2008-2011
 * @license BSD
 */

defined('COT_CODE') or die('Wrong URL');
global $lang;
// BBcode or HTML preset
$mkup_set = $sys['parser'] == 'bbcode' ? 'bbcode' : 'xhtml';

$mkup_lang = $cfg['plugins_dir']."/cleditor/lib/jquery.cleditor.$lang.js";
if (!file_exists($mkup_lang))
{
	$mkup_lang = $cfg['plugins_dir'].'/cleditor/lib/jquery.cleditor.en.js';
}
$cled_skin = cot_rc('code_rc_css_file', array('url' => $cfg['plugins_dir'] . '/cleditor/lib/jquery.cleditor.css'));
cot_rc_embed_footer('var ocupath = "./plug.php?r=cleditor";');

cot_rc_link_footer($mkup_lang); 
// Load head resources


cot_rc_link_footer($cfg['plugins_dir'] . '/cleditor/lib/jquery.cleditor.js');
cot_rc_link_footer($cfg['plugins_dir'] . '/cleditor/lib/jquery.cleditor.icon.min.js');
cot_rc_link_footer($cfg['plugins_dir'] . '/cleditor/lib/jquery.cleditor.advancedtable.min.js');
cot_rc_link_footer($cfg['plugins_dir'] . '/cleditor/lib/jquery.cleditor.ybembeddingv.js');
cot_rc_link_footer($cfg['plugins_dir'] . '/cleditor/lib/jquery.cleditor.maximize.js');
cot_rc_link_footer($cfg['plugins_dir'] . "/cleditor/lib/jquery.cleditor.{$mkup_set}.min.js");
cot_rc_link_footer($cfg['plugins_dir'] . "/cleditor/lib/jquery.ocupload-1.1.2.js");

cot_rc_embed_footer('$(document).ready(function() {
	$("textarea.editor").livequery( function(){$(this).cleditor({
		'.(empty($cfg['plugin']['cleditor']['editor']) ? '' : 'controls: "'.$cfg['plugin']['cleditor']['editor'].'",').'
	width:"99%",
	height:       "350" // height not including margins, borders or padding
	});});
	$("textarea.minieditor").livequery( function(){$(this).cleditor({
		  width:"99%",
		  height:       "70",
          controls:     // controls to add to the toolbar
                        "'.$cfg['plugin']['cleditor']['mini'].'"
        });});
	$("textarea.medieditor").livequery( function(){$(this).cleditor({
		  width:"99%",
		  height:       "120",
          controls:     // controls to add to the toolbar
                        "'.$cfg['plugin']['cleditor']['medi'].'"
        });});
});');

?>
