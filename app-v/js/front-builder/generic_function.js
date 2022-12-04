Uluru.prototype.addParentDivToContent = function (content, paramOfTheDiv){
    return "<div "+paramOfTheDiv+">"+content+"</div>";
}

Uluru.prototype.generateOptionSelect = function (listContent, selected = false){
    let content = "";
    for (const optionVal of listContent) {
        if (optionVal === ""){
            content += '<option value="">Choisissez</option>';
        }
        else {
            content += '<option value = "'+ optionVal+'" ';
            if (optionVal === selected){
                content += "selected ";
            }
            content += '> '
            content += optionVal + '</option>'
        }

    }
    return content;

}

Uluru.prototype.verifierCaracteres = function (event) {
    let accent = "ŠŽšžŸÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðñòóôõöùúûüýÿ";

    if (accent.indexOf(event.key) >= 0) {
        event.preventDefault();
        notification.create({
            title: "",
            content: "Interdiction d'utiliser des accents dans le nom et prénom",
            icon: "error.svg",
            delay: 2000
        });
        return false;
    }

}
Uluru.prototype.greaterThanDateNow = function (dateToTest){
    var date = new Date().toISOString().slice(0, 10);
    this.logMessage(dateToTest,date,"TEST"+(dateToTest > date));
    return dateToTest < date;

}