<div class="screen material">
    <div id="material">
        <div class="screen_icon"><img src="images/material.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Liste du matériel</div>
        <div class="search"><input type="text" id="search_materiel" placeholder="Recherche"><button id="go_search_material" type="button"><img src="images/find-white.svg"></button></div>
        <div id="list_materiel"></div>
        <!--<div class="buttons">
            <button type="button" id="new_material">Nouveau matériel</button>
        </div>-->
    </div>
</div>





<div class="screen new_materials">
    <div id="new_materials">
        <div class="screen_icon"><img src="images/material.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Nouveau matériel</div>
        <form id="new_material_form">
            <div class="item">
                <label>Type</label>
                <select name="type">
                    <option value="pacemaker">Pacemaker</option>
                    <option value="defibrillateur">Défibrillateur</option>
                    <option value="sonde">Sonde</option>
                </select>
            </div>
            <div class="item">
                <label>Fabricant</label>
                <input type="text" name="fabricant" value="">
            </div>
            <div class="item">
                <label>Modèle</label>
                <input type="text" name="modele" value="">
            </div>
            <div class="item">
                <label>Code barre complet (ean)</label>
                <input type="text" name="ean" value="">
            </div>
            <div class="buttons">
                <button type="button" class="create">Créer</button>
            </div>
        </form>
    </div>
</div>