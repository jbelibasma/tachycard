<?php

class Tools
{


    // VALID EMAIL
    static function validEmail($email)
    {
        return !preg_match("/^([a-zA-Z0-9])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)*\.([a-zA-Z]{2,6})$/", $email) ? false : true;
    }


    // GENERATE TOKEN
    static function generateToken()
    {
        $length = 16;
        $token = openssl_random_pseudo_bytes($length);
        $token = bin2hex($token);

        return $token;
    }

    // GENERATE CARTE ID
    static function generateCarteID()
    {
        $length = 8;
        $token = openssl_random_pseudo_bytes($length);
        $token = bin2hex($token);

        return $token;
    }

    // GTE ID CENTRE FROM CURRENT USER
    static function getIDCentre($db,$token)
    {

        $sql = "SELECT id_centre FROM users WHERE token='$token'";
        $result = $db->query($sql);

        if ($db->errno != 0){
            ApiError::displayError("Erreur SQL : " . $db->my->error, 500);
        }
        $row = $result->fetch_object();
        return (int) $row->id_centre;
    }



    // GENERATE PASSWORD
    static function generatePassword($length = 8, $add_dashes = false, $available_sets = 'luds')
    {

        $sets = array();
        if (strpos($available_sets, 'l') !== false){
            $sets[] = 'abcdefghjkmnpqrstuvwxyz';
        }
        if (strpos($available_sets, 'u') !== false){
            $sets[] = 'ABCDEFGHJKMNPQRSTUVWXYZ';
        }
        if (strpos($available_sets, 'd') !== false){
            $sets[] = '23456789';
        }
        if (strpos($available_sets, 's') !== false){
            $sets[] = '-!@#$*?_';
        }
        $all = '';
        $password = '';
        foreach ($sets as $set) {
            $password .= $set[array_rand(str_split($set))];
            $all .= $set;
        }
        $all = str_split($all);
        for ($i = 0; $i < $length - count($sets); $i++){
            $password .= $all[array_rand($all)];
        }
        $password = str_shuffle($password);
        if (!$add_dashes){
            return $password;
        }
        $dash_len = floor(sqrt($length));
        $dash_str = '';
        while (strlen($password) > $dash_len) {
            $dash_str .= substr($password, 0, $dash_len) . '-';
            $password = substr($password, $dash_len);
        }
        $dash_str .= $password;
        return $dash_str;
    }
    static function checkValideDate($date){
        if($date > date("Y-m-d")){
            return false;
        }
        return $date;
    }


    // CHECK AND FORMAT DATE
    static function checkAndFormatDate($str) {

        // test French Format
        $date = DateTime::createFromFormat("d/m/Y", $str);
        if($date) {
            return self::checkValideDate($date->format("Y-m-d"));
        } else {
            // test DB Format
            $date = DateTime::createFromFormat("Y-m-d", $str);
            if($date) {
                return self::checkValideDate($date->format("Y-m-d"));
            } else {
                return false;
            }
        }

    }

    //REGEX TO GET ALL INFORMATIONS FROM BAR CODE
    static function getValueBarCode($code){
        preg_match('/\d{2}([0-9A-Z]{14})(11(\d{6})17(\d{6})|\d{2}(\d{6}))\d{2}(.*)/', $code, $matches);
        return $matches;
    }

    static function createPreparedRequest($my,$sql,$listParam,$object){
        $listParamType = "";
        $listParamFormat = [];
        $cpt = 0;
        foreach ($listParam as $value ) {
            if($cpt%2 == 0){
                $listParamType .= $value;
            }
            else{
                array_push($listParamFormat,$value);
            }
            $cpt++;
        }
        if (!($stmt = $my->prepare($sql))) {
            ApiError::displayError("Échec de la préparation", 204, $object);
        }

        if (!$stmt->bind_param($listParamType, ...$listParamFormat)) {
            ApiError::displayError("Échec lors du liage des paramètres", 204, $object);
        }

        if (!$stmt->execute()) {
            echo "Échec lors de l'exécution : (" . $stmt->errno . ") " . $stmt->error;
        }
        $res = $stmt->get_result();
        $stmt->close();
        return $res;
    }

}