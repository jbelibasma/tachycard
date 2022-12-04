<?php
// SET TODAY
$today = new DateTime();
//$d = $today->format("d/m/Y");
$d = $today->format("Y-m-d");
?>

<div class="screen find_card">
    <form id="find_card">
        <div class="screen_icon"><img src="images/find_card.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Rechercher une carte</div>
        <div class="message">Saisissez l'identifiant de la carte (id) ou le nom du patient</div>
        <div class="search"><input type="text" name="search" placeholder="Recherche"></div>
        <div class="buttons">
            <button type="submit">Rechercher</button>
        </div>
        <div id="list_cards"></div>
    </form>
</div>

<div class="screen find_patient_cards">
<!--    <form id="find_patient_cards">-->
        <div class="screen_icon"><img src="images/card.svg"  style="width:80px; height:80px;"></div>
        <div class="title">Liste de vos cartes</div>
<!--        <div class="message">Voici la liste de vos cartes</div>-->
<!--        <div class="search"><input type="text" name="search" placeholder="Recherche"></div>-->
<!--        <div class="buttons">-->
<!--            <button type="submit">Rechercher</button>-->
<!--        </div>-->
        <div id="list_patient_cards"></div>
<!--    </form>-->
</div>

<div class="screen new_carte">
    <div id="new_carte">
        <div class="screen_icon"><img src="images/card.svg"  style="width:80px; height:80px;"></div>


        <div class="title">Nouvelle carte</div>


        <!-- CARD TYPE -->
        <form class="step card_type visible">
            <div class="subtitle">Type de dispositif</div>
            <div class="message">Choisissez le type de dispositif implanté</div>
            <div class="chooser">
                <div class="item" onclick="uluru.goToStep('patient')">PMK / DAI / HOLTER SC</div>
                <div class="item off">Stent</div>
                <div class="item off">TAVI / Clip</div>
                <div class="item off">FOP / CIA / FA</div>
            </div>
        </form>


        <!-- FIND PATIENT -->
        <form class="step patient" id="form_find_patient">
            <div class="subtitle">Recherche du patient</div>
            <div class="message">Saisissez les premières lettres du nom et du prénom du patient</div>
            <div class="item">
                <label>NOM / Prénom</label>
                <input type="text" name="search" value="">
            </div>
            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('new_patient')">Nouveau patient</button>
                <button type="submit">Rechercher</button>
            </div>
        </form>


        <!-- NEW PATIENT -->
        <form class="step new_patient" id="form_new_patient">
            <div class="subtitle">Nouveau patient</div>
            <div class="message">Merci de remplir le formulaire</div>
            <div class="item">
                <label>NOM du patient</label>
                <input type="text" name="nom" value="" required>
            </div>
            <div class="item">
                <label>Prénom du patient</label>
                <input type="text" name="prenom" value="" required>
            </div>
            <div class="item">
                <label>Date de naissance</label>
                <input type="date" name="date_naissance" value="" required>
            </div>
            <div class="item">
                <label>Email</label>
                <input type="email" name="email" value="" required>
            </div>
            <div class="item">
                <label>Téléphone</label>
                <input type="tel" name="tel" value="">
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
                <label for="user_mat_ab_id">Sonde abandonnée</label>
                <div class="elements input-message" style="display: flex">
                    <div class="item">
                        <input id="user_mat_ab_id" name="user_mat_ab" type="checkbox" style="width: auto" >
                    </div>
                    <div class="item">
                        Le patient est-il porteur d'une sonde abandonnée ?
                    </div>
                </div>
            </div>
            <div class="item">
                <label for="user_data_id">Données personnelles</label>
                <div class="elements input-message" style="display: flex">
                    <div class="item">
                        <input id="user_data_id" name="user_data" type="checkbox" style="width: auto" required>
                    </div>
                    <div class="item">
                        En créant le compte de ce patient vous certifiez que ce dernier a bien été informé et accepte
                        sans
                        réserve l'enregistrement de ses données personnelles et les conditions annexes à cet
                        enregistrement.
                    </div>
                </div>
            </div>

            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('patient')">Annuler</button>
                <button type="submit">Créer le compte</button>
            </div>
        </form>


        <!-- LISTE PATIENTS -->
        <div class="step liste_patients">
            <div class="subtitle">Liste des patients trouvés</div>
            <div class="liste"></div>
            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('patient')">Nouvelle recherche</button>
                <button type="submit" class="previous" onclick="uluru.goToStep('new_patient')">Nouveau patient</button>
            </div>
        </div>


        <!-- LISTE MEDECINS -->
        <div class="step liste_medecins">
            <div class="subtitle">Liste des opérateurs trouvés</div>
            <div class="liste"></div>
            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('liste_patients')">Précédent</button>
                <button type="button" class="add_doctor" onclick="uluru.goToStep('new_medecin');">Ajouter un opérateur
                </button>
            </div>
        </div>
        <!-- NEW MEDECIN -->
        <form class="step new_medecin" id="form_new_medecin">
            <div class="subtitle">Nouvel Opérateur</div>
            <div class="message">Merci de remplir le formulaire</div>
            <div class="item">
                <label>Nom de l'opérateur</label>
                <input type="text" name="nom" value="" required>
            </div>
            <div class="item">
                <label>Prénom de l'opérateur</label>
                <input type="text" name="prenom" value="" required>
            </div>
            <div class="item">
                <label>Email</label>
                <input type="email" name="email" value="" required>
            </div>
            <div class="item">
                <label>Téléphone</label>
                <input type="tel" name="tel" value="">
            </div>

            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('liste_medecins')">Annuler</button>
                <button type="submit">Créer le compte</button>
            </div>
        </form>


        <!-- INDICATION -->
        <form class="step indication" id="form_indication">
            <div class="subtitle">Indication</div>
            <div class="message">Merci d'indiquer la raison principale de cette implantation.</div>
            <div class="item">
                <label>Indication</label>
                <input type="text" name="boitier_indication" required>
            </div>
            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('liste_medecins')">Précédent</button>
                <button type="submit" class="next">Suivant</button>
            </div>
        </form>


        <!-- BOITIER -->
        <form class="step boitier" id="form_boitier">
            <div class="subtitle">Boitier</div>
            <div class="message">Scannez le code barre du boitier</div>
            <div class="item">
                <label>Code barre</label>
                <input type="text" name="boitier_code" id="boitier_code" class="code">
            </div>
            <div class="item">
                <label>Type</label>
                <select name="boitier_type" required>
                    <option value="">Choisissez</option>
                    <option value="Pacemaker">Pacemaker</option>
                    <option value="Défibrillateur">Défibrillateur</option>
                </select>
            </div>
            <div class="item">
                <label>Indication</label>
                <div id="boitier_indication_Pacemaker_div" class="two-element-side-by-side">
                    <div class="flex-grow">
                        <input id="boitier_indication_Pacemaker" name="boitier_indication"
                               list="boitier_indication_Pacemaker_dl" autocomplete="off">
                    </div>
                    <div>
                        <button id="boitier_indication_Pacemaker_bt" style="position: absolute;margin-left: 88%;margin-top: -5%;">▼</button>
                    </div>
                </div>
                <datalist id="boitier_indication_Pacemaker_dl">
                    <select id="boitier_indication_Pacemaker_select" multiple size=11 >
                        <option value="">Choisissez</option>
                        <option value="BAV1">BAV1</option>
                        <option value="BAV2">BAV2</option>
                        <option value="BAV3 paroxystique">BAV3 paroxystique</option>
                        <option value="BAV3 permanent">BAV3 permanent</option>
                        <option value="Maladie oreillette">Maladie de l'oreillette</option>
                        <option value="Bloc sino atrial">Bloc sino atrial</option>
                        <option value="Pause sinusale">Pause sinusale</option>
                        <option value="Pause significative">Pause significative</option>
                        <option value="Bradycardie symptomatique">Bradycardie symptomatique</option>
                        <option value="FA lente">FA lente</option>
                    </select>
                </datalist>
                <select id="boitier_indication_Défibrillateur_prevention" name="boitier_indication" hidden>
                    <option value="">Choisissez</option>
                    <option value="Prévention primaire">Prévention primaire</option>
                    <option value="Prévention secondaire">Prévention secondaire</option>
                </select>

                <div id="boitier_indication_Défibrillateur_div" class="two-element-side-by-side" style="display: none">
                    <div class="flex-grow">
                        <input id="boitier_indication_Défibrillateur" name="boitier_indication"
                               list="boitier_indication_Défibrillateur_dl"  autocomplete="off">
                    </div>
                    <div>
                        <button id="boitier_indication_Défibrillateur_bt">▼</button>
                    </div>
                </div>
                <datalist id="boitier_indication_Défibrillateur_dl">
                    <select id="boitier_indication_Défibrillateur_select" multiple size=8 >
                        <option value="">Choisissez</option>
                        <option value="TV">TV</option>
                        <option value="FV">FV</option>
                        <option value="Mort subite">Mort subite</option>
                        <option value="Torsade de pointe">Torsade de pointe</option>
                        <option value="Cardiopathie ischémique">Cardiopathie ischémique</option>
                        <option value="Cardiopathie dilatée non ischémique">Cardiopathie dilatée non ischémique</option>
                        <option value="Cardiopathie hypertrophique">Cardiopathie hypertrophique</option>
                    </select>
                </datalist>


            </div>
            <div class="item">
                <label>Date d'implantation</label>
                <input type="text" name="boitier_date_implantation" value='<?php echo $d; ?>' max="<?php echo $d; ?>"
                       min="1900-01-01" required>
            </div>

            <!--<div class="item separator"></div>-->

            <div class="item">
                <label>Numéro de série</label>
                <input type="text" name="boitier_sn" required>
            </div>
            <div class="item">
                <label>Fabricant</label>
                <input type="text" name="boitier_fabricant" required>
            </div>
            <div class="item">
                <label>Modèle</label>
                <input type="text" name="boitier_modele" required>
            </div>
            <div class="item">
                <label>Référence</label>
                <input type="text" name="boitier_ref" id="boitier_ref" class="code">
            </div>

            <input type="hidden" name="boitier_ean">

            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('liste_medecins')">Précédent</button>
                <button type="submit" class="next">Suivant</button>
            </div>
        </form>


        <!-- SONDE 1 -->
        <form class="step sonde1" id="form_sonde1">
            <div class="subtitle">Sonde 1</div>
            <div class="message">Scannez le code barre de la sonde ou passez à l'étape suivante</div>
            <div class="item">
                <label>Code barre</label>
                <input type="text" name="sonde1_code" id="sonde1_code" class="code">
            </div>
            <div class="item">
                <label>Date d'implantation</label>
                <input type="date" name="sonde1_date_implantation" value="<?php echo $d; ?>" max="<?php echo $d; ?>"
                       min="1900-01-01">
            </div>
            <div class="item">
                <label>Connexion</label>
                <select name="sonde1_connexion">
                    <option value="">Choisissez</option>
                    <option value="IS1">IS1</option>
                    <option value="IS4">IS4</option>
                    <option value="IS1/DF1">IS1/DF1</option>
                    <option value="DF4">DF4</option>
                    <option value="autre">Autre</option>
                </select>
            </div>
            <div class="item">
                <label>Type de sonde</label>
                <select name="sonde1_type">
                    <option value="">Choisissez</option>
                    <option value="OD">OD</option>
                    <option value="VD">VD</option>
                    <option value="VG">VG</option>
                </select>
            </div>

            <!--<div class="item separator"></div>-->

            <div class="item">
                <label>Numéro de série</label>
                <input type="text" name="sonde1_sn">
            </div>

            <div class="item">
                <label>Fabricant</label>
                <input type="text" name="sonde1_fabricant">
            </div>
            <div class="item">
                <label>Modèle</label>
                <input type="text" name="sonde1_modele">
            </div>
            <div class="item">
                <label>Référence</label>
                <input type="text" name="sonde1_ref" id="sonde1_ref" class="code">
            </div>
            <input type="hidden" name="sonde1_ean">

            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('boitier')">Précédent</button>
                <button type="submit" class="next">Suivant</button>
            </div>
        </form>


        <!-- SONDE 2 -->
        <form class="step sonde2" id="form_sonde2">
            <div class="subtitle">Sonde 2</div>
            <div class="message">Scannez le code barre de la sonde ou passez à l'étape suivante</div>
            <div class="item">
                <label>Code barre</label>
                <input type="text" name="sonde2_code" id="sonde2_code" class="code">
            </div>
            <div class="item">
                <label>Date d'implantation</label>
                <input type="date" name="sonde2_date_implantation" value="<?php echo $d; ?>" max="<?php echo $d; ?>"
                       min="1900-01-01">
            </div>
            <div class="item">
                <label>Connexion</label>
                <select name="sonde2_connexion">
                    <option value="">Choisissez</option>
                    <option value="IS1">IS1</option>
                    <option value="IS4">IS4</option>
                    <option value="IS1/DF1">IS1/DF1</option>
                    <option value="DF4">DF4</option>
                    <option value="autre">Autre</option>
                </select>
            </div>
            <div class="item">
                <label>Type de sonde</label>
                <select name="sonde2_type">
                    <option value="">Choisissez</option>
                    <option value="OD">OD</option>
                    <option value="VD">VD</option>
                    <option value="VG">VG</option>
                </select>
            </div>

            <!--<div class="item separator"></div>-->

            <div class="item">
                <label>Numéro de série</label>
                <input type="text" name="sonde2_sn">
            </div>

            <div class="item">
                <label>Fabricant</label>
                <input type="text" name="sonde2_fabricant">
            </div>
            <div class="item">
                <label>Modèle</label>
                <input type="text" name="sonde2_modele">
            </div>
            <div class="item">
                <label>Référence</label>
                <input type="text" name="sonde2_ref" id="sonde2_ref" class="code">
            </div>
            <input type="hidden" name="sonde2_ean">

            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('sonde1')">Précédent</button>
                <button type="submit" class="next">Suivant</button>
            </div>
        </form>


        <!-- SONDE 3 -->
        <form class="step sonde3" id="form_sonde3">
            <div class="subtitle">Sonde 3</div>
            <div class="message">Scannez le code barre de la sonde ou passez à l'étape suivante</div>
            <div class="item">
                <label>Code barre</label>
                <input type="text" name="sonde3_code" id="sonde3_code" class="code">
            </div>
            <div class="item">
                <label>Date d'implantation</label>
                <input type="date" name="sonde3_date_implantation" value="<?php echo $d; ?>" max="<?php echo $d; ?>"
                       min="1900-01-01">
            </div>
            <div class="item">
                <label>Connexion</label>
                <select name="sonde3_connexion">
                    <option value="">Choisissez</option>
                    <option value="IS1">IS1</option>
                    <option value="IS4">IS4</option>
                    <option value="IS1/DF1">IS1/DF1</option>
                    <option value="DF4">DF4</option>
                    <option value="autre">Autre</option>
                </select>
            </div>
            <div class="item">
                <label>Type de sonde</label>
                <select name="sonde3_type">
                    <option value="">Choisissez</option>
                    <option value="OD">OD</option>
                    <option value="VD">VD</option>
                    <option value="VG">VG</option>
                </select>
            </div>

            <!--<div class="item separator"></div>-->

            <div class="item">
                <label>Numéro de série</label>
                <input type="text" name="sonde3_sn">
            </div>

            <div class="item">
                <label>Fabricant</label>
                <input type="text" name="sonde3_fabricant">
            </div>
            <div class="item">
                <label>Modèle</label>
                <input type="text" name="sonde3_modele">
            </div>
            <div class="item">
                <label>Référence</label>
                <input type="text" name="sonde3_ref" id="sonde3_ref" class="code">
            </div>
            <input type="hidden" name="sonde3_ean">

            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('sonde2')">Précédent</button>
                <button type="submit" class="next">Terminer</button>

            </div>
        </form>


        <!-- RESUME -->
        <div class="step resume" id="resume">
            <div class="subtitle">Résumé</div>
            <!--<div class="message">Voici le résumé de la carte</div>-->
            <div class="resume_data"></div>
            <div class="buttons">
                <button type="button" class="previous" onclick="uluru.goToStep('sonde3')">Précédent</button>
                <button type="button" class="next record" onclick="uluru.recordCard()">Enregistrer la carte</button>
                <button type="button" class="next" onclick="uluru.generateCarte()">Générer la carte</button>
                <button type="button" class="next" onclick="uluru.generateCR()">Générer le compte-rendu</button>
            </div>
        </div>

    </div>


</div>