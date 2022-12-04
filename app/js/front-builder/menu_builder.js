Uluru.prototype.menuBuilder = function (){
   
    let permPatient = ['2'];
    let permMedecin = ['1','3','4'];
    let permAdmin = ['3'];
    let typeUser = this.user.id_profile;
    $("#connected_user").text(this.user.realname);
    let content = '';
    $(".showCard").hide();
    $(".showAllPatientCard").hide();
    $(".showUserList").hide();
    $(".showCard").hide();
    $(".findCard").hide();
    $(".showImplant").hide();
    $(".showIntervention").hide();
    $(".showAllPatientCard").hide();
    $(".worklist").hide();

    if(permMedecin.includes(typeUser)){
        $(".showCard").show();
            if(this.record){
                $(".findCard").show();
          }
          $(".worklist").show();

    }
    if(permPatient.includes(typeUser)){
       $(".showAllPatientCard").show();
       $(".showImplant").show();
       $(".showIntervention").show();
    }
    if (permAdmin.includes(typeUser)){
       $(".showUserList").show();
     }
    
    if (permAdmin.includes(typeUser)){
        $(".showUserList").show();
    }
    if(permMedecin.includes(typeUser)){
        $(".showCard").show();
        if(this.record){
                $(".findCard").show();
        }
        $(".worklist").show();

    }
    if(permPatient.includes(typeUser)){
        $(".showAllPatientCard").show();
        $(".showImplant").show();
        $(".showIntervention").show();
    }
   

    var countvisible = $("#mainMenuUl > li:visible").length;
   // alert(countvisible);
    if(countvisible == 3){
        $(".clearfix").css("margin-left", "2%");
        $("li", ".nav").css("width", "30%")
    }
    if(countvisible == 4){
        $(".clearfix").css("margin-left", "15%");
        $("li", ".nav").css("width", "38%")
    }
    if(countvisible == 5){
        $(".clearfix").css("margin-left", "2%");
        $("li", ".nav").css("width", "30%")
    }
    if(countvisible == 6){
        $(".clearfix").css("margin-left", "2%");
        $("li", ".nav").css("width", "30%")
    }




    return content;
}