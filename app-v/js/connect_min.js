Uluru.prototype.connect=function(){this.logMessage("CONNECT");var e=function(){this.showLoading()}.bind(this),t=function(e){this.logMessage(e),this.hideLoading(),"OK"===e.status?(this.user=e.result,this.token=e.result.token,$("#connect").removeClass("visible"),notification.create({title:"Hello",content:"Bienvenue sur Tachycard "+this.user.realname}),$("#footer .username").html(this.user.realname),2!==this.user.id_profile&&$("#account_cards").remove(),this.showMenu()):(this.logError(e.message),notification.create({title:"Erreur",content:e.message}))}.bind(this),n=document.getElementById("form_connect"),s=new FormData(n);this.apiRequest("POST","users","connect",s,e,t,!1)},Uluru.prototype.unconnect=function(e){if(this.logMessage("UNCONNECT"),!e&&!window.confirm("Souhaitez-vous quitter Tachycard ?"))return!1;var t,n=function(e){this.logMessage(e),"OK"===e.status?(this.user=!1,this.token=this.generic_token,this.newCardWorkflowRenderer("main",this.connectionFormBuilder()),$("#connect").addClass("visible"),$("#footer .username").html(""),notification.create({title:"Bye bye",content:"Vous êtes maintenant déconnecté de Tachycard"})):(this.logError(e.message),notification.create({title:"Erreur",content:e.message}))}.bind(this);t="user_id="+this.user.id,this.apiRequest("GET","users","unconnect",t,null,n,!1)};