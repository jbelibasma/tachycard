Uluru.prototype.update_pw = function () {
    this.logMessage("UPDATE PW");
    var before = function () {
      this.showLoading();
    }.bind(this);
  
    var success = function (data) {
      this.logMessage(data);
      this.hideLoading();
      if (data.status === "OK") {
        this.user = data.result;

        //if(this.user.type === "medecin" || this.user.type === "assistant") this.data.centre = data.result.centre;
        // this.token = data.result.token;
        notification.create({
          title: "mot de passe modifier ",
          content: "Mot de passe  a été modifié avec succès"
      });
        
       // HIDE register
      $("#create_NMDP").hide();
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
    // success();
  
    var form_create_npw = document.querySelector("#main #form_create_npw");
    var data = new FormData(form_create_npw);
  
    this.apiRequest("POST", "users", "update_pw", data, before, success, false);
  };