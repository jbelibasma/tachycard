<?php

class UluruOtp
{
    private $my;
    private $token;
    private $result;
    private $method;
    private $action;
    private $query;
    private $route;

    function __construct($my)
    {
        $this->my = $my;
    }

}