Uluru.prototype.setEvents = function () {

    this.setMenuEvents();
    this.setNewCardEvents();
    this.setUserEvents();
    this.setOtpEvents();
    // CONNECT
    $("#form_connect").submit(function (e) {
        this.logMessage("FORM CONNECT SUBMIT")
        e.preventDefault();
        this.connect();
    }.bind(this));
    
    // SHOW REGISTER
   $("#new_account").click(
    function () {
     this.showRegister();
    }.bind(this)
  );
  //return login
  $("#main #register p #return_login").click(
    function () {
      $("#register").hide();
      this.connectionFormRenderer();
      this.setEvents();
    // this.showCreateMDP();
    }.bind(this)
  );


  //SUBMIT  REGISTER
 
  $("#main").on('submit','#form_register',
    function (e) {
      e.preventDefault();
      this.logMessage("FORM REGISTER SUBMIT");
      this.espace_patients();
    }.bind(this)
  );
  
    //forget PW
    $("#main #forgotpass").click(
      function () {
      this.showNewMDP();
      // this.showCreateMDP();
      }.bind(this)
    );
   

 
    // RESET PW
    $("#main").on('submit','#form_reset_pw',
    function (e) {
      e.preventDefault();
      this.logMessage("FORM RESET PW SUBMIT");
      // this.reset_pw();
      this.forgetpassword();



    }.bind(this)
  );
 
 
   //UPDATE PW
   $("#main").on('submit','#form_create_npw',
   function (e) {
     e.preventDefault();
     this.logMessage("FORM UPDATE PW SUBMIT");
     this.update_pw();
   }.bind(this)
 );
   


     //SUBMIT  NEW PATIENT
 
    $("#new_card").on('submit','#form_patient_intervention',
    function (e) {
        e.preventDefault();
        this.new_Patient_Intervention();
        this.logMessage("FORM INTERVENTION SUBMIT");
        this.patient_intervention();
    }.bind(this)
    );

    // SHOW MENU
    $(".home-page").click(function () {
        this.resetCard();
        this.showMenu();
    }.bind(this));



    // SEARCH MATERIAL
    $('#go_search_material').click(function (e) {
        this.logMessage("GO SEARCH MATERIAL");
        this.loadMaterialList($('#search_materiel').val());
    }.bind(this));

    // SEARCH CENTERS
    $('#go_search_centers').click(function (e) {
        this.logMessage("GO SEARCH CENTERS");
        this.loadCentersList($('#search_centers').val());
    }.bind(this));

    // SEARCH USERS
    $('#go_search_users').click(function (e) {
        this.logMessage("GO SEARCH USERS");
        this.loadUsersList($('#search_users').val());
    }.bind(this));


    // INIT CARDS EVENTS
    this.initCardsEvents();


    // INIT ACCOUNT EVENTS
    this.initAccountEvents();


    // NEW USER RECORD
    $('#new_users button.create').click(function (e) {
        this.logMessage("RECORD USER");
        this.recordUser();
    }.bind(this));

    //NEW MEDECIN RECORD
    $('#new_users_doctor button.create').click(function (e) {
        this.logMessage("RECORD MEDECIN");
        this.recordUserDoctor();
    }.bind(this));






    // NEW CENTER RECORD
    $('#new_centers button.create').click(function (e) {
        this.logMessage("RECORD CENTER");
        this.recordCenter();
    }.bind(this));


    // UPDATE CENTER
    $('#update_centers button.update').click(function (e) {
        this.logMessage("UPDATE CENTER");
        this.updateCenter();
    }.bind(this));

    //Prevent date picker for firefox dans chrome
    $('input[type="date"]').click((e)=>{
        e.preventDefault();
    })

};