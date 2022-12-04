Uluru.prototype.addIconAndTitle = function (){
    let content = '';
    content += '<div class="screen_icon"><img src="images/card.svg"  style="width:80px; height:80px;"></div>';
    content += '<div class="title">Nouvelle carte</div>';
    return content;
}
//CREATE 2 DIV FOR NEW CARD STYLE
Uluru.prototype.initNewCardDiv = function (){
    let content = "";
    content = this.addParentDivToContent(content,"id = 'new_card'");
    content = this.addParentDivToContent(content,"class='screen new_card'");
    return content;
}
Uluru.prototype.initGenericDiv = function (select){
    let content = "";
    content = this.addParentDivToContent(content,"id = "+select+"");
    content = this.addParentDivToContent(content,"class='screen "+select+"'");
    return content;
}
//CHOOSE THE TYPE OF CARD
Uluru.prototype.cardTypeBuilder = function (){
    let content = this.addIconAndTitle();
    content +=  '<form class="step card_type visible">'
    content +=      '<div class="subtitle">Type de prothèse</div>'
    content +=      '<div class="message">Choisissez le type de dispositif implanté</div>'
    content +=      '<div class="chooser">'
    content +=          '<div id="PMKDAIHOL" class="item" >Rythmique</div>'
    content +=          '<div id="STENT" class="item off">Coronaire</div>'
    content +=          '<div id="TAVICLIP" class="item">Valvulaire</div>'
    content +=          '<div id="FOPCIAFA" class="item">Occlusion</div>'
    content +=      '</div>'
    content +=  '</form>'
    return content;
}
//FIND PATIENT
Uluru.prototype.findPatientBuilder = function (){
    let onClickBtNewPat = "uluru.newCardWorkflowRenderer(\'new_card\',uluru.newPatientMedecinBuilder('patient'))";
    let content = this.addIconAndTitle();
    content+=    '<form class="step patient" id="form_find_patient">'
    content+=       '<div class="elements">'
    content+=       '<div class="new_patient">'
    content+=           '<div class="buttons">'
    content+=               '<button type="button" class="previous" onClick="'+onClickBtNewPat+'">Nouveau patient</button>'
    content+=           '</div>'
    content+=       '</div>'
    content+=       '<div class="search_patient">'
    content+=           '<div class="subtitle">Recherche du patient</div>'
    // content+=        '<div class="message">Saisissez les premières lettres du nom et du prénom du patient</div>'
    content+=           '<div class="item">'
    content+=               '<label>Nom</label>'
    content+=               '<input type="text" name="search_nom" value="">'
    content+=           '</div>'
    content+=           '<div class="item">'
    content+=               '<label>Prénom</label>'
    content+=               '<input type="text" name="search_prenom" value="">'
    content+=           '</div>'
    content+=           '<div class="item">'
    content+=               '<label>Date de naissance</label>'
    content+=               '<input type="date" name="search_birth" value="">'
    content+=           '</div>'
    content+=           '<div class="buttons">'
    content+=               '<button type="submit">Rechercher</button>'
    content+=           '</div>'
    content+=       '</div>'
    content+=       '</div>'
    content+=   '</form>'
    return content;
}

//LIST OF PATIENT
Uluru.prototype.listPatientsBuilder = function (){
    let onClickBtNewSearch = "uluru.newCardWorkflowRenderer(\'new_card\',uluru.findPatientBuilder())";
    let onClickBtNewPat = "uluru.newCardWorkflowRenderer(\'new_card\',uluru.newPatientMedecinBuilder('patient'))";
    let content = this.addIconAndTitle();
    content+='<div class="step liste_patients">'
    content+=    '<div class="subtitle">Liste des patients trouvés</div>'
    content+=    '<div class="liste"></div>'
    content+=    '<div class="buttons">'
    content+=        '<button type="button" class="previous" onclick="'+onClickBtNewSearch+'">Nouvelle recherche</button>'
    content+=        '<button type="submit" class="previous" onclick="'+onClickBtNewPat+'">Nouveau patient</button>'
    content+=    '</div>'
    content+='</div>'

    return content;
}

