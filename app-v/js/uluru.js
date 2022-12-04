function Uluru(options) {

    console.log("START TACHYCARD with options :", options);
    this.app_name = "ULURU";
    this.debug = options.debug;
    this.mode = options.mode;
    this.api = options.api;
    this.token = options.token;
    this.generic_token = options.generic_token;
    this.record = options.record;
    this.config = {};
    this.savedState = {
        selector: false,
        builder: false,
        paramsBuilder: false,
        renderList: false
    }
    this.form_json = {
        users_form: false
    };
    this.data = {
        carte: {
            type_carte:false,
            indication: false,
            boitier: {
                code_bar: false,
                fabricant: false,
                modele: false,
                sn: false,
                ean: false,
                type: false,
                date_implantation: false,
                date_peremption: false,
                ref: false,
                indication: false,
                indication2: false,
                position: false
            },
            boitier1: {
                code_bar: false,
                fabricant: false,
                modele: false,
                sn: false,
                ean: false,
                type: false,
                date_implantation: false,
                date_peremption: false,
                ref: false,
                indication: false,
                indication2: false,
                position: false
            },
            boitier2: {
                code_bar: false,
                fabricant: false,
                modele: false,
                sn: false,
                ean: false,
                type: false,
                date_implantation: false,
                date_peremption: false,
                ref: false,
                indication: false,
                indication2: false,
                position: false
            },
            sonde1: {
                code_bar: false,
                fabricant: false,
                modele: false,
                sn: false,
                ean: false,
                date_implantation: false,
                date_peremption: false,
                connexion: false,
                ref: false
            },
            sonde2: {
                code_bar: false,
                fabricant: false,
                modele: false,
                sn: false,
                ean: false,
                date_implantation: false,
                date_peremption: false,
                connexion: false,
                ref: false
            },
            sonde3: {
                code_bar: false,
                fabricant: false,
                modele: false,
                sn: false,
                ean: false,
                date_implantation: false,
                date_peremption: false,
                connexion: false,
                ref: false
            },
            patient: false,
            medecin: false,
            centre: false,
            patientSearch: {
                id: false,
                search_nom: false,
                search_prenom: false,
            },
            id: false
        }
    };

    this.user = options.user;

    this.startUp();

}
Uluru.prototype.loadJSONFiles = async function (url) {
    fetch(url).then(function (r){
        r.json().then(data => ({
                form_json: data
        })).then(res =>{
            this.form_json.users_form = res.form_json;
        })
    }.bind(this));
    this.logMessage("LOAD JSON");
}
Uluru.prototype.startUp = function () {

    this.logMessage("STARTUP");

    this.loadJSONFiles("js/form-json/users_form.json");

    setTimeout(function () {

        $("#startup .logo").addClass("visible");

        setTimeout(function () {
            $("#startup").addClass("open");
        }, 3000);

    }, 1000);

    // CHECK FOR RECORD
    if(!this.record) {
        $("#resume .buttons .next.record").remove();
    }

    // HIDE ALL SCREEN
    this.hideAllScreen();


    this.connectionFormRenderer();

    // SET EVENTS
    this.setEvents();

    // RESET ALL DATA
    //$('#new_carte input').val("");

    // SET MEDECIN NAME
    //$("#new_carte input[name='nom_medecin']").val(this.user.realname);


    // AUTO START

};





Uluru.prototype.showScreen = function (screen) {
    this.logMessage("SHOW SCREEN", screen);
    this.hideAllScreen();

    $(".screen." + screen).removeClass("hide");
    setTimeout(()=>{
        $(".screen." + screen).addClass("visible");
    }, 50);

};


Uluru.prototype.hideScreen = function (screen) {
    this.logMessage("HIDE SCREEN");
    $(".screen." + screen).removeClass("visible");
    setTimeout(()=>{
        $(".screen." + screen).addClass("hide");
    }, 50);
};


Uluru.prototype.hideAllScreen = function () {
    this.logMessage("HIDE ALL SCREEN");
    // $(".screen").removeClass("visible");
    // $(".screen").addClass("hide");
    //setTimeout(()=>{

    //}, 10);
    //this.hideMenu();
};


Uluru.prototype.showLoading = function () {
    this.logMessage("SHOW LOADING");
    $('#loading').addClass("visible");
};

Uluru.prototype.hideLoading = function () {
    this.logMessage("HIDE LOADING");
    $('#loading').removeClass("visible");
};


Uluru.prototype.reFormatDate = function (date) {
    this.logMessage("REFORMAT DATE", date);
    return date;
}
function check_session(){
    alert("titi");
}

