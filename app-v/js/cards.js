Uluru.prototype.initCardsEvents = function () {

    this.logMessage("INIT CARDS EVENTS");



    // $("#form_boitier input[id=boitier_indication_Pacemaker]").show();



    // FIND CARD
    $('#find_card').submit(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FIND CARD");
        this.findCard();
    }.bind(this));



    // FORM INDICATION
    $('#form_indication').submit(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM INDICATION");

        // SET DATA
        this.data.carte.indication = $("#form_indication input[name=boitier_indication]").val();
        this.logMessage("INDICATION", this.data.carte.indication);

        this.goToStep("boitier");
        $("#boitier_code").focus();
    }.bind(this));










    /*
        // NOUVELLE RECHERCHE PATIENT
        $('#btn_new_find_patient').click(function (e) {
            this.logMessage("NEW FIND PATIENT");
            $('#new_carte .step.patient').addClass("visible");
            $('#new_carte .step.liste_patients').removeClass("visible");
        }.bind(this));
    */

    /*
        // NOUVEAU PATIENT
        $('#btn_new_patient').click(function (e) {
            this.logMessage("NEW PATIENT");
            $('#new_carte .step.patient').removeClass("visible");
            $('#new_carte .step.liste_patients').removeClass("visible");
            $('#new_carte .step.new_patient').addClass("visible");
        }.bind(this));


        // NOUVEAU PATIENT 1
        $('#btn_new_patient1').click(function (e) {
            this.logMessage("NEW PATIENT 1");
            $('#new_carte .step.patient').removeClass("visible");
            $('#new_carte .step.liste_patients').removeClass("visible");
            $('#new_carte .step.new_patient').addClass("visible");
        }.bind(this));
    */
    /*
        // STEP LISTE PATIENTS
        $('#btn_step_liste_patients').click(function (e) {
            this.logMessage("BTN LISTE PATIENTS");
            $('#new_carte .step.liste_medecins').removeClass("visible");
            $('#new_carte .step.liste_patients').addClass("visible");
        }.bind(this));
    */
    /*
        // STEP LISTE MEDECINS
        $('#btn_step_liste_medecins').click(function (e) {
            this.logMessage("BTN LISTE MEDECINS");
            $('#new_carte .step.boitier').removeClass("visible");
            $('#new_carte .step.liste_medecins').addClass("visible");
        }.bind(this));
    */




    //  ---------- BUTTONS AND SUBMIT ---------------

    /*
        // INFOS SUIVANT
        $('#new_carte .step.infos button.next').click(function (e) {
            this.logMessage("TO HEART MAP");
            $("#new_carte .step").removeClass("visible");
            $("#new_carte .map").addClass("visible");
            $("#new_carte input[name=boiter_sn]").focus();
        }.bind(this));


        // MAP PRECEDENT
        $('#new_carte .step.map button.previous').click(function (e) {
            this.logMessage("TO INFOS");
            $("#new_carte .step").removeClass("visible");
            $("#new_carte .infos").addClass("visible");
        }.bind(this));


        // CR BUTTON
        $('#new_carte_form button.cr').click(function () {
            this.logMessage("CLICK ON GENERATE CR");
            this.generateCR();
        }.bind(this));


        // CARD BUTTON
        $('#new_carte button.card').click(function (e) {
            this.logMessage("CLICK ON GENERATE CARD");
            this.generateCarte();
        }.bind(this));


        // RECORD BUTTON
        $('#new_carte button.record').click(function (e) {
            this.logMessage("CLICK ON RECORD CARD");
            this.recordCard();
        }.bind(this));


        // EVENT ON NEW CARTE SUBMIT
        $('#new_carte_form').submit(function (e) {

            this.logMessage("NEW CARTE FORM SUBMIT");
            e.preventDefault();
            this.generateCarte();

        }.bind(this));
    */

    /*
        // EVENT ON NEW CARTE INPUT CODE 1
        $("#new_carte_form input[name='code1']").keyup(function (e) {
            this.logMessage("CODE1 CHANGE");

            if ($("#new_carte_form input[name='code1']").val().length > 0) {

                try {
                    clearTimeout(search_timer);
                } catch (e) {
                }

                search_timer = setTimeout(function () {
                    this.searchSN("1");
                }.bind(this), 300);
            }

        }.bind(this));


        // EVENT ON NEW CARTE INPUT CODE 3
        $("#new_carte_form input[name='code3']").keyup(function (e) {
            this.logMessage("CODE3 CHANGE");

            if ($("#new_carte_form input[name='code3']").val().length > 0) {

                try {
                    clearTimeout(search_timer);
                } catch (e) {
                }

                search_timer = setTimeout(function () {
                    this.searchSN("3");
                }.bind(this), 500);
            }

        }.bind(this));


        // EVENT ON NEW CARTE INPUT PRENOM
        $("#new_carte_form input[name='prenom']").keyup(function (e) {
            this.logMessage("PRENOM CHANGE");

            var value = $("#new_carte_form input[name='prenom']").val();

            if (value.length > 1) {
                $("#new_carte_form .process.prenom").html("<img src='images/check.svg'>");
            } else {
                $("#new_carte_form .process.prenom").html("<img src='images/error.svg'>");
            }

        }.bind(this));


        // EVENT ON NEW CARTE INPUT NOM
        $("#new_carte_form input[name='nom']").keyup(function (e) {
            this.logMessage("NOM CHANGE");

            var value = $("#new_carte_form input[name='nom']").val();

            if (value.length > 1) {
                $("#new_carte_form .process.nom").html("<img src='images/check.svg'>");
            } else {
                $("#new_carte_form .process.nom").html("<img src='images/error.svg'>");
            }

        }.bind(this));


        // EVENT ON MEDECIN NAME INPUT MEDECIN
        $("#new_carte_form input[name='nom_medecin']").change(function (e) {
            this.logMessage("NOM MEDECIN CHANGE");

            var value = $("#new_carte_form input[name='nom_medecin']").val();

            if (value.length > 1) {
                $("#new_carte_form .process.nom_medecin").html("<img src='images/check.svg'>");
            } else {
                $("#new_carte_form .process.nom_medecin").html("<img src='images/error.svg'>");
            }

        }.bind(this));


        // EVENT ON NEW CARTE INPUT DATE NAISSANCE
        $("#new_carte_form input[name='date_naissance']").change(function (e) {
            this.logMessage("DATE NAISSANCE CHANGE");

            var value = $("#new_carte_form input[name='date_naissance']").val();

            if (value.length >= 10) {

                // PARSE DATE
                if (new moment(value).isValid()) {

                    $("#new_carte_form .process.date_naissance").html("<img src='images/check.svg'>");

                } else {

                    $("#new_carte_form .process.date_naissance").html("<img src='images/error.svg'>");
                }


            } else {

                $("#new_carte_form .process.date_naissance").html("<img src='images/error.svg'>");

            }

        }.bind(this));


        // EVENT ON NEW CARTE INPUT DATE IMPLANTATION 1
        $("#new_carte_form input[name='date_implantation1']").keyup(function (e) {
            this.logMessage("DATE IMPLANTATION 1 CHANGE");

            var value = $("#new_carte_form input[name='date_implantation1']").val();

            console.log(value);

            if (value.length >= 10) {

                // PARSE DATE
                if (new moment(value).isValid()) {

                    $("#new_carte_form .process.date_implantation1").html("<img src='images/check.svg'>");

                } else {

                    $("#new_carte_form .process.date_implantation1").html("<img src='images/error.svg'>");
                }


            } else {

                $("#new_carte_form .process.date_implantation1").html("<img src='images/error.svg'>");

            }

        }.bind(this));

        // EVENT ON NEW CARTE INPUT DATE IMPLANTATION 1
        $("#new_carte_form input[name='date_implantation1']").keyup(function (e) {
            this.logMessage("DATE IMPLANTATION 1 CHANGE");

            var value = $("#new_carte_form input[name='date_implantation1']").val();

            if (value.length >= 10) {

                // PARSE DATE
                if (new moment(value).isValid()) {

                    $("#new_carte_form .process.date_implantation1").html("<img src='images/check.svg'>");

                } else {

                    $("#new_carte_form .process.date_implantation1").html("<img src='images/error.svg'>");
                }


            } else {

                $("#new_carte_form .process.date_implantation1").html("<img src='images/error.svg'>");

            }

        }.bind(this));

        // EVENT ON NEW CARTE INPUT DATE IMPLANTATION 3
        $("#new_carte_form input[name='date_implantation3']").keyup(function (e) {
            this.logMessage("DATE IMPLANTATION 3 CHANGE");

            var value = $("#new_carte_form input[name='date_implantation3']").val();

            if (value.length >= 10) {

                // PARSE DATE
                if (new moment(value).isValid()) {

                    $("#new_carte_form .process.date_implantation3").html("<img src='images/check.svg'>");

                } else {

                    $("#new_carte_form .process.date_implantation3").html("<img src='images/error.svg'>");
                }


            } else {

                $("#new_carte_form .process.date_implantation3").html("<img src='images/error.svg'>");

            }

        }.bind(this));



























        /*
        // NEW CARTE TO STEP 1
        $('#new_carte .step1 button.next').click(function (e) {
            this.logMessage("TO STEP 1");
            $("#new_carte .step").removeClass("visible");
            $("#new_carte .step1").addClass("visible");
            $("#new_carte input[name='code1']").focus();
            if (this.data.carte["1"]) this.data.carte["1"].date_implantation = $("#new_carte input[name='date_implantation1']").val();
        }.bind(this));

        // NEW CARTE TO STEP 3
        $('#new_carte .step1 button.next').click(function (e) {
            this.logMessage("TO STEP 3");
            $("#new_carte .step").removeClass("visible");
            $("#new_carte .step3").addClass("visible");
            $("#new_carte input[name='code3']").focus();
            if (this.data.carte["1"]) this.data.carte["1"].date_implantation = $("#new_carte input[name='date_implantation1']").val();
        }.bind(this));

        // NEW CARTE TO STEP 4
        $('#new_carte .step3 button.next').click(function (e) {
            this.logMessage("TO STEP 4");
            $("#new_carte .step").removeClass("visible");
            $("#new_carte .step4").addClass("visible");
            if (this.data.carte["3"]) this.data.carte["3"].date_implantation = $("#new_carte input[name='date_implantation3']").val();
        }.bind(this));

        // NEW CARTE BACK TO STEP 1
        $('#new_carte .step1 button.previous').click(function (e) {
            this.logMessage("TO STEP 1");
            $("#new_carte .step").removeClass("visible");
            $("#new_carte .step1").addClass("visible");
            $("#new_carte input[name='code1']").focus();
        }.bind(this));

        // NEW CARTE BACK TO STEP 1
        $('#new_carte .step3 button.previous').click(function (e) {
            this.logMessage("TO STEP 1");
            $("#new_carte .step").removeClass("visible");
            $("#new_carte .step1").addClass("visible");
        }.bind(this));

        // NEW CARTE BACK TO STEP 3
        $('#new_carte .step4 button.previous').click(function (e) {
            this.logMessage("TO STEP 3");
            $("#new_carte .step").removeClass("visible");
            $("#new_carte .step3").addClass("visible");
        }.bind(this));

         */

};