//FORM TO CREATE NEW PATIENT AND NEW MEDECIN
Uluru.prototype.newPatientMedecinBuilder = function (type){
    let onClickBtPrevious = "uluru.newCardWorkflowRenderer(\'new_card\',uluru.findPatientBuilder())";
    let typeName = "du "+type;
    let subtitle = "Patient";
    let dateAujourdhui = moment(Date.now()).format("YYYY-MM-DD");

    if(type === 'medecin'){
        onClickBtPrevious = "uluru.newCardWorkflowRenderer('new_card',uluru.listMedecinsBuilder(),uluru.findAllMedecins.bind(uluru))";
        typeName = "de l'Opérateur";
        subtitle = 'Opérateur';
    }
    let content = this.addIconAndTitle();

    content +=  '<form class="step new_'+type+'" id="form_new_'+type+'">'
    content +=      '<div class="subtitle">Nouveau '+subtitle+'</div>'
    content +=      '<div class="message">Merci de remplir le formulaire</div>'
    content +=      '<div class="item">'
    content +=          '<label>Nom '+typeName+'</label>'
    content +=          '<input type="text" name="nom" value="" required>'
    content +=      '</div>'
    content +=      '<div class="item">'
    content +=          '<label>Prénom '+typeName+'</label>'
    content +=          '<input type="text" name="prenom" value="" required>'
    content +=      '</div>'
    content +=      '<div class="item">'
    content +=          '<label>Email</label>'
    content +=          '<input type="email" name="email" value="">'
    content +=      '</div>'
    content +=      '<div class="item">'
    content +=          '<label>Téléphone</label>'
    content +=          '<input type="tel" name="tel" value="">'
    content +=      '</div>'

    if(type === "patient"){
        content +=      '<div class="item">'
        content +=          '<label>Date de naissance</label>'
        content +=          '<input type="date" name="date_naissance" value="" max="'+dateAujourdhui+'" required>'
        content +=      '</div>'
        content +=      '<div class="item">'
        content +=          '<label>Sexe</label>'
        content +=          '<select name="sexe">'
        content +=              '<option value="Homme">Homme</option>'
        content +=              '<option value="Femme">Femme</option>'
        content +=              '<option value="Autre">Autre</option>'
        content +=          '</select>'
        content +=      '</div>'
        content +=      '<div class="item">'
        content +=          '<label for="user_mat_ab_id">Sonde abandonnée</label>'
        content +=          '<div class="elements input-message" style="display: flex">'
        content +=              '<div class="item">'
        content +=                  '<input id="user_mat_ab_id" name="user_mat_ab" type="checkbox" style="width: auto" >'
        content +=              '</div>'
        content +=              '<div class="item">'
        content +=                  'Le patient est-il porteur d\'une sonde abandonnée ?'
        content +=              '</div>'
        content +=          '</div>'
        content +=      '</div>'
        if(this.record){
            content +=      '<div class="item">'
            content +=          '<label for="user_data_id">Données personnelles</label>'
            content +=          '<div class="elements input-message" style="display: flex">'
            content +=              '<div class="item">'
            content +=                  '<input id="user_data_id" name="user_data" type="checkbox" style="width: auto" required>'
            content +=              '</div>'
            content +=              '<div class="item">'
            content +=                  'En créant le compte de ce patient vous certifiez que ce dernier a bien été informé et accepte'
            content +=                  ' sans '
            content +=                  'réserve cet enregistrement de ses données personnelles et les conditions annexes à cet'
            content +=                  'enregistrement.'
            content +=              '</div>'
            content +=          '</div>'
            content +=      '</div>'
        }
    }
    content +=      '<div class="buttons">'
    content +=          '<button type="button" class="previous" onclick="'+onClickBtPrevious+'">Annuler</button>'
    content +=          '<button type="submit">Créer le compte</button>'
    content +=      '</div>'
    content +=  '</form>'

    return content;
}



//LIST OF MEDECIN
Uluru.prototype.listMedecinsBuilder = function (){
    let onClickBtPrevious = "uluru.newCardWorkflowRenderer('new_card',uluru.listPatientsBuilder(),uluru.findPatient.bind(uluru))";
    let onClickBtNewMedecin = "uluru.newCardWorkflowRenderer('new_card',uluru.newPatientMedecinBuilder('medecin'))";
    let content = this.addIconAndTitle();
    content +=  '<div class="step liste_medecins">';
    content +=      '<div class="subtitle">Liste des opérateurs trouvés</div>';
    content +=      '<div class="liste"></div>';
    content +=      '<div class="buttons">';
    content +=          '<button type="button" class="previous" onclick="'+onClickBtPrevious+'">Précédent</button>';
    if(this.user.id_profile === 3){
        content +=      '<button type="button" class="add_doctor" onclick="'+onClickBtNewMedecin+'">Ajouter un opérateur</button>\n';
    }
    content +=      '</div>';
    content +=  '</div>';
    return content
}

