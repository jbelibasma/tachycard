


// LOG MESSAGE
Uluru.prototype.logMessage = function (message1, message2, message3, message4) {

    if (!this.debug) return false;

    var color0 = 'color:#066FA3';

    if (message1 && !message2 && !message3 && !message4) {
        console.log("%c[" + this.app_name + "]", color0, message1);
    } else if (message1 && message2 && !message3 && !message4) {
        console.log("%c[" + this.app_name + "]", color0, message1, message2);
    } else if (message1 && message2 && message3 && !message4) {
        console.log("%c[" + this.app_name + "]", color0, message1, message2, message3);
    } else if (message1 && message2 && message3 && message4) {
        console.log("%c[" + this.app_name + "]", color0, message1, message2, message3, message4);
    }

    return this;

};


// LOG ERROR
Uluru.prototype.logError = function (message1, message2, message3, message4) {

    if (message1 && !message2 && !message3 && !message4) {
        console.error("[" + this.app_name + "]", message1);
    } else if (message1 && message2 && !message3 && !message4) {
        console.error("[" + this.app_name + "]", message1, message2);
    } else if (message1 && message2 && message3 && !message4) {
        console.error("[" + this.app_name + "]", message1, message2, message3);
    } else if (message1 && message2 && message3 && message4) {
        console.error("[" + this.app_name + "]", message1, message2, message3, message4);
    }

    return this;

};
