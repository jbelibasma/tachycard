<div class="screen users">
    <div id="users">
        <div class="screen_icon"><img src="images/users.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Liste des utilisateurs</div>
        <div class="search"><input type="text" id="search_users" placeholder="Recherche"><button id="go_search_users" type="button"><img src="images/find-white.svg"  style="width:80px; height:80px;"></button></div>
        <div id="list_users"></div>
        <div class="buttons">
            <button type="button" id="new_user" onclick="uluru.showScreen('new_users'); document.getElementById('new_user_form').reset();">Nouvel utilisateur</button>
        </div>
    </div>
</div>


<div class="screen new_users">
    <div id="new_users">
        <div class="screen_icon"><img src="images/users.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Nouvel utilisateur</div>
        <form id="new_user_form">
            <div class="item">
                <label>Nom</label>
                <input type="text" name="nom" value="">
            </div>
            <div class="item">
                <label>Prénom</label>
                <input type="text" name="prenom" value="">
            </div>
            <div class="item">
                <label>Email</label>
                <input type="text" name="email" value="">
            </div>
            <div class="item">
                <label>Téléphone</label>
                <input type="tel" name="tel" value="">
            </div>
            <div class="item">
                <label>Type de compte</label>
                <select name="type">
                    <option value="">Choisissez...</option>
                    <option value="2">Patient</option>
                    <option value="1">Médecin</option>
                    <option value="3">Administrateur</option>
                </select>

            </div>

            <div class="buttons">
                <button type="button" class="create">Créer</button>
            </div>
        </form>
    </div>
</div>

<div class="screen new_users_doctor">
    <div id="new_users_doctor">
        <div class="screen_icon"><img src="images/users.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Nouveau Medecin</div>
        <form id="new_users_doctor_form">
            <div class="item">
                <label>Nom</label>
                <input type="text" name="nom" value="">
            </div>
            <div class="item">
                <label>Prénom</label>
                <input type="text" name="prenom" value="">
            </div>
            <div class="item">
                <label>Email</label>
                <input type="text" name="email" value="">
            </div>
            <div class="item">
                <label>Téléphone</label>
                <input type="tel" name="tel" value="">
            </div>
            <input type="hidden" name="type" value="1">
            <div class="buttons">
                <button type="button" class="create">Créer</button>
            </div>
        </form>
    </div>
</div>

<div class="screen update_users">
    <div id="update_users">
        <div class="screen_icon"><img src="images/users.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Modifier un utilisateur</div>
        <form id="update_user_form">

            <input type="hidden" name="id" value="">
            <input type="hidden" name="destination" value="">

            <div class="item">
                <label>Nom</label>
                <input type="text" name="nom" value="">
            </div>
            <div class="item">
                <label>Prénom</label>
                <input type="text" name="prenom" value="">
            </div>
            <div class="item">
                <label>Email</label>
                <input type="text" name="email" value="">
            </div>
            <div class="item">
                <label>Téléphone</label>
                <input type="tel" name="tel" value="">
            </div>
            <div class="item" id="pass_div">
                <label>Mot de passe</label>
                <input type="password" name="pass1" placeholder="Changer le mot de passe" value="">
            </div>
            <div class="item">
                <label>Sexe</label>
                <select name="sexe">
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>
            <div class="item">
                <label for="update_user_mat_ab_id">Sonde abandonnée</label>
                <div class="elements input-message" style="display: flex">
                    <div class="item">
                        <input id="update_user_mat_ab_id" name="user_mat_ab" type="checkbox" style="width: auto" >
                    </div>
                    <div class="item">
                        Le patient est-il porteur d'une sonde abandonnée ?
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button name="bt_cancel" type="button" class="cancel" onclick="uluru.showScreen('users')">Annuler</button>
                <button type="button" class="delete">Supprimer</button>
                <button type="button" class="update">Modifier</button>
            </div>
        </form>
    </div>
</div>
