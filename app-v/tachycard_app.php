<?php

error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED);
ini_set('display_errors', 1);
/*
// GET USER
$my = new mysqli("localhost", "uluru", "uluru_12312!", "uluru");
$my->query("SET NAMES utf8");
$sql = "SELECT *, users.id as id_users FROM users, centres WHERE users.id_centre=centres.id AND users.email='" . $_SERVER['PHP_AUTH_USER'] . "'";
$result = $my->query($sql);
$config = $result->fetch_object();
$realname = $config->realname;
*/

$configs = include('../env.php');

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Uluru</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>

    <link rel="stylesheet" rev="stylesheet" href="css/styles.css" media="screen"/>
    <link rel="stylesheet" rev="stylesheet" href="css/print.css" media="print"/>

    <script src="js/jquery-3.3.1-min.js" type="text/javascript"></script>
    <script src="js/picker.js" type="text/javascript"></script>
    <script src="js/picker.date.js" type="text/javascript"></script>
    <script src="js/picker.time.js" type="text/javascript"></script>
    <script src="js/chart-2.7.3.js" type="text/javascript"></script>
    <script src="js/moments.min-2.17.1.js" type="text/javascript"></script>
    <script src="js/init_moment.js" type="text/javascript"></script>
    <script src="js/notification.js" type="text/javascript"></script>
    <script src="js/uluru.js" type="text/javascript"></script>
    <script src="js/users.js" type="text/javascript"></script>
    <script src="js/centers.js" type="text/javascript"></script>
    <script src="js/cards.js" type="text/javascript"></script>
    <script src="js/materials.js" type="text/javascript"></script>
    <script src="js/api.js" type="text/javascript"></script>
    <script src="js/logs.js" type="text/javascript"></script>
    <script src="js/qrcode.min.js" type="text/javascript"></script>
    <script src="js/connect.js" type="text/javascript"></script>
    <script src="js/menu.js" type="text/javascript"></script>
    <script src="js/find_card.js" type="text/javascript"></script>
    <script src="js/account.js" type="text/javascript"></script>
    <script src="js/patient_card.js" type="text/javascript"></script>
<!--STENT -->
<!--    <script src="js/front-builder/stent_builder.js" type="text/javascript"></script>-->
<!--    <script src="js/stent/stent.js" type="text/javascript"></script>-->
<!--FRONT BUILDER-->
    <script src="js/front-builder/renderer.js" type="text/javascript"></script>
    <script src="js/front-builder/form_connect_builder.js" type="text/javascript"></script>
    <script src="js/front-builder/menu_builder.js" type="text/javascript"></script>
    <script src="js/front-builder/new_card_builder.js" type="text/javascript"></script>
    <script src="js/front-builder/users_builder.js" type="text/javascript"></script>
    <script src="js/front-builder/generic_function.js" type="text/javascript"></script>
    <script src="js/front-builder/search_card_builder.js" type="text/javascript"></script>
<!--FORM BUILDER-->
    <script src="js/front-builder/form_builder.js" type="text/javascript"></script>

<!--EVENTS-->
    <script src="js/events/menu_events.js" type="text/javascript"></script>
    <script src="js/events/new_card_events.js" type="text/javascript"></script>
    <script src="js/events/users_events.js" type="text/javascript"></script>
    <script src="js/events/app_events.js" type="text/javascript"></script>




    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

</head>
<body>


<div id="app">
<!--    --><?php //require("connect.inc.php"); ?>
    <?php require("header.inc.php"); ?>

    <div id="main">

<!--        --><?php //require("menu.inc.php"); ?>
<!--        --><?php //require("users.inc.php"); ?>
<!--        --><?php //require("account.inc.php"); ?>
<!--        --><?php //require("centers.inc.php"); ?>
<!--        --><?php //require("config.inc.php"); ?>
<!--        --><?php //require("cards.inc.php"); ?>
<!--        --><?php //require("materials.inc.php"); ?>
    </div>
    <?php require("footer.inc.php"); ?>
    <?php require("loading.inc.php"); ?>

</div>


<div id="notification"></div>


<script>

    $(document).ready(function () {

        // INSTANCE COMPTEUR
        uluru = new Uluru({
            debug: true,
            mode: "<?php echo $configs["mode"]; ?>",
            record : false,
            api: {
                use_token: true,
                token: "b8e38a7de82d5cbadf31ee97fea60164c7baed436e296b4d0b0715510a6f1e82",
                generic_token: "b8e38a7de82d5cbadf31ee97fea60164c7baed436e296b4d0b0715510a6f1e82",
                // url: "https://uluru.neore.fr/api"
                // url: "http://127.0.0.1/AlternanceTachycard/uluru/api"
                url : "<?php echo $configs["absolute_path_api"]; ?>"
            },
            user: false,
            /*user: {
                id_users: "<?php echo $config->id_users; ?>",
                prenom: "<?php echo $config->prenom; ?>",
                nom: "<?php echo $config->nom; ?>",
                realname: "<?php echo $config->realname; ?>",
                id_centre: "<?php echo $config->id_centre; ?>",
                nom_centre: "<?php echo $config->nom_centre; ?>",
                adresse1: "<?php echo $config->adresse1; ?>",
                adresse2: "<?php echo $config->adresse2; ?>",
                adresse3: "<?php echo $config->adresse3; ?>",
                code_postal: "<?php echo $config->code_postal; ?>",
                ville: "<?php echo $config->ville; ?>",
                pays: "<?php echo $config->pays; ?>"
            },
            centre: {
                id_centre: "<?php echo $config->id_centre; ?>",
                nom: "<?php echo $config->name; ?>",
                adresse1: "<?php echo $config->adresse1; ?>",
                adresse2: "<?php echo $config->adresse2; ?>",
                adresse3: "<?php echo $config->adresse3; ?>",
                code_postal: "<?php echo $config->code_postal; ?>",
                ville: "<?php echo $config->ville; ?>",
                pays: "<?php echo $config->pays; ?>",
                telephone: "<?php echo $config->tel; ?>"
            }*/

        });

        // INSTANCE NOTIFICATION
        notification = new Notification({
            container: "#notification",
            logs: uluru,
            delay: 3000
        });

        // AUTO
        //uluru.searchSN("sn1");


        // INIT MOMENT
        initMoment();

        // INIT PICKADATE IN FRENCH
        initPickADateFR();


        // PREVENT SCALE TOUCH ON SAFARI IOS
        document.addEventListener('touchmove', function (event) {
            event = event.originalEvent || event;
            if (event.scale > 1) {
                event.preventDefault();
            }
        }, false);


    });

</script>

</body>
</html>