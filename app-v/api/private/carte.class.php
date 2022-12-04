<?php

class Carte
{

    public $my;
    public $token;
    public $result;
    public $method;
    public $action;
    public $query;
    public $route;


    function __construct($my)
    {
        $this->my = $my;
    }


    // GET CARTE INFO
    function get()
    {

    }

    private function raiseException($msg,$code){
        ApiError::displayError($msg . $this->my->error, $code, $this);
    }


    // RECORD CARD
    function record()
    {

        $myLocal = $this->my;

        // CHECK DATA
       if (!$this->query["carte_data"]){
           $this->raiseException("Aucune données reçues",500);
       }

        // FORMAT DATA
        $data = json_decode($this->query["carte_data"]);

        $id_centre = $data->carte->centre->id;
        $id_users = $data->carte->patient->id;
        $patient_nom = addslashes($data->carte->patient->nom);
        $patient_prenom = addslashes($data->carte->patient->prenom);
        $medecin_nom = addslashes($data->carte->medecin->nom);
        $medecin_prenom = addslashes($data->carte->medecin->prenom);
        $patient_date_naissance = addslashes($data->carte->patient->date_naissance);
        $boitier_date_implantation = addslashes($data->carte->boitier->date_implantation);
        $indication = addslashes($data->carte->indication);

        // GENERATE ID
        $id = Tools::generateCarteID();
        $data->carte->id = $id;

        // CONVERT JSON TO STRING
        $data = json_encode($data,JSON_UNESCAPED_UNICODE);


        // QUERY
        $sql = "INSERT INTO cartes SET 
            id='$id',
            data='$data',
            patient_nom='$patient_nom',
            patient_prenom='$patient_prenom',
            patient_date_naissance='$patient_date_naissance',
            medecin_nom='$medecin_nom',
            medecin_prenom='$medecin_prenom',
            boitier_date_implantation='$boitier_date_implantation',
            indication='$indication',
            id_centre='$id_centre',
            id_users='$id_users'";


        $myLocal->query($sql);
        if ($this->my->errno != 0){
            $this->raiseException("Erreur SQL : ",500);
        }

        // RESULT
        $this->result = array(
            "id" => $id
        );


    }

    function list_Implant()
    {
        session_start();   
        $id=$_SESSION['user_id'];
  

        $queryLocal = $this->query;
        
        if ($queryLocal != NULL) {

            if (strlen($queryLocal["search"]) >= 3) {

                $search = addslashes($queryLocal["search"]);

                $sql = "SELECT  cartes.id, data, patient_nom, patient_prenom, patient_date_naissance, medecin_nom, medecin_prenom, boitier_date_implantation, indication, id_centre, id_users FROM cartes  LIKE '%$search%' WHERE id_users=$id ORDER BY patient_nom, patient_prenom ";
            } else {

                ApiError::displayError("Longueur de recherche insuffisante", 500, $this);
            }
        } else {

            // FULL SEARCH
            $sql = "SELECT  cartes.id, data, patient_nom, patient_prenom, patient_date_naissance, medecin_nom, medecin_prenom, boitier_date_implantation, indication, centres.name, id_centre, id_users FROM cartes LEFT JOIN centres  ON cartes.id_centre = centres.id WHERE id_users=$id  ORDER BY patient_nom, patient_prenom";
        }

        // QUERY
        $resultLocal = $this->my->query($sql);
        // if ($this->my->errno != 0) {
        //     ApiError::displayError("Erreur SQL : Select cartes", 500, $this);
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
                    "medecin" => $row->medecin_nom . ", " . $row->medecin_prenom,
                   "indication" => $row->indication,
                    "boitier_date_implantation" => $row->boitier_date_implantation,
                    "id" => $row->id,
                    "centres.name" => $row->nom_centre,
                    "data" => json_decode($row->data)
                ));
            }

            $this->result = $list;
        }
    }



    function find()
    {

        $queryLocal = $this->query;

        if ($queryLocal != NULL) {
            $sql = $this->createSearchRequest($queryLocal);
        } else {
            $this->raiseException("Longueur de recherche insuffisante",515);
        }

        // QUERY
        $resultLocal = $this->my->query($sql);
        if ($this->my->errno != 0){
            $this->raiseException("Erreur SQL : Recherche de cartes",500);
        }

        // SET RESULT
        if ($resultLocal->num_rows == 0) {
            $this->raiseException("Aucune carte trouvée",204);

        } else {

            $list = array();

            while ($row = $resultLocal->fetch_object()) {

                array_push($list, array(
                    "patient_nom" => $row->patient_nom,
                    "patient_prenom" => $row->patient_prenom,
                    "patient_date_naissance" => $row->patient_date_naissance,
                    "medecin" => $row->medecin_nom . ", " . $row->medecin_prenom,
//                    "indication" => $row->indication,
                    "boitier_date_implantation" => $row->boitier_date_implantation,
                    "id" => $row->id,
                    "data" => json_decode($row->data)
                ));

            }

            $this->result = $list;

        }
    }
    private function isSearchValid($queryLocal){
        return strlen($queryLocal["nom"]) >= 1 || strlen($queryLocal["prenom"]) >= 1 || strlen($queryLocal["date_naissance"]) >= 1;
    }

    private function createSearchRequest($queryLocal){
        if ($this->isSearchValid($queryLocal)) {

            $search = "";
            $nom = addslashes($queryLocal["nom"]);
            if ($nom != ""){
                $nom = "patient_nom LIKE '%".$nom."%'" ;
                $search .= $nom;
            }
            $prenom = addslashes($queryLocal["prenom"]);
            if ($prenom != ""){
                $prenom = "patient_prenom LIKE '%".$prenom."%'";
                $search .= $search != ""?" AND ":"";
                $search .= $prenom;
            }
            $date_naissance = Tools::checkAndFormatDate($queryLocal["date_naissance"]);
            if (!$date_naissance) {
                $date_naissance = "patient_date_naissance LIKE '%".$date_naissance."%'";
                $search .= $search != ""?" AND ":"";
                $search .= $date_naissance;
            }else{
                $date_naissance = "";
                $search .= $date_naissance;
            }


            return "SELECT * FROM cartes WHERE $search ORDER BY patient_nom, patient_prenom, patient_date_naissance ";
        } else {

            $this->raiseException("Longueur de recherche insuffisante",515);
        }
        return "";
    }




    // UPDATE CARD
    function update()
    {

    }


    // DELETE CARD
    function delete()
    {

    }











}
