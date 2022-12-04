Uluru.prototype.showMaterialList = function () {
    this.logMessage("SHOW MATERIAL LIST");
    $('.screen.material').addClass("visible");
};

Uluru.prototype.hideMaterialList = function () {
    this.logMessage("HIDE NEW CARD FORM");
    $('.screen.material').removeClass("visible");

};

Uluru.prototype.loadMaterialList = function (search) {

    this.logMessage("LOAD MATERIAL LIST");

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            if (data.result && data.result.length > 0) {
                this.renderMaterialList(data.result);
            } else {
                $("#list_materiel").html("Aucun matériel trouvé");
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

    this.apiRequest("GET", "materiel", "list", data, before, success, false);


};

Uluru.prototype.renderMaterialList = function (data) {

    this.logMessage("RENDER MATERIAL LIST");

    // INIT
    var container = "#list_materiel";
    $(container).empty();

    // SET DATA
    data.forEach(function (item) {

        //var irm = "<div class='icon_irm'><img src='images/warning-orange.svg'></div>";
        //if (item.irm) irm = "";

        var content = "<div class='item row'>";
        content += "<div class='cell'>" + item.fabricant + "</div>";
        content += "<div class='cell'>" + item.type + "</div>";
        content += "<div class='cell'>" + item.modele + "</div>";
        content += "<div class='cell'>" + item.ean + "</div>";
        //content += "<div class='cell'>" + irm + "</div>";
        content += "</div>";

        $(container).append(content);


    }.bind(this));


};



Uluru.prototype.recordMaterial = function () {

    this.logMessage("RECORD MATERIAL");

    // INIT
    var data = $('#new_material_form').serialize();

    var before = function () {
        this.showLoading();
    }.bind(this);

    var success = function (data) {

        this.logMessage(data);

        this.hideLoading();

        if (data.status === "OK") {

            notification.create({
                title: "Matériel créé",
                content: data.result.fabricant + " " + data.result.modele,
                icon: "check.svg",
                delay: 2000
            });

            // RESET FORM
            $("#new_material_form input[name=fabricant]").val("");
            $("#new_material_form input[name=modele]").val("");
            $("#new_material_form input[name=ean]").val("");

            // SHOW LIST AND LOAD DATA
            this.showScreen("material");
            this.loadMaterialList();

        } else {

            this.logError(data.message);
            notification.create({
                title: "Erreur",
                content: data.message,
                icon: "error.svg"
            });

        }

    }.bind(this);

    this.apiRequest("GET", "materiel", "create", data, before, success, false);

};