/*
Uluru.prototype.checkCard = function (card) {

    this.logMessage("CHECK CARD", card);

    var value1 = this.data.carte[card].sn;
    var value1 = this.data.carte[card].date_implantation;

    console.log(value1, value1);

    // PARSE DATE
    if (value1 && new moment(value1).isValid() && value1 && value1.length > 0) {
        $("#new_carte_form .material." + card).addClass("done");
    } else {
        $("#new_carte_form .material." + card).removeClass("done");
    }
};
*/


Uluru.prototype.resetCard = function () {

    this.logMessage("RESET CARD");

    this.data.carte = {
        indication: false,
        type_carte:false,
        boitier: {
            code_bar: false,
            fabricant: false,
            modele: false,
            sn: false,
            ean: false,
            type: false,
            date_implantation: false,
            ref: false,
            indication: false,
            indication2: false,
            position: false
        },
        boitier1: {
            code_bar: false,
            fabricant: false,
            modele: false,
            sn: false,
            ean: false,
            type: false,
            date_implantation: false,
            ref: false,
            indication: false,
            indication2: false,
            position: false
        },
        boitier2: {
            code_bar: false,
            fabricant: false,
            modele: false,
            sn: false,
            ean: false,
            type: false,
            date_implantation: false,
            ref: false,
            indication: false,
            indication2: false,
            position: false
        },
        sonde1: {
            code_bar: false,
            fabricant: false,
            modele: false,
            sn: false,
            ean: false,
            date_implantation: false,
            connexion: false,
            ref: false
        },
        sonde2: {
            code_bar: false,
            fabricant: false,
            modele: false,
            sn: false,
            ean: false,
            date_implantation: false,
            connexion: false,
            ref: false
        },
        sonde3: {
            code_bar: false,
            fabricant: false,
            modele: false,
            sn: false,
            ean: false,
            date_implantation: false,
            connexion: false,
            ref: false
        },
        patient: false,
        medecin: false,
        centre: false,
        patientSearch: {
            id: false,
            search: false
        },
        id: false
    };

    // document.getElementById("form_find_patient").reset();
    // document.getElementById("form_new_patient").reset();
    // document.getElementById("form_indication").reset();
    // document.getElementById("form_boitier").reset();
    // document.getElementById("form_sonde1").reset();
    // document.getElementById("form_sonde2").reset();
    // document.getElementById("form_sonde3").reset();


};


