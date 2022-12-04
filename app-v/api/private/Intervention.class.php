<?php

class Intervention
{
    public $my;
    public $token;
    public $result;
    public $method;
    public $action;
    public $query;
    public $route;
    

    private $typeEncode = "{SHA}";
    private $errorMsg = "Erreur SQL : ";
    private $errorMsgId = "Merci de renseigner l'identifiant";
    private $errorMsgName = "Merci de renseigner le nom";
    private $errorMsgFirstName = "Merci de renseigner le prénom";
    private $errorMsgEmail = "Adresse email non valide";
    private $errorMsgexistEmail="Adresse email exist!";

   
    function __construct($my)
    {
        $this->my = $my;
    }
   
    /**  list_Intervention */
    function list_Intervention(){
        session_start();   
        $id=$_SESSION['user_id'];
  

        $queryLocal = $this->query;
        
        if ($queryLocal != NULL) {

            if (strlen($queryLocal["search"]) >= 3) {

                $search = addslashes($queryLocal["search"]);
                $sql= "SELECT interventions.`id` AS Id,`interventions`.`patient_nom`,`interventions`.`patient_prenom`,`email`,`tel`,`sexe`,`numero_securite`,`type_implant`,`interventions`.`patient_date_naissance`,`date_implantation`,`interventions`.`indication`,`interventions`.`id_centre`,`id_cartes`,`cartes`.`medecin_nom`,`cartes`.`medecin_prenom`,`cartes`.`boitier_date_implantation` FROM `interventions` INNER JOIN `cartes`  ON `interventions`.`id_cartes` =  `cartes`.`id` OR `id_cartes`= 0 LIKE '%$search%' WHERE id_users=$id  ORDER BY patient_nom, patient_prenom";

            } else {

                ApiError::displayError("Longueur de recherche insuffisante", 500, $this);
            }
        } else {

            // FULL SEARCH
            $sql= "SELECT interventions.`id` AS Id, `interventions`.`data`,`interventions`.`patient_nom`,`interventions`.`patient_prenom`,`email`,`tel`,`sexe`,`numero_securite`,`type_implant`,`interventions`.`patient_date_naissance`,`date_implantation`,`interventions`.`indication`,`interventions`.`id_centre`,`id_cartes`,`cartes`.`medecin_nom`,`cartes`.`medecin_prenom`,`cartes`.`boitier_date_implantation` FROM `interventions` INNER JOIN `cartes`  ON `interventions`.`id_cartes` =  `cartes`.`id` OR `id_cartes`= 0 WHERE id_users=$id  ORDER BY patient_nom, patient_prenom";

            // $sql = "SELECT  interventions.id, data, patient_nom, patient_prenom, patient_date_naissance, date_implantation, indication, id_centre, id_users FROM interventions WHERE id_users=$id  ORDER BY patient_nom, patient_prenom";
        }

        // QUERY
        $resultLocal = $this->my->query($sql);
        // if ($this->my->errno != 0) {
        //     ApiError::displayError("Erreur SQL : Select interventions", 500, $this);
        // }

        // SET RESULT
        if ($resultLocal->num_rows == 0) {

            $this->result = array();
        } else {

            $list = array();

            while ($row = $resultLocal->fetch_object()) {
                array_push($list, array(
                        "patient_nom" => $row->patient_nom,
                        "patient_prenom" => $row->patient_prenom,
                        "email" => $row->email,
                        "medecin_nom" => $row->medecin_nom,
                        "medecin_prenom" => $row->medecin_prenom,
                        "boitier_date_implantation" => $row->boitier_date_implantation,
                        "tel"=>$row->tel,
                        "type_implant"=>$row->type_implant,
                        "numero_securite"=>$row->numero_securite,
                        "patient_date_naissance" => $row->patient_date_naissance,
                        "indication" => $row->indication,
                        "date_implantation" => $row->date_implantation,
                        "Id" => $row->Id,
                        "id_cartes" => $row->id_cartes,
                        "data" => json_decode($row->data)

                ));
            }

            $this->result = $list;
        }
    }
    


    function work_list(){
        session_start();
   
     

        $queryLocal = $this->query;
        
        if ($queryLocal != NULL) {

            if (strlen($queryLocal["search"]) >= 3) {

                $search = addslashes($queryLocal["search"]);

                $sql = "SELECT interventions.`id` AS Id,`interventions`.`patient_nom`,`interventions`.`patient_prenom`,`email`,`tel`,`sexe`,`numero_securite`,`type_implant`,`interventions`.`patient_date_naissance`,`date_implantation`,`interventions`.`indication`,`interventions`.`id_centre`,`id_cartes`,`cartes`.`medecin_nom`,`cartes`.`medecin_prenom`,`cartes`.`boitier_date_implantation` FROM `interventions` INNER JOIN `cartes`  ON `interventions`.`id_cartes` =  `cartes`.`id` OR `id_cartes`= 0 LIKE '%$search%' WHERE `date_implantation`=CAST(NOW() AS DATE) ORDER BY patient_nom, patient_prenom ";
            } else {

                ApiError::displayError("Longueur de recherche insuffisante", 500, $this);
            }
        } else {

                $sql= "SELECT interventions.`id` AS Id,`interventions`.`patient_nom`,`interventions`.`patient_prenom`,`email`,`tel`,`sexe`,`numero_securite`,`type_implant`,`interventions`.`patient_date_naissance`,`date_implantation`,`interventions`.`indication`,`interventions`.`id_centre`,`id_cartes`,`cartes`.`medecin_nom`,`cartes`.`medecin_prenom`,`cartes`.`boitier_date_implantation` FROM `interventions` INNER JOIN `cartes`  ON `interventions`.`id_cartes` =  `cartes`.`id` OR `id_cartes`= 0 WHERE `date_implantation`= CAST(NOW() AS DATE) ORDER BY patient_nom, patient_prenom ";
            }
               
  
        // QUERY
        $resultLocal = $this->my->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError("Erreur SQL : Select interventions", 500, $this);
        }

