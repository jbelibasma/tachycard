//TODO CREATE FORM GENERATOR
Uluru.prototype.updateUserBuilder = function (type,data){
    let optionsSexe = ["Femme","Homme","Autre"];
    //WE DELETE ALL PART THAT ARE NOT ALLOWED TO UPDATED USER
    let jsonTmpForm = this.form_json.users_form.form;
    delete jsonTmpForm.content.pass1;
    delete jsonTmpForm.content.user_data;
    delete jsonTmpForm.content.user_data;
    delete jsonTmpForm.content.buttons.create;
    delete jsonTmpForm.content.type;

    this.fillValueJsonForm(jsonTmpForm,data);

    let content = "";
    content += '<div class="screen update_users">'
    content +=     '<div id="update_users">'
    content +=         '<div class="screen_icon"><img src="images/users.svg"  style="width:80px; height:80px;"></div>'
    content +=         '<div class="title">Modifier un '+type+'</div>'
    content +=          this.jsonformBuilder(jsonTmpForm);
    // content +=         '<form id="update_user_form">'
    // content +=              '<input type="hidden" name="id" value="">'
    // content +=              '<input type="hidden" name="destination" value="">'
    // content +=              '<div class="item">'
    // content +=                  '<label>Nom</label>'
    // content +=                  '<input type="text" name="nom" value="">'
    // content +=              '</div>'
    // content +=              '<div class="item">'
    // content +=                  '<label>Prénom</label>'
    // content +=                  '<input type="text" name="prenom" value="">'
    // content +=              '</div>'
    // content +=              '<div class="item">'
    // content +=                  '<label>Email</label>'
    // content +=                  '<input type="text" name="email" value="">'
    // content +=              '</div>'
    // content +=              '<div class="item">'
    // content +=                  '<label>Téléphone</label>'
    // content +=                  '<input type="tel" name="tel" value="">'
    // content +=              '</div>'
    // if(type === "patient"){
    //     content +=              '<div class="item" id="pass_div">'
    //     content +=                  '<label>Mot de passe</label>'
    //     content +=                  '<input type="password" name="pass1" placeholder="Changer le mot de passe" value="">'
    //     content +=              '</div>'
    // }
    // content +=              '<div class="item">'
    // content +=                  '<label>Sexe</label>'
    // content +=                  '<select name="sexe">'
    // content +=                      this.generateOptionSelect(optionsSexe,);
    // content +=                  '</select>'
    // content +=              '</div>'
    // content +=              '<div class="item">'
    // content +=                  '<label for="update_user_mat_ab_id">Sonde abandonnée</label>'
    // content +=                  '<div class="elements input-message checkboxUserStyleDiv">'
    // content +=                      '<div class="item">'
    // content +=                          '<input id="update_user_mat_ab_id" name="user_mat_ab" type="checkbox" class="checkboxUserStyleInput">'
    // content +=                      '</div>'
    // content +=                      '<div class="item">'
    // content +=                          'Le patient est-il porteur d\'une sonde abandonnée ?'
    // content +=                      '</div>'
    // content +=                  '</div>'
    // content +=              '</div>'
    // content +=              '<div class="buttons">'
    // content +=                  '<button name="bt_cancel" type="button" class="cancel" onClick="'+onClickBtCancel+'">Annuler</button>'
    // content +=                  '<button type="button" class="delete">Supprimer</button>'
    // content +=                  '<button type="button" class="update">Modifier</button>'
    // content +=              '</div>'
    // content +=         '</form>'
    content +=     '</div>'
    // let ffff = "";
    // if(jsonTmpForm.content.user_mat_ab.value === "1"){
    //     ffff = "checked";
    // }
    // content +=                          '<input name="user_mat_ab" type="checkbox" value="1" class="checkboxUserStyleInput" '+ffff+'>';
    content += '</div>'

    return content;
}

Uluru.prototype.listAllUsersBuilder = function (){
    let onClickBtAdd = 'uluru.newCardWorkflowRenderer(\'main\',uluru.createNewUser());uluru.showScreen(\'new_users\');'

    let content = "";
    content +=    '<div class="screen users">'
    content +=       ' <div id="users">'
    content +=            '<div class="screen_icon"><img src="images/users.svg"  style="width:80px; height:80px;"></div>'
    content +=            '<div class="title">Liste des utilisateurs</div>'
    content +=            '<div class="search"><input type="text" id="search_users" placeholder="Recherche">'
    content +=                '<button id="go_search_users" type="button"><img src="images/find-white.svg"  style="width:25px; height:25px;"></button></div>'
    content +=            '<div id="list_users"></div>'
    content +=            '<div class="buttons">'
    content +=                '<button type="button" id="new_user" onClick="'+onClickBtAdd+'">Nouvel utilisateur</button>'
    content +=            '</div>'
    content +=        '</div>'
    content +=    '</div>'
    return content;
}
//TODO utiliser le formbuilder
Uluru.prototype.accountUserBuilder = function (){
    let content = "";
    content += '<div class="screen account">'
    content += '    <div id="account" class="bloc">'
    content += '        <div class="screen_icon"><img src="images/users.svg" style="width:80px; height:80px;"></div>'
    content += '        <div class="title">Mon compte</div>'
    content += '        <form id="form_account">'
    content += '            <input type="hidden" name="id" value="">'
    content += '            <div class="item">'
    content += '                <label>Nom</label>'
    content += '                <input type="text" name="nom" value="" readonly>'
    content += '            </div>'
    content += '            <div class="item">'
    content += '                <label>Prénom</label>'
    content += '                <input type="text" name="prenom" value="" readonly>'
    content += '            </div>'
    content += '            <div class="item">'
    content += '                <label>Email</label>'
    content += '                <input type="text" name="email" value="" readonly>'
    content += '            </div>'
    content += '            <div class="item">'
    content += '                <label>Mot de passe</label>'
    content += '                <input type="password" name="pass1" value="" placeholder="Saisissez un nouveau mot de passe">'
    content += '            </div>'
    content += '            <div class="item">'
    content += '                <label>Confirmer le mot de passe</label>'
    content += '                <input type="password" name="pass2" value="">'
    content += '            </div>'
    content += '            <div class="item">'
    content += '                <label>Afficher les mots de passe</label>'
    content += '                <input id="show_pass_user" name="show_pass_user" type="checkbox" >'
    content += '            </div>'
    content += '            <div class="buttons">'
    content += '                <button type="submit">Modifier</button>'
    content += '            </div>'
    content += '        </form>'
    content += '    </div>'
    if (this.user.id_profile === 2){
        content += '    <div id="account_cards" class="bloc">'
        content += '        <div class="screen_icon"><img src="images/card.svg"  style="width:80px; height:80px;"></div>'
        content += '        <div class="title">Mes cartes</div>'
        content += '        <div id="account_cards_list"></div>'
        content += '    </div>'
    }
    content += '</div>'
    return content;
}

