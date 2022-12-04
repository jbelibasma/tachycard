<?php

use PHPMailer\PHPMailer\PHPMailer;

class Users
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


    // CONNECT
    function connect()
    {
        $myLocal = $this->my;
        $this->checkData();


        $email = $this->query["email"];
        //check password
        $password = $this->query["pass"];
        $this->checkPassword($password);
        //encoding password
        $pass = $this->typeEncode . base64_encode(sha1($password, TRUE));
        

        // QUERY
        $sql = "SELECT * FROM users WHERE email='$email' AND password='$pass' AND status=1";
        $resultLocal = $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }
        if ($resultLocal->num_rows == 0) {
            ApiError::displayError("Désolé, votre authentification n'est pas valide", 500, $this);
        }
        $row = $resultLocal->fetch_object();

        //Add connection
        $analystic = new Analystic($myLocal);
        $analystic->userConnect($row->id_centre);

        $sql_role = "SELECT * FROM profile WHERE profile_id='$row->id_profile' and active=1";
        $resultLocal_role = $myLocal->query($sql_role);
        if ($resultLocal_role->num_rows == 0) {
            ApiError::displayError("Désolé, l'utilisateur n'a pas un profile active, Merci de contacter l'administrateur de l'application", 500, $this);
        }
        $row_role = $resultLocal->fetch_object();

        // GET CENTRE INFO
        if ($row_role->has_center_info == 1) {
            $id_centre = $row->id_centre;
            $sql = "SELECT * FROM centres WHERE id='$id_centre' AND status=1";
            if ($this->my->errno != 0) {
                ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
            }
            if ($resultLocal->num_rows == 0) {
                ApiError::displayError("Désolé, aucun centre n'a été trouvé", 500, $this);
            }
            $resultLocal = $myLocal->query($sql);
            $row_centre = $resultLocal->fetch_object();
            $row->centre = $row_centre;
        }

        // GET CARDS
        if ($row_role->can_get_card == 1) {
            $cards = [];
            $id_users = $row->id;
            $sql = "SELECT * FROM cartes WHERE id_users='$id_users'";
            $resultLocal = $myLocal->query($sql);
            if ($this->my->errno != 0) {
                ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
            }
            while ($row_cards = $resultLocal->fetch_object()) {
                $row_cards->data = json_decode($row_cards->data);
                array_push($cards, $row_cards);
            }
            $row->cards = $cards;
        }

        
        unset($row->password);
       //refresh token and 
       $id_users = $row->id;
       $token_creation_time = date('Y-m-d H:i:s');
       $token = Tools::generateToken();
       $row = $this->updateToken($row, $myLocal, $id_users, $token_creation_time, $token);
        // RESULT
        
        $this->result = $row;

    }

     // forgetPass
     function forgetPass()
     {
         $myLocal = $this->my;
            if (!$this->query["email"]) {
                ApiError::displayError("Merci de renseigner une adresse email", 500, $this);
            }
            if (!Tools::validEmail($this->query["email"])) {
                ApiError::displayError("Merci de renseigner une adresse email valide", 500, $this);
            }
          $email = $this->query["email"];
 
         // QUERY
         $sql = "SELECT * FROM users WHERE email='$email'";
         $resultLocal = $myLocal->query($sql);
         if ($this->my->errno != 0) {
             ApiError::displayError($sql,$this->errorMsg . $this->my->error, 500, $this);
         }
         if ($resultLocal->num_rows == 0) {
             ApiError::displayError("Désolé, votre email n'existe pas dans notre base de données", 500, $this);
         }
         $row = $resultLocal->fetch_object();
         $email_user = $row->email;
         $id_users = $row->id;
         $token_creation_time = date('Y-m-d H:i:s');
         $token = Tools::generateToken();
         $row = $this-> updateTokenForgetPassword($row, $myLocal, $id_users, $token_creation_time, $token);
         
         //send mail
         $url = "https://preprod-app.tachycard.com/forgetpassword?token=$token&email=$email_user";

         $this->sendMail($url , $email_user );
        

 
     }
    function sendMail($body, $desemail ){
        $mail             = new PHPMailer(); 
        $mail->IsSMTP();
        $mail->SMTPAuth   = true;
        $mail->SMTPOptions = array('ssl' => array('verify_peer' => false,'verify_peer_name' => false,'allow_self_signed' => true)); // ignorer l'erreur de certificat.
        $mail->Host       = "mail.infomaniak.com";  
        $mail->Port       = 587;
        $mail->Username   = "support@tachycard.com";
        $mail->Password   = "Tt@2&khjbeb";        
        $mail->From       = "support@tachycard.com"; //adresse d’envoi correspondant au login entré précédemment
        $mail->FromName   = "support"; // nom qui sera affiché
        $mail->Subject    = "reset pssword"; // sujet
        $mail->AltBody    = "Pour créer une nouvelle mot de passe, Merci de cliquer sur ce lien"; //Body au format texte
        $mail->WordWrap   = 50; // nombre de caractères pour le retour à la ligne automatique
        $mail->MsgHTML($body); 
        $mail->AddReplyTo("support@tachycard.com","support");
        //$mail->AddAttachment("./examples/images/phpmailer.gif");// pièce jointe si besoin
        $mail->AddAddress($desemail);
        $mail->IsHTML(false); // envoyer au format html, passer a false si en mode texte 
        if(!$mail->Send()) {
            echo "Mailer Error: " . $mail->ErrorInfo;
        } else {
            echo "Le message à bien été envoyé";
        } 
    }

    function espace_patients()
    {

        $myLocal = $this->my;

        // FORMAT QUERY
        // CHECK DATA
       
        if (!$this->query["nom"]) {
            ApiError::displayError($this->errorMsgName, 515, $this);
        }
        if (!$this->query["prenom"]) {
            ApiError::displayError($this->errorMsgFirstName, 515, $this);
        }
        if (!$this->query["type"]) {
            ApiError::displayError("Merci de renseigner le type de compte", 515, $this);
        }
        if (!$this->query["pass"]) {
            ApiError::displayError("Merci de renseigner le mot de passe", 515, $this);
        }
        if (!$this->query["sexe"]) {
            ApiError::displayError("Merci de renseigner le sexe", 515, $this);
        }
        $date_naissance = Tools::checkAndFormatDate($this->query["date_naissance"]);
        if (!$date_naissance) {
            ApiError::displayError("Date de naissance non valide", 515, $this);
        }
        if (!Tools::validEmail(urldecode($this->query["email"])) && $this->query["tel"] == "") {
            ApiError::displayError("Merci d'indiquer une adresse email valide ou un numéro de téléphone", 515, $this);
        }
        if ($this->query["email"] != "" && !Tools::validEmail(urldecode($this->query["email"]))) {
            ApiError::displayError($this->errorMsgEmail, 515, $this);
        }
        if (!$this->query["agree"]) {
            ApiError::displayError("Merci d'accepter les CGU", 515, $this);
        }
        

        // GET ID CENTER
        $id_centre = Tools::getIDCentre($myLocal, $this->token);

        // FORMAT DATA
        $nom = addslashes(strtoupper(urldecode($this->query["nom"])));
        $prenom = addslashes($this->query["prenom"]);
        $email = html_entity_decode($this->query["email"]);
        $sexe = $this->query["sexe"];
        $numero_securite = $this->query["numero_securite"];
        $tel = $this->query["tel"];
        $tokenLocal = Tools::generateToken();
        $password = Tools::generatePassword();
        $password = $this->query["pass"];
        $this->checkPassword($password);


        $password_sha1 = $this->typeEncode . base64_encode(sha1($password, TRUE));
        // $password_sha1 =password_hash($password, PASSWORD_DEFAULT);
        $realname = ucfirst($prenom) . " " . strtoupper($nom);
        $type = $this->query["type"];
        $lieu_naissance = $this->query["lieu_naissance"];
       
        


        $sql = "SELECT * FROM users WHERE email='$email' AND status=1";
        $resultLocal = $myLocal->query($sql);
        $row = $resultLocal->fetch_object();
        if($this->query["email"] === $row->email ){
            ApiError::displayError($this->errorMsgexistEmail, 515, $this);
        }

        // QUERY
        $sql = "INSERT INTO users SET
            id_centre = '$id_centre',
            email = '$email',
            prenom = '$prenom',
            nom = '$nom',
            realname = '$realname',
            password = '$password_sha1',
            token = '$tokenLocal',
            status = 1,
            id_profile='$type',
            date_naissance='$date_naissance',
            lieu_naissance='$lieu_naissance',
            tel='$tel',
            sexe='$sexe',
            num_securite='$numero_securite'
            
            ";

        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }
        $id = $myLocal->insert_id;

        // RESULT
        $this->result = array(
            "id" => $id,
            "email" => $email,
            "password" => $password,
            "token" => $tokenLocal,
            "realname" => $realname
        );
    }


     function updateTokenForgetPassword($row, $myLocal, $id_users, $token_creation_time, $token){
        
        $sql = "UPDATE users SET token = '$token', token_creation_time='$token_creation_time' where id = '$id_users'";
        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }
       
    }
    
    function updateToken($row, $myLocal, $id_users, $token_creation_time, $token){
        
        $sql = "UPDATE users SET token = '$token', token_creation_time='$token_creation_time' where id = '$id_users'";
        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }
        if($row != null)
        $row->token = $token;
        return $row;
    }
    function checkPassword($password){
        $uppercase = preg_match('@[A-Z]@', $password);
        $lowercase = preg_match('@[a-z]@', $password);
        $number    = preg_match('@[0-9]@', $password);
        $specialChars = preg_match('@[^\w]@', $password);

        if(!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 8) {
            ApiError::displayError("Le mot de passe doit être de 8 caractères minimum et contenir au moins 1 chiffre", 500, $this);
        }
    } 

    // GET USERS INFO
    private function get()
    {
        $myLocal = $this->my;

        // CHECK DATA
        if (!$this->query["id"]) {
            ApiError::displayError($this->errorMsgId, 500, $this);
        }
        $id = (int)$this->query["id"];

        // QUERY
        $sql = "SELECT nom, prenom, realname, email, id_centre FROM users WHERE id=$id";

        $resultLocal = $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }
        if ($resultLocal->num_rows == 0) {
            ApiError::displayError("Aucun utilisateur trouvé", 500, $this);
        }
        $row = $resultLocal->fetch_object();

        // RESULT
        $this->result = $row;

    }


    // FIND PATIENTS
    function find_patients()
    {
        if (isset($this->query["id"])) {
            $id = $this->query["id"];
            $sql = "SELECT u.id,nom,prenom,email,date_naissance,mat_abandonne,sexe,tel FROM users u LEFT JOIN patient_details pd ON u.id = pd.id WHERE u.id=$id AND u.id_profile=2";
            $resultLocal = $this->my->query($sql);
            if ($this->my->errno != 0) {
                ApiError::displayError("Merci de saisir un nom , un prénom ou une date de naissance", 500, $this);
            }
            // SET RESULT
            if ($resultLocal->num_rows == 0) {
                ApiError::displayError("Aucun patient trouvé", 500, $this);
            } else {
                $list = array();
                $row = $resultLocal->fetch_object();
                $list = $this->patient_information($list,$row);
                $this->result = $list;
            }
        }else{


            $search_nom = $this->query["search_nom"];
            $search_prenom = $this->query["search_prenom"];
            $isName = strlen($search_nom) > 0;
            $isFirstName = strlen($search_prenom) > 0;

           

            // GET ID CENTER
            $id_centre = Tools::getIDCentre($this->my,$this->token);

            $sql = $this->createSql($isName, $isFirstName, $search_nom, $search_prenom, $id_centre);


            // QUERY
            $resultLocal = $this->my->query($sql);
            if ($this->my->errno != 0) {
                ApiError::displayError("Merci de saisir un nom , un prénom ou une date de naissance", 500, $this);
            }

            // SET RESULT
            if ($resultLocal->num_rows == 0) {
                ApiError::displayError("Aucun patient trouvé", 500, $this);
            } else {

                $list = array();

                while ($row = $resultLocal->fetch_object()) {
                    $list = $this->patient_information($list,$row);
                }

                $this->result = $list;

            }
        }


    }
    function patient_information($list,$row){
        array_push($list, array(
            "id" => $row->id,
            "nom" => $row->nom,
            "prenom" => $row->prenom,
            "email" => $row->email,
            "date_naissance" => $row->date_naissance,
            "user_mat_ab" => $row->mat_abandonne,
            "sexe" => $row->sexe,
            "tel" => $row->tel
        ));
        return $list;
    }


    // FIND ALL MEDECINS
    function find_all_medecins()
    {
        // GET ID CENTER
        $id_centre = Tools::getIDCentre($this->my,$this->token);

        $sql = "SELECT 
                    users.*,
                    centres.id as centre_id,
                    centres.name as centre_name,
                    centres.adresse1 as centre_adresse1,
                    centres.adresse2 as centre_adresse2,
                    centres.adresse3 as centre_adresse3,
                    centres.code_postal as centre_code_postal,
                    centres.ville as centre_ville,
                    centres.pays as centre_pays,
                    centres.tel as centre_tel
                FROM users, centres 
                WHERE 
                      users.id_centre=centres.id AND
                      users.id_profile=3 OR users.id_profile=1 OR users.id_profile=4 AND
                      users.status=1 
            ORDER BY users.nom, users.prenom";

        // QUERY
        $resultLocal = $this->my->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError("Erreur SQL : Find médecin", 500, $this);
        }

        // SET RESULT
        if ($resultLocal->num_rows == 0) {

            ApiError::displayError($sql, 500, $this);

        } else {

            $list = array();

            while ($row = $resultLocal->fetch_object()) {
                array_push($list, array(
                    "id" => $row->id,
                    "nom" => $row->nom,
                    "prenom" => $row->prenom,
                    "centre" => [
                        "id" => $row->centre_id,
                        "name" => $row->centre_name,
                        "adresse1" => $row->centre_adresse1,
                        "adresse2" => $row->centre_adresse2,
                        "adresse3" => $row->centre_adresse3,
                        "code_postal" => $row->centre_code_postal,
                        "ville" => $row->centre_ville,
                        "pays" => $row->centre_pays,
                        "tel" => $row->centre_tel
                    ]
                ));
            }

            $this->result = $list;

        }


    }


    // LIST USERS
    function list_users()
    {

        $queryLocal = $this->query;
        if ($queryLocal != NULL) {

            if (strlen($queryLocal["search"]) >= 3) {

                $search = addslashes($queryLocal["search"]);

                $sql = "SELECT u.id,nom,prenom,email,date_naissance,mat_abandonne,pr.profile_name,tel FROM users u LEFT JOIN patient_details pd ON u.id = pd.id LEFT JOIN profile pr ON u.id_profile = pr.profile_id WHERE (email LIKE '%$search%' OR realname LIKE '%$search%') AND u.status != 9 ORDER BY nom, prenom";
            } else {

                ApiError::displayError("Longueur de recherche insuffisante", 500, $this);
            }

        } else {

            // FULL SEARCH
            $sql = "SELECT u.id,nom,prenom,email,date_naissance,mat_abandonne,pr.profile_name,tel FROM users u LEFT JOIN patient_details pd ON u.id = pd.id LEFT JOIN profile pr ON u.id_profile = pr.profile_id WHERE u.status != 9  ORDER BY nom, prenom";

        }

        // QUERY
        $resultLocal = $this->my->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError("Erreur SQL : Select users", 500, $this);
        }

        // SET RESULT
        if ($resultLocal->num_rows == 0) {

            $this->result = array();

        } else {

            $list = array();

            while ($row = $resultLocal->fetch_object()) {
                array_push($list, array(
                    "id" => $row->id,
                    "nom" => $row->nom,
                    "prenom" => $row->prenom,
                    "email" => $row->email,
                    "tel" => $row->tel,
                    "type" => $row->profile_name,
                    "user_mat_ab" => $row->mat_abandonne
                ));
            }

            $this->result = $list;

        }


    }


    // CREATE USER
    function create()
    {

        $myLocal = $this->my;
        // FORMAT QUERY
        // CHECK DATA
        if (!$this->query["nom"]) {
            ApiError::displayError($this->errorMsgName, 515, $this);
        }
        if (!$this->query["prenom"]) {
            ApiError::displayError($this->errorMsgFirstName, 515, $this);
        }
        if (!$this->query["type"]) {
            ApiError::displayError("Merci de renseigner le type de compte", 515, $this);
        }
        if (!Tools::validEmail(urldecode($this->query["email"])) && $this->query["tel"] == "") {
            ApiError::displayError("Merci d'indiquer une adresse email valide ou un numéro de téléphone", 515, $this);
        }
        if ($this->query["email"] != "" && !Tools::validEmail(urldecode($this->query["email"]))) {
            ApiError::displayError($this->errorMsgEmail, 515, $this);
        }

        // GET ID CENTER
        $id_centre = Tools::getIDCentre($myLocal,$this->token);

        // FORMAT DATA
        $nom = addslashes(strtoupper(urldecode($this->query["nom"])));
        $prenom = addslashes($this->query["prenom"]);
        $email = html_entity_decode($this->query["email"]);
        $type = $this->query["type"];
        $tel = $this->query["tel"];
        $tokenLocal = Tools::generateToken();
        $password = Tools::generatePassword();
        $password_sha1 = $this->typeEncode . base64_encode(sha1($password, TRUE));
        $realname = ucfirst($prenom) . " " . strtoupper($nom);

        // QUERY
        $sql = "INSERT INTO users SET 
            nom = '$nom',
            prenom = '$prenom',
            realname = '$realname',
            email = '$email',
            tel = '$tel',
            id_centre = '$id_centre',
            token = '$tokenLocal',
            password = '$password_sha1',
            id_profile = '$type',
            status = 1
            ";

        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }
        $id = $myLocal->insert_id;

        // RESULT
        $this->result = array(
            "id" => $id,
            "password" => $password,
            "token" => $tokenLocal,
            "realname" => $realname
        );

    }


    // UPDATE USER
    function update()
    {
        // INIT
        $myLocal = $this->my;
        $sql_pass = false;

        // FORMAT QUERY
        //$this->query = array_map("urldecode", $this->query);

        // CHECK DATA
        if (!$this->query["id"]) {
            ApiError::displayError($this->errorMsgId, 515, $this);
        }
        if (!$this->query["nom"]) {
            ApiError::displayError($this->errorMsgName, 515, $this);
        }
        if (!$this->query["prenom"]) {
            ApiError::displayError($this->errorMsgFirstName, 515, $this);
        }
        if (!$this->query["email"]) {
            ApiError::displayError("Merci de renseigner l'email", 515, $this);
        }
        if (!Tools::validEmail(urldecode($this->query["email"])) && $this->query["tel"] == "") {
            ApiError::displayError("Merci d'indiquer une adresse email valide ou un numéro de téléphone", 515, $this);
        }
        if ($this->query["email"] != "" && !Tools::validEmail(urldecode($this->query["email"]))) {
            ApiError::displayError($this->errorMsgEmail, 515, $this);
        }



        // FORMAT DATA
        $id = (int)$this->query["id"];
        $nom = addslashes(strtoupper($this->query["nom"]));
        $prenom = addslashes($this->query["prenom"]);
        $email = $this->query["email"];
        $tel = $this->query["tel"];
        $sexe = $this->query["sexe"];

        $realname = ucfirst($prenom) . " " . strtoupper($nom);

        // MODIFY PASSWORD ?
        if (strlen($this->query["pass1"]) > 0) {

            $pass1 = $this->query["pass1"];
            $this->checkPassword($pass1);
            $password_sha1 = $this->typeEncode . base64_encode(sha1($pass1, TRUE));
            $sql_pass = ", password = '$password_sha1' ";
        }


        // QUERY
        $sql = "UPDATE users SET nom = '$nom', prenom = '$prenom', realname = '$realname', email = '$email', tel='$tel',sexe='$sexe'";
        if ($sql_pass) {
            $sql .= $sql_pass;
        }
        $sql .= " WHERE id=$id";


        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }

        //On update les patient qui on du mat implentable
        $user_mat_ab = isset($this->query["user_mat_ab"]) ? 1 : 0;

        $sql = "INSERT INTO patient_details
                  (id, mat_abandonne, status)
                VALUES
                  ('$id', '$user_mat_ab', 1)
                ON DUPLICATE KEY UPDATE
                  mat_abandonne = '$user_mat_ab'";

        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }

        // RESULT
        $this->result = array(
            "id" => $id,
            "realname" => $realname,
            "destination" => $this->query["destination"]
        );

    }


    // ACCOUNT UPDATE
    function account_update()
    {
        // INIT
        $myLocal = $this->my;
        $sql_pass = false;

        // FORMAT QUERY
        $this->query = array_map("urldecode", $this->query);

        // CHECK DATA
        if (!$this->query["id"]) {
            ApiError::displayError($this->errorMsgId, 515, $this);
        }
        if (!$this->query["nom"]) {
            ApiError::displayError($this->errorMsgName, 515, $this);
        }
        if (!$this->query["prenom"]) {
            ApiError::displayError($this->errorMsgFirstName, 515, $this);
        }
        if (!$this->query["email"]) {
            ApiError::displayError("Merci de renseigner l'email", 515, $this);
        }
        if (!Tools::validEmail($this->query["email"])) {
            ApiError::displayError($this->errorMsgEmail, 515, $this);
        }


        // FORMAT DATA
        $id = (int)$this->query["id"];
        $nom = addslashes(strtoupper($this->query["nom"]));
        $prenom = addslashes($this->query["prenom"]);
        $email = $this->query["email"];
        $tokenLocal = Tools::generateToken();
        $realname = ucfirst($prenom) . " " . strtoupper($nom);

        // MODIFY PASSWORD ?
        if (strlen($this->query["pass1"]) > 0) {

            $pass1 = $this->query["pass1"];
            $pass2 = $this->query["pass2"];

            if ($pass1 != $pass2) {
                ApiError::displayError("Les mots de passe ne concordent pas", 515, $this);
            }
            $this->checkPassword($pass1);
            $password_sha1 = $this->typeEncode . base64_encode(sha1($pass1, TRUE));
            $sql_pass = ", password = '$password_sha1' ";
        }


        // QUERY
        $sql = "UPDATE users SET nom = '$nom', prenom = '$prenom', realname = '$realname', email = '$email'";
        if ($sql_pass) {
            $sql .= $sql_pass;
        }
        $sql .= " WHERE id=$id";


        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }

        // RESULT
        $this->result = array(
            "id" => $id,
            "token" => $tokenLocal,
            "realname" => $realname
        );

    }


    // DELETE USER
    function delete()
    {
        // INIT
        $myLocal = $this->my;

        // CHECK DATA
        if (!$this->query["id"]) {
            ApiError::displayError($this->errorMsgId, 500, $this);
        }

        // FORMAT DATA
        $id = (int)$this->query["id"];

        // QUERY
        $sql = "UPDATE users SET status = 9 WHERE id=$id";
        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }
        $sql = "UPDATE patient_details SET status = 9 WHERE id=$id";
        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }

        // RESULT
        $this->result = array(
            "id" => $id,
            "status" => 9,
            "destination" => $this->query["destination"]
        );

    }


    // NEW PATIENT
    function new_patient()
    {

        $myLocal = $this->my;

        // FORMAT QUERY
        $this->query = array_map("urldecode", $this->query);

        // CHECK DATA
        // if (!$this->query["user_data"]) {
        //     ApiError::displayError("Merci d'accepter les conditions sur les données personnelles", 515, $this);
        // }
        if (!$this->query["nom"]) {
            ApiError::displayError($this->errorMsgName, 515, $this);
        }
        if (!$this->query["prenom"]) {
            ApiError::displayError($this->errorMsgFirstName, 515, $this);
        }
        if (!$this->query["date_naissance"]) {
            ApiError::displayError("Merci de renseigner la date de naissance", 515, $this);
        }
        if($this->query["email"] && !Tools::validEmail(urldecode($this->query["email"]))){
            ApiError::displayError("Merci d'indiquer une adresse email valide", 515, $this);
        }
        // FORMAT DATA
        $nom = addslashes(strtoupper(urldecode($this->query["nom"])));
        $prenom = addslashes($this->query["prenom"]);
        $email = html_entity_decode($this->query["email"]);
        $tel = $this->query["tel"];
        $type = 2;//"patient";
        $date_naissance = Tools::checkAndFormatDate($this->query["date_naissance"]);
        if (!$date_naissance) {
            ApiError::displayError("Date de naissance non valide", 515, $this);
        }
        $tokenLocal = Tools::generateToken();
        $password = Tools::generatePassword();
        $password_sha1 = $this->typeEncode . base64_encode(sha1($password, TRUE));
        $realname = ucfirst($prenom) . " " . strtoupper($nom);
        // GET ID CENTER
        $id_centre = Tools::getIDCentre($this->my,$this->token);
        $sexe = $this->query["sexe"];

        // QUERY
        $sql = "INSERT INTO users SET 
            nom = '$nom',
            prenom = '$prenom',
            realname = '$realname',
            email = '$email',
            tel = '$tel',
            id_centre = '$id_centre',
            date_naissance = '$date_naissance',          
            token = '$tokenLocal',
            password = '$password_sha1',
            id_profile = '$type',
            sexe = '$sexe',
            status = 1
            ";

        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }
        $id = $myLocal->insert_id;

        //ADD patient details
        $user_mat_ab = isset($this->query["user_mat_ab"]) ? 1 : 0;
        $sql = "INSERT INTO patient_details SET 
            id = '$id',
            mat_abandonne = '$user_mat_ab',
            status = 1
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
            "email" => $email,
            "date_naissance" => $date_naissance,
            "realname" => $realname
        );

    }
    function new_Patient_Intervention()
    {

    

            $myLocal = $this->my;
    
            // FORMAT QUERY
            $this->query = array_map("urldecode", $this->query);
    
            // CHECK DATA
            // if (!$this->query["user_data"]) {
            //     ApiError::displayError("Merci d'accepter les conditions sur les données personnelles", 515, $this);
            // }
            if (!$this->query["nom"]) {
                ApiError::displayError($this->errorMsgName, 515, $this);
            }
            if (!$this->query["prenom"]) {
                ApiError::displayError($this->errorMsgFirstName, 515, $this);
            }
            if (!$this->query["date_naissance"]) {
                ApiError::displayError("Merci de renseigner la date de naissance", 515, $this);
            }
            if($this->query["email"] && !Tools::validEmail(urldecode($this->query["email"]))){
                ApiError::displayError("Merci d'indiquer une adresse email valide", 515, $this);
            }
            // FORMAT DATA
            $nom = addslashes(strtoupper(urldecode($this->query["nom"])));
            $prenom = addslashes($this->query["prenom"]);
            $email = html_entity_decode($this->query["email"]);
            $tel = $this->query["tel"];
            // $type = 2;//"patient";
            $date_naissance = Tools::checkAndFormatDate($this->query["date_naissance"]);
            if (!$date_naissance) {
                ApiError::displayError("Date de naissance non valide", 515, $this);
            }
            $tokenLocal = Tools::generateToken();
            $password = Tools::generatePassword();
            $password_sha1 = $this->typeEncode . base64_encode(sha1($password, TRUE));
            $realname = ucfirst($prenom) . " " . strtoupper($nom);
            // GET ID CENTER
            $id_centre = Tools::getIDCentre($this->my,$this->token);
            $sexe = $this->query["sexe"];

            // $sql = "SELECT * FROM users WHERE email='$email' AND status=1";
            // $resultLocal = $myLocal->query($sql);
            // $row = $resultLocal->fetch_object();
            // if($this->query["email"] === $row->email ){
            //     ApiError::displayError($this->errorMsgexistEmail, 515, $this);
            // }
    
            // QUERY
            $sql = "INSERT INTO users SET 
                nom = '$nom',
                prenom = '$prenom',
                realname = '$realname',
                email = '$email',
                tel = '$tel',
                id_centre = '$id_centre',
                date_naissance = '$date_naissance',          
                token = '$tokenLocal',
                password = '$password_sha1',
                id_profile = 2,
                sexe = '$sexe',
                status = 1
                ";
    
            $myLocal->query($sql);
            if ($this->my->errno != 0) {
                ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
            }
            $id = $myLocal->insert_id;
    
            //ADD patient details
            $user_mat_ab = isset($this->query["user_mat_ab"]) ? 1 : 0;
            $sql = "INSERT INTO patient_details SET 
                id = '$id',
                mat_abandonne = '$user_mat_ab',
                status = 1
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
                "email" => $email,
                "date_naissance" => $date_naissance,
                "realname" => $realname
            );
    
    }

    /**
     * @param $isName
     * @param $isFirstName
     * @param $search_nom
     * @param $search_prenom
     * @param $id_centre
     * @return string
     */
    private function createSql($isName, $isFirstName, $search_nom, $search_prenom, $id_centre)
    {
        if ($isName || $isFirstName || isset($this->query["search_birth"])) {
            $sql_search = "";
            if ($isName) {
                $sql_search .= "nom LIKE '%" . $search_nom . "%' ";
            }
            if ($isFirstName) {
                if($isName)
                $sql_search .= "AND prenom LIKE '%" . $search_prenom . "%' ";
                else
                $sql_search .= " prenom LIKE '%" . $search_prenom . "%' ";
            }
            if (isset($this->query["search_birth"]) && $this->query["search_birth"] != "") {
                if($isName || $isFirstName)
                $sql_search .= "AND date_naissance = '" . Tools::checkAndFormatDate($this->query["search_birth"]) . "'";
                else
                $sql_search .= " date_naissance = '" . Tools::checkAndFormatDate($this->query["search_birth"]) . "'";
                
            }
            $sql = "SELECT u.id,nom,prenom,email,date_naissance,mat_abandonne,sexe,tel FROM users u LEFT JOIN patient_details pd ON u.id = pd.id WHERE $sql_search AND u.status=1 AND id_centre = $id_centre AND id_profile=2 ORDER BY nom, prenom, date_naissance";

        } else {
            ApiError::displayError("Longueur de recherche insuffisante", 500, $this);
        }
        return $sql;
    }

    /**
     * @return void
     */
    private function checkData()
    {
// CHECK DATA
        if (!$this->query["email"]) {
            ApiError::displayError("Merci de renseigner une adresse email", 500, $this);
        }
        if (!Tools::validEmail($this->query["email"])) {
            ApiError::displayError("Merci de renseigner une adresse email valide", 500, $this);
        }
        if (!$this->query["pass"]) {
            ApiError::displayError("Merci de renseigner un mot de passe", 500, $this);
        }
    }
    function unconnect(){
        $id_users = $this->query["user_id"];
        $myLocal = $this->my;
        $token = "";
        
        $sql = "UPDATE users SET token = '$token' where id = '$id_users'";
        $myLocal->query($sql);
        if ($this->my->errno != 0) {
            ApiError::displayError($this->errorMsg . $this->my->error, 500, $this);
        }
    }

}
