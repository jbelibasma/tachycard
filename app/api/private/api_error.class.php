<?php

class api_error {


    function __construct($message, $code_error, $objet=false) {
        // SET JSON HEADER

        if($code_error == 500) header($_SERVER["SERVER_PROTOCOL"]." 500 API Error");
        if($code_error == 404) header($_SERVER["SERVER_PROTOCOL"]." 404 Not found");

        header('Content-Type: application/json');

        $return = array(
            "status" => "ERROR",
            "error" => $code_error,
            "message" => $message
        );


        // EXTRACT PASSWORD
        unset($objet->query["pass1"]);
        unset($objet->query["pass2"]);
        unset($objet->query["password"]);

        if($objet) {
            $return["method"] = $objet->method;
            $return["route"] = $objet->route;
            $return["action"] = $objet->action;
            $return["query"] = $objet->query;
        }

        exit(json_encode($return));

    }


}