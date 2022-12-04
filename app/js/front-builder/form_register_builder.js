// Uluru.prototype.registerFormBuilder = function () {
//     let content = "";
//     content += "<div id=\"register\" style=\"display:none\";>";
//     content +='<div class="container-fluid p-0">';
//     content +='<div class="row no-gutters row-height">';
//     content +='   <div class="col-lg-6 background-image" data-background="url(img/background-tachycard.jpg)">';
//     content += '       <div class="content-left-wrapper opacity-mask" data-opacity-mask="rgba(255, 255, 255, 0)">';                      
//     content += '              <div class="text-left">';
//     content +=  '              <div class="intro-block">';
//     content += '                </div>';
//     content +=  '               </div>';
//     content += '       </div>';
//     content += '   </div>';
//     content +='    <div class="col-lg-6 d-flex flex-column content-right" >';
//     content += '       <div class="container my-auto py-5">';
//     content += '           <div class="row">';
//     content +=   '             <div class="col-lg-9 col-xl-7 mx-auto">';
//     content +=   '                 <a href="#"><img src="img/logo_noir.svg" width="181" height="81" style="text-align: center; width: 200px; display: block; margin-left: auto; margin-right: auto; margin-bottom: 35px;"  alt=""></a>';
//     content += '                   <div class="panel header_2 center">';
//     content +=  '                      <figure>';
//     content += '                       </figure>';
//     content += "                   <form class=\"input_style_2\" id=\"form_register\"  >";
//     content +=  '                          <input type="hidden" name="id" id="ID" class="form-control">';
//     content +=  '                          <input type="hidden" name="id_centre" id="id_centre" class="form-control">';
//     content +=  '                      <div class="form-group">';
//     content +=  '                          <label for="full_name">Nom</label>';
//     content +=  '                          <input type="text" name="nom" id="full_name" class="form-control">';
//     content +=   '                     </div>';
//     content +=  '                      <div class="form-group">';
//     content +=  '                          <label for="full_prenom">Prénom</label>';
//     content +=  '                          <input type="text" name="prenom" id="full_prenom" class="form-control">';
//     content +=   '                     </div>';
//     content +=  '                      <div class="form-group">';
//     content +=  '                          <label for="full_ddn">ddn</label>';
//     content +=  '                          <input type="text" name="ddn" id="full_ddn" class="form-control">';
//     content +=   '                     </div>';
//     content +=  '                      <div class="  form-group">';
//     content +=  '                          <label for="full_sexe">sexe</label>';
//     content +=  '                           <select name="sexe">';
//     content += '                                <option value="Homme">Homme</option>';
//     content += '                                <option value="Femme">Femme</option>';
//     content += '                                <option value="Autre">Autre</option>';
//     content += '                             </select>';
//     content +=   '                     </div>';
//     content +=  '                      <div class="form-group item 2 1 3 4">';
//     content +=  '                          <label for="type">type</label>';
//     content +=  '                          <input type="text" name="type" id="type" class="form-control">';
//     content +=   '                     </div>';
//     content +=  '                      <div class="form-group">';
//     content +=  '                          <label for="full_num">numero de securite</label>';
//     content +=  '                          <input type="text" name="num_secu" id="full_num" class="form-control">';
//     content +=   '                     </div>';
//     content +=  '                      <div class="form-group">';
//     content +=  '                          <label for="full_date">date et lieu de naissance</label>';
//     content +=  '                          <input type="date" name="date_naissance" id="full_date" class="form-control">';
//     content +=   '                     </div>';
//     content +=  '                      <div class="form-group">';
//     content +=  '                          <label for="full_tel">tel</label>';
//     content +=  '                          <input type="tel" name="tel" id="full_tel" class="form-control">';
//     content +=   '                     </div>';
//     content +=   '                     <div class="form-group">';
//     content +=   '                         <label for="email_address">Adresse email</label>';
//     content +=   '                         <input type="text" name="email" id="email_address" class="form-control">';
//     content +=  '                      </div>';
//     content +=  '                      <div class="form-group">';
//     content +=  '                          <label for="password1">Mot de passe</label>';
//     content +=  '                          <input type="password" name="pass" id="password1" class="form-control">';
//     content +=  '                      </div>';
//     content += '                       <div id="pass-info" class="clearfix"></div>';
//     content += '                       <div class="mb-4">';
//     content += '                           <label class="container_check">J accepte les <a href="#" data-toggle="modal" data-target="#terms-txt">Termes et politique de confidentialité</a>';
//     content +=  '                              <input type="checkbox" name="agree" id="agree">';
//     content +=  '                              <span class="checkmark"></span>';
//     content +=  '                          </label>';
//     content +=  '                      </div>';
//     content +=  "                      <button type=\"submit\" id=\"submitform\" class=\"btn_1 full-width\" >S'inscrire</button>";
//     content += '                   </form>';
//     content += '                   <p class="text-center mt-3 mb-0">Vous avez déjà un compte ? <a href="#">S identifier</a></p>';
//     content += '               </div>';
//     content += '               </div>';
//     content += '           </div>';
//     content += '       </div>';
//     content += '       <div class="container pb-3 copy" style="font-size:12px;">© 2022 Tachycard - All Rights Reserved | by Pact Digital</div>';
//     content += '   </div>';
//     content +=' </div>';
//     content +='</div>'
//     content +="<div/>";

