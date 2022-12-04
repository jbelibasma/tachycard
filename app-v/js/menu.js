Uluru.prototype.setMenuRights = function () {
    this.logMessage("SET MENU RIGHTS", this.user.type);

    $("#menu .elements .item").hide();
    $("#menu .elements ." + this.user.id_profile).show();

};


Uluru.prototype.showMenu = function () {

    this.logMessage("SHOW MENU");
    this.menuRenderer();
    this.setMenuEvents();
     $("#page-top").show();
    setTimeout(()=>{
        $('#menu').addClass("visible");
        
    }, 50);

};

Uluru.prototype.hideMenu = function () {

    this.logMessage("HIDE MENU");
    $('#menu').removeClass("visible");
    setTimeout(()=>{
        $("#menu").addClass("hide");
    }, 50);

};






