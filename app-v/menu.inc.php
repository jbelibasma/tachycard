<div id="menu" class="screen">
    <div class="elements">
        <div class="item 1 3" onclick="uluru.showNewCard();">
            <div class="icon"><img src="images/card.svg"  style="width:80px; height:80px;"></div>
            <div class="title">Nouvelle carte</div>
        </div>

        <div class="item 1 3" onclick="uluru.showFindCard()">
            <div class="icon"><img src="images/find_card.svg"  style="width:80px; height:80px;"></div>
            <div class="title">Recherche une carte</div>
        </div>
        <div class="item 2" onclick="uluru.showAllPatientCard();">
            <div class="icon"><img src="images/card.svg"  style="width:80px; height:80px;"></div>
            <div class="title">Liste des cartes</div>
        </div>
<!--
        <div class="item medecin admin" onclick="uluru.showScreen('material');uluru.loadMaterialList();">
            <div class="icon"><img src="images/material.svg"></div>
            <div class="title">Matériels</div>
        </div>
-->
        <div class="item 3" onclick="uluru.showScreen('users');uluru.loadUsersList();">
            <div class="icon"><img src="images/users.svg"  style="width:80px; height:80px;"></div>
            <div class="title">Utilisateurs</div>
        </div>

        <div class="item 2 1 3" id="menu_accounts" onclick="uluru.showAccount();">
            <div class="icon"><img src="images/account.svg"  style="width:80px; height:80px;"></div>
            <div class="title">Mon compte</div>
        </div>

        <div class="item 3 1 2" onclick="uluru.unconnect();">
            <div class="icon"><img src="images/off.svg"  style="width:80px; height:80px;"></div>
            <div class="title">Déconnexion</div>
        </div>
    </div>
</div>