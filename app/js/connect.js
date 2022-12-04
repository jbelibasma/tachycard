Uluru.prototype.connect = function () {
    this.logMessage("CONNECT");

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            this.user = data.result;
            //if(this.user.type === "medecin" || this.user.type === "assistant") this.data.centre = data.result.centre;
            this.token = data.result.token;

            // HIDE CONNECT
            $("#connect").removeClass("visible");
            $("#hedear-menu").show();
            // NOTIFY
           

            // ADD NAME TO FOOTER
            $('#footer .username').html(this.user.realname);

            // CHECK USERS
            if(this.user.id_profile !== 2) $("#account_cards").remove();

            // SET MENU RIGHTS
            this.setMenuRights();

            // SHOW MENU
            this.showMenu();

            
               


        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

        }

    }.bind(this);


    var form_connect = document.getElementById("form_connect");
    var data = new FormData(form_connect);

    this.apiRequest("POST", "users", "connect", data, before, success, false);


}


Uluru.prototype.unconnect = function (noAlert) {
    this.logMessage("UNCONNECT");
    if(!noAlert){
        if (!window.confirm("Souhaitez-vous quitter Tachycard ?")) return false;
    }
    var before = null;

    var success = function (data) {

        this.logMessage(data);

        if (data.status === "OK") {

            this.user = false;
            this.token = this.generic_token;
        
            this.newCardWorkflowRenderer("main",this.connectionFormBuilder());
            $('#connect').addClass("visible");
        $("#page-top").hide();
        $("#hedear-menu").hide();
            // ADD NAME TO FOOTER
            $('#footer .username').html("");
            // NOTIFY
            notification.create({
                title: "Bye bye",
                content: "Vous êtes maintenant déconnecté de Tachycard"
            });
        $("#carte_print").hide();
        $("#cr_print").hide();
        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

        }

    }.bind(this);

    var data = false;
    data = "user_id=" + this.user.id;

    this.apiRequest("GET", "users", "unconnect", data, before, success, false);

}

Uluru.prototype.forgetpassword = function (noAlert) {
    this.logMessage("forgetpassword");
    if(!noAlert){
        if (!window.confirm("Souhaitez-vous quitter Tachycard ?")) return false;
    }
    var before = null;

    var success = function (data) {

        this.logMessage(data);

        if (data.status === "OK") {

           
            this.newCardWorkflowRenderer("main",this.connectionFormBuilder());
            $('#connect').addClass("visible");
            $("#page-top").hide();
            $("#hedear-menu").hide();
            // ADD NAME TO FOOTER
            $('#footer .username').html("");
            // NOTIFY
            notification.create({
                title: "votre mot de passe",
                content: "Un mail contient un lien pour renouvler votre mot de passe est bien envoyé à votre boite mail"
            });
        $("#carte_print").hide();
        $("#cr_print").hide();
        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message
            });

        }

    }.bind(this);

    var form_connect = document.getElementById("form_forgetPssword");
    var data = new FormData(form_connect);

    this.apiRequest("POST", "users", "forgetPass", data, before, success, false);

}