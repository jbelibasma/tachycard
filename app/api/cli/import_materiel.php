<?php

/*
 * Script d'importation des nouvelles données PHAST dans la base de données.
 * Usage : php import_materiel.php
 *
 * Description : Le script liste tous les fichiers contenus dans le dossier $dir_latest,
 * vide chaque table correspondant à un nom de fichier et importe les données.
 *
 * En post traitement : certaines tables sont mises à jour afin de formater
 * quelques données incohérentes ou inadaptées.
 *
 */

// CONNECTION MYSQL
$my = new mysqli("localhost", "uluru", "uluru_12312!", "uluru");

// INIT
//$dir_latest = "/www/uluru/api/data/phast";
$dir_latest = "../data/phast/UTF8";
//$dir_imported = "/www/uluru/api/data/phast/imported";
$reject = ["update.xml", "LISEZMOI.txt", "DISTRIB.TXT"];

// SCAN FILE
$files = scandir($dir_latest);
array_shift($files);
array_shift($files);



//var_dump($files);

// LOOP ON FILE FOR IMPORT
foreach ($files as $file) {

    if (!in_array($file, $reject)) {

        // CONVERT TO UTF8
        //file_put_contents("$dir_latest/$file.utf8.txt", utf8_encode(file_get_contents("$dir_latest/$file")));


        // SET TABLE
        $table = substr($file, 0, -4);

        // TRUNCATE
        echo "TRUNCATE TABLE $table.....................";
        $sql = "TRUNCATE TABLE $table";
        $my->query($sql);
        if ($my->errno != 0) {
            echo "SQL ERROR\n";
            echo $sql . "\n";
            echo $my->error . "\n";
            exit();
        }
        echo "done\n";


        // IMPORT
        echo "IMPORT INTO TABLE $table..................";
        $sql = "LOAD DATA LOCAL INFILE '$dir_latest/$file' INTO TABLE $table FIELDS TERMINATED BY '|' LINES TERMINATED BY '\n'";
        $my->query($sql);
        if ($my->errno != 0) {
            echo "SQL ERROR\n";
            echo $sql . "\n";
            echo $my->error . "\n";
            exit();
        }

        // COUNT
        $sql = "SELECT COUNT(*) as counter FROM $table";
        $result = $my->query($sql);
        if ($my->errno != 0) {
            echo "SQL ERROR\n";
            echo $sql . "\n";
            echo $my->error . "\n";
            exit();
        }
        $row = $result->fetch_object();
        echo $row->counter . " rows imported\n";

        echo "\n";

    }

}


// POST TRAITEMENT
// Remplacement des noms des sociétés

$sql = "UPDATE SOCLIB SET SocLib1='ABBOTT Medical' WHERE SocLib1='ABBOTT Medical France SAS (ex SAINT JUDE)'";
$result = $my->query($sql);
if ($my->errno != 0) {
    echo "SQL ERROR\n";
    echo $sql . "\n";
    echo $my->error . "\n";
    exit();
}
echo $my->affected_rows . " rows affected\n";

$sql = "UPDATE SOCLIB SET SocLib1='BOSTON Scientific' WHERE SocLib1='BOSTON SCIENTIFIC / SCIMED'";
$result = $my->query($sql);
if ($my->errno != 0) {
    echo "SQL ERROR\n";
    echo $sql . "\n";
    echo $my->error . "\n";
    exit();
}
echo $my->affected_rows . " rows affected\n";

$sql = "UPDATE SOCLIB SET SocLib1='BIOTRONIK' WHERE SocLib1='BIOTRONIK France'";
$result = $my->query($sql);
if ($my->errno != 0) {
    echo "SQL ERROR\n";
    echo $sql . "\n";
    echo $my->error . "\n";
    exit();
}
echo $my->affected_rows . " rows affected\n";

$sql = "UPDATE SOCLIB SET SocLib1='MEDTRONIC' WHERE SocLib1='MEDTRONIC France'";
$result = $my->query($sql);
if ($my->errno != 0) {
    echo "SQL ERROR\n";
    echo $sql . "\n";
    echo $my->error . "\n";
    exit();
}
echo $my->affected_rows . " rows affected\n";


echo "\n\nEND OF GAME\n";


