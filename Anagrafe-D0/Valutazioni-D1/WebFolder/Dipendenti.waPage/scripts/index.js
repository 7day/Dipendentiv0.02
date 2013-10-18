
WAF.onAfterInit = function onAfterInit() {// @lock
	
	data.userData=1;
	
	CheckDB();
    //d1gennome tabella a cui accedere su db
	var tabella='d1anagmatr';
	
	//toggle che definisce quando mostrare l avviso di perdita dati inseriti	
	var toggle_avvisocancel=0;
	
	var campi = new Array();
	 	campi[0]='d1codazie';
	 	campi[1]='d1codmatr';
	 	campi[2]='d1gencogn';
	 	campi[3]='d1gennome';
	 	campi[4]='d1gensess';
	 	campi[5]='d1codfis';
	 	campi[6]='d1genctre';
	 	campi[7]='d1geninre';
	 	campi[8]='d1gencpre';
	 	campi[9]='d1genprre';
	 	campi[10]='d1genfrre';
	 	campi[11]='d1genpres';
	 	campi[12]='d1genmail';
	 	campi[13]='d1codrege';
	 	campi[14]='d1codcoec';
	 	campi[15]='d1codinec';
	 	campi[16]='d1codvar1';
	 	campi[17]='d1codvar2';
	 	campi[18]='d1codvar3';
	 	
	 
	var campi_date = new Array(); 
	    campi_date[0]='d1datnasc';
		campi_date[1]='d1datcess';
	 	campi_date[2]='d1datassu';
	 	
	var campi_mansioni = new Array();
	 	campi_mansioni[0]='d1desfubr';
	 
	
	var campi_rapplavoro = new Array();
	 	campi_rapplavoro[0]='d1desrabr';
	 	
	var campi_dislocazione = new Array();
	 	campi_dislocazione[0]='d1desrebr';
	 
	var campi_statusgiur = new Array();
	 	campi_statusgiur[0]='d1desstbr';
	 		 
	
// @region namespaceDeclaration// @startlock
	var Drop_Dati = {};	// @buttonImage
	var imageButton1 = {};	// @buttonImage
	var d1codcoec = {};	// @textField
	var search_d1codfis = {};	// @textField
	var search_d1genmail = {};	// @textField
	var search_d1genctre = {};	// @textField
	var search_d1gencogn = {};	// @textField
	var search_d1gennome = {};	// @textField
	var d1genmail = {};	// @textField
	var d1codrege = {};	// @textField
	var d1codinec = {};	// @textField
	var d1genprre = {};	// @textField
	var d1genctre = {};	// @textField
	var d1genfrre = {};	// @textField
	var d1geninre = {};	// @textField
	var d1genpres = {};	// @textField
	var d1codfis = {};	// @textField
	var d1gencogn = {};	// @textField
	var d1codmatr = {};	// @textField
	var d1gencpre = {};	// @textField
	var d1datassu = {};	// @textField
	var d1datnasc = {};	// @textField
	var vai_mansioni = {};	// @button
	var dataGrid2 = {};	// @dataGrid
	var Apri_Insert = {};	// @buttonImage
	var d1datcess = {};	// @textField
	var d1codazie = {};	// @textField
	var search_d1datnasc = {};	// @textField
	var documentEvent = {};	// @document
	var ConfermaDati = {};	// @buttonImage
	var Back = {};	// @buttonImage
	var conferma = {};	// @buttonImage
	var pop_del = {};	// @buttonImage
	var Search_Anag = {};	// @buttonImage
// @endregion// @endlock

// eventHandlers// @lock

	Drop_Dati.click = function Drop_Dati_click (event)// @startlock
	{// @endlock
		Ricerca("anagrafica");
		toggle_avvisocancel=0;
		$$("tabView3").selectTab(1);
		ResetCampi();
	};// @lock

	imageButton1.click = function imageButton1_click (event)// @startlock
	{// @endlock
		$$("tabView3").selectTab(3);
		$$('component3').loadComponent({path: '/Webcomponent/Ricerca_Funzioni.waComponent', userData:  { 'dati':data.userData,'modalita': "lettura" }});
	};// @lock

	d1codcoec.blur = function d1codcoec_blur (event)// @startlock
	{// @endlock
		chkIndDescBlur(this);
	};// @lock

	search_d1codfis.keydown = function search_d1codfis_keydown (event)// @startlock
	{// @endlock
		if (event.keyCode==13){
			
			Ricerca("anagrafica");
		}
	};// @lock

	search_d1codfis.blur = function search_d1codfis_blur (event)// @startlock
	{// @endlock
		
		if (this.getValue()!="" && isAllAlfaNum(this.getValue(),true)!=true){
			alert("questo campo non accetta caratteri speciali");
			this.setValue("");
			this.focus();
		}
	};// @lock

	search_d1genmail.keydown = function search_d1genmail_keydown (event)// @startlock
	{// @endlock
		if (event.keyCode==13){
			
			Ricerca("anagrafica");
		}
	};// @lock

	search_d1genmail.blur = function search_d1genmail_blur (event)// @startlock
	{// @endlock
		chkMailBlur(this);
	};// @lock
	
	$("#search_d1genctre").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });

	search_d1genctre.keydown = function search_d1genctre_keydown (event)// @startlock
	{// @endlock
		if (event.keyCode==13){
			
			Ricerca("anagrafica");
		}
	};// @lock

	search_d1genctre.blur = function search_d1genctre_blur (event)// @startlock
	{// @endlock
		chkLocazioneBlur(this);
		
	};// @lock
	
	
    
    $("#search_d1gencogn").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });

	search_d1gencogn.keydown = function search_d1gencogn_keydown (event)// @startlock
	{// @endlock
		
		if (event.keyCode==13){
			
			Ricerca("anagrafica");
		}
	};// @lock
	

	search_d1gencogn.blur = function search_d1gencogn_blur (event)// @startlock
	{// @endlock
		chkLocazioneBlur(this);
	};// @lock

	
	search_d1gennome.keydown = function search_d1gennome_keydown (event)// @startlock
	{// @endlock
		if (event.keyCode==13){
			
			Ricerca("anagrafica");
		}
	};// @lock
	
	$("#search_d1gennome").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });
     
	search_d1gennome.blur = function search_d1gennome_blur (event)// @startlock
	{// @endlock
		chkLocazioneBlur(this);
	};// @lock

	d1genmail.blur = function d1genmail_blur (event)// @startlock
	{// @endlock
		chkMailBlur(this);
	};// @lock

	d1codrege.blur = function d1codrege_blur (event)// @startlock
	{// @endlock
		chkIndDescBlur(this);
	};// @lock

	d1codinec.blur = function d1codinec_blur (event)// @startlock
	{// @endlock
		chkIndDescBlur(this);
	};// @lock

	d1genprre.blur = function d1genprre_blur (event)// @startlock
	{// @endlock
		chkLocazioneBlur(this);
	};// @lock
	
	$("#d1genprre").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });

	d1genctre.blur = function d1genctre_blur (event)// @startlock
	{// @endlock
		chkLocazioneBlur(this);
	};// @lock
	$("#d1genctre").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });

	d1genfrre.blur = function d1genfrre_blur (event)// @startlock
	{// @endlock
		chkLocazioneBlur(this);
	};// @lock
	$("#d1genfrre").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });
	

	d1geninre.blur = function d1geninre_blur (event)// @startlock
	{// @endlock
		chkIndDescBlur(this);
	};// @lock

	d1genpres.blur = function d1genpres_blur (event)// @startlock
	{// @endlock
		chkLocazioneBlur(this);
	};// @lock
	$("#d1genpres").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });
	

	d1codfis.blur = function d1codfis_blur (event)// @startlock
	{// @endlock
		if (this.getValue()!="" && isAllAlfaNum(this.getValue(),true)!=true){
			alert("questo campo non accetta caratteri speciali");
			this.setValue("");
			this.focus();
		}
	};// @lock
	
	$("#d1gencogn").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });

	d1gencogn.blur = function d1gencogn_blur (event)// @startlock
	{// @endlock
		chkLocazioneBlur(this);
	};// @lock
	
  
  	$("#d1gennome").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });
	
	$("#d1codmatr").keypress(function (e)
     {
     //if the letter is not numeric then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return false;
	  }else{
	  	   return true;
	  }
     });

	d1codmatr.blur = function d1codmatr_blur (event)// @startlock
	{// @endlock
		chkCapBlur(this);
	};// @lock
	

	d1gencpre.blur = function d1gencpre_blur (event)// @startlock
	{// @endlock
		chkCapBlur(this);
	};// @lock
	$("#d1gencpre").keypress(function (e)
     {
     //if the letter is not numeric then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return false;
	  }else{
	  	   return true;
	  }
     });

	d1datassu.focus = function d1datassu_focus (event)// @startlock
	{// @endlock
		checkDateOnFocus(this);
	};// @lock

	d1datassu.blur = function d1datassu_blur (event)// @startlock
	{// @endlock
		checkDateOnBlur(this);
	};// @lock

	d1datnasc.blur = function d1datnasc_blur (event)// @startlock
	{// @endlock
		checkDateOnBlur(this);
	};// @lock

	d1datnasc.focus = function d1datnasc_focus (event)// @startlock
	{// @endlock
		checkDateOnFocus(this);
	};// @lock

	vai_mansioni.click = function vai_mansioni_click (event)// @startlock
	{// @endlock

	};// @lock

	dataGrid2.onRowClick = function dataGrid2_onRowClick (event)// @startlock
	{// @endlock
		$$('pop_del').show();
		var sel_elem=sources.anagrafe.getCurrentElement();
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		sources.anagrafe.sync();
		var sel_elem=sources.anagrafe.getCurrentElement();
				
		 $$('d1codazie').hide();
		 $$('d1codmatr').hide();
		 toggle_avvisocancel=0;
		 Popola_Griglia(sel_elem);
		 $$("tabView3").selectTab(2);
		 
	};// @lock

	Apri_Insert.click = function Apri_Insert_click (event)// @startlock
	{// @endlock
		$$('d1codazie').show();
		$$('d1codmatr').show();
		toggle_avvisocancel=1;
	   
	   
	    
	    if ($$('search_d1datnasc').getValue()!=''){
			$$('d1datnasc').setValue($$('search_d1datnasc').getValue());
		}
		if ($$('search_d1gennome').getValue()!=''){
			$$('d1gennome').setValue($$('search_d1gennome').getValue());
		}
		if ($$('search_d1gencogn').getValue()!=''){
			$$('d1gencogn').setValue($$('search_d1gencogn').getValue());
		}
		if ($$('search_d1genctre').getValue()!=''){
			$$('d1genctre').setValue($$('search_d1genctre').getValue());
		}
		if($$('search_d1genmail').getValue()!=''){
			$$('d1genmail').setValue($$('search_d1genmail').getValue());
		}
		if($$('search_d1codfis').getValue()!=''){
			$$('d1codfis').setValue($$('search_d1codfis').getValue());
		}	
		 $$("tabView3").selectTab(2);	
	};// @lock

	d1datcess.focus = function d1datcess_focus (event)// @startlock
	{// @endlock
		checkDateOnFocus(this);
	};// @lock

	d1datcess.blur = function d1datcess_blur (event)// @startlock
	{// @endlock
		checkDateOnBlur(this);
	};// @lock

	d1codazie.blur = function d1codazie_blur (event)// @startlock
	{// @endlock
		chkCapBlur(this);
	};// @lock
	$("#d1codazie").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return false;
	  }else{
	  	   return true;
	  }
     });
	$("#d1gensess").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });
	

	search_d1datnasc.focus = function search_d1datnasc_focus (event)// @startlock
	{// @endlock
		checkDateOnFocus(this);
	};// @lock

	search_d1datnasc.blur = function search_d1datnasc_blur (event)// @startlock
	{// @endlock
		checkDateOnBlur(this);
	};// @lock

	search_d1datnasc.keydown = function search_d1datnasc_keydown (event)// @startlock
	{// @endlock
		if (event.keyCode==13){
			
			Ricerca("anagrafica");
		}
		
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		
		//format delle data nei campi testo e del datepicker
		$.datepicker.setDefaults( $.datepicker.regional[ "it" ] );
	


		$$('d1datnasc').setValue(WAF.utils.formatString(data.dtnasc, {format: '#dd-mm-yy'}));
		$$('d1datassu').setValue(WAF.utils.formatString(data.dtassu, {format: '#dd-mm-yy'}));
		$$('d1datcess').setValue(WAF.utils.formatString(data.dtdimi, {format: '#dd-mm-yy'}));

		
		var connectionParams= Rpc2.connetti();
			

		mansioni = Rpc2.LetturaDb(connectionParams,'d1anagfunz');
		sources.mansioni.sync();
		
		dislocazione = Rpc2.LetturaDb(connectionParams,'d1anagrepa');
		sources.dislocazione.sync();
		
		rapplavoro = Rpc2.LetturaDb(connectionParams,'d1anagrala');
		sources.rapplavoro.sync();
		
		statusgiur= Rpc2.LetturaDb(connectionParams,'d1anagstgi');
		sources.statusgiur.sync();
	};// @lock

	ConfermaDati.click = function ConfermaDati_click (event)// @startlock
	{// @endlock
		Prel_DatiInseriti();
		
		if (P_d1codazie!='' && P_d1codmatr!='' && P_d1gencogn!='' && P_d1gennome!='' && P_d1gensess!='' && P_d1datnasc!='' && P_d1codfis!='' && P_d1datassu!=''){
			
			/*if(CheckDate()){
				alert("date non corrette reinserire");
			}else{*/
				//porta stringhe date da dd/mm/yy a yy/mm/dd
				P_d1datnasc=Conv_DataPerDb(P_d1datnasc,"/");
				P_d1datassu=Conv_DataPerDb(P_d1datassu,"/");
				if (P_d1datcess==''){
					P_d1datcess="";
				}else{
					P_d1datcess=Conv_DataPerDb(P_d1datcess,"/");
					
				}
					
				console.log("dati inviati alle stored"+P_d1codazie,P_d1codmatr,P_d1gencogn,P_d1gennome,P_d1gensess,P_d1datnasc,P_d1codfis,P_d1genctre,P_d1geninre,P_d1gencpre,P_d1genprre,P_d1genfrre,P_d1genpres,P_d1genmail,P_d1datassu,P_d1datcess,P_d1codrepa,P_d1codrege,P_d1codfunz,P_d1codstgi,P_d1codrala,P_d1codcoec,P_d1codinec,P_d1codvar1,P_d1codvar2,P_d1codvar3);
					
				var connectionParams = Rpc2.connetti();
				if (toggle_avvisocancel==0){			
				console.log("update");
					
				Rpc2.updateAsync({
				      'onSuccess': function (result) {
				                   console.log("ok");
				                   ResetCampi();
				                   Ricerca("anagrafica");
				       },  
				      'onError': function (error) {
				                	CheckDB();
				                    alert('operazione non riusciuta ');
				                    console.log("errore");
				       },  
				       'params': [connectionParams,tabella,P_d1codazie,P_d1codmatr,P_d1gencogn,P_d1gennome,P_d1gensess,P_d1datnasc,P_d1codfis,P_d1genctre,P_d1geninre,P_d1gencpre,P_d1genprre,P_d1genfrre,P_d1genpres,P_d1genmail,P_d1datassu,P_d1datcess,P_d1codrepa,P_d1codrege,P_d1codfunz,P_d1codstgi,P_d1codrala,P_d1codcoec,P_d1codinec,P_d1codvar1,P_d1codvar2,P_d1codvar3]
				       });
					
				}else{
					
				
				console.log("insert");
				Rpc2.insertAsync({
				       'onSuccess': function (result) {                  
				                   ResetCampi();
				                   Ricerca("anagrafica");
				                   console.log("insert riuscita");
				        },  
				       'onError': function (error) {
				                   CheckDB();
				                   alert('operazione non riusciuta dati non corretti? ')
				                   console.log("errore dati inseriti non corretti");
				        },  
				        'params': [connectionParams,tabella,P_d1codazie,P_d1codmatr,P_d1gencogn,P_d1gennome,P_d1gensess,P_d1datnasc,P_d1codfis,P_d1genctre,P_d1geninre,P_d1gencpre,P_d1genprre,P_d1genfrre,P_d1genpres,P_d1genmail,P_d1datassu,P_d1datcess,P_d1codrepa,P_d1codrege,P_d1codfunz,P_d1codstgi,P_d1codrala,P_d1codcoec,P_d1codinec,P_d1codvar1,P_d1codvar2,P_d1codvar3]
				        });
				} 
				
				Ricerca("anagrafica");  		
				StrToDate();
				source.anagrafe.orderBy("d1codazie asc");
				sources.anagrafe.select(-1);
				$$("tabView3").selectTab(1);
		   //}
		    	
		}else{
			alert("inserisci tutti i campi obbligatori");
		}
	};// @lock

	Back.click = function Back_click (event)// @startlock
	{// @endlock
		//guardare html per href		
	};// @lock

	conferma.click = function conferma_click (event)// @startlock
	{// @endlock
		//guardare html per href
	};// @lock

	pop_del.click = function pop_del_click (event)// @startlock
	{// @endlock
		var scelta=window.confirm("Eliminare l'elemento corrente?");
		
		if (scelta){
			var id=sources.anagrafe.getCurrentElement().d1codazie;
			var id2=sources.anagrafe.getCurrentElement().d1codmatr;
			var connectionParams= Rpc2.connetti();
			
			anagrafe= Rpc2.delAsync({
	                'onSuccess': function (result) {
	                   console.log("ok");
	                   sources.anagrafe.sync();
	                },  
	                'onError': function (error) {
	                   CheckDB();
	                   alert('errore');
	                    console.log("errore");
	                },  
	                'params': [connectionParams,tabella,id,id2]
	             }); 		
			Ricerca("anagrafica");	
			
		}	
	};// @lock

	Search_Anag.click = function Search_Anag_click (event)// @startlock
	{// @endlock
		CheckDB(); 
		$$('Apri_Insert').show();
		Ricerca("anagrafica");      
	};// @lock
	
	function Conv_DataPerDb(string,divisore){
		
		var data_norm=string.split(divisore);
		data_conv=data_norm[2]+'-'+data_norm[1]+'-'+data_norm[0];
		return data_conv;
	}
	
	function Ricerca(tipo){
		
		if (tipo=="anagrafica"){
			//if ($$('search_d1gencogn').getValue()!='' && isNaN($$('search_d1gencogn').getValue()[0]) || $$('search_d1gennome').getValue()!='' && isNaN($$('search_d1gennome').getValue()[0])|| $$('search_d1genmail').getValue()!='' && isNaN($$('search_d1genmail').getValue()[0])|| $$('search_d1genctre').getValue()!='' && isNaN($$('search_d1genctre').getValue()[0])|| $$('search_d1codfis').getValue()!=''&& isNaN($$('search_d1codfis').getValue()[0])||$$('search_d1datnasc').getValue()!=''){
				var connectionParams= Rpc2.connetti();
				
				if ($$('search_d1datnasc').getValue()!=''){
					
					var str_conv=$$('search_d1datnasc').getValue();
					var i=0;
					str_conv=str_conv.replace("/","-");
					str_conv=str_conv.replace("/","-");
					var DTconv=str_conv.split("-");
						
					while(str_conv[i]!='-' && i<=10){
						i++;
					}
					if (i==2){
						var DTconv=DTconv[2]+'-'+DTconv[1]+'-'+DTconv[0];		
					}					
						console.log(i);			
						console.log("Data convertita"+DTconv);
				}
				anagrafe = Rpc2.search(connectionParams,tabella,'d1gencogn','d1gennome','d1genmail','d1genctre','d1codfis','d1datnasc',$$('search_d1gencogn').getValue(),$$('search_d1gennome').getValue(),$$('search_d1genmail').getValue(),$$('search_d1genctre').getValue(),$$('search_d1codfis').getValue(),DTconv);
				StrToDate();
				sources.anagrafe.sync();
				
				/*}else{
					if (toggle_avvisocancel==0){
						alert("inserisci almeno un campo");
					}
				}*/
			}
			sources.anagrafe.select(-1);				
					
			
	}
	
	
	function ResetCampi(){
		Set_Dati(campi,'setValue',"");
		Set_Dati(campi_date,'clear',"");
		Set_Dati(campi_mansioni,'setValue'," ");
		Set_Dati(campi_statusgiur,'setValue'," ");
		Set_Dati(campi_rapplavoro,'setValue'," ");
		Set_Dati(campi_dislocazione,'setValue'," ");
	}
	
	function StrToDate(){
		for (i=0;i<anagrafe.length;i++){
			anagrafe[i].d1datnasc=new Date(anagrafe[i].d1datnasc);
			anagrafe[i].d1datassu=new Date(anagrafe[i].d1datassu);
			if (anagrafe[i].d1datcess == null){
				console.log("data vuota");
				anagrafe[i].d1datcess=null;//new Date();
			}else{
				anagrafe[i].d1datcess=new Date(anagrafe[i].d1datcess);
			}
			
		}
  	 }
  	
  	  	 
  	 function DateToStr(Data,Divisore,Modo){
  	 	
  	 	var dtconv;
  	 	var anno=Data.getFullYear();
		var mese=Data.getMonth()+ 1;
		if (mese<10){
			mese="0"+mese;	
			}
		var giorno=Data.getDate();
			if (giorno<10){
			giorno="0"+giorno;	
			}
  	 	
  	 	if (Modo=='yymmdd'){
	  	 	  dtconv=anno+Divisore+mese+Divisore+giorno;
	  	}
	  	if (Modo=='ddmmyy'){
	  	 	 dtconv=giorno+Divisore+mese+Divisore+anno;
	  	}
	  	console.log(dtconv);
  	 	return dtconv;
  	 }
  	 
  	 function Set_Dati(campi,oper,string){
		var target = oper;
		for (i=0;i<campi.length;i++){
			$$(campi[i])[target](string);
		}
	  }	 
		
     function Popola_Griglia(sel_elem){
		//fa il corrispettivo di questo: $$('d1codazie').setValue(sel_elem.d1codazie);
		var target = 'setValue';
		
		for (i=0;i<campi.length;i++){
			var nome_camparr=campi[i];
			$$(campi[i])[target](sel_elem[nome_camparr]);
		}
		for (i=0;i<campi_date.length;i++){
			var nome_camparr=campi_date[i];
			if (sel_elem[nome_camparr]!= null){
					$$(campi_date[i])[target](DateToStr(sel_elem[nome_camparr],'/','ddmmyy'));
			}
		}
				
		for (i=0;i<mansioni.length;i++){	
			if(sel_elem.d1codfunz==mansioni[i].d1codfunz){
				$$('d1desfubr').setValue(mansioni[i].d1desfubr);
			}
		}
		 	
		for (i=0;i<rapplavoro.length;i++){	
			if(sel_elem.d1codrala==rapplavoro[i].d1codrala){
				$$('d1desrabr').setValue(rapplavoro[i].d1desrabr);
			}
		}
		
		for (i=0;i<statusgiur.length;i++){	
			if(sel_elem.d1codstgi==statusgiur[i].d1codstgi){
				$$('d1desstbr').setValue(statusgiur[i].d1desstbr);
			}
		}
		
		for (i=0;i<dislocazione.length;i++){	
			if(sel_elem.d1codrepa==dislocazione[i].d1codrepa){
				$$('d1desrebr').setValue(dislocazione[i].d1desrebr);
			}
		}
		
		console.log(sel_elem.d1codfunz);
		console.log(sel_elem.d1codrala);
		console.log(sel_elem.d1codstgi);
		console.log(sel_elem.d1codrepa);

		
  	 }
  	
	 function Prel_DatiInseriti(){
	    //preleva i dati inseriti in input della maschera dettagli P_d1codazie=$$('d1codazie').getValue();
	 	var oper = 'getValue';
	
	 	for (i=0;i<campi.length;i++){
	 		
			
			window['P_'+campi[i]]=$$(campi[i])[oper]();
						
			if (i>5){
				if ($$(campi[i])[oper]()==''){
					window['P_'+campi[i]]=' ';	
				}		
			}
		}
	 
		for (i=0;i<campi_date.length;i++){
			console.log($$(campi_date[i])[oper]());
			window['P_'+campi_date[i]]=$$(campi_date[i])[oper]();
					
		}
			
		
		if ($$('d1desfubr').getValue() != 'null'){
			console.log("entrato in controllo");
			for (i=0;i<mansioni.length;i++){
				if ($$('d1desfubr').getValue() == mansioni[i].d1desfubr){ 
					P_d1codfunz=mansioni[i].d1codfunz;
				}
			}
		}else{
			P_d1codfunz=0;
		}
		
		
		if ($$('d1desrebr').getValue()!='null'){	
			for (i=0;i<dislocazione.length;i++){
				if ($$('d1desrebr').getValue() == dislocazione[i].d1desrebr){ 
					P_d1codrepa=dislocazione[i].d1codrepa;
				}
				
			}
		}else{
			P_d1codrepa=0;
		}
		
		if ($$('d1desrabr').getValue()!='null'){
				
			for (i=0;i<rapplavoro.length;i++){
				if ($$('d1desrabr').getValue() == rapplavoro[i].d1desrabr){ 
					//console.log("trovato"+rapplavoro[i].d1codrala);
					P_d1codrala=rapplavoro[i].d1codrala;
				}
				
			}
		}else{
			P_d1codrala=0;
		}
		
		if ($$('d1desstbr').getValue()!='null'){
				
			for (i=0;i<statusgiur.length;i++){
				if ($$('d1desstbr').getValue() == statusgiur[i].d1desstbr){ 
					//console.log("trovato"+statusgiur[i].d1codstgi);
					P_d1codstgi=statusgiur[i].d1codstgi;
				}
				
			}
		}else{
			P_d1codstgi=0;
		}		
	}
	
	function CheckDate(){
		if(P_d1datcess!=''){
			if(compareDate(P_d1datnasc,P_d1datassu)!=-1|| compareDate(P_d1datassu,P_d1datcess)!=-1){
				return true;
			}
		}else{
			if(compareDate(P_d1datnasc,P_d1datassu)!=-1){
				
				return true;
			}
		}
	}
	
	function CheckDB(){
		try {
			Rpc2.testconnessione();
 		}
		catch(e) { // in case of error
    		alert("impostare i dati della connessione al database nel menu settings");
    		document.location.href = "/Default.waPage/index.html";
 		}
 	}

   
