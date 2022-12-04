Uluru.prototype.showFindCard = function () {
    this.logMessage("SHOW FIND CARD");
    //$('.screen.find_card').addClass("visible");
    this.showScreen('find_card');
    this.newCardWorkflowRenderer("main",this.searchCardBuilder());
    $("#search_card").focus();

};



Uluru.prototype.findCard = function () {

    this.logMessage("FIND CARD");

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            $("#list_cards").addClass("visible");

            if (data.result && data.result.length > 0) {
                this.renderCardsList(data.result);
            } else {
                $("#list_cards").html("Aucune carte trouvée");
            }

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

            $("#list_cards").empty().removeClass("visible");

        }

    }.bind(this);

    var form = document.getElementById("find_card");
    var data = new FormData(form);
    //if (search) data = "search=" + search;

    this.apiRequest("POST", "cartes", "find", data, before, success, false);


};




Uluru.prototype.renderCardsList = function (data) {

    this.logMessage("RENDER CARDS LIST");

    // INIT
    var container = "#list_cards";
    $(container).empty();


    // HEADER
    var content = "<div class='item row header'>";
    content += "<div class='cell'>ID</div>";
    content += "<div class='cell'>Patient</div>";
    content += "<div class='cell'>Date de naissance</div>";
    content += "<div class='cell'>Médecin</div>";
    content += "<div class='cell'>Date d'implatation</div>";
    content += "</div>";

    $(container).append(content);


    // SET DATA
    data.forEach(function (item) {

        var date_naissance = new moment(item.patient_date_naissance).format("DD/MM/YYYY");
        var date_implementation = new moment(item.boitier_date_implantation).format("DD/MM/YYYY");

        var content = "<div class='item row' id='card_" + item.id + "'>";
        content += "<div class='cell'>" + item.id + "</div>";
        content += "<div class='cell'>" + item.patient_nom + ", " + item.patient_prenom + "</div>";
        content += "<div class='cell'>" + date_naissance + "</div>";
        content += "<div class='cell'>" + item.medecin + "</div>";
        content += "<div class='cell'>" + date_implementation + "</div>";
        content += "</div>";

        $(container).append(content);

        $("#card_" + item.id).click(function() {


            // CLEAR PREVIOUS DATA
            /*this.resetCard("boitier");
            this.resetCard("sonde1");
            this.resetCard("sonde1");
            this.resetCard("sonde3");*/

            //console.log(item.data);

            // SET DATA FROM ITEM
            this.data = item.data;

            // SHOW RESUME WITHOUT PREVIOUS
            this.newCardWorkflowRenderer("new_card",this.resumeCardBuilder());
            this.resumeCard(false);
            this.showScreen("new_carte");
            this.goToStep("resume");

            /*
            // SET VALUES TO FORM
            if(this.data.carte.nom) $("#new_carte_form input[name=nom]").val(this.data.carte.nom);
            if(this.data.carte.prenom) $("#new_carte_form input[name=prenom]").val(this.data.carte.prenom);
            if(this.data.carte.date_naissance) $("#new_carte_form input[name=date_naissance]").val(this.data.carte.date_naissance);
            if(this.data.carte.nom_medecin) $("#new_carte_form input[name=nom_medecin]").val(this.data.carte.nom_medecin);
            */
            /*
             if(this.data.carte.boitier && this.data.carte.boitier.ean) $("#new_carte_form input[name=boitier_sn]").val(this.data.carte.boitier.ean);
             if(this.data.carte.sonde1 && this.data.carte.sonde1.ean) $("#new_carte_form input[name=sonde1_sn]").val(this.data.carte.sonde1.ean);
             if(this.data.carte.sonde1 && this.data.carte.sonde1.ean) $("#new_carte_form input[name=sonde1_sn]").val(this.data.carte.sonde1.ean);
             if(this.data.carte.sonde3 && this.data.carte.sonde3.ean) $("#new_carte_form input[name=sonde3_sn]").val(this.data.carte.sonde3.ean);

             /*
             this.searchSN("boitier");
             this.searchSN("sonde1");
             this.searchSN("sonde1");
             this.searchSN("sonde3");

              */

            //this.generateCarte();


        }.bind(this));


    }.bind(this));


};