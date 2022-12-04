Uluru.prototype.showNewCenter = function () {
    this.logMessage("SHOW NEW CENTER FORM");
    this.showScreen("new_centers");
    $("#new_center_form input[name='name']").focus();
};


Uluru.prototype.loadCentersList = function (search) {

    this.logMessage("LOAD CENTERS LIST");

    var before = function () {
        $("#list_centers").html("Chargement en cours...<div class='loadBall'></div>");
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        if (data.status === "OK") {

            if (data.result && data.result.length > 0) {
                this.renderCentersList(data.result);
            } else {
                $("#list_centers").html("Aucun centre trouvé");
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

    this.apiRequest("GET", "centers", "list", data, before, success, false);


};

Uluru.prototype.renderCentersList = function (data) {

    this.logMessage("RENDER CENTERS LIST");

    // INIT
    var container = "#list_centers";
    $(container).empty();

    // SET DATA
    data.forEach(function (item) {

        var content = "<div class='item row' id='center_" + item.id + "'>";
        content += "<div class='cell'>" + item.name + "</div>";
        content += "<div class='cell'>" + item.adresse1 + "</div>";
        content += "<div class='cell'>" + item.code_postal + "</div>";
        content += "<div class='cell'>" + item.ville + "</div>";
        content += "</div>";

        $(container).append(content);

        $("#center_" + item.id).click(function() {
            this.renderUpdateCenter(item);
        }.bind(this));


    }.bind(this));


};



Uluru.prototype.recordCenter = function () {

    this.logMessage("RECORD CENTER");

    // INIT
    var data = $('#new_center_form').serialize();

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            notification.create({
                title: "Centre créé",
                content: data.result.name,
                icon: "check.svg",
                delay: 2000
            });

            // RESET NEW CENTER VALUES
            $("#new_centers input[name=id]").val("");
            $("#new_centers input[name=name]").val("");
            $("#new_centers input[name=adresse1]").val("");
            $("#new_centers input[name=adresse2]").val("");
            $("#new_centers input[name=adresse3]").val("");
            $("#new_centers input[name=code_postal]").val("");
            $("#new_centers input[name=ville]").val("");
            $("#new_centers input[name=tel]").val("");
            $("#new_centers input[name=pays]").val("");

            // SHOW LIST AND LOAD DATA
            this.showScreen("centers");
            this.loadCentersList();

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message,
                icon: "error.svg"
            });


        }

    }.bind(this);

    this.apiRequest("GET", "centers", "create", data, before, success, false);

};




Uluru.prototype.updateCenter = function () {

    this.logMessage("UPDATE USER");

    // INIT
    var data = $('#update_center_form').serialize();

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            notification.create({
                title: "Centre modifié",
                content: data.message,
                icon: "check.svg",
                delay: 2000
            });

            // RESET NEW CENTER VALUES
            $("#new_centers input[name=id]").val("");
            $("#new_centers input[name=name]").val("");
            $("#new_centers input[name=adresse1]").val("");
            $("#new_centers input[name=adresse2]").val("");
            $("#new_centers input[name=adresse3]").val("");
            $("#new_centers input[name=code_postal]").val("");
            $("#new_centers input[name=ville]").val("");
            $("#new_centers input[name=tel]").val("");
            $("#new_centers input[name=pays]").val("");

            // SHOW LIST AND LOAD DATA
            this.showScreen("centers");
            this.loadCentersList();

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message,
                icon: "error.svg"
            });


        }

    }.bind(this);

    this.apiRequest("GET", "centers", "update", data, before, success, false);

};




Uluru.prototype.renderUpdateCenter = function (data) {

    this.logMessage("RENDER UPDATE CENTER");

    var container = "#update_centers";

    // SET VALUES
    $(container + " input[name=id]").val(data.id);
    $(container + " input[name=name]").val(data.name);
    $(container + " input[name=adresse1]").val(data.adresse1);
    $(container + " input[name=adresse2]").val(data.adresse2);
    $(container + " input[name=adresse3]").val(data.adresse3);
    $(container + " input[name=code_postal]").val(data.code_postal);
    $(container + " input[name=ville]").val(data.ville);
    $(container + " input[name=tel]").val(data.tel);
    $(container + " input[name=pays]").val(data.pays);

    // SHOW UPDATE CENTERS
    this.showScreen("update_centers");

};

