<?php

class Analystic
{
    private $actions;
    public $my;
    function __construct($my)
    {
        $this->my = $my;
        $this->actions = array("Connection","EditCard");

    }
    private function raiseException(){
        ApiError::displayError("Erreur SQL : " . $this->my->error, 500, $this);
    }

    function userConnect($id_centre){
        // QUERY
        $action = $this->actions[0];
        $sql = "SELECT id,id_centre,action,use_number FROM analytics WHERE id_centre ='$id_centre' AND action='$action'";
        $result = $this->my->query($sql);
        if ($this->my->errno != 0){
            $this->raiseException();
        }
        if ($result->num_rows == 0){
            $this->newConnection($id_centre);
        }else{
            $row = $result->fetch_object();
            $this->incrUseNumber($row);
        }
    }

    private function newConnection($id_centre){
        $action = $this->actions[0];
        $sql = "INSERT INTO analytics (id_centre,action ,use_number,created_at,updated_at) VALUES ('$id_centre','$action','1',CURRENT_DATE,CURRENT_DATE);";
        $this->my->query($sql);
        if ($this->my->errno != 0){
            $this->raiseException();
        }
    }
    private function incrUseNumber($row){
        $row->use_number ++;
        $sql = "UPDATE analytics SET use_number = ";
        $sql .= $row->use_number;
        $sql .= " , updated_at = ";
        $sql .= "'".date("Y-m-d")."'";
        $sql .= " WHERE id = ";
        $sql .= $row->id;
        $this->my->query($sql);
        if ($this->my->errno != 0){
            $this->raiseException();
        }
    }

    function userWantPrintCard($id_centre){
        // QUERY
        $action = $this->actions[1];
        $sql = "SELECT id,id_centre,action,use_number FROM analytics WHERE id_centre ='$id_centre' AND action='$action'";
        $result = $this->my->query($sql);
        if ($this->my->errno != 0){
            $this->raiseException();
        }
        if ($result->num_rows == 0){
            $this->newCardEdited($id_centre);
        }else{
            $row = $result->fetch_object();
            $this->incrUseNumber($row);
        }

    }
    private function newCardEdited($id_centre){
        $action = $this->actions[1];
        $sql = "INSERT INTO analytics (id_centre,action ,use_number,created_at,updated_at) VALUES ('$id_centre','$action','1',CURRENT_DATE,CURRENT_DATE);";
        $this->my->query($sql);
        if ($this->my->errno != 0){
            $this->raiseException();
        }
    }
}