Uluru.prototype.hideNewCardForm = function () {

    this.logMessage("HIDE NEW CARD FORM");
    $('.screen.new_carte').removeClass("visible");

};


Uluru.prototype.showNewCard = function () {
    this.logMessage("SHOW NEW CARD FORM");
    // this.resetCard();
    this.initNewCardDivRenderer();
    this.newCardWorkflowRenderer("new_card",this.cardTypeBuilder());

    this.setNewCardEvents();
    // this.showScreen("new_carte");
    // this.goToStep("card_type");
    $('.screen.new_carte').addClass("visible");
    $("#form_find_patient input[name='search']").focus();
};

Uluru.prototype.toggleSelectBoitier = function (origine) {
    let datalist = $("#form_boitier datalist[id=boitier_indication_"+origine+"_dl]");
    let button = $("#form_boitier button[id=boitier_indication_"+origine+"_bt]");
    let input = $("#form_boitier input[id=boitier_indication_"+origine+"]");
    let select = document.getElementById("boitier_indication_"+origine+"_select");
    let options = select.options;
    if(!datalist.is(':visible')){
        /* show DDL */
        datalist.show();
        button.prop('value', "Ã¢Â–Â²");
        var val  = input.val();
        for(var i=0; i<options.length; i++) {
            if ( options[i].text === val ) {
                select.selectedIndex = i; break;
            }
        }
    }
    else this.hideSelectBoitier(origine);
}
Uluru.prototype.hideSelectBoitier = function (origine) {
    let button = $("#form_boitier button[id=boitier_indication_"+origine+"_bt]");
    let datalist = $("#form_boitier datalist[id=boitier_indication_"+origine+"_dl]");
    datalist.hide();
    button.prop('value', "Ã¢Â–Â¼");
}
Uluru.prototype.fillInput = function (origine) {
    let select = document.getElementById("boitier_indication_"+origine+"_select");
    let input = $("#form_boitier input[id=boitier_indication_"+origine+"]");
    let options = select.options;
    input.val(options[select.selectedIndex].value);
    this.hideSelectBoitier(origine);
}
//TODO need to be refactor
Uluru.prototype.displaySelectBoitier = function (type) {
    if (type === "Défibrillateur") {
        //PAC
        $("#form_boitier div[id=boitier_indication_Pacemaker_div]").hide();
        $("#form_boitier input[id=boitier_indication_Pacemaker]").prop('required', false);
        //HOLTER
        $("#form_boitier div[id=boitier_indication_Holter_SC_div]").hide();
        $("#form_boitier input[id=boitier_indication_Holter_SC]").prop('required', false);
        //DEF
        $("#form_boitier div[id=boitier_indication_Défibrillateur_div]").show();
        $("#form_boitier input[id=boitier_indication_Défibrillateur]").prop('required', true);
        $("#form_boitier select[id=boitier_indication_Défibrillateur_prevention]").show();
        $("#form_boitier select[id=boitier_indication_Défibrillateur_prevention]").prop('required', true);
    }
    if(type === "Holter SC"){
        //DEF
        $("#form_boitier div[id=boitier_indication_Défibrillateur_div]").hide();
        $("#form_boitier input[id=boitier_indication_Défibrillateur]").prop('required', false);
        $("#form_boitier select[id=boitier_indication_Défibrillateur_prevention]").hide();
        $("#form_boitier select[id=boitier_indication_Défibrillateur_prevention]").prop('required', false);
        //PAC
        $("#form_boitier div[id=boitier_indication_Pacemaker_div]").hide();
        $("#form_boitier input[id=boitier_indication_Pacemaker]").prop('required', false);
        //HOLTER
        $("#form_boitier div[id=boitier_indication_Holter_SC_div]").show();
        $("#form_boitier input[id=boitier_indication_Holter_SC]").prop('required', true);
    }
    if(type !== "Holter SC" && type !== "Défibrillateur") {
        //DEF
        $("#form_boitier div[id=boitier_indication_Défibrillateur_div]").hide();
        $("#form_boitier input[id=boitier_indication_Défibrillateur]").prop('required', false);
        $("#form_boitier select[id=boitier_indication_Défibrillateur_prevention]").hide();
        $("#form_boitier select[id=boitier_indication_Défibrillateur_prevention]").prop('required', false);
        //PAC
        $("#form_boitier div[id=boitier_indication_Pacemaker_div]").show();
        $("#form_boitier input[id=boitier_indication_Pacemaker]").prop('required', true);
        //HOLTER
        $("#form_boitier div[id=boitier_indication_Holter_SC_div]").hide();
        $("#form_boitier input[id=boitier_indication_Holter_SC]").prop('required', false);

    }

};

Uluru.prototype.searchSN = function (origine) {

    this.logMessage("SEARCH CODE", origine);

    var before = function () {
        this.showLoading();
        //$("#new_carte_form .process." + code).html("<div class='loadBall'></div>");
    }.bind(this);

    var success = function (data) {

        this.hideLoading();

        this.logMessage(data);

        if (data.status === "OK") {

            if (data.result) {
                //$("#new_carte_form .process." + code).html("<img src='images/check.svg'>");

                const content =
                    "fabricant : " + data.result.fabricant + "<br>"
                    + "modèle : " + data.result.modele + "<br>"
                    + "ArtIdCIO : " + data.result.ArtIdCIO + "<br>"
                    + "ArtLib1 : " + data.result.ArtLib1 + "<br>"
                    + "ArtLib2 : " + data.result.ArtLib2 + "<br>"
                    + "ArtTaille2 : " + data.result.ArtTaille2 + "<br>"
                    + "Date Peremption : " + data.result.peremption + "<br>"
                    + "type : " + data.result.type + "<br>";

                notification.create({
                    title: "Matériel trouvé",
                    content: content,
                    icon: "check.svg",
                    delay: 4000,
                    keep: false,
                    close: true
                });

                // SET DATA TO OBJECT CARTE
                /*
                this.data.carte[origine].sn = data.result.sn;
                this.data.carte[origine].fabricant = data.result.fabricant;
                this.data.carte[origine].modele = data.result.modele;
                this.data.carte[origine].ean = data.result.ean;
                this.data.carte[origine].type = data.result.type;

                 */

                //GET ONLY FIRST WORD OF MODELE
                data.result.modele = data.result.modele.split(" ")[0];
                // SET DATA INTO FORM
                $("#form_" + origine + " input[name='" + origine + "_sn").val(data.result.sn);
                $("#form_" + origine + " input[name='" + origine + "_ean").val(data.result.ean);
                // $("#form_" + origine + " input[name='" + origine + "_fabricant").val(data.result.fabricant);
                $("#form_" + origine + " select[name='" + origine + "_fabricant").val(data.result.fabricant);
                $("#form_" + origine + " input[name='" + origine + "_modele").val(data.result.modele);
                $("#form_" + origine + " input[name='" + origine + "_ref").val(data.result.ref);

                if (origine === "boitier") {
                    $("#form_" + origine + " select[name='" + origine + "_type").val(data.result.type);
                    this.displaySelectBoitier(data.result.type);

                } else {
                    $("#form_" + origine + " select[name='" + origine + "_connexion").val(data.result.connexion);
                }
                if(this.greaterThanDateNow(data.result.peremption)){
                    alert("Materiel périmé");
                }
                // SET FOCUS TO DATE
                $("#form_" + origine + " input[name='" + origine + "_date_implantation").focus();


            } else {

                notification.create({
                    title: "Matériel non trouvé",
                    content: "Aucun matériel n'a été trouvé dans la base de données avec ce code barre",
                    icon: "warning-orange.svg",
                    delay: 5000
                });
                /*
                this.data.carte[origine].fabricant = false;
                this.data.carte[origine].modele = false;
                this.data.carte[origine].ean = false;
                this.data.carte[origine].sn = false;*/

                //$("#new_carte_form .material." + origine).removeClass("done");

            }

        } else {

            notification.create({
                title: "Matériel non trouvé",
                content: "Aucun matériel n'a été trouvé dans la base de données avec ce code barre",
                icon: "warning-orange.svg",
                delay: 5000
            });

            // RESET DATA
            /*
            this.data.carte[origine].fabricant = false;
            this.data.carte[origine].modele = false;
            this.data.carte[origine].ean = false;
            this.data.carte[origine].sn = false;
            */
            //$("#new_carte_form .material." + origine).removeClass("done");

        }

        //this.checkCard(origine);

    }.bind(this);

    var value = "code=" + $("#form_" + origine + " input[name='" + origine + "_code']").val();

    this.apiRequest("GET", "materiel", "get", value, before, success, false);


};

