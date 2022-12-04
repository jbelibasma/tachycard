Uluru.prototype.connectionFormBuilder = function () {

    let content = "";
content += "<div id=\"connect\" class=\"visible\">";
	//content +="<div id=\"preloader\">";
	//content +="	<div data-loader=\"circle-side\"></div>";
	//content +="</div>";
	content +="<div class=\"container-fluid p-0\">";
	content +="    <div class=\"row no-gutters row-height\">";
	content +="        <div class=\"col-lg-6 background-image \" style=\"background-image: url('img/background-tachycard.jpg')\">";
	content +="            <div class=\"content-left-wrapper opacity-mask\" data-opacity-mask=\"rgba(255, 255, 255, 0)\">";
	content +="                <div class=\"text-left\">";
	content +="                <div class=\"intro-block\">";
	content +="				</div>";
	content +="                </div>";
	content +="            </div>";
	content +="        </div>";
	content +="        <div class=\"col-lg-6 d-flex flex-column content-right\">";
	content +="            <div class=\"container my-auto py-5\">";
	content +="                <div class=\"row\">";
	content +="                    <div class=\"col-lg-9 col-xl-7 mx-auto\">";
	content +="						<a href=\"#\"><img src=\"img/logo_noir.svg\" width=\"181\" height=\"81\" style=\"text-align: center; width: 200px; display: block; margin-left: auto; margin-right: auto; margin-bottom: 35px;\"  alt=\"\"></a>";
	content +="						<div class=\"panel header_2 center\">";
	content +="							<figure>";
	content +="							</figure>";		
	content +="                        <form  id=\"form_connect\" class=\"input_style_2 fl-form\" >";
	content +="                            <div class=\"form-group\">";
	content +="                                <label for=\"email_address\" class=\"fl-label\">Identifiant </label>";
	content +="                                <input type=\"email\" name=\"email\" id=\"email_address\" class=\"form-control\">";
	content +="                            </div>";
	content +="                            <div class=\"form-group\">";
	content +="                                <label for=\"password\" class=\"fl-label\">Mot de passe</label>";
	content +="                                <input type=\"password\" name=\"pass\" id=\"password\" class=\"form-control\">";
	content +="                            </div>";
	content +="                            <button type=\"submit\" class=\"btn_1 full-width\">Se connecter</button>";
	content +="                            <div class=\"clearfix mb-3\">";
	// content +="                                <div class=\"float-left\">";
	// content +="                                    <label class=\"container_check\">Se souvenir";
	// content +="                                        <input type=\"checkbox\">";
	// content +="                                        <span class=\"checkmark\"></span>";
	// content +="                                    </label>";
	// content +="                                </div>";
	content +="                                <div class=\"float-right\">";
	content +="                                    <a class=\"lostpass\" id=\"forgotpass\" href=\"javascript:void(0);\">Mot de passe perdu ? </a>";
	content +="                                </div>";
	content +="                            </div>";
	content +="                        </form>";
	content +="                        <p class=\"text-center mt-3 mb-0\">Vous n'avez pas de compte ?  <span id=\"new_account\" ><a href=\"#\" > &nbsp &nbsp S'inscrire</a></span></p>";
	content +="                    </div>";
	content +="				</div>";
	content +="                </div>";
	content +="            </div>";
	content +="            <div class=\"container pb-3 copy\" style=\"font-size:12px;\">© 2022 Tachycard - All Rights Reserved | by Pact Digital</div>";
	content +="        </div>";
	content +="    </div>";
	content +="</div>    ";
content +="<div/>";

content +="<script src=\"js/common_scripts.js\"></script>";
content +="<script src=\"js/common_func.js\"></script>";


    

    return content;
}
Uluru.prototype.NMDPFormBuilder = function () {
	
	let content = "";
content += "<div id=\"NMDP\" style=\"display:none\";>";
	content +="                        <form id=\"form_reset_pw\" class=\"input_style_2\"  >";
	content +="                            <div id=\"forgot_pw\">";
	content +="                                <h4 class=\"mb-4\">Votre Email</h4>";
	content +="                                <div class=\"form-group\">";
	content +="                                    <label for=\"email_forgot\">Login email</label>";
	content +="                                    <input type=\"email\" class=\"form-control\" name=\"email\" id=\"email_forgot\">";
	content +="                                </div>";
	content +="                                <p>Vous recevrez un e-mail contenant un lien vous permettant de réinitialiser votre mot de passe par un nouveau.</p>";
	content +="                                <div class=\"text-center\"><input type=\"submit\" value=\"Réinitialiser le mot de passe\" id=\"showForm\" class=\"btn_1\"></div>";
	content +="                            </div>";
	content +="                        </form>";
content +="<div/>";
	content +="<script src=\"js/common_scripts.js\"></script>";
	content +="<script src=\"js/common_func.js\"></script>";
		return content;

}
Uluru.prototype.create_NMDPFormBuilder = function () {

    let content = "";

content += "<div id=\"create_NMDP\" >";
	content +="                        <form id=\"form_create_npw\" class=\"input_style_2\"  >";
	content +="                            <div id=\"forgot_pw\">";
	content +="                                <h4 class=\"mb-4\">Renouveler votre Mot de passe</h4>";
	// content +="                                <div class=\"form-group\">";
	// content +="                                    <label for=\"email_forgot\">Login email</label>";
	// content +="                                    <input type=\"email\" class=\"form-control\" name=\"email\" id=\"email_forgot\">";
	// content +="                                </div>";
	content +="                            <div class=\"form-group\">";
	content +="                                <label for=\"password\">Mot de passe</label>";
	content +="                                <input type=\"password\" name=\"pass1\" id=\"password\" class=\"form-control\">";
	content +="                            </div>";
	content +="                            <div class=\"form-group\">";
	content +="                                <label for=\"password\" >Confirmer Mot de passe</label>";
	content +="                                <input type=\"password\" name=\"confirm_pass1\" id=\"confirm_pass1\" class=\"form-control\">";
	content +="                            </div>";
	content +="                                <p>Réinitialiser votre mot de passe par un nouveau.</p>";
	content +="                                <div class=\"text-center\"><input type=\"submit\" value=\"Confirmer le mot de passe\" class=\"btn_1\"></div>";
	content +="                            </div>";
	content +="                        </form>";
content +="<div/>";
	content +="<script src=\"js/common_scripts.js\"></script>";
	content +="<script src=\"js/common_func.js\"></script>";
		return content;

}