Uluru.prototype.updateUser2Builder = function (){

    let onClickBtCancel = 'uluru.newCardWorkflowRenderer(\'main\',uluru.listAllUsersBuilder());'
    onClickBtCancel += 'uluru.loadUsersList();';
    onClickBtCancel += 'uluru.showScreen(\'users\');';
    let content = "";
    content += '<div class="screen update_users">'
    content += '   <div id="update_users">'
    content += '       <div class="screen_icon"><img src="images/users.svg"  style="width:80px; height:80px;"></div>'
    content += '       <div class="title">Modifier un utilisateur</div>'
    content += '       <form id="update_user_form">'
    content += '           <input type="hidden" name="id" value="">'
    content += '           <input type="hidden" name="destination" value="">'
    content += '           <div class="item">'
    content += '               <label>Nom</label>'
    content += '               <input type="text" name="nom" value="">'
    content += '           </div>'
    content += '           <div class="item">'
    content += '               <label>Prénom</label>'
    content += '               <input type="text" name="prenom" value="">'
    content += '           </div>'
    content += '           <div class="item">'
    content += '               <label>Email</label>'
    content += '               <input type="text" name="email" value="">'
    content += '           </div>'
    content += '           <div class="item">'
    content += '               <label>Téléphone</label>'
    content += '               <input type="tel" name="tel" value="">'
    content += '           </div>'
    content += '           <div class="item" id="pass_div">'
    content += '               <label>Mot de passe</label>'
    content += '               <input type="password" name="pass1" placeholder="Changer le mot de passe" value="">'
    content += '           </div>'
    content += '           <div class="item">'
    content += '               <label>Sexe</label>'
    content += '               <select name="sexe">'
    content += '                   <option value="Homme">Homme</option>'
    content += '                   <option value="Femme">Femme</option>'
    content += '                   <option value="Autre">Autre</option>'
    content += '               </select>'
    content += '           </div>'
    content += '           <div class="item">'
    content += '               <label for="update_user_mat_ab_id">Sonde abandonnée</label>'
    content += '               <div class="elements input-message" style="display: flex">'
    content += '                   <div class="item">'
    content += '                       <input id="update_user_mat_ab_id" name="user_mat_ab" type="checkbox" style="width: auto" >'
    content += '                   </div>'
    content += '                   <div class="item">'
    content += '                       Le patient est-il porteur d\'une sonde abandonnée ?'
    content += '                   </div>'
    content += '               </div>'
    content += '           </div>'
    content += '           <div class="buttons">'
    content += '               <button name="bt_cancel" type="button" class="cancel" onclick="'+onClickBtCancel+'">Annuler</button>'
    content += '               <button type="button" class="delete">Supprimer</button>'
    content += '               <button type="button" class="update">Modifier</button>'
    content += '           </div>'
    content += '       </form>'
    content += '   </div>'
    content += '</div>'
    
    return content;
}
Uluru.prototype.createNewUser = function (){
    let content = "";
    content += '<div class="screen new_users">'
    content += '  <div id="new_users">'
    content += '      <div class="screen_icon"><img src="images/users.svg"  style="width:80px; height:80px;"></div>'
    content += '      <div class="title">Nouvel utilisateur</div>'
    content += '      <form id="new_user_form">'
    content += '          <div class="item">'
    content += '              <label>Nom</label>'
    content += '              <input type="text" name="nom" value="">'
    content += '          </div>'
    content += '          <div class="item">'
    content += '              <label>Prénom</label>'
    content += '              <input type="text" name="prenom" value="">'
    content += '          </div>'
    content += '          <div class="item">'
    content += '              <label>Email</label>'
    content += '              <input type="text" name="email" value="">'
    content += '          </div>'
    content += '          <div class="item">'
    content += '              <label>Téléphone</label>'
    content += '              <input type="tel" name="tel" value="">'
    content += '          </div>'
    content += '          <div class="item">'
    content += '              <label>Type de compte</label>'
    content += '              <select name="type">'
    content += '                  <option value="">Choisissez...</option>'
    content += '                  <option value="2">Patient</option>'
    content += '                  <option value="1">Médecin</option>'
    content += '                  <option value="4">Médecin Administrateur</option>'
    content += '                  <option value="3">Administrateur</option>'
    content += '              </select>'
    content += '          </div>'
    content += '          <div class="buttons">'
    content += '              <button type="button" class="create">Créer</button>'
    content += '          </div>'
    content += '      </form>'
    content += '  </div>'
    content += '</div>'

    return content;

}