<?php
// INIT
//$dir_latest = "/www/uluru/api/data/phast";
$dir_latest = "../data/phast";
$dir_utf8 = "../data/phast/UTF8";
//$dir_imported = "/www/uluru/api/data/phast/imported";
$reject = ["update.xml", "LISEZMOI.txt", "DISTRIB.TXT","UTF8"];

// SCAN FILE
$files = scandir($dir_latest);
array_shift($files);
array_shift($files);

if (!file_exists($dir_utf8)) {
    if (!mkdir($dir_utf8, 0777, true)) {
        die('Échec lors de la création des dossiers...');
    }
}


//var_dump($files);

// LOOP ON FILE FOR IMPORT
foreach ($files as $file) {

    if (!in_array($file, $reject)) {
        echo "CONVERT $file TO UTF8 \n";
        // CONVERT TO UTF8
        file_put_contents("$dir_latest/utf8/$file", utf8_encode(file_get_contents("$dir_latest/$file")));
    }

}

