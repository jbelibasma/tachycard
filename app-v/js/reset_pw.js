// Uluru.prototype.forgetpassword = function () {
//     this.logMessage("RESET");
  
//     var before = function () {
//       this.showLoading();
//     }.bind(this);
  
//     var success = function (data) {
//       this.logMessage(data);
//       this.hideLoading();
//       if (data.status === "OK") {
//         this.user = data.result;
        

//         //if(this.user.cle === "medecin" || this.user.type === "assistant") this.data.centre = data.result.centre;
//         // this.token = data.result.token;
//         notification.create({
//           title: "email envoyer",
//           content: "L'email' a été envoyéé avec succès"
//       });
//       //reset data

        
//        // HIDE register
//       $("#main #NMDP").hide();
//       this.showCreateMDP();
//       // $("#create_NMDP").show();


//       // this.setEvents();



    

  
//       } else {
//         this.logError(data.message);
//         notification.create({
//           title: "Erreur",
//           content: data.message,
//         });
//       }
//     }.bind(this);
//     // success();
  
//     var form_reset_pw = document.querySelector("#main #form_reset_pw");
//     var data = new FormData(form_reset_pw);
  
//     this.apiRequest("POST", "users", "forgetPass", data, before, success, false);
//   };

  Uluru.prototype.showNewMDP = function () {
    this.logMessage("RENITIALISER  MOT DE PASSE");
    this.NewMDP();

    // this.setMenuEvents();
     $("#NMDP").show();
    setTimeout(()=>{
        $('#menu').addClass("visible");
        
    }, 50);
  
  };
  Uluru.prototype.showCreateMDP = function () {

    this.logMessage("RENITIALISER  MOT DE PASSE");
    this.create_NMDP();

    // this.setMenuEvents();
    //  $("#create_NMDP").show();
    // setTimeout(()=>{
    //     $('#menu').addClass("visible");
        
    // }, 50);
  
  };
 