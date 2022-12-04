Uluru.prototype.setMenuEvents = function (){
    
    $('.showCard').off("click").one( "click", function() {
        hideMenu();
        uluru.showNewCard();
    });
    $('.findCard').off("click").one( "click", function() {
        hideMenu()
        uluru.showFindCard();
    });
    $('.showAllPatientCard').off("click").one( "click", function() {
        hideMenu();
        uluru.showAllPatientCard();
    });
    $('.showUserList').off("click").one( "click", function() {
        hideMenu();
        uluru.showScreen('users');
        uluru.newCardWorkflowRenderer("main",uluru.listAllUsersBuilder());
        uluru.loadUsersList();
    });
    $('.showImplant').off("click").on( "click", function() {
        hideMenu();
        uluru.newCardWorkflowRenderer("main",uluru.listAllCarteBuilder());
        uluru.list_Implant();
    });
    $('.showIntervention').off("click").on( "click", function() {
        hideMenu();
        uluru.newCardWorkflowRenderer("main",uluru.listAllInterventionBuilder());
        uluru.list_Intervention();
    });
    $('.worklist').off("click").on( "click", function() {
        hideMenu();
        uluru.newCardWorkflowRenderer("main",uluru.listAllWorkBuilder());
        uluru.work_list();
    });
    $('.showAccount').off("click").one( "click", function() {
        hideMenu();
        uluru.showAccount();
    });
    $('.unConnect').off("click").one( "click", function() {
        hideMenu();
    });
    

    $(".home-page").off().on('click', function() {
        hideMenu();
        $("#disconnectMenu").off("click");
    });

    function hideMenu(){
        $("#sidebar-wrapper").removeClass('active');
        $(".menu-toggle").removeClass('active');
        _toggleMenuIcon();
    }
    function _toggleMenuIcon() {
    
        $('.fa-xmark').removeClass('fa-xmark').addClass('fa-bars');
       
    }
}