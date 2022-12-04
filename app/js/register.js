
Uluru.prototype.espace_patients = function () {
    this.logMessage("REGISTER");
  
    var before = function () {
      this.showLoading();
    }.bind(this);
  
    var success = function (data) {
      this.logMessage(data);
      this.hideLoading();
  
      if (data.status === "OK") {
        this.user = data.result;
        this.token = data.result.token;
        notification.create({
          title: "Patient créé",
          content: "La patient a été créé avec succès"
      });
        // HIDE register
        $("#register").hide();
        this.connectionFormRenderer();
        this.setEvents();

  
      } else {
        this.logError(data.message);
        notification.create({
          title: "Erreur",
          content: data.message,
        });
      }
    }.bind(this);
  
    var form_register = document.querySelector("#main #form_register");
    var data = new FormData(form_register);
    this.apiRequest("POST", "users", "espace_patients", data, before, success, false);
  };

/** showRegister */
  Uluru.prototype.showRegister = function () {

    this.logMessage("SHOW REGISTER");
    this.NewRegister();
    $("#register").show();
    setTimeout(()=>{
        $('#menu').addClass("visible");
        
    }, 50);

};


