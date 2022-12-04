<?php

class Otp
{
    private $userFrom;
    private $userReceiver;
    private $subject;
    private $generatedPassword;
    private $headers;
    private $message;


    public function sendMail()
    {
        $this->subject="verify-account-otp";
        // Generating otp
        $this->generatedPassword = $this->generateNumericOTP(6);
        $this->message=strval($this->generatedPassword);
        $this->headers = "From:" .$this->userFrom;
        if(mail($this->userReceiver,$this->subject,$this->message,$this->headers)){
            $_SESSION["OTP"]=$this->generatedPassword;
            $this->redirect_to("verify-otp");
        }
        else
            new api_error("Erreur lors de l'envoie du mail", 500, $this);;
    }
    // Function to generate OTP
    public function generateNumericOTP($n) {
        $generator = "1598623470";
        $result = "";
        for ($i = 1; $i <= $n; $i++) {
            $result .= substr($generator, (rand()%(strlen($generator))), 1);
        }
        return $result;
    }
    public function redirect_to($location)
    {

    }
}