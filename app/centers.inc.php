
<div class="screen centers">
    <div id="centers">
        <div class="icon"><img src="images/center.svg"  style="width:80px; height:80px;"></div>
        <div class="close"><img src="images/close.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Liste des centres</div>
        <div class="search"><input type="text" id="search_centers" placeholder="Recherche"><button id="go_search_centers" type="button"><img src="images/find-white.svg"></button></div>
        <div id="list_centers"></div>
        <div class="buttons">
            <button type="button" id="new_center">Nouveau centre</button>
        </div>
    </div>
</div>


<div class="screen new_centers">
    <div id="new_centers">
        <div class="icon"><img src="images/center.svg"  style="width:80px; height:80px;"></div>
        <div class="close"><img src="images/close.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Nouveau centre</div>
        <form id="new_center_form">
            <div class="item">
                <label>Nom</label>
                <input type="text" name="name" value="">
            </div>
            <div class="item">
                <label>Adresse</label>
                <input type="text" name="adresse1" value="">
            </div>
            <div class="item">
                <label>Complément d'adresse</label>
                <input type="text" name="adresse2" value="">
            </div>
            <div class="item">
                <label>Complément d'adresse</label>
                <input type="text" name="adresse3" value="">
            </div>
            <div class="item">
                <label>Code postal</label>
                <input type="text" name="code_postal" value="">
            </div>
            <div class="item">
                <label>Ville</label>
                <input type="text" name="ville" value="">
            </div>
            <div class="item">
                <label>Téléphone</label>
                <input type="text" name="tel" value="">
            </div>
            <div class="item">
                <label>Pays</label>
                <input type="text" name="pays" value="">
            </div>
            <div class="buttons">
                <button type="button" class="create">Créer</button>
            </div>
        </form>
    </div>
</div>


<div class="screen update_centers">
    <div id="update_centers">
        <div class="icon"><img src="images/center.svg"  style="width:80px; height:80px;"></div>
        <div class="close"><img src="images/close.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Modifier un centre</div>
        <form id="update_center_form">

            <input type="hidden" name="id" value="">

            <div class="item">
                <label>Nom</label>
                <input type="text" name="name" value="">
            </div>
            <div class="item">
                <label>Adresse</label>
                <input type="text" name="adresse1" value="">
            </div>
            <div class="item">
                <label>Complément d'adresse</label>
                <input type="text" name="adresse2" value="">
            </div>
            <div class="item">
                <label>Complément d'adresse</label>
                <input type="text" name="adresse3" value="">
            </div>
            <div class="item">
                <label>Code postal</label>
                <input type="text" name="code_postal" value="">
            </div>
            <div class="item">
                <label>Ville</label>
                <input type="text" name="ville" value="">
            </div>
            <div class="item">
                <label>Téléphone</label>
                <input type="text" name="tel" value="">
            </div>
            <div class="item">
                <label>Pays</label>
                <input type="text" name="pays" value="">
            </div>
            <div class="buttons">
                <button type="button" class="update">Modifier</button>
            </div>
        </form>
    </div>
</div>