//FORM TO CREATE NEW MEDECIN
Uluru.prototype.newMedecinBuilder = function (){
    let content = this.addIconAndTitle();
    content += '<form class="step new_medecin" id="form_new_medecin">'
    content +=     '<div class="subtitle">Nouvel Opérateur</div>'
    content +=     '<div class="message">Merci de remplir le formulaire</div>'
    content +=     '<div class="item">'
    content +=         '<label>Nom de l\'opérateur</label>'
    content +=         '<input type="text" name="nom" value="" required>'
    content +=     '</div>'
    content +=     '<div class="item">'
    content +=         '<label>Prénom de l\'opérateur</label>'
    content +=         '<input type="text" name="prenom" value="" required>'
    content +=     '</div>'
    content +=     '<div class="item">'
    content +=         '<label>Email</label>'
    content +=         '<input type="email" name="email" value="" required>'
    content +=     '</div>'
    content +=     '<div class="item">'
    content +=         '<label>Téléphone</label>'
    content +=         '<input type="tel" name="tel" value="">'
    content +=     '</div>'
    content +=     '<div class="buttons">'
    content +=         '<button type="button" class="previous" onClick="uluru.newCardWorkflowRenderer(\'new_card\',uluru.listMedecinsBuilder(),uluru.findAllMedecins.bind(uluru))">Annuler</button>'
    content +=         '<button type="submit">Créer le compte</button>'
    content +=     '</div>'
    content += '</form>'
    return content;
}
//This form can be use for sonde1,2,3 and boitier
Uluru.prototype.formBoitierSondeBuilder = function (type){


    //Test if its boitier
    let isBoitier = this.isBoitier(type);
    //DISPLAY DATE
    let dateAujourdhui = moment(Date.now()).format("YYYY-MM-DD");

    //GET TYPE OF CARD
    let typeOfCard = this.data.carte.type_carte;

    //DISPLAY CORRECT SENTENCE
    let phraseSonde = "de la "+type.slice(0,-1)+" ou passez à l'étape suivante";
    let titreSonde = type.slice(0,-1)+" "+type.slice(-1);
    let requiredSonde = "";
    let onClickBtPrevious = "";

    //STORE OLD VALUE FROM PREVIOUS FORM
    let oldValue = {};

    //LIST OF OPTIONS FOR GENERATE SELECT
    let listOptions = {};

    //OPTIONS FOR SONDE
    listOptions.optionsConnexionSonde = ["","IS1","IS4","IS1/DF1","DF4","Autre"];
    listOptions.optionsTypeSonde = ["","OD","VD","VG"];
    listOptions.optionsListeFabricant = ["","Biotronik","Boston Scientific","Medtronic","Microport","St jude médical","Médico"];

    //DISPLAY COMBOBOX FOR PACE AND DEF
    let listDisplay = {};

    if (isBoitier){
        this.logMessage(type, this.data.carte[type]);
        dateAujourdhui = this.setTodayDate(type,dateAujourdhui);
        listOptions = this.setListOptions(listOptions,typeOfCard);

        phraseSonde = "du "+type;
        titreSonde = type;
        requiredSonde = "required";
        onClickBtPrevious = "uluru.newCardWorkflowRenderer('new_card',uluru.listMedecinsBuilder(),uluru.findAllMedecins.bind(uluru))";

        oldValue = this.getOldValueFromSondeBoitier(this.data.carte[type]);

        listDisplay = this.setListDisplay(listDisplay,oldValue);

        if (type === "boitier1"){
            onClickBtPrevious = "uluru.newCardWorkflowRenderer('new_card',uluru.formBoitierSondeBuilder('boitier'))";
        }
        if (type === "boitier2"){
            onClickBtPrevious = "uluru.newCardWorkflowRenderer('new_card',uluru.formBoitierSondeBuilder('boitier1'))";
        }
    }
    else if(type === "sonde1"){
        dateAujourdhui = this.setTodayDate(type,dateAujourdhui);

        oldValue = this.getOldValueFromSondeBoitier(this.data.carte.sonde1);
        onClickBtPrevious = "uluru.newCardWorkflowRenderer('new_card',uluru.formBoitierSondeBuilder('boitier'))"
    }
    else if(type === "sonde2"){
        dateAujourdhui = this.setTodayDate(type,dateAujourdhui);

        oldValue = this.getOldValueFromSondeBoitier(this.data.carte.sonde2);
        onClickBtPrevious = "uluru.newCardWorkflowRenderer('new_card',uluru.formBoitierSondeBuilder('sonde1'))"
    }
    else{
        dateAujourdhui = this.setTodayDate(type,dateAujourdhui);
        oldValue = this.getOldValueFromSondeBoitier(this.data.carte.sonde3);
        onClickBtPrevious = "uluru.newCardWorkflowRenderer('new_card',uluru.formBoitierSondeBuilder('sonde2'))"
    }
    this.logMessage("LE CODE BAR VO",oldValue);
    let content = this.addIconAndTitle();
    content +=  '<form class="step '+type+'" id="form_'+type+'">'
    content +=      '<div class="subtitle">'+titreSonde+'</div>'
    content +=      '<div class="message">Scannez le code barre '+phraseSonde+'</div>'
    content +=      '<div class="item">'
    content +=          '<label>Code barre</label>'
    content +=          '<input type="text" name="'+type+'_code" id="'+type+'_code" class="code" value="'+oldValue.code_bar+'">'
    content +=      '</div>'
    content +=      '<div class="item">'
    content +=          '<label>Date d\'implantation</label>'
    content +=          '<input type="text" placeholder="'+dateAujourdhui+'" name="'+type+'_date_implantation" value="'+dateAujourdhui+'" max="'+dateAujourdhui+'" min="1900-01-01" '+requiredSonde+'>'
    content +=      '</div>'

    if(isBoitier){
        content = this.boitierBuilder(content,type,typeOfCard,listOptions,oldValue,listDisplay);
    }else{
        content = this.sondeBuilder(content,type,listOptions,oldValue);
    }
    //GENERIC PART
    content +=      '<div class="item">'
    content +=          '<label>Numéro de série</label>'
    content +=          '<input type="text" name="'+type+'_sn" '+requiredSonde+' value="'+this.notUndefined(oldValue.sn)+'">'
    content +=      '</div>'
    content +=      '<div class="item">'
    content +=          '<label>Fabricant</label>'
    content +=          '<select name="'+type+'_fabricant">'
    content +=              this.generateOptionSelect(listOptions.optionsListeFabricant,oldValue.fabricant);
    content +=          '</select>'
    content +=      '</div>'
    content +=      '<div class="item">'
    content +=          '<label>Modèle</label>'
    content +=          '<input type="text" name="'+type+'_modele" '+requiredSonde+' value="'+oldValue.modele+'">'
    content +=      '</div>'
    content +=      '<div class="item">'
    content +=          '<label>Référence</label>'
    content +=          '<input type="text" name="'+type+'_ref" id="'+type+'_ref" class="code" value="'+oldValue.ref+'">'
    content +=      '</div>'
    content +=      '<input type="hidden" name="'+type+'_ean" value="'+oldValue.ean+'">'
    content +=     '<div class="buttons">'
    content +=         '<button type="button" class="previous" onclick='+onClickBtPrevious+'>Précédent</button>'
    if(this.data.carte.type_carte !== "PMKDAIHOL"){
        if(type !== "boitier2"){
            content +=         '<button id="OTHERS_add" type="button" class="next">Ajouter prothèse</button>'
        }
        content +=         '<button id="OTHERS_submit" type="button" class="next">Terminer</button>'
    }else{
        content +=         '<button id="PMKDAIHOL_submit" type="button" class="next">Suivant</button>'
    }
    content +=     '</div>'
    content +=  '</form>'

    return content;
}

