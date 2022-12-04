


Uluru.prototype.loadUsersList = function (search) {

    this.logMessage("LOAD USERS LIST");

    var before = function () {
        $("#list_users").html("Chargement en cours...<div class='loadBall'></div>");
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        if (data.status === "OK") {

            if (data.result && data.result.length > 0) {
                this.renderUsersList(data.result);
            } else {
                $("#list_users").html("Aucun utilisateur trouvé");
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

    this.apiRequest("GET", "users", "list", data, before, success, false);


};

Uluru.prototype.renderUsersList = function (data) {

    this.logMessage("RENDER USERS LIST");

    // INIT
    var container = "#list_users";
    $(container).empty();
    var ids = [];
    // SET DATA
    data.forEach(function (item) {
        if(ids.indexOf(item.id) == -1){
            ids.push(item.id)

        var content = "<div class='item row' id='user_" + item.id + "'>";
        content += "<div class='cell'>" + item.nom + "</div>";
        content += "<div class='cell'>" + item.prenom + "</div>";
        content += "<div class='cell'>" + item.email + "</div>";
        content += "<div class='cell'>" + item.tel + "</div>";
        content += "<div class='cell'>" + item.type + "</div>";
        content += "</div>";

        $(container).append(content);

        $("#user_" + item.id).click(function() {
            this.renderUpdateUser(item,999);
        }.bind(this));

    }
    }.bind(this));


};


Uluru.prototype.recordUser = function () {

    this.logMessage("RECORD USER");

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            notification.create({
                title: "Utilisateur créé",
                content: `L'utilisateur <strong>${data.result.realname}</strong> a été créé avec succès, son mot de passe est : <strong>${data.result.password}</strong>`,
                icon: "check.svg",
                keep: true,
                close: true
            });

            // RESTE ADD USER DANS
            document.getElementById('new_user_form').reset();
            //$("#new_users input[name=nom]").val("");
            //$("#new_users input[name=prenom]").val("");
            //$("#new_users input[name=email]").val("");

            // SHOW LIST AND LOAD DATA
            this.showScreen("users");
            this.loadUsersList();

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message,
                icon: "error.svg"
            });


        }

    }.bind(this);

    const data = new FormData(document.getElementById("new_user_form"));
    this.apiRequest("POST", "users", "create", data, before, success, false);

};

Uluru.prototype.recordUserDoctor = function () {

    this.logMessage("RECORD USER MEDECIN");

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            notification.create({
                title: "Utilisateur créé",
                content: `L'utilisateur <strong>${data.result.realname}</strong> a été créé avec succès, son mot de passe est : <strong>${data.result.password}</strong>`,
                icon: "check.svg",
                keep: true,
                close: true
            });

            // RESTE ADD USER DANS
            document.getElementById('new_users_doctor').reset();
            //$("#new_users input[name=nom]").val("");
            //$("#new_users input[name=prenom]").val("");
            //$("#new_users input[name=email]").val("");

            //HIDE ALL SCREEN
            this.hideAllScreen();
            // GO TO STEP MEDECIN
            this.goToStep("liste_medecins");

            // FIND MEDECINS
            this.findAllMedecins();

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message,
                icon: "error.svg"
            });


        }

    }.bind(this);

    const data = new FormData(document.getElementById("new_users_doctor"));
    this.apiRequest("POST", "users", "create", data, before, success, false);

};



Uluru.prototype.updateUser = function () {

    this.logMessage("UPDATE USER");

    // INIT
    //var data = $('#update_user_form').serialize();

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            notification.create({
                title: "Utilisateur modifié",
                content: data.message,
                icon: "check.svg",
                delay: 2000
            });

            // RESTE ADD USER DANS
            document.getElementById('update_user_form').reset();
            /*$("#update_users input[name=id]").val("");
            $("#update_users input[name=nom]").val("");
            $("#update_users input[name=prenom]").val("");
            $("#update_users input[name=email]").val("");
            $("#update_users input[name=pass1]").val("");
            $("#update_users input[name=pass2]").val("");*/


            //LOAD LAST STATE OF APP
            this.loadStateOfFront();
            // if(data.result.destination === "base"){
            //     // SHOW LIST AND LOAD DATA
            //     this.showScreen("users");
            //     this.loadUsersList();
            // }else{
            //     this.showScreen('new_carte');
            //     this.findPatient();
            // }

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message,
                icon: "error.svg"
            });


        }

    }.bind(this);

    const data = new FormData(document.getElementById("update_user_form"));
    this.apiRequest("POST", "users", "update", data, before, success, false);

};




Uluru.prototype.renderUpdateUser = function (data,hidePass) {


    this.logMessage("RENDER UPDATE USER", data);

    var container = "#update_users";
    //TODO USE ONE FORM
    if (hidePass !== 999){
        this.newCardWorkflowRenderer("main",this.updateUserBuilder("Patient",data));
    }else{
        this.saveStateOfFront("main",this.listAllUsersBuilder.bind(this),this.loadUsersList.bind(this));
        this.newCardWorkflowRenderer("main",this.updateUser2Builder());
    }

    // SET VALUES
    $(container + " input[name=id]").val(data.id);
    $(container + " input[name=nom]").val(data.nom);
    $(container + " input[name=prenom]").val(data.prenom);
    $(container + " input[name=email]").val(data.email);
    $(container + " input[name=tel]").val(data.tel);
    if(data.sexe !== null){
        $(container + " select[name=sexe]").val(data.sexe);
    }
    $(container + " input[name=user_mat_ab]").prop("checked",!!data.mat_abandonne);

    //HIDE PASS
    // if(hidePass){
    //     $(container + " div[id=pass_div]").hide();
    //     $(container + " input[name=destination]").val("card");
    //     $(container + " button[name=bt_cancel]").attr("onclick","uluru.showScreen('new_carte');uluru.goToStep('liste_patients')");
    // }else{
    //     $(container + " div[id=pass_div]").show();
    //     $(container + " input[name=destination]").val("base");
    //     $(container + " button[name=bt_cancel]").attr("onclick","uluru.showScreen('users')");
    // }
    // RESET PASS
    $(container + " input[name=pass1]").val("");
    $(container + " input[name=pass2]").val("");

    // SHOW UPDATE USERS
    this.showScreen("update_users");

};





Uluru.prototype.deleteUser = function (id) {

    this.logMessage("DELETE USER", id);

    if(!window.confirm("Souhaitez-vous supprimer cet utilisateur ?")) {
        return false;
    }


    var before = ()=> {
        this.showLoading()
    };

    var success = function (data) {

        this.hideLoading();

        this.logMessage(data);

        if (data.status === "OK") {

            notification.create({
                icon: "check.svg",
                title: "OK",
                content: "Utilisateur supprimé avec succès"
            });


            //Permet d'utiliser deux fois le meme formulaire mais a deux endroit
            this.loadStateOfFront();
            // if(data.result.destination === "base"){
            //     // SHOW LIST AND LOAD DATA
            //     this.showScreen("users");
            //     this.loadUsersList();
            // }else{
            //     this.showScreen('new_carte');
            //     this.goToStep("patient");
            // }

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

        }

    }.bind(this);

    this.apiRequest("GET", "users", "delete", "id=" + id +"&destination="+ $("#update_users input[name=destination]").val(), before, success, false);


};

