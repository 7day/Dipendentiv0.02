
WAF.onAfterInit = function onAfterInit() {// @lock
var tabella='d1anagdipe';
// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		try {
				Rpc2.testconnessione();
	 		}
			catch(e) { // in case of error
	    		var scelta=window.confirm("Db non trovato! vuole cambiare i dati di connessione?");
				if (scelta){
					//window.location.replace("/configurazione.waPage/index.html");
					
					document.location.href = "/configurazione.waPage/index.html";
				}
	 		}
		//console.log(test);
	// document.getElementById('myFreezeDiv').style.width="100%";
	//	document.getElementById('myFreezeDiv').style.height="100%";
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