Uluru.prototype.isBoitier = function (type){
    return type === "boitier" || type === "boitier1" || type === "boitier2";
}
Uluru.prototype.setListOptions = function (listOptions,typeOfCard){
    let optionsDef = [];
    let optionsDef2 = [];
    let optionsPace = [];
    let optionsHolter = [];
    let optionsType = [];
    let optionsPosition = [];
    let optionsLibre = "";

    if(typeOfCard === "PMKDAIHOL"){
        optionsType = ["","Pacemaker","Défibrillateur","Holter SC"];
        optionsPace = ["BAV1","BAV2","BAV3 paroxystique","BAV3 permanent","Maladie de l\'oreillette","Bloc sino atrial","Pause sinusale","Pause significative","Bradycardie symptomatique","FA lente", "Insuffisance cardiaque"];
        optionsDef = ["TV","FV","Mort subite","Torsade de pointe","Cardiopathie ischémique","Cardiopathie dilatée non ischémique","Cardiopathie hypertrophique", "Insuffisance cardiaque"];
        optionsDef2 = ["","Prévention primaire","Prévention secondaire"];
        optionsHolter = ["Syncope","Fibrillation atriale"];
    }
    if (typeOfCard === "TAVICLIP"){
        optionsType = ["","TAVI","CLIP","MELODY","TENDYNE"];
        optionsPosition = ["","Aortique","Mitrale","Tricuspide","Pulmonaire"];
        optionsLibre = "libre";
    }
    if (typeOfCard === "FOPCIAFA"){
        optionsType = ["","Foramen Ovale Perméable","Communication InterAtriale","Auricule Gauche"];
        optionsPosition = ["","Aortique","Mitrale","Tricuspide","Pulmonaire"];
        optionsLibre = "libre";
    }
    listOptions.optionsDef = optionsDef;
    listOptions.optionsDef2 = optionsDef2;
    listOptions.optionsPace = optionsPace;
    listOptions.optionsHolter = optionsHolter;
    listOptions.optionsType = optionsType;
    listOptions.optionsPosition = optionsPosition;
    listOptions.optionsLibre = optionsLibre;

    return listOptions;
}
Uluru.prototype.setListDisplay = function (listDisplay,oldValue){
    let paceDisplay = 'style="display: none"';
    let defDisplay = 'style="display: none"';
    let holterDisplay = 'style="display: none"';
    let isIndicationDisplayed = false;

    if(oldValue.type === "Défibrillateur"){
        defDisplay = "";
        isIndicationDisplayed = true;
    }
    if (oldValue.type === "Holter SC"){
        holterDisplay = "";
        isIndicationDisplayed = true;
    }
    if (oldValue.type === "Pacemaker"){
        paceDisplay = "";
        isIndicationDisplayed = true;
    }
    if(!isIndicationDisplayed){
        paceDisplay = "";
    }

    listDisplay.paceDisplay = paceDisplay;
    listDisplay.defDisplay = defDisplay;
    listDisplay.holterDisplay = holterDisplay;

    return listDisplay;
}
Uluru.prototype.setTodayDate = function (type,dateAujourdhui){
    if (this.data.carte[type].date_implantation){
        dateAujourdhui = this.data.carte[type].date_implantation;
    }
    return dateAujourdhui;
}
//PART SONDE
Uluru.prototype.sondeBuilder = function (content,type,listOptions,oldValue){
    content +=  '<div class="item">'
    content +=      '<label> Connexion </label>'
    content +=      '<select name="'+type+'_connexion">'
    content +=              this.generateOptionSelect(listOptions.optionsConnexionSonde,oldValue.connexion);
    content +=      '</select>'
    content +=  '</div>'
    content +=  '<div class="item">'
    content +=      '<label>Type de sonde</label>'
    content +=      '<select name="'+type+'_type">'
    content +=          this.generateOptionSelect(listOptions.optionsTypeSonde,oldValue.type);
    content +=      '</select>'
    content +=  '</div>'
    return content;
}
//PART BOITIER
Uluru.prototype.boitierBuilder =function (content,type,typeOfCard,listOptions,oldValue,listDisplay){
    content +=     '<div class="item">'
    content +=         '<label>Type</label>'
    content +=         '<select name="'+type+'_type" required>'
    content +=                this.generateOptionSelect(listOptions.optionsType,oldValue.type);
    content +=         '</select>'
    content +=     '</div>'
    content +=     '<div class="item">'
    content +=          '<label>Indication</label>'
    if(listOptions.optionsLibre === "libre"){
        content +=      '<input id="boitier_indication_Pacemaker" name="'+type+'_indication" value="'+oldValue.indication+'" autocomplete="off">'
    }
    else{
        content +=          '<div id="boitier_indication_Pacemaker_div" class="two-element-side-by-side" '+listDisplay.paceDisplay+'>'
        content +=             '<div class="flex-grow">'
        content +=                 '<input id="boitier_indication_Pacemaker"  name="boitier_indication" list="boitier_indication_Pacemaker_dl" value="'+oldValue.indication+'" autocomplete="off">'
        content +=              '</div>'
        content +=              '<div class="buttons noMargin">'
        content +=                  '<button id="boitier_indication_Pacemaker_bt" style="float:right; height:35px">▼</button>'
        content +=              '</div>'
        content +=          '</div>'
        content +=          '<datalist id="boitier_indication_Pacemaker_dl">'
        content +=              '<select id="boitier_indication_Pacemaker_select" multiple size=11 >'
        content +=                     this.generateOptionSelect(listOptions.optionsPace);
        content +=              '</select>'
        content +=          '</datalist>'
        content +=          '<div id="boitier_indication_Holter_SC_div" class="two-element-side-by-side" '+listDisplay.holterDisplay+'>'
        content +=             '<div class="flex-grow">'
        content +=                 '<input id="boitier_indication_Holter_SC" name="boitier_indication" list="boitier_indication_Holter_SC_dl" value="'+oldValue.indication+'" autocomplete="off">'
        content +=              '</div>'
        content +=              '<div class="buttons noMargin">'
        content +=                  '<button id="boitier_indication_Holter_SC_bt">▼</button>'
        content +=              '</div>'
        content +=          '</div>'
        content +=          '<datalist id="boitier_indication_Holter_SC_dl">'
        content +=              '<select id="boitier_indication_Holter_SC_select" multiple size=11 >'
        content +=                     this.generateOptionSelect(listOptions.optionsHolter);
        content +=              '</select>'
        content +=          '</datalist>'
        content +=          '<select id="boitier_indication_Défibrillateur_prevention" name="boitier_indication" '+listDisplay.defDisplay+'>'
        content +=              this.generateOptionSelect(listOptions.optionsDef2,oldValue.indication2);
        content +=          '</select>'
        content +=          '<div id="boitier_indication_Défibrillateur_div" class="two-element-side-by-side" '+listDisplay.defDisplay+'>'
        content +=              '<div class="flex-grow">'
        content +=                  '<input id="boitier_indication_Défibrillateur" name="boitier_indication" list="boitier_indication_Défibrillateur_dl" value="'+oldValue.indication+'" autocomplete="off">'
        content +=              '</div>'
        content +=              '<div>'
        content +=                  '<button id="boitier_indication_Défibrillateur_bt">▼</button>'
        content +=              '</div>'
        content +=          '</div>'
        content +=          '<datalist id="boitier_indication_Défibrillateur_dl">'
        content +=              '<select id="boitier_indication_Défibrillateur_select" multiple size=8 >'
        content +=                  this.generateOptionSelect(listOptions.optionsDef);
        content +=              '</select>'
        content +=          '</datalist>'
    }
    content +=      '</div>'
    if(typeOfCard === "TAVICLIP" || typeOfCard === "FOPCIAFA"){
        content +=  '<div class="item">'
        content +=      '<label>Position</label>'
        content +=      '<select name="'+type+'_position">'
        content +=          this.generateOptionSelect(listOptions.optionsPosition,oldValue.position);
        content +=      '</select>'
        content +=  '</div>'

    }
    return content;
}

