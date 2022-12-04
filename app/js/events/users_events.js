Uluru.prototype.setUserEvents = function (){
    this.setUpdateUserEvents();
}

Uluru.prototype.setUpdateUserEvents = function (){
    $( "#update_user_form input[name='nom']" ).keydown(function( e ) {
        this.verifierCaracteres(e);
    }.bind(this));
    $( "#update_user_form input[name='prenom']" ).keydown(function( e ) {
        this.verifierCaracteres(e);
    }.bind(this));

    // UPDATE USER
    $('#update_users button.update').click(function (e) {
        this.logMessage("UPDATE USER");
        this.updateUser();
    }.bind(this));

    // DELETE USER
    $('#update_users button.delete').click(function (e) {
        this.logMessage("DELETE USER");
        const id = $("#update_users input[name=id]").val();
        this.deleteUser(id);
    }.bind(this));

    $('#show_pass_user').click(function (e){

        let pass1selector = $("#form_account input[name='pass1']");
        let pass2selector = $("#form_account input[name='pass2']");
        if (pass1selector.prop("type") === "password") {
            pass1selector.prop("type", "text");
            pass2selector.prop("type", "text");
        } else {
            pass1selector.prop("type", "password");
            pass2selector.prop("type", "password");
        }
    })
}