// @region eventManager// @startlock
	WAF.addListener("Drop_Dati", "click", Drop_Dati.click, "WAF");
	WAF.addListener("imageButton1", "click", imageButton1.click, "WAF");
	WAF.addListener("search_d1codfis", "keydown", search_d1codfis.keydown, "WAF");
	WAF.addListener("search_d1genctre", "keydown", search_d1genctre.keydown, "WAF");
	WAF.addListener("search_d1gencogn", "keydown", search_d1gencogn.keydown, "WAF");
	WAF.addListener("search_d1genmail", "keydown", search_d1genmail.keydown, "WAF");
	WAF.addListener("search_d1gennome", "keydown", search_d1gennome.keydown, "WAF");
	WAF.addListener("d1codcoec", "blur", d1codcoec.blur, "WAF");
	WAF.addListener("search_d1datnasc", "focus", search_d1datnasc.focus, "WAF");
	WAF.addListener("search_d1datnasc", "blur", search_d1datnasc.blur, "WAF");
	WAF.addListener("search_d1codfis", "blur", search_d1codfis.blur, "WAF");
	WAF.addListener("search_d1genmail", "blur", search_d1genmail.blur, "WAF");
	WAF.addListener("search_d1genctre", "blur", search_d1genctre.blur, "WAF");
	WAF.addListener("search_d1gencogn", "blur", search_d1gencogn.blur, "WAF");
	WAF.addListener("search_d1gennome", "blur", search_d1gennome.blur, "WAF");
	WAF.addListener("d1genmail", "blur", d1genmail.blur, "WAF");
	WAF.addListener("d1codrege", "blur", d1codrege.blur, "WAF");
	WAF.addListener("d1codinec", "blur", d1codinec.blur, "WAF");
	WAF.addListener("d1genprre", "blur", d1genprre.blur, "WAF");
	WAF.addListener("d1genctre", "blur", d1genctre.blur, "WAF");
	WAF.addListener("d1genfrre", "blur", d1genfrre.blur, "WAF");
	WAF.addListener("d1geninre", "blur", d1geninre.blur, "WAF");
	WAF.addListener("d1genpres", "blur", d1genpres.blur, "WAF");
	WAF.addListener("d1codfis", "blur", d1codfis.blur, "WAF");
	WAF.addListener("d1gencogn", "blur", d1gencogn.blur, "WAF");
	WAF.addListener("d1codmatr", "blur", d1codmatr.blur, "WAF");
	WAF.addListener("d1gencpre", "blur", d1gencpre.blur, "WAF");
	WAF.addListener("d1datcess", "focus", d1datcess.focus, "WAF");
	WAF.addListener("d1datassu", "focus", d1datassu.focus, "WAF");
	WAF.addListener("d1datassu", "blur", d1datassu.blur, "WAF");
	WAF.addListener("d1datnasc", "blur", d1datnasc.blur, "WAF");
	WAF.addListener("d1datnasc", "focus", d1datnasc.focus, "WAF");
	WAF.addListener("vai_mansioni", "click", vai_mansioni.click, "WAF");
	WAF.addListener("dataGrid2", "onRowClick", dataGrid2.onRowClick, "WAF");
	WAF.addListener("dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	WAF.addListener("Apri_Insert", "click", Apri_Insert.click, "WAF");
	WAF.addListener("d1datcess", "blur", d1datcess.blur, "WAF");
	WAF.addListener("d1codazie", "blur", d1codazie.blur, "WAF");
	WAF.addListener("search_d1datnasc", "keydown", search_d1datnasc.keydown, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("ConfermaDati", "click", ConfermaDati.click, "WAF");
	WAF.addListener("Back", "click", Back.click, "WAF");
	WAF.addListener("conferma", "click", conferma.click, "WAF");
	WAF.addListener("pop_del", "click", pop_del.click, "WAF");
	WAF.addListener("Search_Anag", "click", Search_Anag.click, "WAF");
// @endregion
};// @endlock



