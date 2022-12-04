<?php

class centers
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


    // GET CENTRE INFO
    function get()
    {
        $my = $this->my;

        // CHECK DATA
        if (!$this->query["id"]) new api_error("Merci de renseigner l'identifiant du centre", 515, $this);
        $id = (int) $this->query["id"];

        // QUERY
        $sql = "SELECT * FROM centres WHERE id=$id";

        $result = $my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : " . $this->my->error, 500, $this);
        if ($result->num_rows == 0) new api_error("Aucun centre trouvé", 515, $this);
        $row = $result->fetch_object();

        // RESULT
        $this->result = $row;

    }


    function list_centers()
    {

        $query = $this->query;

        if ($query != NULL) {

            if (strlen($query["search"]) >= 3) {

                $search = addslashes($query["search"]);

                $sql = "SELECT * FROM centres WHERE name LIKE '%$search%' ORDER BY name";
            } else {

                new api_error("Longueur de recherche insuffisante", 515, $this);
            }

        } else {

            // FULL SEARCH
            $sql = "SELECT * FROM centres ORDER BY name";

        }

        // QUERY
        $result = $this->my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : Select centers", 500, $this);

        // SET RESULT
        if ($result->num_rows == 0) {

            $this->result = array();

        } else {

            $list = array();

            while ($row = $result->fetch_object()) {
                array_push($list, array(
                    "id" => $row->id,
                    "name" => $row->name,
                    "adresse1" => $row->adresse1,
                    "adresse2" => $row->adresse2,
                    "adresse3" => $row->adresse3,
                    "code_postal" => $row->code_postal,
                    "ville" => $row->ville,
                    "tel" => $row->tel,
                    "pays" => $row->pays
                ));
            }

            $this->result = $list;

        }

    }




    // CREATE CENTRE
    function create()
    {

        $my = $this->my;

        // FORMAT QUERY
        $this->query = array_map("urldecode", $this->query);

        // CHECK DATA
        if (!$this->query["name"]) new api_error("Merci de renseigner le nom", 515, $this);
        if (!$this->query["adresse1"]) new api_error("Merci de renseigner l'adresse'", 515, $this);
        if (!$this->query["code_postal"]) new api_error("Merci de renseigner le code postal", 515, $this);
        if (!$this->query["ville"]) new api_error("Merci de renseigner la ville", 515, $this);
        if (!$this->query["tel"]) new api_error("Merci de renseigner le téléphone", 515, $this);

        // FORMAT DATA
        $name = addslashes(strtoupper($this->query["name"]));
        $adresse1 = addslashes($this->query["adresse1"]);
        $adresse2 = addslashes($this->query["adresse2"]);
        $adresse3 = addslashes($this->query["adresse3"]);
        $code_postal = addslashes($this->query["code_postal"]);
        $ville = addslashes($this->query["ville"]);
        $tel = addslashes($this->query["tel"]);
        $pays = addslashes($this->query["pays"]);

        // QUERY
        $sql = "INSERT INTO centres SET name = '$name', adresse1 = '$adresse1', adresse2 = '$adresse2', adresse3 = '$adresse3', code_postal = '$code_postal', ville = '$ville', pays = '$pays', tel='$tel'";

        $my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : " . $this->my->error, 500, $this);
        $id = $my->insert_id;

        // RESULT
        $this->result = array(
            "id" => $id,
            "name" => $name
        );

    }




    // UPDATE USER
    function update()
    {
        // INIT
        $my = $this->my;

        // FORMAT QUERY
        $this->query = array_map("urldecode", $this->query);

        // CHECK DATA
        if (!$this->query["id"]) new api_error("Merci de renseigner l'identifiant du centre", 515, $this);
        if (!$this->query["name"]) new api_error("Merci de renseigner le nom", 515, $this);
        if (!$this->query["adresse1"]) new api_error("Merci de renseigner l'adresse'", 515, $this);
        if (!$this->query["code_postal"]) new api_error("Merci de renseigner le code postal", 515, $this);
        if (!$this->query["ville"]) new api_error("Merci de renseigner la ville", 515, $this);
        if (!$this->query["tel"]) new api_error("Merci de renseigner le téléphone", 515, $this);

        // FORMAT DATA
        $id = (int) $this->query["id"];
        $name = addslashes(strtoupper($this->query["name"]));
        $adresse1 = addslashes($this->query["adresse1"]);
        $adresse2 = addslashes($this->query["adresse2"]);
        $adresse3 = addslashes($this->query["adresse3"]);
        $code_postal = addslashes($this->query["code_postal"]);
        $ville = addslashes($this->query["ville"]);
        $tel = addslashes($this->query["tel"]);
        $pays = addslashes($this->query["pays"]);

        // QUERY
        $sql = "UPDATE centres SET name = '$name', adresse1 = '$adresse1', adresse2 = '$adresse2', adresse3 = '$adresse3', code_postal = '$code_postal', ville = '$ville', pays = '$pays', tel='$tel' WHERE id=$id";
        $my->query($sql);
        if ($this->my->errno != 0) new api_error("Erreur SQL : " . $this->my->error, 500, $this);

        // RESULT
        $this->result = array(
            "id" => $id,
            "name" => $name
        );

    }









}
