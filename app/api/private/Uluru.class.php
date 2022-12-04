<?php

class Uluru
{

    public $routes = array();
    public $token;
    public $actions;
    public $action;
    public $method;
    public $query;
    public $route;
    public $my;


    function __construct($configs)
    {
        // CREATE CONNECTION
        $my = new mysqli($configs["hostname"], $configs["username"], $configs["password"], $configs["database"]);

        if ($my->connect_error) {
            ApiError::displayError("problème de connexion au serveur de bases de données".$configs, 500, $this);
        } else {
            $sql = "SET NAMES utf8";
            $my->query($sql);
            $this->my = $my;
        }


    }


    function map($route, $method, $action,$permission) {

        // CHECK ROUTE
        if(!$route || strlen($route) == 0) {
            ApiError::displayError("No valid route", 500, $this);
        }

        // CHECK METHODS
        $accept_method = array("GET", "POST");
        if(!in_array($method, $accept_method)) {
            ApiError::displayError("No valid method", 500, $this);
        }

        // CHECK ACTION
        if(!$action || strlen($action) == 0) {
            ApiError::displayError("No valid action", 500, $this);
        }

        // ADD TO ROUTES
        array_push($this->routes, array(
            "route" => $route,
            "method" => $method,
            "action" => $action,
            "permission" => $permission
        ));

    }


    function checkRoute($uri, $method,$token) {

        $route_found = false;
        foreach ($this->routes as &$route) {
            if($route["route"] == $uri && $route["method"] == $method) {
                if(!empty($route["permission"])){
                    $type = $this->checkTokenRight($token);
                    //if(!in_array($type,$route["permission"])){
                    //    ApiError::displayError("Vous n'avez pas la permission d'acceder à cette route", 401, $this);
                    //}
                }
                $this->action = $route["action"];
                $this->method = $route["method"];
                $this->route = $uri;
                $route_found = true;
                break;
            }
        }

        // NO END POINT
        if(!$route_found) {
            ApiError::displayError("No end point found for $uri and method $method", 404, $this);
        }

    }
    function checkTokenRight($token){
        $sql = "SELECT id_profile FROM users WHERE token='$token' and DATEDIFF(token_creation_time, CURDATE()) =0";
        $result = $this->my->query($sql);
        if ($this->my->errno != 0){
            ApiError::displayError("Ce profil est déjà connecté!", 500, $this);
        }
        if ($result->num_rows == 0){
            return "disconnected";
        }
        $row = $result->fetch_object();
        return $row->id_profile;
    }


    function go() {

        // CHECK ACTION IN ACTIONS ;-)
        //if(!in_array($this->action, $this->actions)) new api_error("No valid action found", $this);

        $generic = true;
        // CHOOSE ACTION
        if($this->action == "welcome") {
            $generic = false;
            $this->welcome();
        }
        if($this->action == "test") {
            $generic = false;
            $this->test();
        }
        // Gestion selection
        if($this->action == "selection_create") {
            $generic = false;
            $analystic = new Analystic($this->my);
            $analystic->userWantPrintCard(Tools::getIDCentre($this->my,$this->token));

            $uluruSelection = new UluruSelection($this->my,$this->query);
            $uluruSelection->route = $this->route;
            $uluruSelection->token = $this->token;
            $uluruSelection->action = $this->action;
            $uluruSelection->method = $this->method;
            $uluruSelection->createSelection();
            $this->sendResponse($uluruSelection->result, "Création d'une nouvelle sélection");

        }
        if($generic){
            $actionsArray = explode('_',$this->action,2);
            $object = new $actionsArray[0]($this->my);
            $object->route = $this->route;
            $object->token = $this->token;
            $object->action = $this->action;
            $object->method = $this->method;
            $object->query = $this->query;
            call_user_func(array($object, $actionsArray[1]));
            $this->sendResponse($object->result, "Response");
        }
    }





    function welcome() {
        $this->sendResponse(false, "Welcome");
    }


    function test() {
        $this->sendResponse(false, "test");
    }


    function sendResponse($data, $message) {

        header('Content-Type: application/json');


        $return = array(
            "status" => "OK",
            "message" => $message,
            "method" => $this->method,
            "route" => $this->route,
            "action" => $this->action,
            "query" => $this->query,
            "result" => $data
        );

        exit(json_encode($return));


    }


}