Uluru.prototype.list_Intervention = function (search) {

    this.logMessage("LOAD IMPLANTS LIST");
    var before = function () {
        $("#main .cartes #cartes #find_list_intervention .find_list_intervention").html("Chargement en cours...<div class='loadBall'></div>");
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);
        if (data.status === "OK") {
            if (data.result && data.result.length > 0) {
                   this.listInterventionBuilder(data.result);
            } else {
                $("#main .cartes #cartes #find_list_intervention .find_list_intervention ").html("Aucune information trouvé");
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

    this.apiRequest("GET", "interventions", "list_Intervention", data, before, success, false);


};



/*** liste mon intervention programee  */

Uluru.prototype.listInterventionBuilder = function (data) {

    this.logMessage("RENDER CARDS LIST");

    // INIT
    var container = "#main .cartes #cartes  #find_list_intervention .find_list_intervention ";
    $(container).empty();


    // HEADER

   


    // SET DATA
   
    data.forEach(function (item) {


        var content = "<tr class='item ' id='card_" + item.Id + "'>";
        content += "<td class='cell'>" + item.Id + "</td>";
        content += "<td class='cell'>" + item.patient_nom + ", " + item.patient_prenom + "</td>";
        content += "<td class='cell'>" + item.patient_date_naissance + "</td>";
        content += "<td class='cell'>" + item.indication + "</td>";
        // content += "<td class='cell'>" + item.centre + "</td>";

        content += "</tr>";

        $(container).append(content);


        $("#card_" + item.Id).click(function() {


            this.data = item;
            this.generateInfoPatient();
            // $("#cr_infoPatient").remove();
            
           

    


        }.bind(this));


    }.bind(this));



};

/*** info intervention  */

Uluru.prototype.generateInfoPatient = function (){
    $('.cr_infoPatient').remove();

    // $("body").addClass("cr_infoPatient");

    $("#main").append("<div id='cr_infoPatient'></div>");

    // ADD CONTENT
    $("#cr_infoPatient").append("<div class='content '></div>");
    // $("#cr_infoPatient").append("<div class='close'><img src='images/close.svg'></div>");
    // $("#cr_infoPatient .close").click(function () {
    //     $('#cr_infoPatient').remove();
    //     $("#main").removeClass("cr_infoPatient");
    // });
    var content = '<link rel="stylesheet"  href="../css/print.css" media="print">';
    content = '<div class=" container p-4 px-lg-5 text-center " >';
    content +=     '<div class=" new_card shadow p-3 mb-5 bg-white rounded">';
    content +=            '<div class="screen_icon"><img src="images/card.svg"  style="width:40px; height:40px;"></div>';
    content +=     '<div class="subtitle">Intervention programée</div>';
    content +=     '<div class="message">info intervention</div>';
    content +=     '<div class="item">';
    content +=      "<div class='label'>Nom Prénom</div><div class='value'><span class='fontbold'>" + this.data.patient_nom + "</span>  " + this.data.patient_prenom + "</div>";
    content +=      "<div class='label'>Date de naissance</div><div class='value'>" + this.data.patient_date_naissance + "</div>";
    content +=      "</div>";
    content +=        '<div class="item">';
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

    // $("#cr_infoPatient").remove();
    $("#cr_infoPatient").append("<button class='print_cr'>Telecharger</button>");
    $("#cr_infoPatient  .print_cr").click(function () {
        
       
        // var contenu=document.querySelector('.content');
        // html2pdf().from(contenu).save()
        // var doc = new jsPDF({
        //     orientation: 'landscape'
        // });
        // doc.setFont("courier");
        // doc.setFontType("normal");
        // doc.setFontSize(24);
        // doc.setTextColor(100);

        // doc.fromHTML(document.getElementById("content"), 15, 15, {
        //     'width': 170,
        // });
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [4, 2]
          });
          
          doc.text(document.getElementById("content"), 1, 1);
          doc.save("two-by-four.pdf");
       
        
       
    });

}