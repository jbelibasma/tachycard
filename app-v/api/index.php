<?php
/*
 * API MAIN FILE
 */

// SET ERROR
error_reporting(E_ERROR);
ini_set('display_errors', 1);

// REQUIRE
// require "../../PHPMailer/PHPMailer.php";
// require "../../PHPMailer/Exception.php";
// require "../../PHPMailer/SMTP.php";
require "private/Uluru.class.php";
require "private/materiel.class.php";
require "private/centers.class.php";
require "private/carte.class.php";
require "private/Intervention.class.php";
require "private/ApiError.class.php";
require "private/tools.class.php";
require "private/Users.class.php";
require "private/Selection/UluruSelection.class.php";
require "private/Selection/Selection.class.php";
require "private/Analystic/Analystic.class.php";
require "private/Otp/Otp.class.php";


$configs = include('../../env.php');


// PARSE URL
$parser = parse_url($_SERVER["REQUEST_URI"]);


// METHOD
$method = $_SERVER["REQUEST_METHOD"];

// URI
//$base_url = "/AlternanceTachycard/uluru/api";
$base_url = $configs["path_api"];
$uri = $parser["path"];
$uri = str_replace($base_url, "", $uri);
$uri = rtrim($uri, "/");
$t=explode('/',$uri);
$uri='/' . $t[count($t) - 2] . '/' . $t[count($t) - 2] . '/' . $t[count($t) - 1];
// $uri='/' . $t[count($t) - 2].'/'.$t[count($t)-1];





// TOKEN OR NOT
$extract_uri = explode("/", $uri);
$token = $extract_uri[1];
$uri = substr($uri, strlen($token) + 1);



// FORMAT QUERY
$entityBody = file_get_contents('php://input');
if(empty($_GET) && empty($_POST)){
    $query = json_decode($entityBody);
    
} else {
    $query = array_merge($_POST, $_GET);
    
}


// INSTANCE ULURU
$api = new Uluru($configs);




// SET QUERY
$api->query = $query;
$api->token = $token;

//SET different type of permission
$everyonePerm = array();
$patientPerm = array(2,1,3,4);
$medecinPerm = array(1,3,4);
$medecinAdminPerm = array(3,4);
$adminPerm = array(3);

// ADD ROUTES
$api->map("/", "GET", "welcome",$everyonePerm);
$api->map("/", "POST", "welcome",$everyonePerm);
$api->map("/test", "GET", "test",$everyonePerm);
$api->map("/test", "POST", "test",$everyonePerm);
$api->map("/welcome", "GET", "welcome",$everyonePerm);

$api->map("/materiel/get", "GET", "materiel_get",$medecinPerm);
$api->map("/materiel/list", "GET", "materiel_list",$medecinPerm);
$api->map("/materiel/create", "GET", "materiel_create",$medecinPerm);
$api->map("/materiel/import", "GET", "materiel_import",$medecinPerm);

$api->map("/centers/list", "GET", "centers_list",$medecinPerm);
$api->map("/centers/get", "GET", "centers_get",$medecinPerm);
$api->map("/centers/create", "GET", "centers_create",$adminPerm);
$api->map("/centers/update", "GET", "centers_update",$adminPerm);

$api->map("/users/connect", "POST", "users_connect",$everyonePerm);
// $api->map("/users/reset_pw", "POST", "users_reset_pw",$everyonePerm);
$api->map("/users/forgetPass", "POST", "users_forgetPass",$everyonePerm);
$api->map("/users/espace_patients", "POST", "users_espace_patients",$everyonePerm);
$api->map("/users/unconnect", "GET", "users_unconnect",$everyonePerm);
$api->map("/users/list", "GET", "users_list_users",$medecinPerm);
$api->map("/users/create", "POST", "users_create",$medecinPerm);
$api->map("/users/update", "POST", "users_update",$medecinPerm);
$api->map("/users/account_update", "POST", "users_account_update",$patientPerm);
$api->map("/users/get", "GET", "users_get",$medecinPerm);
$api->map("/users/delete", "GET", "users_delete",$medecinPerm);
$api->map("/users/find_patients", "POST", "users_find_patients",$medecinPerm);
$api->map("/users/new_patient", "POST", "users_new_patient",$medecinPerm);
$api->map("/users/new_Patient_Intervention", "POST", "users_new_Patient_Intervention",$medecinPerm);
$api->map("/users/find_all_medecins", "GET", "users_find_all_medecins",$medecinPerm);

$api->map("/cartes/record", "POST", "carte_record",$medecinPerm);
$api->map("/cartes/create_implant", "POST", "carte_create_implant",$medecinPerm);
$api->map("/cartes/find", "GET", "carte_find",$patientPerm);
$api->map("/cartes/list_Implant", "GET", "carte_list_Implant",$patientPerm);

$api->map("/interventions/list_Intervention", "GET", "intervention_list_Intervention",$patientPerm);

$api->map("/interventions/work_list", "GET", "intervention_work_list",$medecinPerm);
$api->map("/interventions/patient_intervention", "POST", "intervention_patient_intervention",$medecinPerm);

$api->map("/selection/create", "POST", "selection_create",$medecinPerm);

$api->map("/otp/send", "POST", "otp_send",$everyonePerm);
$api->map("/otp/verification", "POST", "otp_verification",$everyonePerm);
$api->map("/otp/changePassword", "POST", "otp_changePassword",$everyonePerm);



// CHECK ROUTES
$api->checkRoute($uri, $method,$token);

// GO
$api->go();


