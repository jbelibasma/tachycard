(function ($) {

	"use strict";


	$(window).on('load', function () { 
		$('[data-loader="circle-side"]').fadeOut(); 
		$('#preloader').delay(350).fadeOut('slow'); 
		$('body').delay(350);
	})
	
	
	$('.background-image').each(function(){
		$(this).css('background-image', $(this).attr('data-background'));
	});


	$('.opacity-mask').each(function(){
		$(this).css('background-color', $(this).attr('data-opacity-mask'));
	});


	$('.btn_play').magnificPopup({
		type: 'iframe',
		closeMarkup: '<button title="%title%" type="button" class="mfp-close" style="font-size:26px; margin-right:-10px;">&#215;</button>'
	});


	$('.modal_dialog').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
		mainClass: 'my-mfp-zoom-in'
	});


	$('#password, #password1, #password2').hidePassword('focus', {
		toggle: {
			className: 'my-toggle'
		}
	});


	


	var floatlabels = new FloatLabels( 'form.input_style_1', {
		    style: 1
	});
	var floatlabels2 = new FloatLabels( 'form.input_style_2', {
		    style: 0
	});


	$('.tooltip-1').tooltip({
		html: true
	});

})(window.jQuery); 


$(document).ready(function() {
	var password1 		= $('#password1'); 
	var password2		= $('#password2'); 
	var passwordsInfo 	= $('#pass-info'); 
	
	passwordStrengthCheck(password1,password2,passwordsInfo); 
	
});

function passwordStrengthCheck(password1, password2, passwordsInfo)
{
	
	var WeakPass = /(?=.{5,}).*/; 

	var MediumPass = /^(?=\S*?[a-z])(?=\S*?[0-9])\S{5,}$/; 
	
	var StrongPass = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])\S{5,}$/; 

	var VryStrongPass = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[^\w\*])\S{5,}$/; 
	
	$(password1).on('keyup', function(e) {
		if(VryStrongPass.test(password1.val()))
		{
			passwordsInfo.removeClass().addClass('vrystrongpass').html("Très fort! (Génial, n'oubliez pas votre pass maintenant !)");
		}	
		else if(StrongPass.test(password1.val()))
		{
			passwordsInfo.removeClass().addClass('strongpass').html("Fort! (Entrez des caractères spéciaux pour rendre encore plus fort");
		}	
		else if(MediumPass.test(password1.val()))
		{
			passwordsInfo.removeClass().addClass('goodpass').html("Bien! (Entrez une lettre majuscule pour rendre fort)");
		}
		else if(WeakPass.test(password1.val()))
    	{
			passwordsInfo.removeClass().addClass('stillweakpass').html("Toujours faible! (Entrez des chiffres pour créer un bon mot de passe)");
    	}
		else
		{
			passwordsInfo.removeClass().addClass('weakpass').html("Très faible! (Doit contenir 5 caractères ou plus)");
		}
	});
	
	$(password2).on('keyup', function(e) {
		
		if(password1.val() !== password2.val())
		{
			passwordsInfo.removeClass().addClass('weakpass').html("Les mots de passe ne correspondent pas!");	
		}else{
			passwordsInfo.removeClass().addClass('goodpass').html("Les mots de passe correspondent !");	
		}
			
	});
}