Uluru.prototype.resumeCardBuilder = function (){
    let onClickBtRecordCard = "uluru.recordCard()";
    let onClickBtGenerateCard = "uluru.saveSelection();uluru.generateCarte()";
    let onClickBtGenerateCR = "uluru.generateCR()";
    let onClickBtPrevious = "uluru.newCardWorkflowRenderer('new_card',uluru.formBoitierSondeBuilder('sonde3'))";
    if (this.data.carte.type_carte !=="PMKDAIHOL"){
        onClickBtPrevious = "uluru.loadStateOfFront()";
    }
    let content = this.addIconAndTitle();
    content +='<div class="step resume" id="resume">'
    content +=    '<div class="subtitle">Résumé</div>'
    content +=    '<div class="resume_data"></div>'
    content +=    '<div class="buttons">'
    content +=        '<button type="button" class="previous" onClick="'+onClickBtPrevious+'">Précédent</button>'
    if(this.record){
        content +=        '<button type="button" class="next record" onClick="'+onClickBtRecordCard+'">Enregistrer la carte</button>'
    }
    content +=        '<button type="button" class="next" onClick="'+onClickBtGenerateCard+'">Générer la carte</button>'
    content +=        '<button type="button" class="next" onClick="'+onClickBtGenerateCR+'">Générer le compte-rendu</button>'
    content +=    '</div>'
    content +='</div>'

    return content;
}