Uluru.prototype.saveSelection = function () {
    let form_data = new FormData();
    let listObject = {};
    let cpt = 0;
    for(let mat in this.data.carte){
        if(this.data.carte[mat].sn){
            let tmp = {};
            tmp["reference"] = this.data.carte[mat].ref;
            tmp["fabricant"] = this.data.carte[mat].fabricant;
            tmp["modele"] = this.data.carte[mat].modele;
            tmp["type"] = this.data.carte[mat].type;
            // listObject[this.data.carte[mat].sn] = tmp;
            form_data.append(""+cpt,JSON.stringify(tmp));
            cpt++;
        }
    }
    var success = function (data) {

        this.hideLoading();

        this.logMessage(data);

        if (data.status === "OK") {

            if (data.result) {
                this.logMessage(data.result);
            }

        } else {
            this.logMessage("Erreur lors de la sauvegarde des données sélectionnées");
        }


    }.bind(this);

    // Display the key/value pairs
    for (var pair of form_data.entries()) {
        this.logMessage(pair[0],pair[1]);
    }
    this.apiRequest("POST", "selection", "create", form_data, false, success, false);
}

Uluru.prototype.generateCarte = function () {

    this.logMessage("GENERATE CARTE");

    // REMOVE DATA
    $('#carte_print').remove();

    // SET BODY CLASS
    $("body").addClass("print_card");

    // CHECK DATA
    if (!this.data || !this.data.carte) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Il manque des informations pour générer la carte"
        });
        return false;
    }

    if (!this.data.carte.boitier.sn) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Le boitier n'est pas défini"
        });
        return false;
    }

    if (!this.data.carte.patient.prenom) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner le prénom du patient"
        });
        return false;
    }

    if (!this.data.carte.patient.nom) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner le nom du patient"
        });
        return false;
    }

    if (!this.data.carte.patient.date_naissance) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner la date de naissance nom du patient"
        });
        return false;
    }

    if (!this.data.carte.medecin.nom) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner le nom du médecin"
        });
        return false;
    }

    this.logMessage("OK, on a tout !");

    // CREATE CARTE PRINT
    $("body").append("<div id='carte_print'></div>");

    // ADD CONTENT
    $("#carte_print").append("<div class='content'></div>");

    // ADD CLOSE
    $("#carte_print").append("<div class='close'><img src='images/close.svg'></div>");
    $("#carte_print .close").click(function () {
        $('#carte_print').remove();
        $("body").removeClass("print_card");
    });

    // ADD PRINT BUTTON
    $("#carte_print").append("<button class='print_carte'>Imprimer</button>");
    $("#carte_print button.print_carte").click(function () {
        window.print();
    });

    // INIT DATE
    var date_naissance = new moment(this.data.carte.patient.date_naissance).format("DD/MM/YYYY");


    //SET TITLE
    let title = this.getTitleOfCard();


    //TODO add styles into css

    // SET CONTENT
    var content = "";
    content += "<div class='bloc' style='text-align: center;font-weight: bolder'>";
    content += title;
    content += "</div>";
    content += "<div class='bloc name'>";
    content += "<div class='line'>";
    content += "<div class='item'><div class='label'>Opérateur:</div><div class='value'>&nbsp;" + this.data.carte.medecin.nom + ", " + this.data.carte.medecin.prenom + "</div></div>";
    content += "</div>";
    content += "<div class='line'>";
    content += "<div class='item'><div class='label'>Nom: </div><div class='value bold'>&nbsp;" + this.data.carte.patient.nom + "</div><div class='label'>&nbsp;Prénom: </div><div class='value bold' > &nbsp;" + this.data.carte.patient.prenom  +"</div></div>";
    if (this.data.carte.patient.sonde_abandonnee) {
        let matAb = this.data.carte.patient.sonde_abandonnee ? "Oui" : "Non";
        content += "<div class='item'><div class='label'>Matériel abandonné:</div><div class='value'>&nbsp;" + matAb + "</div></div>";
    }
    // if (this.data.carte.id) {
    //     content += "<div class='item'><div class='label'>ID:</div><div class='value'>&nbsp;" + this.data.carte.id + "</div></div>";
    // }
    content += "</div>";
    content += "<div class='line'>";
    content += "<div class='item'><div class='label'>Date de naissance: </div><div class='value' >&nbsp;" + date_naissance + "</div></div>";
    content += "</div>";
    content += "</div>";

    if (this.data.carte.boitier.sn) {
        content = this.renderBoitierBuilder(content,this.data.carte.boitier);
    }
    if (this.data.carte.boitier1.sn) {
        content = this.renderBoitierBuilder(content,this.data.carte.boitier1);
    }
    if (this.data.carte.boitier2.sn) {
        content = this.renderBoitierBuilder(content,this.data.carte.boitier2);
    }


    if (this.data.carte.sonde1.sn) {
        content = this.renderSondeBuilder(content,this.data.carte.sonde1);
    }
    if (this.data.carte.sonde2.sn) {
        content = this.renderSondeBuilder(content,this.data.carte.sonde2);
    }
    if (this.data.carte.sonde3.sn) {
        content = this.renderSondeBuilder(content,this.data.carte.sonde3);
    }


    $("#carte_print .content").html(content);

    // SHOW CARTE
    $("#carte_print").addClass("visible");

}
Uluru.prototype.getTitleOfCard = function (){
    let typeOfCard = this.data.carte.type_carte;
    if (typeOfCard === false || typeOfCard === undefined){
        typeOfCard = "PMKDAIHOL";
    }
    let typeOfBoitier = this.data.carte.boitier.type;
    let listOfTitle = {
        "PMKDAIHOL":{
            "Pacemaker":"Carte de porteur de stimulateur cardiaque",
            "Défibrillateur":"Carte de porteur de défibrillateur cardiaque"
        },
        "TAVICLIP":{
            "TAVI":"Carte de porteur de TAVI",
            "MELODY":"Carte de porteur de MELODY",
            "TENDYNE":"Carte de porteur de TENDYNE",
            "CLIP":"Carte de porteur de CLIP"
        },
        "FOPCIAFA":{
            "Foramen Ovale Perméable":"Carte de porteur de FOP",
            "Communication InterAtriale":"Carte de porteur de CIA",
            "Auricule Gauche":"Carte de porteur de Auricule Gauche"
        }

    }
    let defaut = listOfTitle[typeOfCard][typeOfBoitier];
    if( defaut === undefined ){
        defaut = "Carte patient";
    }
    return defaut;
}
Uluru.prototype.getTitleOfMaterielCR = function (){
    let typeOfCard = this.data.carte.type_carte;
    if (typeOfCard === false || typeOfCard === undefined){
        typeOfCard = "PMKDAIHOL";
    }
    let listOfTitle = {
        "PMKDAIHOL":"Relatif à la pose de stimulateur cardiaque",
        "TAVICLIP":"Relatif à la pose d'une prothèse valvulaire",
        "FOPCIAFA":"Relatif à la pose d'une prothèse de fermeture"
    }
    return listOfTitle[typeOfCard];
}

