Uluru.prototype.setNewCardEvents=function(){$("#PMKDAIHOL").click(function(){this.data.carte.type_carte="PMKDAIHOL",this.newCardWorkflowRenderer("new_card",this.findPatientBuilder())}.bind(this)),$("#TAVICLIP").click(function(){this.data.carte.type_carte="TAVICLIP",this.newCardWorkflowRenderer("new_card",this.findPatientBuilder())}.bind(this)),$("#FOPCIAFA").click(function(){this.data.carte.type_carte="FOPCIAFA",this.newCardWorkflowRenderer("new_card",this.findPatientBuilder())}.bind(this)),$("#form_find_patient").submit(function(e){e.preventDefault(),this.logMessage("SUBMIT FIND PATIENT"),this.data.carte.patientSearch={search_birth:!1,search_nom:!1,search_prenom:!1,id:!1},this.findPatient()}.bind(this)),$("#form_find_patient .buttons .previous").submit(function(e){this.newCardWorkflowRenderer("new_card",this.cardTypeBuilder())}.bind(this)),this.setBoitierFormEvents(),this.setSondeFormEvents(),this.setNewMedecinFormEvents(),this.setNewPatientFormEvents()},Uluru.prototype.setBoitierFormEvents=function(){$("#form_boitier select[name='boitier_type']").change(function(e){this.logMessage("BOITIER TYPE CHANGE"),$("#form_boitier select[name='boitier_type']").val().length>0&&this.displaySelectBoitier($("#form_boitier select[name='boitier_type']").val())}.bind(this)),$("#form_boitier input[name='boitier_code']").keyup(function(e){if(this.logMessage("BOITIER SN CHANGE"),$("#form_boitier input[name='boitier_code']").val().length>0){try{clearTimeout(search_timer)}catch(e){}search_timer=setTimeout(function(){this.searchSN("boitier")}.bind(this),500)}else this.data.carte.boitier=!1}.bind(this)),$("#form_boitier1 input[name='boitier1_code']").keyup(function(e){if(this.logMessage("BOITIER SN CHANGE"),$("#form_boitier1 input[name='boitier1_code']").val().length>0){try{clearTimeout(search_timer)}catch(e){}search_timer=setTimeout(function(){this.searchSN("boitier1")}.bind(this),500)}else this.data.carte.boitier1=!1}.bind(this)),$("#form_boitier2 input[name='boitier2_code']").keyup(function(e){if(this.logMessage("BOITIER SN CHANGE"),$("#form_boitier2 input[name='boitier2_code']").val().length>0){try{clearTimeout(search_timer)}catch(e){}search_timer=setTimeout(function(){this.searchSN("boitier2")}.bind(this),500)}else this.data.carte.boitier2=!1}.bind(this)),$("#form_boitier button[id=boitier_indication_Défibrillateur_bt]").click(function(e){e.preventDefault(),this.toggleSelectBoitier("Défibrillateur")}.bind(this)),$("#form_boitier select[id=boitier_indication_Défibrillateur_select]").change(function(){this.fillInput("Défibrillateur")}.bind(this)),$("#form_boitier input[id=boitier_indication_Défibrillateur]").focus(function(){this.hideSelectBoitier("Défibrillateur")}.bind(this)),$("#form_boitier button[id=boitier_indication_Pacemaker_bt]").click(function(e){e.preventDefault(),this.toggleSelectBoitier("Pacemaker")}.bind(this)),$("#form_boitier select[id=boitier_indication_Pacemaker_select]").change(function(){this.fillInput("Pacemaker")}.bind(this)),$("#form_boitier input[id=boitier_indication_Pacemaker]").focus(function(){this.hideSelectBoitier("Pacemaker")}.bind(this)),$("#form_boitier button[id=boitier_indication_Holter_SC_bt]").click(function(e){e.preventDefault(),this.toggleSelectBoitier("Holter_SC")}.bind(this)),$("#form_boitier select[id=boitier_indication_Holter_SC_select]").change(function(){this.fillInput("Holter_SC")}.bind(this)),$("#form_boitier input[id=boitier_indication_Holter_SC]").focus(function(){this.hideSelectBoitier("Holter_SC")}.bind(this)),$("#form_boitier button[id=PMKDAIHOL_submit]").click(function(e){if(e.preventDefault(),this.logMessage("SUBMIT FORM BOITIER"),this.data.carte.boitier||(this.data.carte.boitier={}),this.data.carte.boitier.code_bar=$("#form_boitier input[name=boitier_code]").val(),this.data.carte.boitier.fabricant=$("#form_boitier select[name=boitier_fabricant]").val(),this.data.carte.boitier.type=$("#form_boitier select[name=boitier_type] option:selected").val(),this.data.carte.indication="",$("#form_boitier :input[name=boitier_indication]").each(function(e,t){$(t).is(":visible")&&(this.data.carte.indication+=$(t).val()+" ")}.bind(this)),this.data.carte.boitier.modele=$("#form_boitier input[name=boitier_modele]").val(),this.data.carte.boitier.ean=$("#form_boitier input[name=boitier_ean]").val(),this.data.carte.boitier.sn=$("#form_boitier input[name=boitier_sn]").val(),this.data.carte.boitier.ref=$("#form_boitier input[name=boitier_ref]").val(),this.data.carte.boitier.date_implantation=this.reFormatDate($("#form_boitier input[name=boitier_date_implantation]").val()),$("#boitier_indication_Défibrillateur_prevention").is(":visible")){let e=$("#boitier_indication_Défibrillateur_prevention").val();this.data.carte.boitier.indication2=e,this.data.carte.boitier.indication=this.data.carte.indication.replace(e,"")}else this.data.carte.boitier.indication=this.data.carte.indication;this.logMessage("BOITIER",this.data.carte.boitier),this.requiredValueBoitier(this.data.carte.boitier)||(this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("sonde1")),$("#form_sonde1 input[name='sonde1_code']").focus())}.bind(this)),$("#form_boitier button[id=OTHERS_submit]").click(function(e){e.preventDefault(),this.logMessage("SUBMIT FORM BOITIER"),this.setData("boitier")||(this.saveStateOfFront("new_card",this.formBoitierSondeBuilder.bind(this)),this.savedState.paramsBuilder="boitier",this.logMessage("BOITIER",this.data.carte.boitier),this.newCardWorkflowRenderer("new_card",this.resumeCardBuilder()),this.resumeCard(),this.goToStep("resume"))}.bind(this)),$("#form_boitier button[id=OTHERS_add]").click(function(e){e.preventDefault(),this.logMessage("SUBMIT FORM BOITIER"),this.setData("boitier")||(this.logMessage("BOITIER",this.data.carte.boitier),this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("boitier1")),$("#form_sonde1 input[name='boitier1_code']").focus())}.bind(this)),$("#form_boitier1 button[id=OTHERS_submit]").click(function(e){e.preventDefault(),this.logMessage("SUBMIT FORM BOITIER"),this.setData("boitier1")||(console.log("DATA",this.data.carte),this.saveStateOfFront("new_card",this.formBoitierSondeBuilder.bind(this)),this.savedState.paramsBuilder="boitier1",this.logMessage("BOITIER",this.data.carte.boitier1),this.newCardWorkflowRenderer("new_card",this.resumeCardBuilder()),this.resumeCard(),this.goToStep("resume"))}.bind(this)),$("#form_boitier1 button[id=OTHERS_add]").click(function(e){e.preventDefault(),this.logMessage("SUBMIT FORM BOITIER"),this.setData("boitier1")||(this.logMessage("BOITIER1",this.data.carte.boitier1),this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("boitier2")),$("#form_sonde2 input[name='boitier2_code']").focus())}.bind(this)),$("#form_boitier2 button[id=OTHERS_submit]").click(function(e){e.preventDefault(),this.logMessage("SUBMIT FORM BOITIER"),this.setData("boitier2")||(this.saveStateOfFront("new_card",this.formBoitierSondeBuilder.bind(this)),this.savedState.paramsBuilder="boitier2",this.logMessage("BOITIER2",this.data.carte.boitier2),this.newCardWorkflowRenderer("new_card",this.resumeCardBuilder()),this.resumeCard(),this.goToStep("resume"))}.bind(this))},Uluru.prototype.setData=function(e){return this.data.carte[e]||(this.data.carte[e]={}),this.data.carte[e].code_bar=$("#form_"+e+" input[name="+e+"_code]").val(),this.data.carte[e].fabricant=$("#form_"+e+" select[name="+e+"_fabricant]").val(),"TAVICLIP"!==this.data.carte.type_carte&&"FOPCIAFA"!==this.data.carte.type_carte||(this.data.carte[e].position=$("#form_"+e+" select[name="+e+"_position] option:selected").val()),this.data.carte[e].type=$("#form_"+e+" select[name="+e+"_type] option:selected").val(),this.data.carte.indication=$("#form_"+e+" input[name="+e+"_indication]").val(),this.data.carte[e].modele=$("#form_"+e+" input[name="+e+"_modele]").val(),this.data.carte[e].ean=$("#form_"+e+" input[name="+e+"_ean]").val(),this.data.carte[e].sn=$("#form_"+e+" input[name="+e+"_sn]").val(),this.data.carte[e].ref=$("#form_"+e+" input[name="+e+"_ref]").val(),this.data.carte[e].date_implantation=this.reFormatDate($("#form_"+e+" input[name="+e+"_date_implantation]").val()),this.data.carte[e].indication=this.data.carte.indication,this.requiredValueBoitier(this.data.carte[e])},Uluru.prototype.setSondeFormEvents=function(){$("#form_sonde1 input[name='sonde1_code']").keyup(function(e){if(this.logMessage("SONDE 1 SN CHANGE"),$("#form_sonde1 input[name='sonde1_code']").val().length>0){try{clearTimeout(search_timer)}catch(e){}search_timer=setTimeout(function(){this.searchSN("sonde1")}.bind(this),500)}else this.data.carte.sonde1=!1}.bind(this)),$("#form_sonde2 input[name='sonde2_code']").keyup(function(e){if(this.logMessage("SONDE 2 SN CHANGE"),$("#form_sonde2 input[name='sonde2_code']").val().length>0){try{clearTimeout(search_timer)}catch(e){}search_timer=setTimeout(function(){this.searchSN("sonde2")}.bind(this),500)}else this.data.carte.sonde2=!1}.bind(this)),$("#form_sonde3 input[name='sonde3_code']").keyup(function(e){if(this.logMessage("SONDE 3 SN CHANGE"),$("#form_sonde3 input[name='sonde3_code']").val().length>0){try{clearTimeout(search_timer)}catch(e){}search_timer=setTimeout(function(){this.searchSN("sonde3")}.bind(this),500)}else this.data.carte.sonde3=!1}.bind(this)),$("#form_sonde1 button[id=PMKDAIHOL_submit]").click(function(e){if(e.preventDefault(),this.logMessage("SUBMIT FORM SONDE 1"),this.data.carte.sonde1||(this.data.carte.sonde1={}),this.data.carte.sonde1.code_bar=$("#form_sonde1 input[name=sonde1_code]").val(),this.data.carte.sonde1.fabricant=$("#form_sonde1 select[name=sonde1_fabricant]").val(),this.data.carte.sonde1.modele=$("#form_sonde1 input[name=sonde1_modele]").val(),this.data.carte.sonde1.ean=$("#form_sonde1 input[name=sonde1_ean]").val(),this.data.carte.sonde1.sn=$("#form_sonde1 input[name=sonde1_sn]").val(),this.data.carte.sonde1.date_implantation=this.reFormatDate($("#form_sonde1 input[name=sonde1_date_implantation]").val()),this.data.carte.sonde1.connexion=$("#form_sonde1 select[name=sonde1_connexion] option:selected").val(),this.data.carte.sonde1.type=$("#form_sonde1 select[name=sonde1_type] option:selected").val(),this.data.carte.sonde1.ref=$("#form_sonde1 input[name=sonde1_ref]").val(),this.logMessage("SONDE 1",this.data.carte.sonde1),this.data.carte.sonde1.sn.length>0&&this.data.carte.boitier.sn===this.data.carte.sonde1.sn)return notification.create({icon:"warning-orange.svg",title:"Attention",content:"Ce numéro de série a déjà été saisi pour le boitier"}),!1;this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("sonde2")),$("#form_sonde2 input[name='sonde2_code']").focus()}.bind(this)),$("#form_sonde2 button[id=PMKDAIHOL_submit]").click(function(e){if(e.preventDefault(),this.logMessage("SUBMIT FORM SONDE 2"),this.data.carte.sonde2||(this.data.carte.sonde2={}),this.data.carte.sonde2.code_bar=$("#form_sonde2 input[name=sonde2_code]").val(),this.data.carte.sonde2.fabricant=$("#form_sonde2 select[name=sonde2_fabricant]").val(),this.data.carte.sonde2.modele=$("#form_sonde2 input[name=sonde2_modele]").val(),this.data.carte.sonde2.ean=$("#form_sonde2 input[name=sonde2_ean]").val(),this.data.carte.sonde2.sn=$("#form_sonde2 input[name=sonde2_sn]").val(),this.data.carte.sonde2.date_implantation=this.reFormatDate($("#form_sonde2 input[name=sonde2_date_implantation]").val()),this.data.carte.sonde2.connexion=$("#form_sonde2 select[name=sonde2_connexion] option:selected").val(),this.data.carte.sonde2.type=$("#form_sonde2 select[name=sonde2_type] option:selected").val(),this.data.carte.sonde2.ref=$("#form_sonde2 input[name=sonde2_ref]").val(),this.logMessage("SONDE 2",this.data.carte.sonde2),console.log($("#form_sonde2 input[name=sonde2_modele]").val()),this.data.carte.sonde2.sn.length>0&&this.data.carte.sonde1.sn===this.data.carte.sonde2.sn)return notification.create({icon:"warning-orange.svg",title:"Attention",content:"Ce numéro de série a déjà été saisi pour la sonde 1"}),!1;this.newCardWorkflowRenderer("new_card",this.formBoitierSondeBuilder("sonde3")),$("#form_sonde3 input[name='sonde3_code']").focus()}.bind(this)),$("#form_sonde3 button[id=PMKDAIHOL_submit]").click(function(e){if(e.preventDefault(),this.logMessage("SUBMIT FORM SONDE 3"),this.data.carte.sonde3||(this.data.carte.sonde3={}),this.data.carte.sonde3.code_bar=$("#form_sonde3 input[name=sonde3_code]").val(),this.data.carte.sonde3.fabricant=$("#form_sonde3 select[name=sonde3_fabricant]").val(),this.data.carte.sonde3.modele=$("#form_sonde3 input[name=sonde3_modele]").val(),this.data.carte.sonde3.ean=$("#form_sonde3 input[name=sonde3_ean]").val(),this.data.carte.sonde3.sn=$("#form_sonde3 input[name=sonde3_sn]").val(),this.data.carte.sonde3.date_implantation=this.reFormatDate($("#form_sonde3 input[name=sonde3_date_implantation]").val()),this.data.carte.sonde3.connexion=$("#form_sonde3 select[name=sonde3_connexion] option:selected").val(),this.data.carte.sonde3.type=$("#form_sonde3 select[name=sonde3_type] option:selected").val(),this.data.carte.sonde3.ref=$("#form_sonde3 input[name=sonde3_ref]").val(),this.logMessage("SONDE 3",this.data.carte.sonde3),this.data.carte.sonde3.sn.length>0&&this.data.carte.sonde2.sn===this.data.carte.sonde3.sn)return notification.create({icon:"warning-orange.svg",title:"Attention",content:"Ce numéro de série a déjà été saisi pour la sonde 2"}),!1;this.newCardWorkflowRenderer("new_card",this.resumeCardBuilder()),this.resumeCard(),this.goToStep("resume")}.bind(this))},Uluru.prototype.setNewPatientFormEvents=function(){$("#form_new_patient input[name='nom']").keydown(function(e){this.verifierCaracteres(e)}.bind(this)),$("#form_new_patient input[name='prenom']").keydown(function(e){this.verifierCaracteres(e)}.bind(this)),$("#form_new_patient").submit(function(e){e.preventDefault(),this.logMessage("CLICK ON NEW PATIENT"),this.newPatient()}.bind(this))},Uluru.prototype.setNewMedecinFormEvents=function(){$("#form_new_medecin input[name='nom']").keydown(function(e){this.verifierCaracteres(e)}.bind(this)),$("#form_new_medecin input[name='prenom']").keydown(function(e){this.verifierCaracteres(e)}.bind(this)),$("#form_new_medecin").submit(function(e){e.preventDefault(),this.logMessage("CLICK ON NEW MEDECIN"),this.newMedecin()}.bind(this))},Uluru.prototype.requiredValueBoitier=function(e){return""===e.type?(notification.create({title:"Champ vide",content:"Il faut sélectionner un type de boitier",icon:"warning-orange.svg",delay:5e3}),!0):""===e.sn&&(notification.create({title:"Champ vide",content:"Il faut sélectionner un numéro de série",icon:"warning-orange.svg",delay:5e3}),!0)};