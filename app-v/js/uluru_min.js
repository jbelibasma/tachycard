function Uluru(e){console.log("START TACHYCARD with options :",e),this.app_name="ULURU",this.debug=e.debug,this.mode=e.mode,this.api=e.api,this.token=e.token,this.generic_token=e.generic_token,this.record=e.record,this.config={},this.savedState={selector:!1,builder:!1,paramsBuilder:!1,renderList:!1},this.form_json={users_form:!1},this.data={carte:{type_carte:!1,indication:!1,boitier:{code_bar:!1,fabricant:!1,modele:!1,sn:!1,ean:!1,type:!1,date_implantation:!1,date_peremption:!1,ref:!1,indication:!1,indication2:!1,position:!1},boitier1:{code_bar:!1,fabricant:!1,modele:!1,sn:!1,ean:!1,type:!1,date_implantation:!1,date_peremption:!1,ref:!1,indication:!1,indication2:!1,position:!1},boitier2:{code_bar:!1,fabricant:!1,modele:!1,sn:!1,ean:!1,type:!1,date_implantation:!1,date_peremption:!1,ref:!1,indication:!1,indication2:!1,position:!1},sonde1:{code_bar:!1,fabricant:!1,modele:!1,sn:!1,ean:!1,date_implantation:!1,date_peremption:!1,connexion:!1,ref:!1},sonde2:{code_bar:!1,fabricant:!1,modele:!1,sn:!1,ean:!1,date_implantation:!1,date_peremption:!1,connexion:!1,ref:!1},sonde3:{code_bar:!1,fabricant:!1,modele:!1,sn:!1,ean:!1,date_implantation:!1,date_peremption:!1,connexion:!1,ref:!1},patient:!1,medecin:!1,centre:!1,patientSearch:{id:!1,search_nom:!1,search_prenom:!1},id:!1}},this.user=e.user,this.startUp()}function check_session(){alert("titi")}Uluru.prototype.loadJSONFiles=async function(e){fetch(e).then(function(e){e.json().then(e=>({form_json:e})).then(e=>{this.form_json.users_form=e.form_json})}.bind(this)),this.logMessage("LOAD JSON")},Uluru.prototype.startUp=function(){this.logMessage("STARTUP"),this.loadJSONFiles("js/form-json/users_form.json"),setTimeout(function(){$("#startup .logo").addClass("visible"),setTimeout(function(){$("#startup").addClass("open")},3e3)},1e3),this.record||$("#resume .buttons .next.record").remove(),this.hideAllScreen(),this.connectionFormRenderer(),this.setEvents()},Uluru.prototype.showScreen=function(e){this.logMessage("SHOW SCREEN",e),this.hideAllScreen(),$(".screen."+e).removeClass("hide"),setTimeout(()=>{$(".screen."+e).addClass("visible")},50)},Uluru.prototype.hideScreen=function(e){this.logMessage("HIDE SCREEN"),$(".screen."+e).removeClass("visible"),setTimeout(()=>{$(".screen."+e).addClass("hide")},50)},Uluru.prototype.hideAllScreen=function(){this.logMessage("HIDE ALL SCREEN")},Uluru.prototype.showLoading=function(){this.logMessage("SHOW LOADING"),$("#loading").addClass("visible")},Uluru.prototype.hideLoading=function(){this.logMessage("HIDE LOADING"),$("#loading").removeClass("visible")},Uluru.prototype.reFormatDate=function(e){return this.logMessage("REFORMAT DATE",e),e};