Uluru.prototype.generateCR = function () {

    this.logMessage("GENERATE CR");


    // REMOVE PREVIOUS
    $('#cr_print').remove();

    $("body").addClass("print_cr");

    /*
        // ADD INFORMATIONS TO DATA
        this.data.carte.nom = $("#new_carte input[name='nom']").val();
        this.data.carte.prenom = $("#new_carte input[name='prenom']").val();
        this.data.carte.date_naissance = $("#new_carte input[name='date_naissance']").val();
        this.data.carte.nom_medecin = $("#new_carte input[name='nom_medecin']").val();
    */
    // CHECK DATA
    if (!this.data || !this.data.carte) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Il manque des informations pour générer la carte"
        });
        return false;
    }

    if (!this.data.carte.boitier.sn) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Le boitier n'est pas défini"
        });
        return false;
    }

    if (!this.data.carte.patient.prenom) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner le prénom du patient"
        });
        return false;
    }

    if (!this.data.carte.patient.nom) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner le nom du patient"
        });
        return false;
    }

    if (!this.data.carte.patient.date_naissance) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner la date de naissance nom du patient"
        });
        return false;
    }

    if (!this.data.carte.medecin.nom) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner le nom du médecin"
        });
        return false;
    }

    this.logMessage("OK, on a tout !");


    // CREATE CR PRINT
    $("body").append("<div id='cr_print'></div>");

    // ADD CONTENT
    $("#cr_print").append("<div class='content'></div>");

    // ADD CLOSE
    $("#cr_print").append("<div class='close'><img src='images/close.svg'></div>");
    $("#cr_print .close").click(function () {
        $('#cr_print').remove();
        $("body").removeClass("print_cr");
    });

    // ADD PRINT BUTTON
    $("#cr_print").append("<button class='print_cr'>Imprimer</button>");
    $("#cr_print button.print_cr").click(function () {
        window.print();
       
    });


    // INIT DATE
    var date_naissance = new moment(this.data.carte.patient.date_naissance).format("DD/MM/YYYY");

    //MATERIEL Title
    let titleMat = this.getTitleOfMaterielCR();

    // SET CONTENT
    var content = "";
    content += "<div class='bloc head'>";
    content += "<div class='logo'>TACHYCARD</div>";
    content += "<div class='title'><span class='bigger'>Rapport matériel</span><br>"+titleMat;
    if (this.data.carte.id) {
        content += "<br>Carte N°" + this.data.carte.id;
    }
    content += "</div>";
    content += "</div>";

    content += "<div class='bloc patient'>";
    content += "<div class='subbloc patient'>";
    content += "<div class='bloc_title'>Patient</div>";
    content += "<div class='item'>";
    content += "<div class='label'>Nom / Prénom</div><div class='value'><span class='fontbold'>" + this.data.carte.patient.nom + "</span> / " + this.data.carte.patient.prenom + "</div>";
    content += "<div class='label'>Date de naissance</div><div class='value'>" + date_naissance + "</div>";
    content += "</div>";
    content += "</div>";
    content += "</div>";

    content += "<div class='bloc centre'>";
    content += "<div class='subbloc centre'>";
    content += "<div class='bloc_title'>Centre d'implantation</div>";
    content += "<div class='item'><div class='value'>";
    content += "<span class='fontbold'>" + this.data.carte.centre.name + "</span><br>";
    content += this.data.carte.centre.adresse1 + "<br>";
    content += this.data.carte.centre.adresse2 + "<br>";
    content += this.data.carte.centre.adresse3 + "<br>";
    content += this.data.carte.centre.code_postal + " " + this.data.carte.centre.ville + "<br>";
    //content += this.data.centre.telephone;
    content += "</div>";
    content += "</div>";
    content += "</div>";

    content += "<div class='subbloc medecin'>";
    content += "<div class='bloc_title'>Opérateur implanteur</div>";
    content += "<div class='item'><div class='value'>Docteur " + this.data.carte.medecin.nom + ", " + this.data.carte.medecin.prenom + "</div>";
    content += "</div>";
    content += "</div>";

    content += "<div class='subbloc indication'>";
    content += "<div class='bloc_title'>Indication</div>";
    content += "<div class='item'><div class='value'>" + this.data.carte.indication + "</div>";
    content += "</div>";
    content += "</div>";


    content += "</div>";


    content += "<div class='main_bloc_materiel'>";

    content += "<div class='col materiels'>";

    content += "<div class='title'>Matériel(s) implanté(s)</div>";

    if (this.data.carte.boitier.sn) {
        content = this.renderBoitierCompteRenduBuilder(content,this.data.carte.boitier);
    }
    if (this.data.carte.boitier1.sn) {
        content = this.renderBoitierCompteRenduBuilder(content,this.data.carte.boitier1);
    }
    if (this.data.carte.boitier2.sn) {
        content = this.renderBoitierCompteRenduBuilder(content,this.data.carte.boitier2);
    }
    if (this.data.carte.sonde1.sn) {

        var date_implantation = new moment(this.data.carte.sonde1.date_implantation).format("DD/MM/YYYY");

        content += "<div class='bloc materiel'>";
        content += "<div class='line'>";
        content += "<div class='item'><div class='value type'>SONDE " + this.data.carte.sonde1.type + "</div></div>";
        content += "<div class='item'><div class='label'>Fabricant: </div><div class='value'>" + this.data.carte.sonde1.fabricant + "</div></div>";
        content += "<div class='item'><div class='label'>Modèle: </div><div class='value'>" + this.data.carte.sonde1.modele.substring(0, 50) + "</div></div>";
        content += "</div>";
        content += "<div class='line'>";
        content += "<div class='item'><div class='label'>SN: </div><div class='value'>&nbsp;" + this.data.carte.sonde1.sn + "</div></div>";
        content += "<div class='item'><div class='label'>Connexion: </div><div class='value'>&nbsp;" + this.data.carte.sonde1.connexion + "</div></div>";
        content += "<div class='item'><div class='label'>Date implantation: </div><div class='value'>&nbsp;" + date_implantation + "</div></div>";
        content += "<div class='item'><div class='label'>Référence: </div><div class='value'>&nbsp;" + this.data.carte.sonde1.ref + "</div></div>";
        content += "</div>";
        content += "</div>";
    }

    if (this.data.carte.sonde2.sn) {

        var date_implantation = new moment(this.data.carte.sonde2.date_implantation).format("DD/MM/YYYY");

        content += "<div class='bloc materiel'>";
        content += "<div class='line'>";
        content += "<div class='item'><div class='value type'>SONDE " + this.data.carte.sonde2.type + "</div></div>";
        content += "<div class='item'><div class='label'>Fabricant: </div><div class='value'>" + this.data.carte.sonde2.fabricant + "</div></div>";
        content += "<div class='item'><div class='label'>Modèle: </div><div class='value'>" + this.data.carte.sonde2.modele.substring(0, 50) + "</div></div>";
        content += "</div>";
        content += "<div class='line'>";
        content += "<div class='item'><div class='label'>SN: </div><div class='value'>&nbsp;" + this.data.carte.sonde2.sn + "</div></div>";
        content += "<div class='item'><div class='label'>Connexion: </div><div class='value'>&nbsp;" + this.data.carte.sonde2.connexion + "</div></div>";
        content += "<div class='item'><div class='label'>Date implantation: </div><div class='value'>&nbsp;" + date_implantation + "</div></div>";
        content += "<div class='item'><div class='label'>Référence: </div><div class='value'>&nbsp;" + this.data.carte.sonde2.ref + "</div></div>";
        content += "</div>";
        content += "</div>";
    }


    if (this.data.carte.sonde3.sn) {

        var date_implantation = new moment(this.data.carte.sonde3.date_implantation).format("DD/MM/YYYY");

        content += "<div class='bloc materiel'>";
        content += "<div class='line'>";
        content += "<div class='item'><div class='value type'>SONDE " + this.data.carte.sonde3.type + "</div></div>";
        content += "<div class='item'><div class='label'>Fabricant: </div><div class='value'>" + this.data.carte.sonde3.fabricant + "</div></div>";
        content += "<div class='item'><div class='label'>Modèle: </div><div class='value'>" + this.data.carte.sonde3.modele.substring(0, 50) + "</div></div>";
        content += "</div>";
        content += "<div class='line'>";
        content += "<div class='item'><div class='label'>SN: </div><div class='value'>&nbsp;" + this.data.carte.sonde3.sn + "</div></div>";
        content += "<div class='item'><div class='label'>Connexion: </div><div class='value'>&nbsp;" + this.data.carte.sonde3.connexion + "</div></div>";
        content += "<div class='item'><div class='label'>Date implantation: </div><div class='value'>&nbsp;" + date_implantation + "</div></div>";
        content += "<div class='item'><div class='label'>Référence: </div><div class='value'>&nbsp;" + this.data.carte.sonde3.ref + "</div></div>";
        content += "</div>";
        content += "</div>";
    }


    content += "</div>";

    //content += "<div class='col qr_code'></div>";

    content += "</div>";


    $("#cr_print .content").html(content);


    // GENERATE QR_CODE
    // FORMAT QR Code Data
    console.log(this);
    /*
        var qr_data = {};
        qr_data.b = {
            id_users: this.user.id_users,
            id_centre: this.centre.id_centre
        };
        if (this.data.carte["1"]) {
            qr_data.c1 = {
                sn: this.data.carte["1"].sn,
                ean: this.data.carte["1"].ean
            }
        }
        if (this.data.carte["1"]) {
            qr_data.c1 = {
                sn: this.data.carte["1"].sn,
                ean: this.data.carte["1"].ean
            }
        }
        if (this.data.carte["3"]) {
            qr_data.c3 = {
                sn: this.data.carte["3"].sn,
                ean: this.data.carte["3"].ean
            }
        }
        console.log(qr_data);
        var qr_data1 = encodeURI(JSON.stringify(qr_data));
        console.log(qr_data1.length);

     */
    if (this.data.carte.id) {
        const qr_data1 = this.data.carte.id;
        //$("#cr_print .col.qr_code").html("<div class='title'>QRCode de récupération</div><div id='qr_code'></div><div id='qr_code_clear'></div>");
        //new QRCode(document.getElementById('qr_code'), qr_data1);
        //$("#qr_code_clear").text(this.data.carte.id);

        //var str = "%7B%11b%11:%7B%11id!centre%11:%111%11%7D,%11c1%11:%7B%11sn%11:%1161066403%11,%11ean%11:%1104035479141063%11%7D,%11c1%11:%7B%11sn%11:%11747111%11,%11ean%11:%1100801516559488%11%7D,%11c3%11:%7B%11sn%11:%1149100111%11,%11ean%11:%1104035479118180%11%7D%7D";
        //console.log(JSON.parse(decodeURI(str)));
        //console.log(JSON.parse(atob(str)));
    }

    // SHOW CARTE
    $("#cr_print").addClass("visible");


};


