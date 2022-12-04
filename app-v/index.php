<?php

error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED);
ini_set('display_errors', 1);

$configs = include('../env.php');
$mode = ""; //"_min" pour la prod ou "" pour dev
$version = "6.0";
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>

    <link rel="stylesheet"  href="css/styles.css?<?=$version;?>" media="screen"/>
    <link rel="stylesheet"  href="css/print.css?<?=$version;?>" media="print">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="js/jquery-3.5.0-min.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/picker.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/picker.date.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/picker.time.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/chart-2.7.3.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/moments.min-2.29.3.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/init_moment<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/notification<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/uluru<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/users<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/centers<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/cards<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/materials<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/api<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/logs<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/qrcode.min.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/connect<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/reset_pw<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <script src="js/update_pw<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <script src="js/register<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <script src="js/menu<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/find_card<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/account<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/patient_card<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/worklist<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <script src="js/list_Implant<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <script src="js/intervention_Programmee<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <script src="js/patient_card<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <script src="js/worklist<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <!--STENT -->

    <!--FRONT BUILDER-->
    <script src="js/front-builder/renderer<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/front-builder/form_connect_builder<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/front-builder/form_register_builder<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <script src="js/front-builder/menu_builder<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/front-builder/new_card_builder<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/front-builder/users_builder<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/front-builder/generic_function<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/front-builder/search_card_builder<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/front-builder/otp_builder<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/front-builder/implant_builder<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <script src="js/front-builder/work_builder<?= $mode; ?>.js?<?= $version; ?>" type="text/javascript"></script>
    <!--FORM BUILDER-->
    <script src="js/front-builder/form_builder<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>

    <!--EVENTS-->
    <script src="js/events/menu_events<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/events/new_card_events<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/events/users_events<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/events/app_events<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>
    <script src="js/events/otp_events<?=$mode;?>.js?<?=$version;?>" type="text/javascript"></script>

    <!--INCLUDE BOOTSRAP-->
    <!--script src="bootstrap/js/bootstrap.min.js?<?=$version;?>"></script>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css"-->





       
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="Traçabilité simplifiée et sécurisée des dispositifs médicaux implantables">
		<meta name="author" content="PactDigital">
		<title>Tachycard | Traçabilité simplifiée et sécurisée des dispositifs médicaux implantables</title>
		<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<link href="css/stylelogin.css" rel="stylesheet">
		<link href="css/vendors.css" rel="stylesheet">



        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
       
        <link href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css" rel="stylesheet" />
      
        <link href="css/styleshome.css" rel="stylesheet" />

        <link rel="stylesheet" type="text/css" href="css/default.css?<?=$version;?>" />
		<link rel="stylesheet" type="text/css" href="css/component.css?<?=$version;?>" />
		<script src="js/modernizr.custom.js?<?=$version;?>"></script>
</head>
<body>


<div id="app">
<div id="hedear-menu"  style="display:none;">
<a class="menu-toggle rounded" href="#"><i class="fas fa-bars"></i></a>
        <nav id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand home-page"><a href="#page-top" style="color:#ffb90b; font-weight: 700;">TACHYCARD</a></li>
                <li class="sidebar-nav-item  home-page"><a href="#page-top">Acceuil</a></li>
                <li class="sidebar-nav-item item 1 3 showCard"><a href="#about">Nouvelle carte</a></li>
                <li class="sidebar-nav-item item 1 3 worklist"><a href="#about">Programmation</a></li>
                <li class="sidebar-nav-item item 2 showImplant"><a href="#">Mes Implants</a></li>
                    <li class="sidebar-nav-item item 2 showIntervention"><a href="#">Mon Intervention</a></li>
                <li class="sidebar-nav-item item 3 4 showUserList"><a href="#page-top">Utilisateurs</a></li>
                <li class="sidebar-nav-item item 1 3 findCard"><a href="#services">Recherche carte</a></li>
                <!-- <li class="sidebar-nav-item item 2 showAllPatientCard"><a href="#portfolio">Liste des cartes</a></li> -->
                <li class="sidebar-nav-item item 2 1 3 showAccount"><a href="#portfolio">Mon compte</a></li>
                <li class="sidebar-nav-item item 3 1 2 unConnect"><a href="javascript:void(0);" onclick="disco();">Deconnexion</a></li>
                <li class="sidebar-nav-item"><a href="#contact">Site Web</a></li>
            </ul>
</nav>
</div>
    <div id="main" style="width:99%">
    </div>
    <div id="page-top" style="display:none;">
