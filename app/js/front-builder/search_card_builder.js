Uluru.prototype.searchCardBuilder = function (){
    let content = "";
    content +=  '<div class="screen find_card">'
    content +=      '<form id="find_card">'
    content +=          '<div class="screen_icon"><img src="images/find_card.svg"  style="width:80px; height:80px;"></div>'
    content +=          '<div class="title">Rechercher une carte</div>'
    // content +=          '<div class="message">Saisissez l\'identifiant de la carte (id) ou le nom du patient</div>\n'
    content +=          '<label>Nom patient</label>\n'
    content +=          '<div class="search">'
    content +=              '<input type="text" name="nom" placeholder="Recherche">'
    content +=          '</div>\n'
    content +=          '<label>Prenom patient</label>\n'
    content +=          '<div class="search"><input type="text" name="prenom" placeholder="Recherche"></div>\n'
    content +=          '<label>Date de naissance patient</label>\n'
    content +=          '<div class="search"><input type="date" name="date_naissance"></div>\n'
    content +=          '<div class="buttons">'
    content +=              '<button type="submit">Rechercher</button>'
    content +=          '</div>'
    content +=          '<div id="list_cards"></div>'
    content +=    '</form>'
    content +=  '</div>'

    return content;

}
