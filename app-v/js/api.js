// API REQUEST
Uluru.prototype.apiRequest = function (method, a, b, data, before, success, progress) {

    this.logMessage("API REQUEST");
    if (method !== "GET" && method !== "POST") {
        this.logError("Méthode non valide");
        return false;
    }

    // INIT
    var url = this.api.url;
    if(b==='espace_patients'){
        url += "/" + a + "/" +b + "/";
    }
    else{
    if(this.api.use_token && this.api.token) url +="/" + this.token ;
    url += "/" + a + "/";
    if (b) url += b + "/";
    }
    if(method === "GET" && data) url+= "?" + data;
    url = encodeURI(url);
    this.logMessage(url);

    var main_object = this;
    var parsing = "json";


    // BEFORE
    if (before) before();

    // CREATE HTTP REQUEST
    var xhr = new XMLHttpRequest();

    // SET TIMEOUT
    //xhr.timeout = 1;
    xhr.timeout = 120000;

    // ON READY
    xhr.onreadystatechange = function () {

        // SUCCESS
        if (xhr.readyState === XMLHttpRequest.DONE) {

            // CHECK STATUS
            if (xhr.status === 200) {

                // SET ONLINE
                main_object.offline = false;

                // PARSE RESPONSE
                try {
                    if (parsing === "json") {
                        var data = JSON.parse(xhr.responseText)
                    } else {
                        var data = xhr.responseText;
                    }
                } catch (e) {
                    //console.error("[API JS]", e, xhr.responseText);
                    //alert("Les données retournées par le serveur sont erronées, contactez le support technique");
                    notification.create({
                        title: "Erreur de données",
                        content: "Les données retournées par le serveur sont erronées, contactez le support technique",
                        //close: true,
                        //keep: true
                    });

                    this.hideLoading();

                    return false;
                }

                // EXECUTE SUCCESS
                success(data);

                // RETURN
                return true;

            } else {

                // EN CAS D'ERREUR DE REPONSE
                if (xhr.status !== 0) {
                    console.error("[API JS] La requête a retournée une erreur : " + xhr.status);

                    this.hideLoading();
                    if(xhr.status == 401){
                        //go to home page
                        uluru.unconnect(true);
                    }

                    // TRY TO GET ERROR MESSAGE
                    try {
                        if (parsing === "json") {
                            var data = JSON.parse(xhr.responseText)
                        } else {
                            var data = xhr.responseText;
                        }
                    } catch (e) {
                        console.error(e);
                    }

                    if(typeof data === "object" && data.message) {
                        var content_error = data.message;
                    } else {
                        var content_error = "Le serveur a retourné une erreur " + xhr.status + ", contactez le support technique";
                    }

                    notification.create({
                        title: "Erreur",
                        content: content_error,
                        icon: "error.svg",
                        //close: true,
                        //keep: true
                    });
                    return false;
                }

            }

        }

    }.bind(this);

    // ON TIMEOUT
    xhr.ontimeout = function (evt) {
        console.error("[API JS] La requête a expirée");

        if (!main_object.offline) {
            notification.create({
                title: "Erreur de connexion",
                content: "Désolé, le délai de réponse du serveur est dépassé. Vérifiez votre connexion internet et réessayez.",
                //close: true,
                //wait: true
            });

            // SET OFFLINE
            main_object.offline = true;

            return false;
        }

    }.bind(this);

    // ON PROGRESS
    xhr.onprogress = function (evt) {
        if (evt.lengthComputable) {
            var percentComplete = (evt.loaded / evt.total) * 100;
            if (progress) progress(percentComplete);
        }
    };

    // ON ERROR
    xhr.onerror = function (evt) {
        console.error("[API JS] Erreur de connexion");
        if (!main_object.offline) {
            notification.create({
                title: "Erreur de connexion",
                content: "Votre connexion semble interrompue. Vérifiez votre connexion internet et réessayez.",
                //close: true,
                //wait: true
            });

            // SET OFFLINE
            main_object.offline = true;

            return false;
        }
    }.bind(this);

    // OPEN CONNECTION
    xhr.open(method, url, true);

    // SEND
    xhr.send(data);


};