<div class="screen account">
    <div id="account" class="bloc">
        <div class="screen_icon"><img src="images/users.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Mon compte</div>
        <form id="form_account">

            <input type="hidden" name="id" value="">

            <div class="item">
                <label>Nom</label>
                <input type="text" name="nom" value="" readonly>
            </div>
            <div class="item">
                <label>Prénom</label>
                <input type="text" name="prenom" value="" readonly>
            </div>
            <div class="item">
                <label>Email</label>
                <input type="text" name="email" value="" readonly>
            </div>
            <div class="item">
                <label>Mot de passe</label>
                <input type="password" name="pass1" value="" placeholder="Saisissez un nouveau mot de passe">
            </div>
            <div class="item">
                <label>Confirmer le mot de passe</label>
                <input type="password" name="pass2" value="">
            </div>
            <div class="buttons">
                <button type="submit">Modifier</button>
            </div>
        </form>
    </div>


    <div id="account_cards" class="bloc">
        <div class="screen_icon"><img src="images/card.svg" style="width:80px; height:80px;"></div>
        <div class="title">Mes cartes</div>
        <div id="account_cards_list"></div>
    </div>
</div>
