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


        var content = "<tr class='item ' id='card_" + item.id + "'>";
        content += "<td class='cell'>" + item.id + "</td>";
        content += "<td class='cell'>" + item.patient_nom + ", " + item.patient_prenom + "</td>";
        content += "<td class='cell'>" + item.patient_date_naissance + "</td>";
        content += "<td class='cell'>" + item.indication + "</td>";
        // content += "<td class='cell'>" + item.centre + "</td>";

        content += "</tr>";

        $(container).append(content);


        $("#card_" + item.id).click(function() {


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
    content += '</div>'
    content += '</div>'
    $("#cr_infoPatient .content").html(content);

    $("#cr_infoPatient").remove();


}