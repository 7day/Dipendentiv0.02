
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		campo2="d1cod";
campo3="d1desc";
campo0="a";
campo1="d";
		
		dbquery='SELECT * FROM d1anagfunz';
		
		
			dbquery+=' WHERE ('+campo0+' LIKE '+'"'+"%"+campo2+"%"+'"'+' OR '+campo0+' LIKE '+'"'+"%"+campo2+'"'+' OR '+campo0+' LIKE '+'"'+campo2+"%"+'"'+')';
			
			dbquery+=' OR ('+campo1+' LIKE '+'"'+"%"+campo3+"%"+'"'+' OR '+campo1+' LIKE '+'"'+"%"+campo3+'"'+' OR '+campo1+' LIKE '+'"'+campo3+"%"+'"'+')';
			
		
		console.log(dbquery);


	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
