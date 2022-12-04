<?php

class Selection
{
    private $reference;
    private $modele;
    private $fabricant;
    private $type;
    private $useRate;
    private $status;
    private $my;
    private $weight = 1;
    /**
     * @param $reference
     * @param $modele
     * @param $fabricant
     * @param $type
     * @param $useRate
     */
    public function __construct($reference, $modele, $fabricant, $type,$my)
    {
        $this->reference = $reference;
        $this->modele = $modele;
        $this->fabricant = $fabricant;
        $this->type = $type;
        $this->useRate = 0;
        $this->my = $my;
        $this->status = 1;
    }
    public static function findSelection($my,$ref){
        // QUERY
        $sql = "select modele,fabricant,type FROM selections WHERE (reference,rate) IN(
                    select reference,MAX(rate)
                    FROM selections
                    where reference = '$ref'
                    GROUP BY reference
                ) LIMIT 1;";
        $result = $my->query($sql);
        if ($my->errno != 0){
            ApiError::displayError("Erreur SQL : " . $my->error, 500);
        }
        if ($result->num_rows == 0){
            return false;
        }
        return $result;
    }

    public function incrUseRate(){
        if($this->useRate < 100){
            $this->useRate +=$this->weight;
        }
        $sql = "UPDATE selections SET rate = '$this->useRate' WHERE fabricant = '$this->fabricant' 
                                                AND modele = '$this->modele' 
                                                AND type = '$this->type' 
                                                AND reference = '$this->reference'";
        return $this->createQuery($sql);
    }

    public function alreadyExist(){
        // QUERY
        $sql = "SELECT * FROM selections WHERE reference='$this->reference' 
                            AND modele = '$this->modele' 
                            AND fabricant = '$this->fabricant'
                            AND type = '$this->type'
                            AND status=1";
        $result = $this->createQuery($sql);
        if ($result->num_rows == 0){
            return false;
        }
        $this->useRate = $result->fetch_object()->rate;
        return $result;
    }
    public function create(){
        $sql = "INSERT INTO selections (reference,modele,fabricant,type,rate,status) 
                VALUES ('$this->reference','$this->modele','$this->fabricant','$this->type','$this->useRate',1)";
        return $this->createQuery($sql);
    }
    private function createQuery($query){
        $result = $this->my->query($query);
        if ($this->my->errno != 0){
            ApiError::displayError("Erreur SQL : " . $this->my->error, 500, $this);
        }
        return $result;
    }


}