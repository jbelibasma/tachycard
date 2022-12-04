/*
VERSION 0.2
 */

function Notification(options) {

    // INIT
    this.container = options.container;
    this.logs = options.logs;
    this.delay = options.delay;
    this.list = [];

    this.logs.logMessage("Nouvelle notification");
    //this.create();

    return this;

}


Notification.prototype.create = function (options) {

    this.logs.logMessage("CREATE NOTIFICATION", options);

    // CREATE ID
    var id = "not_" + parseInt(Math.random() * 10000000);
    var jid = "#" + id;

    // ADD NOT INTO LIST
    this.list[id] = {
        id : id,
        jid: jid,
        title: false,
        icon: false,
        delay: this.delay,
        content: false,
        keep: false,
        close: false
    };

    // UPDATE NOT OBJECT
    if(options.title) this.list[id].title = options.title;
    if(options.content) this.list[id].content = options.content;
    if(options.icon) this.list[id].icon = options.icon;
    if(options.keep) this.list[id].icon = options.keep;
    if(options.close) this.list[id].icon = options.close;

    // CREATE ELEMENT
    $(this.container).append("<div class='not' id='" + id + "'></div>");

    // SET CONTENT
    this.setContent(id, options);

    // SHOW NOT
    this.show(id);

    // REMOVE NOT OR NOT
    if(!options.keep) {
        var delay = this.delay;
        if (options.delay) delay = options.delay;
        this.remove(id, delay);
    }

    return id;

};


Notification.prototype.setContent = function (id, options) {

    this.logs.logMessage("SET CONTENT", options);

    // UPDATE NOT OBJECT
    if(options.title) this.list[id].title = options.title;
    if(options.content) this.list[id].content = options.content;
    if(options.icon) this.list[id].icon = options.icon;
    if(options.keep) this.list[id].keep = options.keep;
    if(options.close) this.list[id].close = options.close;
    if(options.delay) this.list[id].delay = options.delay;

    // SET CONTENT
    var cont = "";
    if(options.close) cont += "<div class='close'></div>";
    if(options.icon) cont += "<div class='icon'><img src='images/" + options.icon + "'></div>";
    if(options.title) cont += "<div class='title'>" + options.title + "</div>";
    if(options.content) cont += options.content;
    $("#" + id).html(cont);

    // SET CLOSE EVENT
    if(options.close) {
        $("#" + id + " .close").click(function() {
            this.list[id].delay = 0;
            this.remove(id);
        }.bind(this));
    }

    // REMOVE NOT OR NOT
    if(!options.keep) {
        var delay = this.delay;
        if (options.delay) delay = options.delay;
        this.remove(id, delay);
    }

};


Notification.prototype.remove = function (id) {

    this.logs.logMessage("REMOVE", id);

    var delay = this.list[id].delay;
    var delay_more = this.list[id].delay + 500;

    // AFTER DELAY...
    setTimeout(function() {

        // HIDE...
        notification.hide(id);

        // ...AND REMOVE
        setTimeout(function() {
            $("#" + id).remove();
            // REMOVE FROM LIST
            var index = notification.list.indexOf(id);
            if (index > -1) {
                notification.list.splice(index, 1);
            }
        }, delay_more);

    }, delay);

};


Notification.prototype.show = function (id) {

    this.logs.logMessage("SHOW", id);

    setTimeout(function() {
        $("#" + id).addClass("visible");
    }, 100);

};


Notification.prototype.hide = function (id) {

    this.logs.logMessage("HIDE", id);

    $("#" + id).removeClass("visible");

};




