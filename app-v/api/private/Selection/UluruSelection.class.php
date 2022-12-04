<?php

class UluruSelection
{
    public $my;
    public $token;
    public $result;
    public $method;
    public $action;
    public $query;
    public $route;
    public $selections;

    /**
     * @param $my
     */
    public function __construct($my,$query)
    {
        $this->my = $my;
        $this->query = $query;
        $this->selections = array();
        foreach ($query as $value) {
            $tmp = json_decode($value);
            array_push($this->selections,new Selection($tmp->reference,$tmp->modele,$tmp->fabricant,$tmp->type,$my));
        }
    }

    //Create new selection with ref,fab,modele,type
    public function createSelection(){
        foreach ($this->selections as $selection) {
            $resultLocal = $selection->alreadyExist();
            if(!$resultLocal){
                $this->result = $selection->create();
            }else{
                $this->result = $selection->incrUseRate();
            }
        }
    }
    //Update selection with ref,fab,modele,type
    public function updateSelection(){

    }
    //Delete selection with ref,fab,modele,type
    public function deleteSelection(){

    }

}