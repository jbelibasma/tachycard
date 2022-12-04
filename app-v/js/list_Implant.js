


Uluru.prototype.list_Implant = function (search) {

    this.logMessage("LOAD IMPLANTS LIST");
    var before = function () {
        $("#main .cartes #cartes #find_list .find_list").html("Chargement en cours...<div class='loadBall'></div>");
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        if (data.status === "OK") {
            if (data.result && data.result.length > 0) {
                   this.listCardBuilder(data.result);
            } else {
                $("#main .cartes #cartes #find_list .find_list").html("Aucune carte trouvé");
            }

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

        }

    }.bind(this);

    var data = false;
    if (search) data = "search=" + search;

    this.apiRequest("GET", "cartes", "list_Implant", data, before, success, false);


};





Uluru.prototype.listCardBuilder = function (data) {

    this.logMessage("RENDER CARDS LIST");

    // INIT
    var container = "#main .cartes #cartes #find_list .find_list";
    $(container).empty();


    // HEADER

    
    data.forEach(function (item) {

        var date_naissance = new moment(item.patient_date_naissance).format("DD/MM/YYYY");

        var content = "<tr class='item ' id='card_" + item.id + "'>";
        content += "<td class='cell'>" + item.id + "</td>";
        content += "<td class='cell'>" + item.patient_nom + ", " + item.patient_prenom + "</td>";
        content += "<td class='cell'>" + date_naissance + "</td>";
        content += "<td class='cell'>" + item.medecin + "</td>";
        content += "<td class='cell'>" + item.indication + "</td>";
        // content += "<td class='cell'>" + item.nom_centre + "</td>";

        content += "</tr>";

        $(container).append(content);
        

        $("#card_" + item.id).click(function() {


            this.data = item;
            this.hideMenu();
            this.generateCrPatient();


    


        }.bind(this));


    }.bind(this));



};



Uluru.prototype.generateCrPatient = function () {

    this.logMessage("GENERATE CR");


    // REMOVE PREVIOUS
    $('#cr_print').remove();

    $("body").addClass("print_cr");
    
    // CHECK DATA
    if (!this.data) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Il manque des informations pour générer la carte"
        });
        return false;
    }

   

    if (!this.data.patient_nom) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner le prénom du patient"
        });
        return false;
    }

    if (!this.data.patient_prenom) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner le nom du patient"
        });
        return false;
    }

    if (!this.data.patient_date_naissance) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner la date de naissance nom du patient"
        });
        return false;
    }

    if (!this.data.medecin) {
        notification.create({
            icon: "error.svg",
            title: "Erreur",
            content: "Merci de renseigner le nom du médecin"
        });
        return false;
    }

    this.logMessage("OK, on a tout !");


    // CREATE CR PRINT
    $("#main").append("<div id='cr_print'></div>");

    // ADD CONTENT
    $("#cr_print").append("<div class='content '></div>");

    // ADD CLOSE
    $("#cr_print").append("<div class='close'><img src='images/close.svg'></div>");
    $("#cr_print .close").click(function () {
        $('#cr_print').remove();
        $("#main").removeClass("print_cr");
    });

    // ADD PRINT BUTTON
   


    // SET CONTENT
    var content = "";
    content += "<div class='bloc head'>";
    content += "<div class='logo'>TACHYCARD</div>";
    if (this.data.id) {
        content += "<br>Carte N°" + this.data.id;
    }
    content += "</div>";
    content += "</div>";

    content += "<div class='bloc patient'>";
    content += "<div class='subbloc patient'>";
    content += "<div class='bloc_title'>Patient</div>";
    content += "<div class='item'>";
    content += "<div class='label'>Nom Prénom</div><div class='value'><span class='fontbold'>" + this.data.patient_nom + "</span>  " + this.data.patient_prenom + "</div>";
    content += "<div class='label'>Date de naissance</div><div class='value'>" + this.data.patient_date_naissance + "</div>";
    content += "</div>";
    content += "</div>";
    content += "</div>";

    content += "<div class='bloc centre'>";
    content += "<div class='subbloc centre'>";
    content += "<div class='bloc_title'>Centre d'implantation</div>";
    content += "<div class='item'><div class='value'>";
    content += "<span class='fontbold'>" + this.data.name + "</span><br>";
    content += "</div>";
    content += "</div>";
    content += "</div>";

    content += "<div class='subbloc medecin'>";
    content += "<div class='bloc_title'>Opérateur implanteur</div>";
    content += "<div class='item'><div class='value'>Docteur " + this.data.medecin + "</div>";
    content += "</div>";
    content += "</div>";

    content += "<div class='subbloc indication'>";
    content += "<div class='bloc_title'>Indication</div>";
    content += "<div class='item'><div class='value'>" + this.data.indication + "</div>";
    content += "</div>";
    content += "</div>";


    content += "</div>";


    content += "<div class='main_bloc_materiel'>";

    content += "<div class='col materiels'>";
    
    content += "<div class='bloc materiel'>";
    content += "<div class='line'>";
    content += "<div class='item'><div class='label'>Date implantation: </div><div class='value'>& "+ this.data.boitier_date_implantation + "</div></div>";
    content += "</div>";
    content += "</div>";


   


    content += "</div>";


    content += "</div>";


    $("#cr_print .content").html(content);
 

    $("#cr_print").append("<button class='print_cr'>Imprimer</button>");
    $("#cr_print .print_cr").click(function () {
        
        // window.print();
        var contenu=document.querySelector('.content');
        console.log(contenu);
        html2pdf().from(contenu).save();

       
    });
  
    console.log(this);
    

    // SHOW CARTE
    $("#cr_print").addClass("visible");
    

};