Uluru.prototype.recordCard = function () {

    this.logMessage("RECORD CARD");
    /*
        // GET DATA
        this.data.carte.nom = $("#new_carte input[name='nom']").val();
        this.data.carte.prenom = $("#new_carte input[name='prenom']").val();
        this.data.carte.date_naissance = $("#new_carte input[name='date_naissance']").val();
        this.data.carte.nom_medecin = $("#new_carte input[name='nom_medecin']").val();
    */

    // INIT
    this.data.carte.patient.id_users = this.user.id;
    var carte_data = JSON.stringify(this.data);

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.hideLoading();

        this.logMessage(data);

        if (data.status === "OK") {

            notification.create({
                title: "Carte enregistrée",
                content: "La carte a été enregistrée avec succès",
                icon: "check.svg",
                delay: 5000
            });

            this.data.carte.id = data.result.id;

            this.resumeCard(false);

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

            this.data.carte.id = false;

        }

    }.bind(this);

    var form_data = new FormData();
    form_data.append("carte_data", carte_data);

    this.apiRequest("POST", "cartes", "record", form_data, before, success, false);


};


Uluru.prototype.findPatient = function () {
    this.logMessage("FIND PATIENT");

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            this.renderListePatients(data.result);

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

        }

    }.bind(this);


    let form_connect = null;
    let data = null;
    let search = this.data.carte.patientSearch;
    this.logMessage(search);
    if(search.id){
        data = new FormData();
        data.append("id",search.id);
    }
    else if(search.search_nom || search.search_prenom){
        data = new FormData();
        data.append("search_nom",search.search_nom);
        data.append("search_prenom",search.search_prenom);
        data.append("search_birth",search.search_birth);
    }
    else {
        form_connect = document.getElementById("form_find_patient");
        data = new FormData(form_connect);
        this.data.carte.patientSearch.search_nom = data.get("search_nom");
        this.data.carte.patientSearch.search_prenom = data.get("search_prenom");
        this.data.carte.patientSearch.search_birth = data.get("search_birth");
        this.data.carte.patientSearch.id = false;
    }


    this.apiRequest("POST", "users", "find_patients", data, before, success, false);


}


