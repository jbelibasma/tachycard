Uluru.prototype.lostPassword = function (){
    let content = "";
    content += "<div id=\"otp_lost_pass\" class=\"visible\">";
    content += "    <div class=\"logo\">";
    content += "        <img src=\"images/logo_tachycard_white.svg\">";
    content += "    </div>";
    content += "    <form id=\"form_otp_lost_pass\">";
    content += "        <div class=\"item\">";
    content += "            <label>Email de votre compte</label>";
    content += "            <input type=\"email\" name=\"email\">";
    content += "        </div>";
    content += "        <div class=\"buttons\">";
    content += "            <button type=\"submit\">Envoyer</button>";
    content += "        </div>";
    content += "    </form>";
    content += "</div>";
    return content;
}
Uluru.prototype.otpVerification = function (){
    let content = "";
    content += "<div id=\"otp_lost_pass\" class=\"visible\">";
    content += "    <div class=\"logo\">";
    content += "        <img src=\"images/logo_tachycard_white.svg\">";
    content += "    </div>";
    content += "    <form id=\"form_otp_verification\">";
    content += "        <div class=\"item\">";
    content += "            <label>Entrer le code reçu par mail</label>";
    content += "            <input type=\"text\" name=\"code\">";
    content += "        </div>";
    content += "        <div class=\"buttons\">";
    content += "            <button type=\"submit\">Envoyer</button>";
    content += "        </div>";
    content += "    </form>";
    content += "</div>";
    return content;
}
Uluru.prototype.changePassword = function (){
    let content = "";
    content += "<div id=\"otp_lost_pass\" class=\"visible\">";
    content += "    <div class=\"logo\">";
    content += "        <img src=\"images/logo_tachycard_white.svg\">";
    content += "    </div>";
    content += "    <form id=\"form_otp_change_pass\">";
    content += "        <div class=\"item\">";
    content += "            <label>Nouveau mot de passe</label>";
    content += "            <input type=\"password\" name=\"code1\">";
    content += "        </div>";
    content += "        <div class=\"item\">";
    content += "            <label>Vérifier votre mot de passe</label>";
    content += "            <input type=\"password\" name=\"code2\">";
    content += "        </div>";
    content += "        <div class=\"buttons\">";
    content += "            <button type=\"submit\">Envoyer</button>";
    content += "        </div>";
    content += "    </form>";
    content += "</div>";
    return content;
}