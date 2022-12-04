<?php
//	Connexion à la base de données
  
    $dbh = new PDO('mysql:host=localhost;dbname=tachycard',
    'root','');
    // http://127.0.0.1/tachycard/tachycard_app/initialistaion_pwd.php?cle=xxxxxxxxxxxxxxxxxx&email=test@gmail.com
        if(isset($_POST["submit"]))
    {

        if(isset($_GET['cle']) && isset($_GET['email']) ){
            $cle=$_GET['cle'];
            $email=$_GET['email'];
            
            
            if(isset($_POST["pass1"]) && isset($_POST["confirm_pass1"]))
            {
                
                $pass1 = $_POST["pass1"];
                $confirm_pass1=$_POST["confirm_pass1"];
                if($pass1 === $confirm_pass1){
                    $pass=password_hash($pass1, PASSWORD_DEFAULT); 
                }
                if(!empty($_POST)){
                    $upd_pw = $dbh->prepare("UPDATE users SET `password`=? WHERE `email`=?");
                    $upd_pw->execute([$pass,$email]);
                }
            }
            header('location:index.php');

        }

        else{
            exit("Page introuvable");

        }
    }
?>
   <!DOCTYPE html>
<html lang="en">

<head>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="Traçabilité simplifiée et sécurisée des dispositifs médicaux implantables">
		<meta name="author" content="PactDigital">
		<title>Tachycard | Traçabilité simplifiée et sécurisée des dispositifs médicaux implantables</title>
		<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<link href="css/stylelogin.css" rel="stylesheet">
		<link href="css/vendors.css" rel="stylesheet">
    	
</head>
<body>
	
	<div id="preloader">
		<div data-loader="circle-side"></div>
	</div>

	<div class="container-fluid p-0">
	    <div class="row no-gutters row-height">
	        <div class="col-lg-6 background-image " data-background="url(img/background-tachycard.jpg)">
				
	            <div class="content-left-wrapper opacity-mask" data-opacity-mask="rgba(255, 255, 255, 0)">
	                
	                

	                <div class="text-left">
	                <div class="intro-block">
						
		
					</div>
	                </div>
	            </div>
	        </div>
	        <div class="col-lg-6 d-flex flex-column content-right">
	            <div class="container my-auto py-5">
	                <div class="row">
	                    <div class="col-lg-9 col-xl-7 mx-auto">
							<a href="#"><img src="img/logo_noir.svg" width="181" height="81" style="text-align: center; width: 200px; display: block; margin-left: auto; margin-right: auto; margin-bottom: 35px;"  alt=""></a>
							<div class="panel header_2 center">
								<figure>
								
								</figure>	
	                        
								<form class="input_style_2" method="POST">
                                    <div class="form-group">
										<label for="password">Mot de passe</label>
										<input type="password" name="pass1" id="password" class="form-control">
									</div>
									<div class="form-group">
										<label for="password">confirmer le Mot de passe</label>
										<input type="password" name="confirm_pass1" id="password" class="form-control">
									</div>
                                    <p class="text-center mt-3 mb-0">Réinitialiser votre mot de passe par un nouveau </p>
									<input type="submit" name="submit" class="btn_1 full-width" value="Valider">
								</form>
								
	                    	</div>
						</div>
	                </div>
	            </div>
	            <div class="container pb-3 copy" style="font-size:12px;">© 2022 Tachycard - All Rights Reserved | by Pact Digital</div>
	        </div>
	    </div>
	</div> 

    <script src="js/common_scripts.js"></script>
	<script src="js/common_func.js"></script>

</body>
</html>
