Uluru.prototype.work_list = function (search) {

    this.logMessage("LOAD LISTE DE TRAVAILLE");
    var before = function () {
        $("#main .cartes #cartes #find_worklist .find_worklist").html("Chargement en cours...<div class='loadBall'></div>");
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        if (data.status === "OK") {
            if (data.result && data.result.length > 0) {
                   this.listWorkBuilder(data.result);
            } else {
                $("#main .cartes #cartes #find_worklist .find_worklist").html("Aucune liste trouvé");
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

    this.apiRequest("GET", "interventions", "work_list", data, before, success, false);


};






Uluru.prototype.listWorkBuilder = function (data) {

    this.logMessage("RENDER WORK LIST");

    // INIT
    var container = "#main .cartes #cartes #find_worklist .find_worklist";
    $(container).empty();


    // HEADER

    // var content = "<thead>";
    // content += "<tr class='item  header'>";
    // // content += "<th class='cell'>ID</th>";
    // content += "<th class='cell'>Patient</th>";
    // content += "<th class='cell'>Date de naissance</th>";
    // content += "<th class='cell'>Indication</th>";
    // content += "</tr>";
    // content += "</thead>";

    // $(container).append(content);


    // SET DATA
    // $(container).append("<tbody class='content '></tbody>");

    data.forEach(function (item) {

            var content = "<tr class='item ' id='card_" + item.Id+ "'>";
            // content += "<td class='cell'>" + item.id + "</td>";
            content += "<td class='cell'>" + item.patient_nom + ", " + item.patient_prenom + "</td>";
            content += "<td class='cell'>" + item.patient_date_naissance + "</td>";
            content += "<td class='cell'>" + item.indication + "</td>";
            // content += "<td class='cell'>" + item.centre + "</td>";

            content += "</tr>";
            $(container).append(content);

            $("#card_" + item.Id).click(function() {


                this.data = item;
                this.generateInfoPatient();
                $(".cartes").remove();

    
            }.bind(this));


       


    }.bind(this));
    
};

Uluru.prototype.generateInfoPatient = function (){
    $('.cartes').remove();


    $("#main").append("<div id='cr_infoPatient'></div>");
    

    // ADD CONTENT
    $("#cr_infoPatient").append("<div class='content '></div>");
    $("#cr_infoPatient").append("<div class='close'><img src='images/close.svg'></div>");
    $("#cr_infoPatient .close").click(function () {
        $('#cr_infoPatient').remove();
        $("#main").removeClass("cartes");
    });
    var content = '<div class=" container p-4 px-lg-5 text-center " >';
    content +=     '<div class=" new_card shadow p-3 mb-5 bg-white rounded">';
    content +=            '<div class="screen_icon"><img src="images/card.svg"  style="width:40px; height:40px;"></div>';
    content +=     '<div class="subtitle">Intervention programée</div>';
    content +=     '<div class="message">info intervention</div>';
    content +=     '<div class="item">';
    content +=      "<div class='label'>Nom Prénom</div><div class='value'><span class='fontbold'>" + this.data.patient_nom + "</span>  " + this.data.patient_prenom + "</div>";
    content +=      "<div class='label'>Date de naissance</div><div class='value'>" + this.data.patient_date_naissance + "</div>";
    content +=      "</div>";
    content +=     '<div class="item">';
    content +=      "<div class='bloc_title'>Indication</div>";
    content +=      "<div class='item'><div class='value'>" + this.data.indication + "</div>";
    content +=      "</div>";
    content +=     '<div class="item">';
    content +=      "<div class='bloc_title'>date d'implantation programée</div>";
    content +=      "<div class='item'><div class='value'>" + this.data.date_implantation + "</div>";
    content +=      "</div>";
    content +=     '<div class="item">';
    content +=      "<div class='bloc_title'>email</div>";
    content +=      "<div class='item'><div class='value'>" + this.data.email + "</div>";
    content +=      "</div>";
    content +=     '<div class="item">';
    content +=      "<div class='bloc_title'>némuro de securité</div>";
    content +=      "<div class='item'><div class='value'>" + this.data.numero_securite + "</div>";
    content +=      "</div>";
    content +=     '<div class="item">';
    content +=      "<div class='bloc_title'>telephone</div>";
    content +=      "<div class='item'><div class='value'>" + this.data.tel + "</div>";
    content +=      "</div>";
    content +=     '<div class="item">';
    content +=      "<div class='bloc_title'>type d'implant</div>";
    content +=      "<div class='item'><div class='value'>" + this.data.type_implant + "</div>";
    content +=      "</div>";
        if(this.data.id_cartes != 0){
            content +=     '<div class="item">';
            content +=      "<div class='label'>Nom Et Prénom de Medecin</div><div class='value'><span class='fontbold'>" + this.data.medecin_nom + "</span>  " + this.data.medecin_prenom + "</div>";
            content +=      "<div class='label'>numero carte</div><div class='value'>" + this.data.id_cartes + "</div>";
            content +=      "</div>";
            content +=     '<div class="item">';
            content +=      "<div class='bloc_title'>date d'implantation</div>";
            content +=      "<div class='item'><div class='value'>" + this.data.boitier_date_implantation + "</div>";
            content +=      "</div>";
        }
    content += '</div>'
    content += '</div>'
    $("#cr_infoPatient .content").html(content);

    

    // ADD download BUTTON

    $("#cr_infoPatient").append("<button class='print_cr'>Telecharger</button>");
    $("#cr_infoPatient  .print_cr").click(function () {
        
       
        var element=document.querySelector('.content');
        // html2pdf().from(contenu).save()
        // var element = document.getElementById('element-to-print');
        var opt = {
        margin:       1,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();

        // Old monolithic-style usage:
        html2pdf(element, opt);
           
    
         
      
           
       
    });
  



}



Uluru.prototype.patient_intervention = function () {
    this.logMessage("REGISTER");
  
    var before = function () {
      this.showLoading();
    }.bind(this);
  
    var success = function (data) {
      this.logMessage(data);
      this.hideLoading();
  
      if (data.status === "OK") {
        this.user = data.result;
        this.token = data.result.token;
        notification.create({
          title: "Patient créé",
          content: "Le patient a été créé avec succès "
      });
        // HIDE register
        $("#new_card #form_patient_intervention").hide();
        this.listAllWorkBuilder();
        this.work_list();
        this.newCardWorkflowRenderer("main",this.listAllWorkBuilder(),this.work_list());

        this.setEvents();

  
      } else {
        this.logError(data.message);
        notification.create({
          title: "Erreur",
          content: data.message,
        });
      }
    }.bind(this);
  
    var form_patient_intervention = document.querySelector("#main #form_patient_intervention");
    var data = new FormData(form_patient_intervention);
    this.apiRequest("POST", "interventions", "patient_intervention", data, before, success, false);
  };

  Uluru.prototype.new_Patient_Intervention = function () {

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
            // this.data.carte.patient = {
            //     id: data.result.id,
            //     nom: data.result.nom,
            //     prenom: data.result.prenom,
            //     date_naissance: data.result.date_naissance
            // };
            // this.data.carte.patientSearch.id = data.result.id;
            // this.data.carte.patientSearch.search = false;
            // //RERENDER PATIENT LIST
            // let list = new Array(this.data.carte.patient);
            // this.renderListePatients(list);
            // // GO TO STEP MEDECIN
            // this.goToStep("liste_medecins");

            // FIND MEDECINS
            // this.findAllMedecins();
            this.newCardWorkflowRenderer("main",this.listAllWorkBuilder(),this.work_list().bind(this));

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

        }

    }.bind(this);



    var form_connect = document.getElementById("form_patient_intervention");
    var data = new FormData(form_connect);

    if(!this.record){
        this.apiRequest("POST", "users", "new_Patient_Intervention", data, before, success, false);
    }
    // SET DATA
    else{

        this.data.carte.patient = {
            nom: data.get("nom"),
            prenom: data.get("prenom"),
            date_naissance: data.get("date_naissance"),
            sonde_abandonnee: data.get("user_mat_ab")
        };
        this.newCardWorkflowRenderer("main",this.listAllWorkBuilder(),this.work_list().bind(this));
    }
}