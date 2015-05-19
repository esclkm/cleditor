<?php
/* ====================
[BEGIN_COT_EXT]
Code=cleditor
Name=CLEditor
Category=editor-parser
Description=Plain-source BBcode/HTML editor using jQuery. Only one content editor should be enabled or there may be conflicts.
Version=0.9.3
Date=2011-dec-16
Author=Chris Landowski, Premium Software, http://premiumsoftware.net/cleditor/index.html
Copyright=Copyright (C) 2010 Chris Landowsk
Notes=MIT License or the GNU General Public License (GPL) Version 2. Plain BBcode/HTML content source editor using jQuery. Only one content editor should be enabled or there may be conflict
SQL=
Auth_guests=R
Lock_guests=12345A
Auth_members=RW
Lock_members=12345A
[END_COT_EXT]

[BEGIN_COT_EXT_CONFIG]
editor=01:string:::editor
medi=02:string::bold italic altimage link unlink | undo redo:medi
mini=03:string::bold italic link:mini
filepath=04:string::/datas/uploaded:filepath
crop=05:select:crop,height,width,auto:auto:croptype
maxwidth=06:string::800:max width
maxheight=07:string::600:max height
[END_COT_EXT_CONFIG]
==================== */

/**
 * CLEditor 
 *
 * @package CLEditor 
 * @version 0.7.0
 * @author esclkm
 * @copyright Copyright (c) esclkm 2008-2011
 * @license BSD
 */

defined('COT_CODE') or die('Wrong URL');

?>