//     content +="<script src=\"js/common_scripts.js\"></script>";
//     content +="<script src=\"js/common_func.js\"></script>";
//     content +="	<script src=\"js/pw_strenght.js\"></script>";



    

//     return content;
// }
Uluru.prototype.registerFormBuilder = function () {
    let content = "";
    content += "<div id=\"register\" style=\"display:none\";>";
    content +='<div class="container-fluid p-0">';
    content +='<div class="row no-gutters row-height">';
    content +='   <div class="col-lg-6 background-image" data-background="url(img/background-tachycard.jpg)">';
    content += '       <div class="content-left-wrapper opacity-mask" data-opacity-mask="rgba(255, 255, 255, 0)">';                      
    content += '              <div class="text-left">';
    content +=  '              <div class="intro-block">';
    content += '                </div>';
    content +=  '               </div>';
    content += '       </div>';
    content += '   </div>';
    content +='    <div class="col-lg-6 d-flex flex-column content-right" >';
    content += '       <div class="container my-auto py-5">';
    content += '           <div class="row">';
    content +=   '             <div class="col-lg-9 col-xl-7 mx-auto">';
    content +=   '                 <a href="#"><img src="img/logo_noir.svg" width="181" height="81" style="text-align: center; width: 200px; display: block; margin-left: auto; margin-right: auto; margin-bottom: 35px;"  alt=""></a>';
    content += '                   <div class="panel header_2 center">';
    content +=  '                      <figure>';
    content += '                       </figure>';
    content += "                   <form class=\"input_style_2\" id=\"form_register\"  >";
    content +=  '                          <input type="hidden" name="id" id="ID" class="form-control">';
    content +=  '                          <input type="hidden" name="id_centre" id="id_centre" class="form-control">';
    content +=  '                      <div class="form-group">';
    content +=  '                          <label for="full_name">Nom</label>';
    content +=  '                          <input type="text" name="nom" id="full_name" class="form-control">';
    content +=   '                     </div>';
    content +=  '                      <div class="form-group">';
    content +=  '                          <label for="full_prenom">Prénom</label>';
    content +=  '                          <input type="text" name="prenom" id="full_prenom" class="form-control">';
    content +=   '                     </div>';

    content +=  '                      <div class="  form-group">';
    content +=  '                          <label for="full_sexe">sexe</label>';
    content +=  '                           <select name="sexe">';
    content += '                                <option value="Homme">Homme</option>';
    content += '                                <option value="Femme">Femme</option>';
    content += '                                <option value="Autre">Autre</option>';
    content += '                             </select>';
    content +=   '                     </div>';
    content +=  '                      <div class="form-group item 2 1 3 4">';
    content +=  '                          <label for="full_type">type</label>';
    content +=  '                           <select name="type" >';
    content += '                                <option value="2">Patient</option>';
    content += '                                <option value="1">médecin non admin</option>';
    content += '                                <option value="4">médecin Admin</option>';
    content += '                                <option value="3">Admin</option>';
    content += '                             </select>';
    content +=   '                     </div>';
    // content +=  '                      <div class="form-group">';
    // content +=  '                          <label for="full_num">numero de securite</label>';
    // content +=  '                          <input type="text" name="num_secu" id="full_num" class="form-control">';
    // content +=   '                     </div>';
    content +=  '                      <div class="form-group">';
    content +=  '                          <label for="full_date">date et lieu de naissance</label>';
    content +=  '                          <input type="date" name="date_naissance" id="full_date" class="form-control">';
    content +=   '                     </div>';
    content +=  '                      <div class="form-group">';
    content +=  '                          <label for="full_tel">tel</label>';
    content +=  '                          <input type="tel" name="tel" id="full_tel" class="form-control">';
    content +=   '                     </div>';
    content +=   '                     <div class="form-group">';
    content +=   '                         <label for="email_address">Adresse email</label>';
    content +=   '                         <input type="text" name="email" id="email_address" class="form-control">';
    content +=  '                      </div>';
    content +=  '                      <div class="form-group">';
    content +=  '                          <label for="password1">Mot de passe</label>';
    content +=  '                          <input type="password" name="pass" id="password1" class="form-control">';
    content +=  '                      </div>';
    content += '                       <div id="pass-info" class="clearfix"></div>';
    content += '                       <div class="mb-4">';
    content += '                           <label class="container_check">J accepte les <a href="#" data-toggle="modal" data-target="#terms-txt">Termes et politique de confidentialité</a>';
    content +=  '                              <input type="checkbox" name="agree" id="agree">';
    content +=  '                              <span class="checkmark"></span>';
    content +=  '                          </label>';
    content +=  '                      </div>';
    content +=  "                      <button type=\"submit\" id=\"submitform\" class=\"btn_1 full-width\" >S'inscrire</button>";
    content += '                   </form>';
    content += '                   <p class="text-center mt-3 mb-0">Vous avez déjà un compte ? <a href=""  id="return_login">S identifier</a></p>';
    content += '               </div>';
    content += '               </div>';
    content += '           </div>';
    content += '       </div>';
    content += '       <div class="container pb-3 copy" style="font-size:12px;">© 2022 Tachycard - All Rights Reserved | by Pact Digital</div>';
    content += '   </div>';
    content +=' </div>';
    content +='</div>'
    content +="<div/>";

    content +="<script src=\"js/common_scripts.js\"></script>";
    content +="<script src=\"js/common_func.js\"></script>";
    content +="	<script src=\"js/pw_strenght.js\"></script>";



    

    return content;
}