Uluru.prototype.findAllMedecins = function () {
    this.logMessage("FIND ALL MEDECINS");

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            this.renderListeMedecins(data.result);

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

        }

    }.bind(this);

    //var form_connect = document.getElementById("form_find_patient");
    //var data = new FormData(form_connect);

    this.apiRequest("GET", "users", "find_all_medecins", false, before, success, false);


}
Uluru.prototype.newMedecin = function () {

    this.logMessage("NEW MEDECIN");

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            notification.create({
                title: "Opérateur créé",
                content: "L'opérateur a été créé avec succès"
            });

            // SET DATA
            this.data.carte.medecin = {
                id: data.result.id,
                nom: data.result.nom,
                prenom: data.result.prenom,
            };

            // GO TO STEP BOITIER
            this.newCardWorkflowRenderer("new_card",this.listMedecinsBuilder(),this.findAllMedecins.bind(this));
            this.goToStep("boitier");


        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

        }

    }.bind(this);


    var form_connect = document.getElementById("form_new_medecin");
    var data = new FormData(form_connect);
    data.append("type", "medecin");
    this.apiRequest("POST", "users", "create", data, before, success, false);

}

Uluru.prototype.newPatient = function () {

    this.logMessage("NEW PATIENT");

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            notification.create({
                title: "Patient créé",
                content: "La patient a été créé avec succès"
            });

            // SET DATA
            this.data.carte.patient = {
                id: data.result.id,
                nom: data.result.nom,
                prenom: data.result.prenom,
                date_naissance: data.result.date_naissance
            };
            this.data.carte.patientSearch.id = data.result.id;
            this.data.carte.patientSearch.search = false;
            // //RERENDER PATIENT LIST
            // let list = new Array(this.data.carte.patient);
            // this.renderListePatients(list);
            // // GO TO STEP MEDECIN
            // this.goToStep("liste_medecins");

            // FIND MEDECINS
            this.findAllMedecins();
            this.newCardWorkflowRenderer("new_card",this.listMedecinsBuilder(),this.findAllMedecins.bind(this));

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

        }

    }.bind(this);



    var form_new_connect = document.getElementById("form_new_patient");
    var data = new FormData(form_new_connect);
    if(this.record){
        this.apiRequest("POST", "users", "new_patient", data, before, success, false);
    }
    // SET DATA
    else{
        this.data.carte.patient = {
            nom: data.get("nom"),
            prenom: data.get("prenom"),
            date_naissance: data.get("date_naissance"),
            sonde_abandonnee: data.get("user_mat_ab")
        };
        this.newCardWorkflowRenderer("new_card",this.listMedecinsBuilder(),this.findAllMedecins.bind(this));
    }
}


Uluru.prototype.renderListePatients = function (data) {
    this.logMessage("RENDER LIST PATIENTS", data);

    var container = "#new_card .step.liste_patients .liste";
    var ids = [];
    // $(container).empty();
    this.newCardWorkflowRenderer("new_card",this.listPatientsBuilder());
    data.forEach(function (item) {
        if(ids.indexOf(item.id) == -1){
        ids.push(item.id)
        var date_naissance = moment(item.date_naissance).format("DD MMMM YYYY");

        var content = "<div class='item patient' id='testDIv'>";
        content += "<div class='subItem flex-grow' id='pat_" + item.id + "'>";
        content += "<div class='cell nom'>" + item.nom + " <span class='prenom'> " + item.prenom + "</span><span class='date_naissance'> ( " + date_naissance + " )</span></div>";
        content += "</div>";
        content += "<div class='subItem'  style='float: right;' id='update_pat_" + item.id + "'>";
        content += "<span>Modifier</span>";
        content += "</div>";
        content += "</div>";


        $(container).append(content);

        // SET EVENTS
        $('#pat_' + item.id).click(function () {

            console.log("CLICK PATIENT ID", item.id);

            // SET PATIENT INTO DATA
            this.data.carte.patient = {
                nom: item.nom,
                prenom: item.prenom,
                date_naissance: item.date_naissance,
                id: item.id
            }

            // GO TO STEP MEDECIN
            // this.goToStep("liste_medecins");
            this.newCardWorkflowRenderer("new_card",this.listMedecinsBuilder(),this.findAllMedecins.bind(this));



        }.bind(this));
        $('#update_pat_' + item.id).click(function () {

            console.log("CLICK UPDATE PATIENT", item.id);
            this.saveStateOfFront("new_card",this.listPatientsBuilder.bind(this),this.findPatient.bind(this));
            this.renderUpdateUser(item,true);


        }.bind(this));
    }
    }.bind(this));

    // SHOW STEP
    // this.goToStep("liste_patients");
    
}


Uluru.prototype.renderListeMedecins = function (data) {
    this.logMessage("RENDER LIST MEDECINS", data);

    var container = "#new_card .step.liste_medecins .liste";
    $(container).empty();

    data.forEach(function (item) {

        //console.log(item);

        //var date_naissance = moment(item.date_naissance).format("DD MMMM YYYY");

        var content = "<div class='item' id='med_" + item.id + "'>";
        content += "<div class='cell nom'>" + item.nom + " <span class='prenom'> " + item.prenom + "</span></div>";
        content += "</div>";

        $(container).append(content);

        // SET EVENT
        $('#med_' + item.id).click(function () {

            console.log("CLICK MEDECIN ID", item.id);

            // SET MEDECIN INTO DATA
            this.data.carte.medecin = {
                nom: item.nom,
                prenom: item.prenom,
                id: item.id
            }

            // SET CENTRE INTO DATA
            //console.log("CENTRE", item.centre);
            this.data.carte.centre = item.centre;

            // GO TO STEP boitier
            //TODO ici j'ai fait en sorte qu'on est plus besoin du form indication
            // this.goToStep("boitier");
            this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("boitier"));
            $("#boitier_code").focus();
            // $("#form_indication input[name=boitier_indication]").focus();
         $("input", "#form_boitier").val("");
        }.bind(this));

    }.bind(this));

    // SHOW STEP
    this.goToStep("liste_medecins");
    //$('#new_carte .step.liste_medecins').addClass("visible");

}



