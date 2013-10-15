
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var imageButton2 = {};	// @buttonImage
	var imageButton1 = {};	// @buttonImage
	var d1genema3 = {};	// @textField
	var d1genema2 = {};	// @textField
	var d1genema1 = {};	// @textField
	var d1gendb = {};	// @textField
	var d1genhost = {};	// @textField
	var d1gencitt = {};	// @textField
	var d1genindi = {};	// @textField
	var d1genuser = {};	// @textField
	var d1genprov = {};	// @textField
	var d1genrags = {};	// @textField
	var d1genssl = {};	// @textField
	var d1genport = {};	// @textField
	var d1gentel = {};	// @textField
	var d1genfax = {};	// @textField
	var d1gencap = {};	// @textField
	var d1codazie = {};	// @textField
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	imageButton2.click = function imageButton2_click (event)// @startlock
	{// @endlock
		document.location.href = "/Default.waPage/index.html";
	};// @lock

	imageButton1.click = function imageButton1_click (event)// @startlock
	{// @endlock
		console.log("a"+$$('d1codazie').getValue());
		if($$('d1codazie').getValue()== ""){
					$$("tabView1").selectTab(1);
					$$('d1codazie').focus();
					alert("inserisci id azienda");
					console.log("azienda vuota");
				
		}else{	
			if (sources.parametri.getPosition()==-1){
				var valore1=$$('d1codazie').getValue(); 
				var valore2=$$('d1genrags').getValue(); 
				var valore3=$$('d1genindi').getValue(); 
				var valore4=$$('d1gencitt').getValue(); 
				var valore5=$$('d1genprov').getValue(); 
				var valore6=$$('d1gencap').getValue();  
				var valore7=$$('d1gentel').getValue();  
				var valore8=$$('d1genfax').getValue();  
				var valore9=$$('d1genema1').getValue(); 
				var valore10=$$('d1genema2').getValue();
				var valore11=$$('d1genema3').getValue();
				var valore12=$$('d1genhost').getValue();
				var valore13=$$('d1genuser').getValue();
				var valore14=$$('d1genpass').getValue();
				var valore15=$$('d1gendb').getValue();  
				var valore16=$$('d1genport').getValue();
				var valore17=$$('d1genssl').getValue(); 
				var valore18=$$('d1desvar1').getValue();
				var valore19=$$('d1desvar2').getValue();
				var valore20=$$('d1desvar3').getValue();

				//console.log($$('d1codazie').getValue());
				sources.parametri.addNewElement();
				
				 $$('d1codazie').setValue(valore1); 
				 $$('d1genrags').setValue(valore2); 
				 $$('d1genindi').setValue(valore3); 
				 $$('d1gencitt').setValue(valore4); 
				 $$('d1genprov').setValue(valore5); 
				 $$('d1gencap').setValue(valore6);  
				 $$('d1gentel').setValue(valore7);  
				 $$('d1genfax').setValue(valore8);  
				 $$('d1genema1').setValue(valore9); 
				 $$('d1genema2').setValue(valore10);
				 $$('d1genema3').setValue(valore11);
				 $$('d1genhost').setValue(valore12);
				 $$('d1genuser').setValue(valore13);
				 $$('d1genpass').setValue(valore14);
				 $$('d1gendb').setValue(valore15);  
				 $$('d1genport').setValue(valore16);
				 $$('d1genssl').setValue(valore17); 
				 $$('d1desvar1').setValue(valore18);
				 $$('d1desvar2').setValue(valore19);
				 $$('d1desvar3').setValue(valore20);

			
			}else{
			
				sources.parametri.d1codazie=$$('d1codazie').getValue();
			
				
				if($$('d1genrags').getValue()==''){
					sources.parametri.d1genrags=null; 
				}else{

					sources.parametri.d1genrags=$$('d1genrags').getValue();
				}
	 
			 	if($$('d1genindi').getValue()==''){
					sources.parametri.d1genindi=null; 
				}else{

					sources.parametri.d1genindi=$$('d1genindi').getValue();
				}
				 
				if($$('d1gencitt').getValue()==''){
					sources.parametri.d1gencitt=null; 
				}else{

					sources.parametri.d1gencitt=$$('d1gencitt').getValue();
				}
				 
				if($$('d1genprov').getValue()==''){
					sources.parametri.d1genprov=null; 
				}else{

					sources.parametri.d1genprov=$$('d1genprov').getValue();
				}
				 
				if($$('d1gencap').getValue()==''){
					sources.parametri.d1gencap=null; 
				}else{

					sources.parametri.d1gencap=$$('d1gencap').getValue();
				}
				 
				if($$('d1gentel').getValue()==''){
					sources.parametri.d1gentel=null; 
				}else{

					sources.parametri.d1gentel=$$('d1gentel').getValue();
				}
				  
				if($$('d1genfax').getValue()==''){
					sources.parametri.d1genfax=null; 
				}else{

					sources.parametri.d1genfax=$$('d1genfax').getValue();
				}
				  
				if($$('d1genema1').getValue()==''){
					sources.parametri.d1genema1=null; 
				}else{

					sources.parametri.d1genema1=$$('d1genema1').getValue();
				}
				 
				if($$('d1genema2').getValue()==''){
					sources.parametri.d1genema2=null; 
				}else{

					sources.parametri.d1genema2=$$('d1genema2').getValue();
				}
				 
				if($$('d1genema3').getValue()==''){
					sources.parametri.d1genema3=null; 
				}else{

					sources.parametri.d1genema3=$$('d1genema3').getValue();
				}
				 
				if($$('d1genhost').getValue()==''){
					sources.parametri.d1genhost=null; 
				}else{

					sources.parametri.d1genhost=$$('d1genhost').getValue();
				}
				 
				if($$('d1genuser').getValue()==''){
					sources.parametri.d1genuser=null; 
				}else{

					sources.parametri.d1genuser=$$('d1genuser').getValue();
				}
				 
				if($$('d1genpass').getValue()==''){
					sources.parametri.d1genpass=null; 
				}else{

					sources.parametri.d1genpass=$$('d1genpass').getValue();
				}
				 
				if($$('d1gendb').getValue()==''){
					sources.parametri.d1gendb=null; 
				}else{

					sources.parametri.d1gendb=$$('d1gendb').getValue();
				}
				   
				if($$('d1genport').getValue()==''){
					sources.parametri.d1genport=null; 
				}else{

					sources.parametri.d1genport=$$('d1genport').getValue();
				}
				 
				if($$('d1genssl').getValue() ==''){
					sources.parametri.d1genssl=null; 
				}else{

					sources.parametri.d1genssl=$$('d1genssl').getValue() ;
				}
				 
				if($$('d1desvar1').getValue()==''){
					sources.parametri.d1desvar1=null; 
				}else{

					sources.parametri.d1desvar1=$$('d1desvar1').getValue();
				}
				 
				if($$('d1desvar2').getValue()==''){
					sources.parametri.d1desvar2=null; 
				}else{

					sources.parametri.d1desvar2=$$('d1desvar2').getValue();
				}
				 
				if($$('d1desvar3').getValue()==''){
					sources.parametri.d1desvar3=null; 
				}else{

					sources.parametri.d1desvar3=$$('d1desvar3').getValue();
				}
			}
			
			//console.log(sources.parametri.d1codazie.length,sources.parametri.d1genrags.length,sources.parametri.d1genindi.length,sources.parametri.d1gencitt.length,sources.parametri.d1genprov.length  ,sources.parametri.d1gencap.length  ,sources.parametri.d1gentel.length  ,sources.parametri.d1genfax.length  ,sources.parametri.d1genema1.length  ,sources.parametri.d1genema2.length  ,sources.parametri.d1genema3.length  ,sources.parametri.d1genhost.length  ,sources.parametri.d1genuser.length  ,sources.parametri.d1genpass.length  ,sources.parametri.d1gendb.length  ,sources.parametri.d1genport.length  ,sources.parametri.d1genssl.length  ,sources.parametri.d1desvar1.length  ,sources.parametri.d1desvar2.length  ,sources.parametri.d1desvar3.length);
			sources.parametri.save();
			
			/*location.reload();
			document.location.href = "/Default.waPage/index.html";*/
		}
	};// @lock

	d1genema3.blur = function d1genema3_blur (event)// @startlock
	{// @endlock
		chkMailBlur(this);
	};// @lock

	d1genema2.blur = function d1genema2_blur (event)// @startlock
	{// @endlock
		chkMailBlur(this);
	};// @lock

	d1genema1.blur = function d1genema1_blur (event)// @startlock
	{// @endlock
		chkMailBlur(this);
	};// @lock
	

	d1gendb.blur = function d1gendb_blur (event)// @startlock
	{// @endlock
		if (isAllAlfaNum(this.getValue(),true)!=true){
			alert("questo campo non accetta caratteri speciali");
			this.setValue("");
			this.focus();
		}
	};// @lock

	d1genhost.blur = function d1genhost_blur (event)// @startlock
	{// @endlock
		if (isAllAlfaNum(this.getValue(),true)!=true){
			alert("questo campo non accetta caratteri speciali");
			this.setValue("");
			this.focus();
		}
	};// @lock
	
	$("#d1gencitt").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });
     
	d1gencitt.blur = function d1gencitt_blur (event)// @startlock
	{// @endlock
		chkLocazioneBlur(this);
	};// @lock
	
	

	d1genindi.blur = function d1genindi_blur (event)// @startlock
	{// @endlock
		chkIndDescBlur(this);
	};// @lock

	d1genuser.blur = function d1genuser_blur (event)// @startlock
	{// @endlock
		if (isAllAlfaNum(this.getValue(),true)!=true){
			alert("questo campo non accetta caratteri speciali");
			this.setValue("");
			this.focus();
		}
	};// @lock

	$("#d1genprov").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });
     
	d1genprov.blur = function d1genprov_blur (event)// @startlock
	{// @endlock
		chkLocazioneBlur(this);
	};// @lock
	

	d1genprov.keyup = function d1genprov_keyup (event)// @startlock
	{// @endlock
		if (isAllAlfa(this.getValue(),true)!=true){
			alert("questo campo accetta solo lettere");
			this.setValue("");
			this.focus(true);
		}
	};// @lock

	d1genrags.focus = function d1genrags_focus (event)// @startlock
	{// @endlock
		chkCoNoFocus(this);
	};// @lock

	$("#d1genrags").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });
     
	d1genrags.blur = function d1genrags_blur (event)// @startlock
	{// @endlock
		chkCoNoBlur(this);
		
		//chkIndBlur($$('d1genrags'));
	};// @lock
	
	
	$("#d1genssl").keypress(function (e)
     {
     //if the letter is not numeric then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return false;
	  }else{
	  	   return true;
	  }
     });
     
	d1genssl.blur = function d1genssl_blur (event)// @startlock
	{// @endlock
		chkCapBlur(this);
		if (this.getValue()!=1 && this.getValue()!=0 && this.getValue()!=""){
			alert("questo campo accetta solo 0 o 1");
			this.setValue("");
			this.focus();
		}
	};// @lock

	
	$("#d1genport").keypress(function (e)
     {
     //if the letter is not numeric then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return false;
	  }else{
	  	   return true;
	  }
     });
	

	d1genport.blur = function d1genport_blur (event)// @startlock
	{// @endlock
		chkCapBlur(this);
		
	};// @lock
	
	
	$("#d1gentel").keypress(function (e)
     {
     //if the letter is not numeric then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return false;
	  }else{
	  	   return true;
	  }
     });

	d1gentel.blur = function d1gentel_blur (event)// @startlock
	{// @endlock
		chkCapBlur(this);
	};// @lock
	
	$("#d1genfax").keypress(function (e)
     {
     //if the letter is not numeric then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return false;
	  }else{
	  	   return true;
	  }
     });
     
	d1genfax.blur = function d1genfax_blur (event)// @startlock
	{// @endlock
		chkCapBlur(this);
	};// @lock
	

	$("#d1gencap").keypress(function (e)
     {
     //if the letter is not numeric then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return false;
	  }else{
	  	   return true;
	  }
     });
     
	d1gencap.blur = function d1gencap_blur (event)// @startlock
	{// @endlock
		chkCapBlur(this);
	};// @lock
	

	$("#d1codazie").keypress(function (e)
     {
     //if the letter is not numeric then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return false;
	  }else{
	  	   return true;
	  }
     });

	d1codazie.blur = function d1codazie_blur (event)// @startlock
	{// @endlock
		chkCapBlur(this);
	};// @lock
	
	

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		sources.parametri.resolveSource();
		sources.parametri.addNewElement();  
	};// @lock

	

