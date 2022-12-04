Uluru.prototype.connectionFormRenderer = function (){
    let select = "main";
    this.removeContentRenderer(select);
    $("#page-top").hide();
    $("#"+select).append(this.connectionFormBuilder());
    // $('#forgotpass').off("click").one( "click", function() {
    //     notification.create({
    //         title: "Mot de passe perdu",
    //         content: "Pour des raisons de sécurité, nous vous invitons à contacter votre responsable de centre afin de réinitialiser votre mot de passe",
    //         icon: "warning-orange.svg",
    //         delay: 5000
    //     });
    // });
}

/**NEW REGISTER */
Uluru.prototype.NewRegister = function (){
    let select = "main";
    this.removeContentRenderer(select);
    $("#register").show();
    $("#"+select).append(this.registerFormBuilder());
    
}
/** NEW PW */
Uluru.prototype.NewMDP = function (){
    let select = "main";
    this.removeContentRenderer(select);
    $("#NMDP").show();
    $("#"+select).append(this.NMDPFormBuilder());
    
}
Uluru.prototype.create_NMDP = function (){
    let select = "main";
    this.removeContentRenderer(select);
    $("#create_NMDP").show();
    $("#"+select).append(this.create_NMDPFormBuilder());
    
}

Uluru.prototype.menuRenderer = function (){
    let select = "main";
    this.removeContentRenderer(select);
    $("#page-top").show();
    $("#"+select).append(this.menuBuilder());
    
}
Uluru.prototype.initNewCardDivRenderer = function (){
    let select = "main";
    this.removeContentRenderer(select);
    $("#page-top").hide();
    $("#"+select).append(this.initNewCardDiv());
    $('.screen.new_card').addClass("visible");
}
Uluru.prototype.newCardRenderer = function (){
    let select = "new_card";
    this.removeContentRenderer(select);
    $("#page-top").hide();
    $("#"+select).append(this.cardTypeBuilder());
}
Uluru.prototype.initNewDivIntoMain = function (select){
    this.removeContentRenderer("main");
    $("#main").append(this.initNewCardDiv());
    $("#page-top").hide();
    $('.screen.'+select).addClass("visible");
}
Uluru.prototype.newCardWorkflowRenderer = function (selector,builder,renderList){
    if(selector !== "main"){
        this.initNewDivIntoMain(selector);
    }
    $("#page-top").hide();
    this.removeContentRenderer(selector);
    $("#"+selector).append(builder);
    if (renderList){
        renderList();
    }

    this.setEvents();
}
Uluru.prototype.saveStateOfFront = function (selector,builder,renderList){
    this.savedState.selector = selector;
    this.savedState.builder = builder;
    this.savedState.renderList = renderList;
}
Uluru.prototype.loadStateOfFront = function (){
    //IN CASE WE ARE IN NEW CARD
    this.initNewCardDivRenderer();
    if(this.savedState.paramsBuilder){
        this.newCardWorkflowRenderer(this.savedState.selector,this.savedState.builder(this.savedState.paramsBuilder),this.savedState.renderList);
        this.savedState.paramsBuilder = false;
    }
    else{
        this.newCardWorkflowRenderer(this.savedState.selector,this.savedState.builder(),this.savedState.renderList);
    }
    $('.screen.users').addClass("visible");
}
Uluru.prototype.removeContentRenderer = function (id){
    $("#"+id).empty();
}