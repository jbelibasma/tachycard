Uluru.prototype.setNewCardEvents = function (){
    $('#PMKDAIHOL').click(function (){
        this.data.carte.type_carte = "PMKDAIHOL";
        this.newCardWorkflowRenderer("new_card",this.findPatientBuilder());
    }.bind(this));
    $('#TAVICLIP').click(function (){
        this.data.carte.type_carte = "TAVICLIP";
        this.newCardWorkflowRenderer("new_card",this.findPatientBuilder());
    }.bind(this));
    $('#FOPCIAFA').click(function (){
        this.data.carte.type_carte = "FOPCIAFA";
        this.newCardWorkflowRenderer("new_card",this.findPatientBuilder());
    }.bind(this));
    // $('#STENT').click(function (){
    //     this.data.carte.type_carte = "STENT";
    //     this.newCardWorkflowRenderer("main",this.createSchema());
    //     this.setEventCanvas();
    // }.bind(this));
    // FIND PATIENT
    $('#form_find_patient').submit(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FIND PATIENT");
        this.data.carte.patientSearch = {
            search_birth: false,
            search_nom: false,
            search_prenom: false,
            id: false
        };
        this.findPatient();
    }.bind(this));
    // Previous
    $('#form_find_patient .buttons .previous').submit(function (e) {
        this.newCardWorkflowRenderer("new_card",this.cardTypeBuilder());
    }.bind(this));

    this.setBoitierFormEvents();

    this.setSondeFormEvents();

    this.setNewMedecinFormEvents();

    this.setNewPatientFormEvents();

}
Uluru.prototype.setBoitierFormEvents = function (){
    // EVENT ON TYPE BOITIER CHANGE
    $("#form_boitier select[name='boitier_type']").change(function (e) {
        this.logMessage("BOITIER TYPE CHANGE");

        if ($("#form_boitier select[name='boitier_type']").val().length > 0) {
            this.displaySelectBoitier($("#form_boitier select[name='boitier_type']").val());
        }
    }.bind(this));
    // EVENT ON BOITIER CHANGE
    $("#form_boitier input[name='boitier_code']").keyup(function (e) {
        this.logMessage("BOITIER SN CHANGE");

        if ($("#form_boitier input[name='boitier_code']").val().length > 0) {

            try {
                clearTimeout(search_timer);
            } catch (error) {
            }

            search_timer = setTimeout(function () {
                this.searchSN("boitier");
            }.bind(this), 500);

        } else {
            this.data.carte.boitier = false;
        }

    }.bind(this));

    // EVENT ON BOITIER1 CHANGE
    $("#form_boitier1 input[name='boitier1_code']").keyup(function (e) {
        this.logMessage("BOITIER SN CHANGE");

        if ($("#form_boitier1 input[name='boitier1_code']").val().length > 0) {

            try {
                clearTimeout(search_timer);
            } catch (error) {
            }

            search_timer = setTimeout(function () {
                this.searchSN("boitier1");
            }.bind(this), 500);

        } else {
            this.data.carte.boitier1 = false;
        }

    }.bind(this));

    // EVENT ON BOITIER2 CHANGE
    $("#form_boitier2 input[name='boitier2_code']").keyup(function (e) {
        this.logMessage("BOITIER SN CHANGE");

        if ($("#form_boitier2 input[name='boitier2_code']").val().length > 0) {

            try {
                clearTimeout(search_timer);
            } catch (error) {
            }

            search_timer = setTimeout(function () {
                this.searchSN("boitier2");
            }.bind(this), 500);

        } else {
            this.data.carte.boitier2 = false;
        }

    }.bind(this));

    //TRANSFORM INDICATION DATALIST TO COMBOBOX
    //DEF
    $("#form_boitier button[id=boitier_indication_Défibrillateur_bt]").click(function (e) {
        e.preventDefault();
        this.toggleSelectBoitier("Défibrillateur");
    }.bind(this));
    $("#form_boitier select[id=boitier_indication_Défibrillateur_select]").change(function () {
        this.fillInput("Défibrillateur");
    }.bind(this));
    $("#form_boitier input[id=boitier_indication_Défibrillateur]").focus(function () {
        this.hideSelectBoitier("Défibrillateur");
    }.bind(this));
    //PMK
    $("#form_boitier button[id=boitier_indication_Pacemaker_bt]").click(function (e) {
        e.preventDefault();
        this.toggleSelectBoitier("Pacemaker");
    }.bind(this));
    $("#form_boitier select[id=boitier_indication_Pacemaker_select]").change(function () {
        this.fillInput("Pacemaker");
    }.bind(this));
    $("#form_boitier input[id=boitier_indication_Pacemaker]").focus(function () {
        this.hideSelectBoitier("Pacemaker");
    }.bind(this));
    //HOLTER
    $("#form_boitier button[id=boitier_indication_Holter_SC_bt]").click(function (e) {
        e.preventDefault();
        this.toggleSelectBoitier("Holter_SC");
    }.bind(this));
    $("#form_boitier select[id=boitier_indication_Holter_SC_select]").change(function () {
        this.fillInput("Holter_SC");
    }.bind(this));
    $("#form_boitier input[id=boitier_indication_Holter_SC]").focus(function () {
        this.hideSelectBoitier("Holter_SC");
    }.bind(this));


    // FORM BOITIER
    $('#form_boitier button[id=PMKDAIHOL_submit]').click(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM BOITIER");


        // SET DATA
        if (!this.data.carte.boitier) this.data.carte.boitier = {};
        this.data.carte.boitier.code_bar = $("#form_boitier input[name=boitier_code]").val();
        this.data.carte.boitier.fabricant = $("#form_boitier select[name=boitier_fabricant]").val();
        this.data.carte.boitier.type = $("#form_boitier select[name=boitier_type] option:selected").val();

        this.data.carte.indication = "";
        $("#form_boitier :input[name=boitier_indication]").each(function (index, element) {
            if ($(element).is(":visible")) {
                this.data.carte.indication += $(element).val() + " ";
            }
        }.bind(this));
        this.data.carte.boitier.modele = $("#form_boitier input[name=boitier_modele]").val();
        this.data.carte.boitier.ean = $("#form_boitier input[name=boitier_ean]").val();
        this.data.carte.boitier.sn = $("#form_boitier input[name=boitier_sn]").val();
        this.data.carte.boitier.ref = $("#form_boitier input[name=boitier_ref]").val();
        this.data.carte.boitier.date_implantation = this.reFormatDate($("#form_boitier input[name=boitier_date_implantation]").val());



        //INDICATION
        if($("#boitier_indication_Défibrillateur_prevention").is(":visible")){
            let secondValueIndication = $("#boitier_indication_Défibrillateur_prevention").val();
            this.data.carte.boitier.indication2 = secondValueIndication;
            this.data.carte.boitier.indication = this.data.carte.indication.replace(secondValueIndication,"");
        }else{
            this.data.carte.boitier.indication = this.data.carte.indication;
        }

        this.logMessage("BOITIER", this.data.carte.boitier);

        if(this.requiredValueBoitier(this.data.carte.boitier)){
            return;
        }

        this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("sonde1"))
        $("#form_sonde1 input[name='sonde1_code']").focus();
    }.bind(this));


    //FORM BOITIER FOR OTHER DMI
    $('#form_boitier button[id=OTHERS_submit]').click(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM BOITIER");

        if(this.setData("boitier") )return;
        this.saveStateOfFront("new_card",this.formBoitierSondeBuilder.bind(this));
        this.savedState.paramsBuilder = "boitier";


        this.logMessage("BOITIER", this.data.carte.boitier);
        this.newCardWorkflowRenderer("new_card",this.resumeCardBuilder())
        this.resumeCard();
        this.goToStep("resume");
    }.bind(this));
    $('#form_boitier button[id=OTHERS_add]').click(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM BOITIER");


        // SET DATA
        if(this.setData("boitier"))return;

        this.logMessage("BOITIER", this.data.carte.boitier);

        this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("boitier1"))
        $("#form_sonde1 input[name='boitier1_code']").focus();
    }.bind(this));
    //FORM BOITIER1 FOR OTHER DMI
    $('#form_boitier1 button[id=OTHERS_submit]').click(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM BOITIER");

        if(this.setData("boitier1") )return;
        console.log("DATA", this.data["carte"]);
        this.saveStateOfFront("new_card",this.formBoitierSondeBuilder.bind(this));
        this.savedState.paramsBuilder = "boitier1";


        this.logMessage("BOITIER", this.data.carte.boitier1);
        this.newCardWorkflowRenderer("new_card",this.resumeCardBuilder())
        this.resumeCard();
        this.goToStep("resume");
    }.bind(this));
    $('#form_boitier1 button[id=OTHERS_add]').click(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM BOITIER");


        // SET DATA
        //console.log("fab", $("#form_boitier input[name=boitier_fabricant]").val());
        if(this.setData("boitier1") )return;

        this.logMessage("BOITIER1", this.data.carte.boitier1);

        this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("boitier2"))
        $("#form_sonde2 input[name='boitier2_code']").focus();
    }.bind(this));
    //FORM BOITIER2 FOR OTHER DMI
    $('#form_boitier2 button[id=OTHERS_submit]').click(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM BOITIER");

        if(this.setData("boitier2") )return;

        this.saveStateOfFront("new_card",this.formBoitierSondeBuilder.bind(this));
        this.savedState.paramsBuilder = "boitier2";


        this.logMessage("BOITIER2", this.data.carte.boitier2);
        this.newCardWorkflowRenderer("new_card",this.resumeCardBuilder())
        this.resumeCard();
        this.goToStep("resume");
    }.bind(this));



}
Uluru.prototype.setData = function (boitierNum){
    // SET DATA
    //console.log("fab", $("#form_boitier input[name=boitier_fabricant]").val());
    if (!this.data.carte[boitierNum]) this.data.carte[boitierNum] = {};
    this.data.carte[boitierNum].code_bar = $("#form_"+boitierNum+" input[name="+boitierNum+"_code]").val();
    this.data.carte[boitierNum].fabricant = $("#form_"+boitierNum+" select[name="+boitierNum+"_fabricant]").val();
    if(this.data.carte.type_carte === "TAVICLIP" || this.data.carte.type_carte === "FOPCIAFA"){
        this.data.carte[boitierNum].position = $("#form_"+boitierNum+" select[name="+boitierNum+"_position] option:selected").val();
    }
    this.data.carte[boitierNum].type = $("#form_"+boitierNum+" select[name="+boitierNum+"_type] option:selected").val();
    this.data.carte.indication = $("#form_"+boitierNum+" input[name="+boitierNum+"_indication]").val();
    this.data.carte[boitierNum].modele = $("#form_"+boitierNum+" input[name="+boitierNum+"_modele]").val();
    this.data.carte[boitierNum].ean = $("#form_"+boitierNum+" input[name="+boitierNum+"_ean]").val();
    this.data.carte[boitierNum].sn = $("#form_"+boitierNum+" input[name="+boitierNum+"_sn]").val();
    this.data.carte[boitierNum].ref = $("#form_"+boitierNum+" input[name="+boitierNum+"_ref]").val();
    this.data.carte[boitierNum].date_implantation = this.reFormatDate($("#form_"+boitierNum+" input[name="+boitierNum+"_date_implantation]").val());


    //INDICATION
    this.data.carte[boitierNum].indication = this.data.carte.indication;
    return this.requiredValueBoitier(this.data.carte[boitierNum]);
}