Uluru.prototype.renderSondeBuilder = function (content, sonde){
    var date_implantation = new moment(sonde.date_implantation).format("DD/MM/YYYY");

    content += "<div class='bloc materiel'>";
    content += "<div class='line'>";
    content += "<div class='item'><div class='value type'>SONDE " + sonde.type + "</div></div>";
    if(sonde.ref !== "") {
        content += "<div class='item'><div class='label'>REF: </div><div class='value bold'>&nbsp;" + sonde.ref + "</div></div>";
    }
    content += "<div class='item'><div class='value bold'>" + sonde.fabricant.substring(0, 25) + "</div> - <div class='value'>" + sonde.modele.split(" ")[0] + "</div></div>";
    content += "</div>";
    content += "<div class='line'>";
    content += "<div class='item'><div class='label'>SN: </div><div class='value bold'>&nbsp;" + sonde.sn + "</div></div>";
    content += "<div class='item'><div class='label'>CNX: </div><div class='value'>&nbsp;" + sonde.connexion + "</div></div>";
    content += "<div class='item'><div class='label'>Date implantation: </div><div class='value bold'>&nbsp;" + date_implantation + "</div></div>";
    content += "</div>";
    content += "</div>";

    return content;
}

Uluru.prototype.renderBoitierBuilder = function (content,boitier){
    var date_implantation = new moment(boitier.date_implantation).format("DD/MM/YYYY");
    let boitier_modele = " - "+boitier.modele.replace("Défibrillateur cardiaque", "");
    boitier_modele = boitier_modele.replace("Stimulateur cardiaque", "");
    boitier_modele = boitier_modele.replace("implantable", "");


    content += "<div class='bloc indication'>";
    content += "<div class='line'>";
    if(this.data.carte.indication && this.data.carte.indication !== " ") {
        content += "<div class='item'><div class='label'>Indication:</div><div class='value indication'>&nbsp;" + this.data.carte.indication + "</div>";
    }
    content += "</div>";
    if(this.data.carte.type_carte === "TAVICLIP" && boitier.position !== ""){
        content += "<div class='item'><div class='label'>Position:</div><div class='value indication'>&nbsp;" + boitier.position + "</div>";
    }
    content += "</div>";
    content += "</div>";
    content += "</div>";
    content += "<div class='bloc materiel'>";
    content += "<div class='line'>";
    content += "<div class='item'><div class='value type'>" + boitier.type + "</div></div>";
    if(boitier.ref !== ""){
        content += "<div class='item'><div class='label'>REF: </div><div class='value bold'>&nbsp;" + boitier.ref + "</div></div>";
    }
    if(boitier.fabricant !== "" && boitier_modele !== ""){
        content += "<div class='item'><div class='value bold'>" + boitier.fabricant.substring(0, 25) + "</div>  <div class='value'>" + boitier_modele.substring(0, 30) + "</div></div>";
    }
    content += "</div>";
    content += "<div class='line'>";
    content += "<div class='item'><div class='label'>SN: </div><div class='value bold'>&nbsp;" + boitier.sn + "</div></div>";
    content += "<div class='item'><div class='label'>Date implantation: </div><div class='value bold'>&nbsp;" + date_implantation + "</div></div>";
    content += "</div>";
    content += "</div>";
    return content;
}

Uluru.prototype.renderBoitierCompteRenduBuilder = function (content,boitier){
    var date_implantation = new moment(boitier.date_implantation).format("DD/MM/YYYY");

    content += "<div class='bloc materiel'>";
    content += "<div class='line'>";
    content += "<div class='item'><div class='value type'>" + boitier.type + "</div></div>";
    content += "<div class='item'><div class='label'>Fabricant: </div><div class='value'>" + boitier.fabricant + "</div></div>";
    content += "<div class='item'><div class='label'>Modèle: </div><div class='value'>" + boitier.modele.substring(0, 50) + "</div></div>";
    content += "</div>";
    content += "<div class='line'>";
    content += "<div class='item'><div class='label'>SN: </div><div class='value'>&nbsp;" + boitier.sn + "</div></div>";
    content += "<div class='item'><div class='label'>Date implantation: </div><div class='value'>&nbsp;" + date_implantation + "</div></div>";
    content += "<div class='item'><div class='label'>Référence: </div><div class='value'>&nbsp;" + boitier.ref + "</div></div>";
    content += "</div>";
    content += "</div>";
    return content
}