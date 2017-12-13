<?php
$download_dir = "downloads/";
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = $download_dir . mktime() . ".png";
$success = file_put_contents($file, $data);
print $success ? $file : 'Unable to save the file.';
?>