// @region eventManager// @startlock
	WAF.addListener("imageButton2", "click", imageButton2.click, "WAF");
	WAF.addListener("imageButton1", "click", imageButton1.click, "WAF");
	WAF.addListener("d1genema3", "blur", d1genema3.blur, "WAF");
	WAF.addListener("d1genema2", "blur", d1genema2.blur, "WAF");
	WAF.addListener("d1genema1", "blur", d1genema1.blur, "WAF");
	WAF.addListener("d1genport", "blur", d1genport.blur, "WAF");
	WAF.addListener("d1gencap", "blur", d1gencap.blur, "WAF");
	WAF.addListener("d1codazie", "blur", d1codazie.blur, "WAF");
	WAF.addListener("d1genfax", "blur", d1genfax.blur, "WAF");
	WAF.addListener("d1gentel", "blur", d1gentel.blur, "WAF");
	WAF.addListener("d1genssl", "blur", d1genssl.blur, "WAF");
	WAF.addListener("d1gendb", "blur", d1gendb.blur, "WAF");
	WAF.addListener("d1genhost", "blur", d1genhost.blur, "WAF");
	WAF.addListener("d1genuser", "blur", d1genuser.blur, "WAF");
	WAF.addListener("d1genprov", "blur", d1genprov.blur, "WAF");
	WAF.addListener("d1gencitt", "blur", d1gencitt.blur, "WAF");
	WAF.addListener("d1genindi", "blur", d1genindi.blur, "WAF");
	WAF.addListener("d1genrags", "focus", d1genrags.focus, "WAF");
	WAF.addListener("d1genrags", "blur", d1genrags.blur, "WAF");
	WAF.addListener("d1genprov", "keyup", d1genprov.keyup, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
