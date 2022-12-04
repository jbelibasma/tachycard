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

    private function raiseException($msg,$code){
        ApiError::displayError($msg . $this->my->error, $code, $this);
    }
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

                $sql = "SELECT  interventions.id, data, patient_nom, patient_prenom, patient_date_naissance, date_implantation, indication, id_centre, id_users FROM interventions  LIKE '%$search%' WHERE id_users=$id ORDER BY patient_nom, patient_prenom ";
            } else {

                ApiError::displayError("Longueur de recherche insuffisante", 500, $this);
            }
        } else {

            // FULL SEARCH
            $sql = "SELECT  interventions.id, data, patient_nom, patient_prenom, patient_date_naissance, date_implantation, indication, id_centre, id_users FROM interventions WHERE id_users=$id  ORDER BY patient_nom, patient_prenom";
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
                    "patient_date_naissance" => $row->patient_date_naissance,
                    "indication" => $row->indication,
                    "date_implantation" => $row->date_implantation,
                    "id" => $row->id,
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

                $sql = "SELECT  interventions.id, data, patient_nom, patient_prenom, patient_date_naissance, date_implantation, indication, id_centre, id_users FROM interventions WHERE `date_implantation`=CAST(NOW() AS DATE) LIKE '%$search%'  ORDER BY patient_nom, patient_prenom ";
            } else {

                ApiError::displayError("Longueur de recherche insuffisante", 500, $this);
            }
        } else {

            // FULL SEARCH
            $sql = "SELECT  interventions.id, data, patient_nom, patient_prenom, patient_date_naissance, date_implantation, indication, id_centre, id_users  FROM interventions  WHERE `date_implantation`=CAST(NOW() AS DATE) ORDER BY patient_nom, patient_prenom ";
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
                    "patient_date_naissance" => $row->patient_date_naissance,
                    "indication" => $row->indication,
                    "date_implantation" => $row->date_implantation,
                    "id" => $row->id,
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
        $this->query = array_map("urldecode", $this->query);

        // CHECK DATA
       
        if (!$this->query["nom"]) {
            ApiError::displayError($this->errorMsgName, 515, $this);
        }
        if (!$this->query["prenom"]) {
            ApiError::displayError($this->errorMsgFirstName, 515, $this);
        }

        if (!$this->query["date_implantation"]) {
            ApiError::displayError($this->errorMsgFirstName, 515, $this);
        }
        if (!$this->query["indication"]) {
            ApiError::displayError($this->errorMsgFirstName, 515, $this);
        }
        if (!$this->query["date_naissance"]) {
            ApiError::displayError("Merci de renseigner la date de naissance", 515, $this);
        }
        // FORMAT DATA
        $nom = addslashes(strtoupper(urldecode($this->query["nom"])));
        $prenom = addslashes($this->query["prenom"]);
        $date_implantation = $this->query["date_implantation"];
        $indication = $this->query["indication"];
        $date_naissance = Tools::checkAndFormatDate($this->query["date_naissance"]);
        if (!$date_naissance) {
            ApiError::displayError("Date de naissance non valide", 515, $this);
        }
        $sql = "SELECT * FROM users  ORDER BY id DESC LIMIT 1";
        

        // // QUERY
        $resultLocal = $this->my->query($sql);
        $row = $resultLocal->fetch_object();
        $id_users=$row->id;
        // $id_centre = Tools::getIDCentre($this->my, $this->token);
        // $id_users = $this->query["id_users"];


        // QUERY
        $sql = "INSERT INTO interventions SET 
           patient_nom = '$nom',
           patient_prenom = '$prenom',
           patient_date_naissance = '$date_naissance',          
            date_implantation='$date_implantation',
            indication='$indication',
            type = 'patient',
            id_centre = 12,
            id_users = '$id_users',
            status = 1
            ";

        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }
            $id = $myLocal->insert_id;

        

        //ADD patient details
        // $user_mat_ab = isset($this->query["user_mat_ab"]) ? 1 : 0;
        // $sql = "INSERT INTO patient_details SET 
        //     id = '$id',
        //     mat_abandonne = '$user_mat_ab',
        //     ";

        // $myLocal->query($sql);
        // if ($this->my->errno != 0) {
        //     ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        // }

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