Uluru.prototype.goToStep = function (step) {
    this.logMessage("GO TO STEP", step);

    $("#new_carte .step").removeClass("visible");
    $("#new_carte .step." + step).addClass("visible");

}


Uluru.prototype.resumeCard = function (previous = true) {

    this.logMessage("RESUME CARD",);

    this.logMessage("RESUME", this.data);

    var content = "";
    content += "<div class='line'>";

    content += "<div class='resume_bloc'>";
    content += "<div class='strong'>Patient</div>";
    var date_naissance = moment(this.data.carte.patient.date_naissance).format("DD/MM/YYYY");
    content += "<div>" + this.data.carte.patient.nom + "</div>";
    content += "<div>" + this.data.carte.patient.prenom + "</div>";
    content += "<div>" + date_naissance + "</div>";
    content += "</div>";

    content += "<div class='resume_bloc'>";
    content += "<div class='strong'>Opérateur</div>";
    content += "<div>" + this.data.carte.medecin.nom + "</div>";
    content += "<div>" + this.data.carte.medecin.prenom + "</div>";
    content += "</div>";

    content += "<div class='resume_bloc'>";
    content += "<div class='strong'>Indication</div>";
    content += "<div>" + this.data.carte.indication + "</div>";
    content += "</div>";

    content += "</div>";

    content += "<div class='line materiel'>";

    content += "<div class='resume_bloc'>";
    content += "<div class='strong'>" + this.data.carte.boitier.type + "</div>";
    var date_boitier = moment(this.data.carte.boitier.date_implantation).format("DD/MM/YYYY");
    content += "<div>" + this.data.carte.boitier.fabricant + "</div>";
    content += "<div>" + this.data.carte.boitier.modele.substring(0, 50) + "</div>"
    content += "<div>" + this.data.carte.boitier.sn + "</div>";
    content += "<div>" + date_boitier + "</div>";
    content += "</div>";
    if(this.data.carte.boitier1.sn){
        content += "<div class='resume_bloc'>";
        content += "<div class='strong'>" + this.data.carte.boitier1.type + "</div>";
        var date_boitier1 = moment(this.data.carte.boitier1.date_implantation).format("DD/MM/YYYY");
        content += "<div>" + this.data.carte.boitier1.fabricant + "</div>";
        content += "<div>" + this.data.carte.boitier1.modele.substring(0, 50) + "</div>"
        content += "<div>" + this.data.carte.boitier1.sn + "</div>";
        content += "<div>" + date_boitier1 + "</div>";
        content += "</div>";
    }
    if(this.data.carte.boitier2.sn){
        content += "<div class='resume_bloc'>";
        content += "<div class='strong'>" + this.data.carte.boitier2.type + "</div>";
        var date_boitier2 = moment(this.data.carte.boitier2.date_implantation).format("DD/MM/YYYY");
        content += "<div>" + this.data.carte.boitier2.fabricant + "</div>";
        content += "<div>" + this.data.carte.boitier2.modele.substring(0, 50) + "</div>"
        content += "<div>" + this.data.carte.boitier2.sn + "</div>";
        content += "<div>" + date_boitier2 + "</div>";
        content += "</div>";
    }

    if (this.data.carte.sonde1.sn) {
        var date_sonde1 = moment(this.data.carte.sonde1.date_implantation).format("DD/MM/YYYY");
        content += "<div class='resume_bloc'>";
        content += "<div class='strong'>Sonde " + this.data.carte.sonde1.type + "</div>";
        content += "<div>" + this.data.carte.sonde1.fabricant + "</div>";
        content += "<div>" + this.data.carte.sonde1.modele.substring(0, 50) + "</div>"
        content += "<div>" + this.data.carte.sonde1.sn + "</div>";
        content += "<div>" + this.data.carte.sonde1.connexion + "</div>";
        content += "<div>" + date_sonde1 + "</div>";
        content += "</div>";
    }

    if (this.data.carte.sonde2.sn) {
        var date_sonde2 = moment(this.data.carte.sonde2.date_implantation).format("DD/MM/YYYY");
        content += "<div class='resume_bloc'>";
        content += "<div class='strong'>Sonde " + this.data.carte.sonde2.type + "</div>";
        content += "<div>" + this.data.carte.sonde2.fabricant + "</div>";
        content += "<div>" + this.data.carte.sonde2.modele.substring(0, 50) + "</div>"
        content += "<div>" + this.data.carte.sonde2.sn + "</div>";
        content += "<div>" + this.data.carte.sonde2.connexion + "</div>";
        content += "<div>" + date_sonde2 + "</div>";
        content += "</div>";
    }

    if (this.data.carte.sonde3.sn) {
        var date_sonde3 = moment(this.data.carte.sonde3.date_implantation).format("DD/MM/YYYY");
        content += "<div class='resume_bloc'>";
        content += "<div class='strong'>Sonde " + this.data.carte.sonde3.type + "</div>";
        content += "<div>" + this.data.carte.sonde3.fabricant + "</div>";
        content += "<div>" + this.data.carte.sonde3.modele.substring(0, 50) + "</div>"
        content += "<div>" + this.data.carte.sonde3.sn + "</div>";
        content += "<div>" + this.data.carte.sonde3.connexion + "</div>";
        content += "<div>" + date_sonde3 + "</div>";
        content += "</div>";
    }

    content += "</div>";

    $("#resume .resume_data").html(content);


    // RECORDED
    if (this.data.carte.id) {
        $('#resume .subtitle').html("Carte N°" + this.data.carte.id);
    }


    // HIDE PREVIOUS
    if (!previous) {
        $("#resume .buttons .previous").hide();
        $("#resume .buttons .record").hide();
    } else {
        $("#resume .buttons .previous").show();
        $("#resume .buttons .record").show();
    }


}

Uluru.prototype.getOldValueFromSondeBoitier = function (obj){
    let oldValue = {};
    for (const [key,value] of Object.entries(obj)){
        if (value){
            oldValue[key] = value;
        }
        else {
            oldValue[key] = "";
        }
    }
    return oldValue;
}

Uluru.prototype.notUndefined = function (value){
    return value ? value : "";
}