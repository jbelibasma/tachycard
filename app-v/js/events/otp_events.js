Uluru.prototype.setOtpEvents = function (){
    // LOST PASSWORD
    $("#connect .lost").click((e)=> {
        this.logMessage("LOST PASSWORD");
        this.newCardWorkflowRenderer("main",this.lostPassword());
    });
    $("#form_otp_lost_pass").submit(function (e) {
        this.logMessage("FORM LOST PASS SUBMIT")
        e.preventDefault();
        var before = function () {
            this.showLoading();
            //$("#new_carte_form .process." + code).html("<div class='loadBall'></div>");
        }.bind(this);

        var success = function (data) {

            this.hideLoading();

            this.logMessage(data);

            if (data.status === "OK") {
                if (data.result) {
                    this.newCardWorkflowRenderer("main",this.otpVerification());
                } else {
                    notification.create({
                        title: "Erreur",
                        content: "Mail non trouvé",
                        icon: "warning-orange.svg",
                        delay: 5000
                    });
                }
            } else {
                notification.create({
                    title: "Erreur",
                    content: "Erreur coté serveur",
                    icon: "warning-orange.svg",
                    delay: 5000
                });
            }
        }.bind(this);

        let form_otp_lost_pass = document.getElementById("form_otp_lost_pass");
        let value = new FormData(form_otp_lost_pass);
        this.apiRequest("POST", "otp", "send", value, before, success, false);
    }.bind(this));


    $("#form_otp_verification").submit(function (e) {
        this.logMessage("FORM OTP VERIF SUBMIT")
        e.preventDefault();
        var before = function () {
            this.showLoading();
        }.bind(this);
        var success = function (data) {
            this.hideLoading();

            this.logMessage(data);

            if (data.status === "OK") {
                if (data.result) {
                    this.newCardWorkflowRenderer("main",this.changePassword());
                }
            } else {
                notification.create({
                    title: "Erreur",
                    content: "Code invalide",
                    icon: "warning-orange.svg",
                    delay: 5000
                });
            }
        }.bind(this);

        let form_otp_verification = document.getElementById("form_otp_verification");
        let value = new FormData(form_otp_verification);
        this.apiRequest("POST", "otp", "verification", value, before, success, false);
    }.bind(this));
    $("#form_otp_change_pass").submit(function (e) {
        this.logMessage("FORM OTP CHANGE PASS")
        e.preventDefault();
        var before = function () {
            this.showLoading();
        }.bind(this);
        var success = function (data) {
            this.hideLoading();

            this.logMessage(data);

            if (data.status === "OK") {
                if (data.result) {
                    notification.create({
                        title: "Validé",
                        content: "Changement du mot de passe avec succes",
                        icon: "check.svg",
                        delay: 5000
                    });
                    this.user = false;
                    this.token = this.generic_token;

                    this.newCardWorkflowRenderer("main",this.connectionFormBuilder());
                    $('#connect').addClass("visible");

                    // ADD NAME TO FOOTER
                    $('#footer .username').html("");
                }
            } else {
                notification.create({
                    title: "Erreur",
                    content: "Code invalide",
                    icon: "warning-orange.svg",
                    delay: 5000
                });
            }
        }.bind(this);

        let form_otp_change_pass = document.getElementById("form_otp_change_pass");
        let value = new FormData(form_otp_change_pass);
        this.apiRequest("POST", "otp", "changePassword", value, before, success, false);
    }.bind(this));
}