        // SET RESULT
        if ($resultLocal->num_rows == 0) {

            $this->result = array();
        } else {

            $list = array();

            while ($row = $resultLocal->fetch_object()) {
                    array_push($list, array(
                        "patient_nom" => $row->patient_nom,
                        "patient_prenom" => $row->patient_prenom,
                        "email" => $row->email,
                        "medecin_nom" => $row->medecin_nom,
                        "medecin_prenom" => $row->medecin_prenom,
                        "boitier_date_implantation" => $row->boitier_date_implantation,
                        "tel"=>$row->tel,
                        "type_implant"=>$row->type_implant,
                        "numero_securite"=>$row->numero_securite,
                        "patient_date_naissance" => $row->patient_date_naissance,
                        "indication" => $row->indication,
                        "date_implantation" => $row->date_implantation,
                        "Id" => $row->Id,
                        "id_cartes" => $row->id_cartes,
                        "data" => json_decode($row->data)
    
                    ));

                
            }

            $this->result = $list;
        }
    }
    function patient_intervention()
    {
        // $user=new Users($this->my);
        // $create_compte=$user->espace_patients();
        // var_dump($create_compte);die;

        $myLocal = $this->my;

        // FORMAT QUERY
        // $this->query = array_map("urldecode", $this->query);

        // CHECK DATA
       
        if (!$this->query["nom"]) {
            ApiError::displayError($this->errorMsgName, 515, $this);
        }
        if (!$this->query["prenom"]) {
            ApiError::displayError($this->errorMsgFirstName, 515, $this);
        }
        if (!Tools::validEmail(urldecode($this->query["email"])) && $this->query["tel"] == "") {
            ApiError::displayError("Merci d'indiquer une adresse email valide ou un numéro de téléphone", 515, $this);
        }
        if ($this->query["email"] != "" && !Tools::validEmail(urldecode($this->query["email"]))) {
            ApiError::displayError($this->errorMsgEmail, 515, $this);
        }
        if (!$this->query["sexe"]) {
            ApiError::displayError("Merci de renseigner le sexe", 515, $this);
        }
        if (!$this->query["type_implant"]) {
            ApiError::displayError("Merci de renseigner le type d'implant", 515, $this);
        }
        $date_naissance = Tools::checkAndFormatDate($this->query["date_naissance"]);
        if (!$this->query["date_naissance"]) {
            ApiError::displayError("Merci de renseigner la date de naissance", 515, $this);
        }

        if (!$this->query["date_implantation"]) {
            ApiError::displayError("Merci de renseigner la date d'implantation", 515, $this);
        }
        if (!$this->query["indication"]) {
            ApiError::displayError("Merci de renseigner l'indication)", 515, $this);
        }
       
      
        
       
        
        
        
        
        
        // FORMAT DATA
        $nom = addslashes(strtoupper(urldecode($this->query["nom"])));
        $prenom = addslashes($this->query["prenom"]);
        $email = html_entity_decode($this->query["email"]);
        $sexe = $this->query["sexe"];
        $id_profile=2;
        $numero_securite = $this->query["numero_securite"];
        $tel = $this->query["tel"];
        $type_implant = $this->query["type_implant"];
        $date_implantation = $this->query["date_implantation"];
        $indication = $this->query["indication"];
        $date_naissance = Tools::checkAndFormatDate($this->query["date_naissance"]);
        if (!$date_naissance) {
            ApiError::displayError("Date de naissance non valide", 515, $this);
        }
       

        $sql = "SELECT * FROM users  ORDER BY id DESC LIMIT 1";
        

        // // QUERY
        $tokenLocal = Tools::generateToken();

        $resultLocal = $this->my->query($sql);
        $row = $resultLocal->fetch_object();
        $id_users=$row->id;
        $id_centre = Tools::getIDCentre($this->my, $this->token);
        // $id_users = $this->query["id_users"];
        $id = $myLocal->insert_id;
        

        // QUERY
        $sql = "INSERT INTO interventions SET 
           patient_nom = '$nom',
           patient_prenom = '$prenom',
           email ='$email',
           tel='$tel',
           sexe='$sexe',
           numero_securite='$numero_securite',
           type_implant='$type_implant',
           patient_date_naissance = '$date_naissance',          
           date_implantation='$date_implantation',
           indication='$indication',
           id_profile = $id_profile,
           id_centre ='$id_centre',
           id_users = '$id_users',
           status = 1
           ";

        $myLocal->query($sql);
        // if ($this->my->errno != 0) {
        //     ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        // }
        $id = $myLocal->insert_id;

        //ADD patient details
        $user_mat_ab = isset($this->query["user_mat_ab"]) ? 1 : 0;
        $sql = "INSERT INTO patient_details SET 
            id = '$id',
            mat_abandonne = '$user_mat_ab'
            ";

        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }

        // RESULT
        $this->result = array(
            "id" => $id,
            //"password" => $password,
            //"token" => $token,
            "nom" => $nom,
            "prenom" => $prenom,
            "date_naissance" => $date_naissance,
        );
    }
}