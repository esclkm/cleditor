<?php

/* ====================
  [BEGIN_COT_EXT]
  Hooks=ajax
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
require_once cot_incfile('uploads');
require_once './datas/extensions.php';
if (!function_exists(cot_thumb))
{

	/**
	 * Creates image thumbnail
	 *
	 * @param string $source Original image path
	 * @param string $target Thumbnail path
	 * @param int $width Thumbnail width
	 * @param int $height Thumbnail height
	 * @param string $resize resize options: crop auto width height
	 * @param int $quality JPEG quality in %
	 */
	function cot_thumb($source, $target, $width, $height, $resize = 'crop', $quality = 85)
	{
		$ext = strtolower(pathinfo($source, PATHINFO_EXTENSION));
		list($width_orig, $height_orig) = getimagesize($source);
		$x_pos = 0;
		$y_pos = 0;

		if ($resize == 'crop')
		{
			$newimage = imagecreatetruecolor($width, $height);
			$width_temp = $width;
			$height_temp = $height;

			if ($width_orig / $height_orig > $width / $height)
			{
				$width = $width_orig * $height / $height_orig;
				$x_pos = -($width - $width_temp) / 2;
				$y_pos = 0;
			}
			else
			{
				$height = $height_orig * $width / $width_orig;
				$y_pos = -($height - $height_temp) / 2;
				$x_pos = 0;
			}
		}
		else
		{
			if ($resize == 'auto')
			{
				if ($width_orig < $width && $height_orig < $height)
				{
					$width = $width_orig;
					$height = $height_orig;
				}
				else
				{
					if ($width_orig / $height_orig > $width / $height)
					{
						$height = $width * $height_orig / $width_orig;
					}
					else
					{
						$width = $height * $width_orig / $height_orig;
					}
				}
			}

			if ($resize == 'width')
			{
				if ($width_orig > $width)
				{
					$height = $height_orig * $width / $width_orig;
				}
				else
				{
					$width = $width_orig;
					$height = $height_orig;
				}
			}

			if ($resize == 'height')
			{
				if ($height_orig > $height)
				{
					$width = $width_orig * $height / $height_orig;
				}
				else
				{
					$width = $width_orig;
					$height = $height_orig;
				}
			}
			$newimage = imagecreatetruecolor($width, $height);//
		}

		switch ($ext)
		{
			case 'gif':
				$oldimage = imagecreatefromgif($source);
				break;
			case 'png':
				imagealphablending($newimage, false);
				imagesavealpha($newimage, true);
				$oldimage = imagecreatefrompng($source);
				break;
			default:
				$oldimage = imagecreatefromjpeg($source);
				break;
		}

		imagecopyresampled($newimage, $oldimage, $x_pos, $y_pos, 0, 0, $width, $height, $width_orig, $height_orig);

		switch ($ext)
		{
			case 'gif':
				imagegif($newimage, $target);
				break;
			case 'png':
				imagepng($newimage, $target);
				break;
			default:
				imagejpeg($newimage, $target, $quality);
				break;
		}

		imagedestroy($newimage);
		imagedestroy($oldimage);
	}

}

$dir = $cfg['plugin']['cleditor']['filepath'];

$width = cot_import('width', 'P', 'INT');
$height = cot_import('height', 'P', 'INT');
$thwidth = cot_import('thwidth', 'P', 'INT');
$thheight = cot_import('thheight', 'P', 'INT');
$filetitle = cot_import('filetitle', 'P', 'TXT');

$file = current($_FILES); // we handle the only file in time

if ($file['error'] == UPLOAD_ERR_OK)
{
	$file_ext = mb_strtolower(end(explode(".", $file["name"])));
	if (!in_array($file_ext, array('jpg', 'jpeg', 'png', 'gif', 'zip', 'rar')))
	{
		$file['error'] = 'Invalid file extension';
	}

	$fname = cot_safename($file["name"], true, '_'.$usr['id']);

	if (cot_file_check($file['tmp_name'], $fname, $file_ext) != '1')
	{
		$file['error'] = 'Invalid file extension';
	}
	if ($file['error'] == UPLOAD_ERR_OK && in_array($file_ext, array('zip', 'rar')))
	{
		if (file_exists("{$dir}/files/{$fname}"))
		{
			$fname = cot_safename($file["name"], true, '_'.time().'_'.$usr['id']);
		}
		if (@move_uploaded_file($file['tmp_name'], "{$dir}/files/{$fname}"))
		{
			$file['error'] = ''; //no errors, 0 - is our error code for 'moving error'
			$filename = "{$dir}/files/{$fname}";
		}
	}
	if ($file['error'] == UPLOAD_ERR_OK && in_array($file_ext, array('jpg', 'jpeg', 'png', 'gif')))
	{
		if (file_exists("{$dir}/{$fname}"))
		{
			$fname = cot_safename($file["name"], true, '_'.time().'_'.$usr['id']);
		}
		list($iwidth, $iheight, $itype, $iattr) = getimagesize($file['tmp_name']);
		if ($iwidth > (int)$cfg['plugin']['cleditor']['maxwidth'] || (int)$iheight > $cfg['plugin']['cleditor']['maxheight'] || (int)$width > 0 || (int)$height > 0)
		{
			$width = (int)$width > 0 ? (int)$width : (int)$cfg['plugin']['cleditor']['maxwidth'];
			$height = (int)$height > 0 ? (int)$height : (int)$cfg['plugin']['cleditor']['maxheight'];
			cot_thumb($file['tmp_name'], "{$dir}/{$fname}", $width, $height, $cfg['plugin']['cleditor']['crop']);
			$file['error'] = '';
			$filename = "{$dir}/{$fname}";
		}
		else
		{
			if (@move_uploaded_file($file['tmp_name'], "{$dir}/{$fname}"))
			{
				$file['error'] = ''; //no errors, 0 - is our error code for 'moving error'
				$filename = "{$dir}/{$fname}";
			}
		}
		if((int)$thwidth > 0 &&(int)$thheight>0)
		{
			// IMAGE files
			cot_thumb("{$dir}/{$fname}", "{$dir}/thumbs/{$fname}", $thwidth, $thheight, $cfg['plugin']['cleditor']['crop']);
			$thumbname = "{$dir}/thumbs/{$fname}";
		}
	}
}

$arr = array(
	'error' => $file['error'],
	'file' =>  '/'.preg_replace('(^[./]*)', '', $filename),
	'tmpfile' => $file['tmp_name'],
	'size' => $file['size'],
	'thumb' => '/'.preg_replace('(^[./]*)', '', $thumbname)
);

echo json_encode($arr);
?>