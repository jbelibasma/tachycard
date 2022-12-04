<?php

class materiel
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

/*
    function get()
    {

        $query = $this->query;

        // CHECK QUERY
        if (!key_exists("code", $query)) new api_error("Code barre non défini", 500, $this);
        if (strlen($query["code"]) == 0) new api_error("Code barre non valide", 500, $this);

        // INIT
        $code = $query["code"];
        //var_dump($code);

        // FORMAT DATA FOR BIOTRONIK
        //if(substr($code,0,2) == "01") $code = substr($code, 2);
        $ean = substr($code, 2, 14);
        $sn = substr($code, 26);

        //var_dump($ean);
        //var_dump($sn);

        // MYSQL QUERY
        $sql = "SELECT * FROM materiel WHERE ean='$ean'";
        $result = $this->my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : Get SN", 500, $this);

        // SET RESULT
        if ($result->num_rows == 0) {
            new api_error("Aucun matériel trouvé", 204, $this);
        } else {
            $row = $result->fetch_object();

            $irm = false;
            if ($row->irm == 1) $irm = true;
            //$this->result = $row;
            $this->result = array(
                "fabricant" => $row->fabricant,
                "modele" => $row->name,
                "description" => $row->description,
                "sn" => $sn,
                "irm" => $irm,
                "ean" => $ean,
                "type" => $row->type
            );

        }

    }

*/

    function get()
    {

        $query = $this->query;

        // CHECK QUERY
        if (!key_exists("code", $query)) new api_error("Code barre non défini", 500, $this);
        if (strlen($query["code"]) == 0) new api_error("Code barre non valide", 500, $this);

        // INIT
        $code = $query["code"];
        //var_dump($code);

        // EXTRACT EAN FROM CODE
        //if(substr($code,0,2) == "01") $code = substr($code, 2);
        $matchCode = tools::getValueBarCode($code);
        $ean = $matchCode[1];
//        $ean = substr($code, 2, 14);

        $peremption = $matchCode[5];
        if($peremption == null){
            $peremption = $matchCode[4];
        }
        $peremption = substr_replace($peremption, "-", 4, 0);
        $peremption = substr_replace($peremption, "-", 2, 0);
        $datePeremption = date("Y-m-d", strtotime($peremption));
        $sn = $matchCode[6];
        //TODO attention source d'erreur
//        $numCheck = substr($code, 25,1);
//        if($numCheck == 7){
//            $sn = substr($code, 34);
//        }
//        else{
//            $sn = substr($code, 26);
//        }



        //var_dump($ean);
        //var_dump($sn);

        // MYSQL QUERY FOR EAN
        $sql = "SELECT * FROM ARTCOD WHERE ArtCodVal='$ean'";
        $result = $this->my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : Get SN", 500, $this);
        if ($result->num_rows == 0) new api_error("Aucun matériel trouvé", 204, $this);
        $row = $result->fetch_object();
        $ArtIdCIO = $row->ArtIdCIO;
        $SocIdCIO  = $row->SocIdCIO;

        // GET MODELE
        $sql = "SELECT * FROM ARTLIB WHERE ArtIdCIO='$ArtIdCIO'";
        $result = $this->my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : Get Models", 500, $this);
        $row = $result->fetch_object();
        $description = $ArtTaille1 = $row->ArtTaille1;
        $modele = $ArtLib1 = $row->ArtLib1;
        $ArtLib2 = $row->ArtLib2;
        $ArtTaille2 = $row->ArtTaille2;
        $type = "";
        $connexion = "autre";

        // LOOK FOR DEF and PACE
        if(strpos($modele, "Défibrillateur") != false) $type = "Défibrillateur";
        if(strpos($modele, "Stimulateur") != false) $type = "Pacemaker";

        // LOOK FOR SONDE
//        if(strpos($modele, "Sonde stimulation bipolaire") != false) {
//            $type = "Sonde";
//            $modele = str_replace("Sonde stimulation bipolaire ","", $modele);

        $ListConnexion = array($ArtLib2,$modele);
            // LOOK FOR CNX
        foreach ($ListConnexion as $modeleList) {
            if(strpos($modeleList, "IS1") != false) {
                $connexion = "IS1";
                $modeleList = str_replace("IS1 ","", $modeleList);
            }
            if(strpos($modeleList, "IS-1") != false) {
                $connexion = "IS1";
                $modeleList = str_replace("IS-1 ","", $modeleList);
            }
            if(strpos($modeleList, "IS4") != false || strpos($modeleList, "IS-4") != false) {
                $connexion = "IS4";
                $modeleList = str_replace("IS4 ","", $modeleList);
                $modeleList = str_replace("IS-4 ","", $modeleList);
            }
            if(strpos($modeleList, "IS1/DF1") != false || strpos($modeleList, "IS-1/DF-1") != false) {
                $connexion = "IS1/DF1";
                $modeleList = str_replace("IS1/DF1 ","", $modeleList);
                $modeleList = str_replace("IS-1/DF-1 ","", $modeleList);
            }
            if(strpos($modeleList, "DF4") != false || strpos($modeleList, "DF-4") != false) {
                $connexion = "DF4";
                $modeleList = str_replace("DF4 ","", $modeleList);
                $modeleList = str_replace("DF-4 ","", $modeleList);
            }
        }

//        }


        // GET FABRICANT

//        $sql = "SELECT * FROM ARTSOC, SOCLIB WHERE ARTSOC.SocIdCIO=SOCLIB.SocIdCIO AND ARTSOC.ArtIdCIO='$ArtIdCIO'";
        $sql = "SELECT * FROM SOCLIB WHERE SOCLIB.SocIdCIO='$SocIdCIO'";
        $result = $this->my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : Get Maker" . $this->my->error, 500, $this);
        $row = $result->fetch_object();
        $fabricant = $row->SocLib1;

        //GET REFERENCE
        $sql = "SELECT * FROM ARTSOC WHERE `ArtIdCIO` = '$ArtIdCIO' AND `SocIdCIO` = '$SocIdCIO' ";
        $result = $this->my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : Get Ref" . $this->my->error, 500, $this);
        $row = $result->fetch_object();
        $ref = $row->ArtRef;




        //$irm = false;
            //if ($row->irm == 1) $irm = true;
            //$this->result = $row;
            $this->result = array(
                "ArtIdCIO" => $ArtIdCIO,
                "ArtLib1" => $ArtLib1,
                "ArtLib2" => $ArtLib2,
                "ArtTaille1" => $ArtTaille1,
                "ArtTaille2" => $ArtTaille2,
                "fabricant" => $fabricant,
                "modele" => $modele,
                "description" => $description,
                "sn" => $sn,
                "ean" => $ean,
                "type" => $type,
                "connexion" => $connexion,
                "ref" => $ref,
                "peremption"=>$datePeremption
            );



    }


    function list()
    {

        $query = $this->query;

        if ($query != NULL) {

            if (strlen($query["search"]) >= 3) {

                $search = addslashes($query["search"]);

                $sql = "SELECT * FROM materiel WHERE
                                fabricant LIKE '%$search%'
                                 OR name LIKE '%$search%'
                                 OR ean LIKE '%$search%'
                                 OR ref_fabricant LIKE '%$search%'
                           ORDER BY fabricant, name, ean ";
            } else {

                new api_error("Longueur de recherche insuffisante", 500, $this);
            }

        } else {

            // FULL SEARCH
            $sql = "SELECT * FROM materiel ORDER BY fabricant, name, ean ";

        }

        // QUERY
        $result = $this->my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : Select materials", 500, $this);

        // SET RESULT
        if ($result->num_rows == 0) {

            //new api_error("Aucun matériel trouvé", 204, $this);
            $this->result = array();

        } else {

            $list = array();

            while ($row = $result->fetch_object()) {
                $irm = false;
                if ($row->irm == 1) $irm = true;
                //$this->result = $row;
                array_push($list, array(
                    "fabricant" => $row->fabricant,
                    "modele" => $row->name,
                    "description" => $row->description,
                    "irm" => $irm,
                    "ean" => $row->ean,
                    "type" => $row->type
                ));

            }

            $this->result = $list;

        }
    }




    // CREATE MATERIEL
    function create()
    {

        $my = $this->my;

        // FORMAT QUERY
        $this->query = array_map("urldecode", $this->query);

        // CHECK DATA
        if (!$this->query["fabricant"]) new api_error("Merci de renseigner le fabricant", 515, $this);
        if (!$this->query["modele"]) new api_error("Merci de renseigner le modèle", 515, $this);
        if (!$this->query["ean"]) new api_error("Merci de renseigner le code ean (code barre)", 515, $this);
        if (!$this->query["type"]) new api_error("Merci de renseigner le type", 515, $this);


        // FORMAT DATA
        $fabricant = addslashes(strtoupper($this->query["fabricant"]));
        $modele = addslashes($this->query["modele"]);
        $ean = addslashes($this->query["ean"]);
        $type = addslashes($this->query["type"]);


        // QUERY
        $sql = "INSERT INTO materiel SET fabricant = '$fabricant', name = '$modele', ean = '$ean', type = '$type', status=2";

        $my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : " . $this->my->error, 500, $this);
        $id = $my->insert_id;

        // RESULT
        $this->result = array(
            "id" => $id,
            "fabricant" => $fabricant,
            "modele" => $modele
        );

    }




    // IMPORT
    function import()
    {

        $my = $this->my;

        // INIT
        $dir_latest = "/www/uluru/api/data/phast/latest";
        $dir_imported = "/www/uluru/api/data/phast/imported";

        // SCAN FILE
        $files = scandir($dir_latest);
        array_shift($files);
        array_shift($files);

        echo "<pre>";

        var_dump($files);

        // LOOP ON FILE FOR IMPORT
        foreach ($files as $file) {

            $table = substr($file, 0,-4);
            var_dump("TABLE", $table);

            // TRUNCATE
           $sql = "TRUNCATE TABLE $table";
           $my->query($sql);
           if ($this->my->errno != 0) new api_error("Erreur SQL : " . $this->my->error . " SQL : $sql", 500, $this);

           // IMPORT
           $sql = "LOAD DATA LOCAL INFILE '$dir_latest/$file' INTO TABLE $table FIELDS TERMINATED BY '|' LINES TERMINATED BY '\n'";
           $my->query($sql);
           if ($this->my->errno != 0) new api_error("Erreur SQL : " . $this->my->error . " SQL : $sql", 500, $this);



        }




        echo "</pre>";
        exit();

        // FORMAT QUERY
        $this->query = array_map("urldecode", $this->query);

        // CHECK DATA
        if (!$this->query["fabricant"]) new api_error("Merci de renseigner le fabricant", 515, $this);
        if (!$this->query["modele"]) new api_error("Merci de renseigner le modèle", 515, $this);
        if (!$this->query["ean"]) new api_error("Merci de renseigner le code ean (code barre)", 515, $this);
        if (!$this->query["type"]) new api_error("Merci de renseigner le type", 515, $this);


        // FORMAT DATA
        $fabricant = addslashes(strtoupper($this->query["fabricant"]));
        $modele = addslashes($this->query["modele"]);
        $ean = addslashes($this->query["ean"]);
        $type = addslashes($this->query["type"]);


        // QUERY
        $sql = "INSERT INTO materiel SET fabricant = '$fabricant', name = '$modele', ean = '$ean', type = '$type', status=2";

        $my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : " . $this->my->error, 500, $this);
        $id = $my->insert_id;

        // RESULT
        $this->result = array(
            "id" => $id,
            "fabricant" => $fabricant,
            "modele" => $modele
        );

    }


}
