/***  liste de travaille */

Uluru.prototype.listAllWorkBuilder = function (){
    let onClickBtNewPat = "uluru.newCardWorkflowRenderer(\'new_card\',uluru.newPatientImplantBuilder())";

    let content = "";
    content +=    '<div class=" cartes implant container p-4 px-lg-5 text-center">'
    content +=       ' <div id="cartes" class="new_card shadow p-3 mb-5 bg-white rounded">'
    content +=            '<div class="screen_icon"><img src="images/card.svg"  style="width:40px; height:40px;"></div>'
    content +=            '<div class="title">LISTE</div>'
    content +=            '<table class="table"  id="find_worklist">'
    content +=             "<thead>";
    content +=             "<tr class='item  header'>";
    // content+=            "<th class='cell'>ID</th>";
    content +=             "<th class='cell'>Patient</th>";
    content +=             "<th class='cell'>Date de naissance</th>";
    content +=             "<th class='cell'>Indication</th>";
    content +=             "</tr>";
    content +=             "</thead>";
    content +=             '<tbody class="find_worklist">';
    content +=             "</tbody>";
    content +=            "</table>";
    content+=              '<div class="new_patient">'
    content+=                  '<div class="buttons">'
    content+=                      '<button type="button" class="previous" onClick="'+onClickBtNewPat+'">Nouveau patient</button>'
    content+=                  '</div>'
    content+=              '</div>'
    content +=        '</div>'
    content +=    '</div>'
    return content;
}

Uluru.prototype.newPatientImplantBuilder = function (){
    let onClickBtPrevious=" uluru.newCardWorkflowRenderer(\'main\',uluru.listAllWorkBuilder(),uluru.work_list())";
    let dateAujourdhui = moment(Date.now()).format("YYYY-MM-DD");


    // let content = this.addIconAndTitle();

    let content =  '<form class=" " id="form_patient_intervention">'
    content +=      '<div class="subtitle">Nouveau patient</div>'
    content +=      '<div class="message">Merci de remplir le formulaire</div>'
    content +=      '<div class="item">'
    content +=          '<label>Nom patient</label>'
    content +=          '<input type="text" name="nom" value="" required>'
    content +=      '</div>'
    content +=      '<div class="item">'
    content +=          '<label>Prénom patient</label>'
    content +=          '<input type="text" name="prenom" value="" required>'
    content +=      '</div>'
    content +=  '   <div class="  item">';
    content +=  '       <label for="full_sexe">sexe</label>';
    content +=  '        <select name="sexe">';
    content += '             <option value="Homme">Homme</option>';
    content += '             <option value="Femme">Femme</option>';
    content += '             <option value="Autre">Autre</option>';
    content += '          </select>';
    content +=   '  </div>';
    content +=  '   <div class="form-group item 2 1 3 4">';
    content +=  "       <label for='full_type'>type d'implant</label>";
    content +=  '        <select name="type_implant" >';
    content += '             <option value="coronaire">coronaire</option>';
    content += '             <option value="rythmique">rythmique</option>';
    content += '             <option value="valvulaire">valvulaire</option>';
    content += '             <option value="occlusion">occlusion</option>';
    content += '          </select>';
    content +=   '  </div>';
    content +=  '   <div class="item">';
    content +=  '       <label for="full_numero_securite">numero de securite</label>';
    content +=  '       <input type="text" name="numero_securite" id="full_numero_securite" class="form-control">';
    content +=   '  </div>';
    content +=  '   <div class="form-group">';
    content +=  '       <label for="full_tel">tel</label>';
    content +=  '       <input type="tel" name="tel" id="full_tel" class="form-control">';
    content +=   '  </div>';
    content +=   '  <div class="form-group">';
    content +=   '      <label for="email_address">Adresse email</label>';
    content +=   '      <input type="text" name="email" id="email_address" class="form-control">';
    content +=  '   </div>';
    content +=      '<div class="item">'
    content +=          '<label>date_implantation</label>'
    content +=          '<input type="date" name="date_implantation" value=""  required>'
    content +=      '</div>'
    content +=      '<div class="item">'
    content +=          '<label>indication</label>'
    content +=          '<input type="text" name="indication" value="">'
    content +=      '</div>'
    content +=      '<div class="item">'
    content +=          '<label>Date de naissance</label>'
    content +=          '<input type="date" name="date_naissance" value="" max="'+dateAujourdhui+'" required>'
    content +=      '</div>'
    content +=      '<div class="">'
    content +=          '<button type="button" class="previous" onclick="'+onClickBtPrevious+'">Annuler</button>'
    content +=          '<button  type="submit" >Créer le compte</button>'
    content +=      '</div>'
    content +=  '</form>'

    return content;
}