Uluru.prototype.setSondeFormEvents =function (){
    // EVENT ON SONDE 1 SN CHANGE
    $("#form_sonde1 input[name='sonde1_code']").keyup(function (e) {
        this.logMessage("SONDE 1 SN CHANGE");

        if ($("#form_sonde1 input[name='sonde1_code']").val().length > 0) {

            try {
                clearTimeout(search_timer);
            } catch (error) {
            }

            search_timer = setTimeout(function () {
                this.searchSN("sonde1");
            }.bind(this), 500);

        } else {
            this.data.carte.sonde1 = false;
        }

    }.bind(this));


    // EVENT ON SONDE 2 SN CHANGE
    $("#form_sonde2 input[name='sonde2_code']").keyup(function (e) {
        this.logMessage("SONDE 2 SN CHANGE");

        if ($("#form_sonde2 input[name='sonde2_code']").val().length > 0) {

            try {
                clearTimeout(search_timer);
            } catch (error) {
            }

            search_timer = setTimeout(function () {
                this.searchSN("sonde2");
            }.bind(this), 500);

        } else {
            this.data.carte.sonde2 = false;
        }

    }.bind(this));


    // EVENT ON SONDE 3 SN CHANGE
    $("#form_sonde3 input[name='sonde3_code']").keyup(function (e) {
        this.logMessage("SONDE 3 SN CHANGE");

        if ($("#form_sonde3 input[name='sonde3_code']").val().length > 0) {

            try {
                clearTimeout(search_timer);
            } catch (error) {
            }

            search_timer = setTimeout(function () {
                this.searchSN("sonde3");
            }.bind(this), 500);

        } else {
            this.data.carte.sonde3 = false;
        }

    }.bind(this));

    // FORM SONDE 1
    $('#form_sonde1 button[id=PMKDAIHOL_submit]').click(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM SONDE 1");

        // SET DATA
        if (!this.data.carte.sonde1) this.data.carte.sonde1 = {};
        this.data.carte.sonde1.code_bar = $("#form_sonde1 input[name=sonde1_code]").val();
        this.data.carte.sonde1.fabricant = $("#form_sonde1 select[name=sonde1_fabricant]").val();
        this.data.carte.sonde1.modele = $("#form_sonde1 input[name=sonde1_modele]").val();
        this.data.carte.sonde1.ean = $("#form_sonde1 input[name=sonde1_ean]").val();
        this.data.carte.sonde1.sn = $("#form_sonde1 input[name=sonde1_sn]").val();
        this.data.carte.sonde1.date_implantation = this.reFormatDate($("#form_sonde1 input[name=sonde1_date_implantation]").val());
        this.data.carte.sonde1.connexion = $("#form_sonde1 select[name=sonde1_connexion] option:selected").val();
        this.data.carte.sonde1.type = $("#form_sonde1 select[name=sonde1_type] option:selected").val();
        this.data.carte.sonde1.ref = $("#form_sonde1 input[name=sonde1_ref]").val();


        this.logMessage("SONDE 1", this.data.carte.sonde1);

        // CHECK IF SN EXISTS
        if (this.data.carte.sonde1.sn.length > 0 && this.data.carte.boitier.sn === this.data.carte.sonde1.sn) {
            notification.create({
                icon: "warning-orange.svg",
                title: "Attention",
                content: "Ce numéro de série a déjà été saisi pour le boitier"
            })
            return false;
        }

        this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("sonde2"))
        $("#form_sonde2 input[name='sonde2_code']").focus();
    }.bind(this));


    // FORM SONDE 2
    $('#form_sonde2 button[id=PMKDAIHOL_submit]').click(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM SONDE 2");

        // SET DATA
        if (!this.data.carte.sonde2) this.data.carte.sonde2 = {};
        this.data.carte.sonde2.code_bar = $("#form_sonde2 input[name=sonde2_code]").val();
        this.data.carte.sonde2.fabricant = $("#form_sonde2 select[name=sonde2_fabricant]").val();
        this.data.carte.sonde2.modele = $("#form_sonde2 input[name=sonde2_modele]").val();
        this.data.carte.sonde2.ean = $("#form_sonde2 input[name=sonde2_ean]").val();
        this.data.carte.sonde2.sn = $("#form_sonde2 input[name=sonde2_sn]").val();
        this.data.carte.sonde2.date_implantation = this.reFormatDate($("#form_sonde2 input[name=sonde2_date_implantation]").val());
        this.data.carte.sonde2.connexion = $("#form_sonde2 select[name=sonde2_connexion] option:selected").val();
        this.data.carte.sonde2.type = $("#form_sonde2 select[name=sonde2_type] option:selected").val();
        this.data.carte.sonde2.ref = $("#form_sonde2 input[name=sonde2_ref]").val();

        this.logMessage("SONDE 2", this.data.carte.sonde2);

        console.log($("#form_sonde2 input[name=sonde2_modele]").val())

        // CHECK IF SN EXISTS
        if (this.data.carte.sonde2.sn.length > 0 && this.data.carte.sonde1.sn === this.data.carte.sonde2.sn) {
            notification.create({
                icon: "warning-orange.svg",
                title: "Attention",
                content: "Ce numéro de série a déjà été saisi pour la sonde 1"
            })
            return false;
        }

        this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("sonde3"))
        $("#form_sonde3 input[name='sonde3_code']").focus();

    }.bind(this));


    // FORM SONDE 3
    $('#form_sonde3 button[id=PMKDAIHOL_submit]').click(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM SONDE 3");

        // SET DATA
        if (!this.data.carte.sonde3) this.data.carte.sonde3 = {};
        this.data.carte.sonde3.code_bar = $("#form_sonde3 input[name=sonde3_code]").val();
        this.data.carte.sonde3.fabricant = $("#form_sonde3 select[name=sonde3_fabricant]").val();
        this.data.carte.sonde3.modele = $("#form_sonde3 input[name=sonde3_modele]").val();
        this.data.carte.sonde3.ean = $("#form_sonde3 input[name=sonde3_ean]").val();
        this.data.carte.sonde3.sn = $("#form_sonde3 input[name=sonde3_sn]").val();
        this.data.carte.sonde3.date_implantation = this.reFormatDate($("#form_sonde3 input[name=sonde3_date_implantation]").val());
        this.data.carte.sonde3.connexion = $("#form_sonde3 select[name=sonde3_connexion] option:selected").val();
        this.data.carte.sonde3.type = $("#form_sonde3 select[name=sonde3_type] option:selected").val();
        this.data.carte.sonde3.ref = $("#form_sonde3 input[name=sonde3_ref]").val();

        this.logMessage("SONDE 3", this.data.carte.sonde3);

        // CHECK IF SN EXISTS
        if (this.data.carte.sonde3.sn.length > 0 && this.data.carte.sonde2.sn === this.data.carte.sonde3.sn) {
            notification.create({
                icon: "warning-orange.svg",
                title: "Attention",
                content: "Ce numéro de série a déjà été saisi pour la sonde 2"
            })
            return false;
        }

        this.newCardWorkflowRenderer("new_card",this.resumeCardBuilder())
        this.resumeCard();
        this.goToStep("resume");
        // ACTION !
    }.bind(this));
}
// NEW PATIENT
Uluru.prototype.setNewPatientFormEvents = function (){
    $( "#form_new_patient input[name='nom']" ).keydown(function( e ) {
        this.verifierCaracteres(e);
    }.bind(this));
    $( "#form_new_patient input[name='prenom']" ).keydown(function( e ) {
        this.verifierCaracteres(e);
    }.bind(this));
    $('#form_new_patient').submit(function (e) {
        e.preventDefault();
        this.logMessage("CLICK ON NEW PATIENT");
        this.newPatient();
    }.bind(this));
}
// NEW MEDECIN
Uluru.prototype.setNewMedecinFormEvents = function (){
    $( "#form_new_medecin input[name='nom']" ).keydown(function( e ) {
        this.verifierCaracteres(e);
    }.bind(this));
    $( "#form_new_medecin input[name='prenom']" ).keydown(function( e ) {
        this.verifierCaracteres(e);
    }.bind(this));
    $('#form_new_medecin').submit(function (e) {
        e.preventDefault();
        this.logMessage("CLICK ON NEW MEDECIN");
        this.newMedecin();
    }.bind(this));
}


Uluru.prototype.requiredValueBoitier = function (boitier){
    if(boitier.type === ""){
        notification.create({
            title: "Champ vide",
            content: "Il faut sélectionner un type de boitier",
            icon: "warning-orange.svg",
            delay: 5000
        });
        return true;
    }
    if(boitier.sn === ""){
        notification.create({
            title: "Champ vide",
            content: "Il faut sélectionner un numéro de série",
            icon: "warning-orange.svg",
            delay: 5000
        });
        return true;
    }
    return false;
}