<a class="logo float-start m-4 " href="#"><img src="img/logo.png" /></a>
  
       
      
     
        <header class="masthead d-flex align-items-center">
            <div class="container px-4 px-lg-5 text-center">
				<div class="title-header">
					<h1 class="mb-1 mt-4" style="color:#ffb90b;">Bienvenue</h1>
					<h3 class="mb-4"><em id="connected_user">M. François MASSIN</em></h3>
				</div>
                <div class="main clearfix">
                    <nav id="menu" class="nav">					
                        <ul id="mainMenuUl">
                        <li class="item 1 3 showCard">
                                <a href="#">
                                    <span class="icon"> 
                                        <i aria-hidden="true" class="icon-credit-card"></i>
                                    </span>
                                    <span>Nouvelle carte</span>
                                </a>
                            </li>
                            <li class="item 3 4 showUserList">
                                <a href="#">
                                    <span class="icon">
                                        <i aria-hidden=" " class="icon-user"></i>
                                    </span>
                                    <span>Utilisateurs</span>
                                </a>
                            </li>
                            
                            <li class="item 1 3 findCard">
                                <a href="#">
                                    <span class="icon">
                                        <i aria-hidden="true" class="icon-magnifier"></i>
                                    </span>
                                    <span>Recherche carte</span>
                                </a>
                            </li>
                            <!-- <li class="item 2 showAllPatientCard">
                                <a href="#">
                                    <span class="icon">
                                        <i aria-hidden="true" class="icon-calendar"></i>
                                    </span>
                                    <span>Liste des cartes</span>
                                </a>
                            </li> -->
                            <li class="item 1 3 worklist">
                                <a href="#">
                                    <span class="icon">
                                        <i aria-hidden="true" class="icon-calendar"></i>
                                    </span>
                                    <span>Programmation</span>
                                </a>
                            </li>
                            <li class="item 2  showImplant">
                                <a href="#">
                                    <span class="icon">
                                        <i aria-hidden="true" class="icon-user"></i>
                                    </span>
                                    <span>Mes Implants</span>
                                </a>
                            </li> 
                            <li class="item 2 showIntervention">
                                <a href="#">
                                    <span class="icon">
                                        <i aria-hidden="true" class="icon-user"></i>
                                    </span>
                                    <span>Mon Intervention</span>
                                </a>
                            </li>
                            <li class="item 2 1 3 showAccount">
                                <a href="#">
                                    <span class="icon">
                                        <i aria-hidden="true" class="icon-settings"></i>
                                    </span>
                                    <span>Mon compte</span>
                                </a>
                            </li>
                            <li class="item 3 1 2" >
                                <a href="javascript:void(0);" onclick="disco();">
                                    <span class="icon">
                                        <i aria-hidden="true" class="icon-logout"></i>
                                    </span>
                                    <span>Deconnexion</span>
                                </a>
                            </li>
                            
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        <div class="container">	
		</div>
      
        <footer class="footer text-center">
            <div class="container px-4 px-lg-5">
                <p class="text-muted small mb-0">&copy; 2022 Tachycard - All Rights Reserved | by Pact Digital</p>
            </div>
        </footer>
        <a class="scroll-to-top rounded" href="#page-top"><i class="fas fa-angle-up"></i></a>
</div>
    </div>
    <!--?php require("footer.inc.php"); ?-->
   <?php require("loading.inc.php"); ?>

</div>


<div id="notification"></div>


<script>
        function disco(){
                
                uluru.unconnect();
                return false;
        }

    $(function () {  
        $(document).keydown(function (e) {  
            return (e.which || e.keyCode) != 116;  
        });  
    });  
    $(document).ready(function () {

        // INSTANCE COMPTEUR
        uluru = new Uluru({
            debug: true,
            mode: "<?php echo $configs["mode_app"]; ?>",
            record : false,
            api: {
                use_token: true,
                token: " ",
                generic_token: " ",
                // url: "https://uluru.neore.fr/api"
                // url: "http://127.0.0.1/AlternanceTachycard/uluru/api"
                url : "<?php echo $configs["absolute_path_api"]; ?>"
            },
            user: false,
            

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
<script src="js/common_scripts.js"></script>
<script src="js/common_func.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>


<script src="js/scripts.js"></script>
<script>

var changeClass = function (r,className1,className2) {
    var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");
    if( regex.test(r.className) ) {
        r.className = r.className.replace(regex,' '+className2+' ');
    }
    else{
        r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),' '+className1+' ');
    }
    return r.className;
};  


document.getElementById('menutoggle').onclick = function() {
    changeClass(this, 'navtoogle active', 'navtoogle active');
}


document.onclick = function(e) {
    var mobileButton = document.getElementById('menutoggle'),
        buttonStyle =  mobileButton.currentStyle ? mobileButton.currentStyle.display : getComputedStyle(mobileButton, null).display;

    if(buttonStyle === 'block' && e.target !== mobileButton && new RegExp(' ' + 'active' + ' ').test(' ' + mobileButton.className + ' ')) {
        changeClass(mobileButton, 'navtoogle active', 'navtoogle active');
    }
}
</script>



</body>
</html>