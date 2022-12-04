Uluru.prototype.initAccountEvents = function () {

    this.logMessage("INIT ACCOUNT EVENT");

    // ACCOUNT UPDATE
    $('#form_account').submit(function (e) {
        e.preventDefault();
        this.logMessage("SUBMIT FORM ACCOUNT");
        this.updateAccount();
    }.bind(this));

}




Uluru.prototype.updateAccount = function () {

    this.logMessage("UPDATE ACCOUNT");

    // INIT
    var form = document.getElementById("form_account");
    console.log(form);
    var data = new FormData(form);
    console.log(data);

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        // REMOVE PASS
        $("#form_account input[name='pass1']").val("");
        $("#form_account input[name='pass2']").val("");

        if (data.status === "OK") {

            notification.create({
                title: "Votre compte",
                content: data.message,
                icon: "check.svg",
                delay: 2000
            });



        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message,
                icon: "error.svg"
            });

        }

    }.bind(this);

    this.apiRequest("POST", "users", "account_update", data, before, success, false);

};






Uluru.prototype.showAccount = function () {
    this.logMessage("SHOW ACCOUNT");

    // SHOW SCREEN
    this.newCardWorkflowRenderer("main",this.accountUserBuilder());
    // SET DATA
    $("#form_account input[name='nom']").val(this.user.nom);
    $("#form_account input[name='prenom']").val(this.user.prenom);
    $("#form_account input[name='email']").val(this.user.email);
    $("#form_account input[name='id']").val(this.user.id);

    // PATIENT or MEDECIN
    if(this.user.id_profile === "1") {
        $("#account_cards_list").remove();
    } else {
        this.accountRenderPatientCards();
    }

    this.showScreen("account");
};


Uluru.prototype.accountRenderPatientCards = function () {

    this.logMessage("RENDER PATIENT CARDS");

    // INIT
    var container = "#account_cards_list";
    $(container).empty();
    const data = this.user.cards;

    // CHECK
    if(!this.user.cards || this.user.cards.length === 0) {
        $(container).html("Aucune carte enregistrée à ce jour");
        return;
    }


    // SET DATA
    data.forEach(function (item) {

        var content = "<div class='card' id='card_patient_" + item.id + "'>";
        content += "<div class='date'>" + moment(item.boitier_date_implantation).format("DD/MM/YYYY") + "</div>";
        content += "<div class='boitier'>" + item.data.carte.boitier.type + "</div>";
        content += "<div class='centre'>" + item.data.carte.centre.name + "</div>";
        content += "<div class='indication'>" + item.boitier_indication + "</div>";

        content += "</div>";

        $(container).append(content);

        $("#card_patient_" + item.id).click(function() {

            //console.log(item.data);

            // SET DATA FROM ITEM
            this.data = item.data;

            console.log(this.data);

            // SHOW RESUME WITHOUT PREVIOUS
            this.resumeCard(false);
            this.showScreen("new_carte");
            this.goToStep("resume");


        }.bind(this));


    }.bind(this));

}







