/*** list implants */

Uluru.prototype.listAllCarteBuilder = function (){

    let content = "";
    content +=    '<div class=" cartes implant container p-4 px-lg-5 text-center">'
    content +=       ' <div id="cartes" class="new_card shadow p-3 mb-5 bg-white rounded">'
    content +=            '<div class="screen_icon"><img src="images/card.svg"  style="width:40px; height:40px;"></div>'
    content +=            '<div class="title">Liste des cartes</div>'
    content +=            '<table class="table" id="find_list">';
    content +=              "<thead>";
    content +=              "<tr class='item  header'>";
    content +=              "<th class='cell'>ID</th>";
    content +=              "<th class='cell'>Patient</th>";
    content +=              "<th class='cell'>Date de naissance</th>";
    content +=              "<th class='cell'>Medecin</th>";
    content +=              "<th class='cell'>Indication</th>";
    content +=              "</tr>";
    content +=              "</thead>";
    content +=              '<tbody class="find_list">';
    content +=              "</tbody>";
    content +=            "</table>";
    content +=        '</div>'
    content +=    '</div>'
    return content;
}

/*** list intervention programmee */

Uluru.prototype.listAllInterventionBuilder = function (){

    let content = "";
    content +=    '<div class=" cartes implant container p-4 px-lg-5 text-center">'
    content +=       ' <div id="cartes" class="new_card shadow p-3 mb-5 bg-white rounded">'
    content +=            '<div class="screen_icon"><img src="images/card.svg"  style="width:40px; height:40px;"></div>'
    content +=            '<div class="title">Liste des Intervention </div>'
    content +=            '<table class="table" id="find_list_intervention">';
    content +=              "<thead>";
    content +=              "<tr class='item  header'>";
    content +=              "<th class='cell'>ID</th>";
    content +=              "<th class='cell'>Patient</th>";
    content +=              "<th class='cell'>Date de naissance</th>";
    content +=              "<th class='cell'>Indication</th>";
    content +=              "</tr>";
    content +=              "</thead>";
    content +=              '<tbody class="find_list_intervention">';
    content +=              "</tbody>";
    content +=            "</table>";
    content +=        '</div>'
    content +=    '</div>'
    return content;
}


