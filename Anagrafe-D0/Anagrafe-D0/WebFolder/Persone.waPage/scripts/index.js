
WAF.onAfterInit = function onAfterInit() {// @lock

    //nome tabella a cui accedere su db
	var tabella='d1anagdipe';
	
	//toggle che definisce quando mostrare l avviso di perdita dati inseriti	
	var toggle_avvisocancel=0;
	
	var campi = new Array();
	 	campi[0]='cdazie';
	 	campi[1]='cdmatr';
	 	campi[2]='cognome';
	 	campi[3]='nome';
	 	campi[4]='sesso';
	 	campi[5]='codfis';
	 	campi[6]='cittares';
	 	campi[7]='indirres';
	 	campi[8]='capres';
	 	campi[9]='provres';
	 	campi[10]='frazioneres';
	 	campi[11]='pressores';
	 	campi[12]='email';
	 
	var campi_date = new Array(); 
	    campi_date[0]='dtnasc';
		campi_date[1]='dtdimi';
	 	campi_date[2]='dtassu';
	 	
	var campi_mansioni = new Array();
		//campi_mansioni[0]='cdmans';
	 	campi_mansioni[0]='demans';
	 	//campi_mansioni[2]='dlmans';
	 	//campi_mansioni[3]='note';	
	
	var campi_rapplavoro = new Array();
	 	campi_rapplavoro[0]='derapl';
	 	
	var campi_dislocazione = new Array();
	 	campi_dislocazione[0]='dedisl';
	 
	var campi_statusgiur = new Array();
	 	campi_statusgiur[0]='destag';
	 		
	var lun_arr=campi.length;
	var lun_datearr=campi_date.length;
	var lun_mans=campi_mansioni.length;
	 
	//tieni i campi data alla profondita giusta
	var zIndexNumber=100000;
	$('#dtnasc').css('zIndex',zIndexNumber);
	$('#dtdimi').css('zIndex',zIndexNumber);
	$('#dtassu').css('zIndex',zIndexNumber);
	
	
	
	
// @region namespaceDeclaration// @startlock
	var cdazie = {};	// @textField
	var sesso = {};	// @textField
	var dtdimi = {};	// @textField
	var search_dtnasc = {};	// @textField
	var button8 = {};	// @button
	var Drop_Dati = {};	// @buttonImage
	var dataGrid2 = {};	// @dataGrid
	var documentEvent = {};	// @document
	var button3 = {};	// @button
	var ConfermaDati = {};	// @buttonImage
	var ok_delete = {};	// @button
	var back_del = {};	// @button
	var Back = {};	// @buttonImage
	var conferma = {};	// @buttonImage
	var Apri_Insert = {};	// @buttonImage
	var pop_del = {};	// @buttonImage
	var Search_Anag = {};	// @buttonImage
// @endregion// @endlock

// eventHandlers// @lock

	cdazie.blur = function cdazie_blur (event)// @startlock
	{// @endlock
		//
	};// @lock

	sesso.blur = function sesso_blur (event)// @startlock
	{// @endlock
		console.log(this.getValue);
		if (this.getValue()!="M" && this.getValue()!="F"/*&& this.getValue()!="m" && this.getValue()!="f"*/ ){
			alert("questo campo accetta solo M o F");
			this.focus(true);
		}
	};// @lock

	dtdimi.blur = function dtdimi_blur (event)// @startlock
	{// @endlock
		//
	};// @lock

	search_dtnasc.keydown = function search_dtnasc_keydown (event)// @startlock
	{// @endlock
		/*var n_val=$$('search_dtnasc').getValue().length;
		if (n_val3 && */
		
	};// @lock

	button8.click = function button8_click (event)// @startlock
	{// @endlock
		ResetCampi();
		$$('ModuloDati').closeDialog();
	};// @lock

	Drop_Dati.click = function Drop_Dati_click (event)// @startlock
	{// @endlock
		if (toggle_avvisocancel==1){
	  				
			//if(Check_Campi()){
		 		$$('ModuloDropDati').displayDialog();
			//}
		 
		 toggle_avvisocancel=0;
		 
		}else{
		 $$('ModuloDati').closeDialog();
		}
		ResetCampi();
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		 var sel_elem=sources.anagrafe.getCurrentElement();		
		 
		 $$('cdazie').hide();
		 $$('cdmatr').hide();
		 $$('ModuloDati').displayDialog();
		 Prel_Griglia(sel_elem,lun_arr); 
	};// @lock

	dataGrid2.onRowClick = function dataGrid2_onRowClick (event)// @startlock
	{// @endlock
		$$('pop_del').show();
		var sel_elem=sources.anagrafe.getCurrentElement();
		$$('richText4').setValue('Se proprio sicuro di eliminare '+sel_elem.NOME+' dal database?');	
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		var connectionParams= Rpc2.connetti();
		/*anagrafe = Rpc2.LetturaDb(connectionParams,tabella);
		StrToDate();
		sources.anagrafe.sync();*/

		mansioni = Rpc2.LetturaDb(connectionParams,'d1anagmans');
		console.log(mansioni);
		sources.mansioni.sync();
		
		dislocazione = Rpc2.LetturaDb(connectionParams,'d1anagdisl');
		console.log(dislocazione);
		sources.dislocazione.sync();
		
		rapplavoro = Rpc2.LetturaDb(connectionParams,'d1anagrapl');
		console.log(rapplavoro);
		sources.rapplavoro.sync();
		
		statusgiur= Rpc2.LetturaDb(connectionParams,'d1anagstag');
		console.log(statusgiur);
		sources.statusgiur.sync();
	};// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		$$('ModuloCancella').closeDialog();
	};// @lock

	ConfermaDati.click = function ConfermaDati_click (event)// @startlock
	{// @endlock
		Prel_DatiInseriti(lun_arr,lun_datearr);
				
		//porta stringhe date da dd/mm/yy a yy/mm/dd
		P_DTNASC=Conv_DataPerDb(P_DTNASC,"/");
		P_DTDIMI=Conv_DataPerDb(P_DTDIMI,"/");
		P_DTASSU=Conv_DataPerDb(P_DTASSU,"/");
	
		console.log("dati inviati alle stored"+P_CDAZIE,P_CDMATR,P_COGNOME,P_NOME,P_SESSO,P_DTNASC,P_CODFIS,P_CITTARES,P_INDIRRES,P_CAPRES,P_PROVRES,P_FRAZIONERES,P_PRESSORES,P_EMAIL,P_DTASSU,P_DTDIMI,P_CDDISL,P_CDMANS,P_CDSTAG,P_CDRAPL);
		
		var connectionParams = Rpc2.connetti();
		if (toggle_avvisocancel==0){			
			console.log("update");
			
			Rpc2.updateAsync({
	                'onSuccess': function (result) {
	                   console.log("ok");
	                },  
	                'onError': function (error) {
	                   alert('operazione non riusciuta ')
	                    console.log("errore");
	                },  
	                'params': [connectionParams,tabella,P_CDAZIE,P_CDMATR,P_COGNOME,P_NOME,P_SESSO,P_DTNASC,P_CODFIS,P_CITTARES,P_INDIRRES,P_CAPRES,P_PROVRES,P_FRAZIONERES,P_PRESSORES,P_EMAIL,P_DTASSU,P_DTDIMI,P_CDDISL,P_CDMANS,P_CDSTAG,P_CDRAPL]
	             });
		
		 }else{	
		
			console.log("insert");
			Rpc2.insertAsync({
	                'onSuccess': function (result) {
	                   console.log("ok");
	                },  
	                'onError': function (error) {
	                   alert('operazione non riusciuta ')
	                    console.log("errore");
	                },  
	                'params': [connectionParams,tabella,P_CDAZIE,P_CDMATR,P_COGNOME,P_NOME,P_SESSO,P_DTNASC,P_CODFIS,P_CITTARES,P_INDIRRES,P_CAPRES,P_PROVRES,P_FRAZIONERES,P_PRESSORES,P_EMAIL,P_DTASSU,P_DTDIMI,P_CDDISL,P_CDMANS,P_CDSTAG,P_CDRAPL]
	             });
		 }
		   
		   
		ResetCampi();
	  	$$('ModuloDati').closeDialog();		
		Ricerca("anagrafica");
		StrToDate();
		sources.anagrafe.sync();
		
	   	//source.anagrafe.orderBy("CDAZIE asc");
	    
	};// @lock

	ok_delete.click = function ok_delete_click (event)// @startlock
	{// @endlock
		var id=sources.anagrafe.getCurrentElement().CDAZIE;
		var id2=sources.anagrafe.getCurrentElement().CDMATR;
		console.log(id);
		console.log(id2);
		
		var connectionParams= Rpc2.connetti();
		
		anagrafe= Rpc2.delAsync({
                'onSuccess': function (result) {
                   console.log("ok");
                },  
                'onError': function (error) {
                   alert('errore')
                    console.log("errore");
                },  
                'params': [connectionParams,id,id2]
             }); 
	            
	    $$('ModuloCancella').closeDialog();		
		anagrafe = Rpc2.LetturaDb(connectionParams,tabella);
		StrToDate();
		
		sources.anagrafe.sync();
			
	};// @lock

	back_del.click = function back_del_click (event)// @startlock
	{// @endlock
		$$('ModuloCancella').closeDialog(); //cancel button
		 
	};// @lock

	Back.click = function Back_click (event)// @startlock
	{// @endlock
		
		//torna HOME PAGE
	};// @lock

	conferma.click = function conferma_click (event)// @startlock
	{// @endlock
		
	   
	    	
	};// @lock

	Apri_Insert.click = function Apri_Insert_click (event)// @startlock
	{// @endlock
		$$('cdazie').show();
		$$('cdmatr').show();
		toggle_avvisocancel=1;
	    $$('ModuloDati').displayDialog();
	    
		$$('dtnasc').setValue($$('search_dtnasc').getValue());
		$$('nome').setValue($$('search_nome').getValue());
		$$('cognome').setValue($$('search_cognome').getValue());
		$$('cittares').setValue($$('search_cittares').getValue());
		$$('email').setValue($$('search_email').getValue());
		$$('codfis').setValue($$('search_codfis').getValue());	
	};// @lock

	pop_del.click = function pop_del_click (event)// @startlock
	{// @endlock
		$$('ModuloCancella').displayDialog( );
	};// @lock

	Search_Anag.click = function Search_Anag_click (event)// @startlock
	{// @endlock
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
			if ($$('search_cognome').getValue()!='' || $$('search_nome').getValue()!='' || $$('search_email').getValue()!='' || $$('search_cittares').getValue()!='' || $$('search_codfis').getValue()!=''||$$('search_dtnasc').getValue()!=''){
				var connectionParams= Rpc2.connetti();
				
				if ($$('search_dtnasc').getValue()!=''){
					
					var str_conv=$$('search_dtnasc').getValue();
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
				
				anagrafe = Rpc2.search(connectionParams,tabella,'COGNOME','NOME','EMAIL','CITTARES','CODFIS','DTNASC',$$('search_cognome').getValue(),$$('search_nome').getValue(),$$('search_email').getValue(),$$('search_cittares').getValue(),$$('search_codfis').getValue(),DTconv);
				StrToDate();
				sources.anagrafe.sync();
				}
		
			}
		if (tipo=="codice"){
		}	
	}
	
	
	function ResetCampi(){

		Set_Dati(campi,'clear',"");
		Set_Dati(campi_date,'clear',"");
		//combobox non ha .clear() come operazione
		Set_Dati(campi_mansioni,'setValue',"");
		Set_Dati(campi_statusgiur,'setValue',"");
		Set_Dati(campi_rapplavoro,'setValue',"");
		Set_Dati(campi_dislocazione,'setValue',"");	
	}
	
	function StrToDate(){
    
    	var lun_ana=anagrafe.length;
	
		for (i=0;i<lun_ana;i++){
			anagrafe[i].DTNASC=new Date(anagrafe[i].DTNASC);
			anagrafe[i].DTASSU=new Date(anagrafe[i].DTASSU);
			anagrafe[i].DTDIMI=new Date(anagrafe[i].DTDIMI);
		}
  	 }
  	 
  	 function DateToStr(Data,Divisore,Modo){
  	 	
  	 	var dtconv;
  	 	var anno=Data.getFullYear();
		var mese=Data.getMonth()+ 1;
		var giorno=Data.getDate();
  	 	
  	 	if (Modo=='yymmdd'){
	  	 	  dtconv=anno+Divisore+mese+Divisore+giorno;
	  	}
	  	if (Modo=='ddmmyy'){
	  	 	 dtconv=giorno+Divisore+mese+Divisore+anno;
	  	}
  	 	return dtconv;
  	 }
  	 
  	 function Set_Dati(campi,oper,string){
  		//campi=array di widget,oper=operazione da svolgere(setValue,getValue,clear,ecc) string = valore da impostare
  	
		var target = oper;
		var lun_arr=campi.length;
		
		for (i=0;i<lun_arr;i++){
			$$(campi[i])[target](string);
		}
	  }	 
		
     function Prel_Griglia(sel_elem,lung_arr){
		//fa il corrispettivo di questo: $$('cdazie').setValue(sel_elem.CDAZIE);
		var target = 'setValue';

		for (i=0;i<lung_arr;i++){
			
			var nome_camparr=campi[i].toUpperCase();
			$$(campi[i])[target](sel_elem[nome_camparr]);	
		}
		
		for (i=0;i<lun_datearr;i++){
			
			var nome_camparr=campi_date[i].toUpperCase();
			$$(campi_date[i])[target](DateToStr(sel_elem[nome_camparr],'/','ddmmyy'));
		}		
		$$('demans').setValue(mansioni[sel_elem.CDMANS].DEMANS);
		$$('derapl').setValue(rapplavoro[sel_elem.CDRAPL].DERAPL);
		$$('destag').setValue(statusgiur[sel_elem.CDSTAG].DESTAG);
		$$('dedisl').setValue(dislocazione[sel_elem.CDDISL].DEDISL);
	  	 
  	 }
  	
	 function Prel_DatiInseriti(lung_arr,datelun_arr){
	    //preleva i dati inseriti nei campi input della maschera dettagli P_CDAZIE=$$('cdazie').getValue();
	 	var oper = 'getValue';
	
	 	for (i=0;i<lung_arr;i++){
			window['P_'+campi[i].toUpperCase()]=$$(campi[i])[oper]();			
		}
	 
		for (i=0;i<datelun_arr;i++){
			window['P_'+campi_date[i].toUpperCase()]=$$(campi_date[i])[oper]();			
		}
		
		
		//PrelDati_Dropbox(mansioni);
		
		
		for (i=0;i<mansioni.length;i++){
			if ($$('demans').getValue() == mansioni[i].DEMANS){ 
				console.log("trovato"+mansioni[i].CDMANS);
				P_CDMANS=mansioni[i].CDMANS;
			}
		}
		
		console.log("dato P_CDMANS"+P_CDMANS);
		
		for (i=0;i<dislocazione.length;i++){
			if ($$('dedisl').getValue() == dislocazione[i].DEDISL){ 
				console.log("trovato"+dislocazione[i].CDDISL);
				P_CDDISL=dislocazione[i].CDDISL;
			}
		}
		console.log("dato P_CDDISL"+P_CDDISL);
	 
	
		for (i=0;i<rapplavoro.length;i++){
			if ($$('derapl').getValue() == rapplavoro[i].DERAPL){ 
				console.log("trovato"+rapplavoro[i].CDRAPL);
				P_CDRAPL=rapplavoro[i].CDRAPL;
			}
		}
		console.log("dato P_CDRAPL"+P_CDRAPL);
		
		for (i=0;i<statusgiur.length;i++){
			if ($$('destag').getValue() == statusgiur[i].DESTAG){ 
				console.log("trovato"+statusgiur[i].CDSTAG);
				P_CDSTAG=statusgiur[i].CDSTAG;
			}
		}
		console.log("dato P_STAG"+P_CDSTAG);
	}
	
	function PrelDati_Dropbox(array){
		for (i=0;i<mansioni.length;i++){
			if ($$('demans').getValue() == mansioni[i].DEMANS){ 
				console.log("trovato"+mansioni[i].CDMANS);
				P_CDMANS=mansioni[i].CDMANS;
			}
		}
		
	}
	/*function Check_Campi(){
		
	}*/
	 
/*function isDateField(dateField)
{

  if (dateField.value.length>=5 && isPositiveInteger(dateField.value,true))
  {
  var comodo=dateField.value.substr(0,2)+"/"+dateField.value.substr(2,2)+"/"+dateField.value.substr(4);
  dateField.value=comodo;
  }
  // Anno di pivoting
  var pivotYear=new String((new Date().getFullYear())+10).substr(2,2);
  
  //Anno corrente
  var curYear=new Date().getYear();
  
  //Mese corrente
  var curMonth=(new Date().getMonth())+1;

  // Verifica e completa il formato della stringa
  if (dateField.value.search(/^\d{1,2}$/)!=-1 || dateField.value.search(/^\d{1,2}[\/\-\.]$/)!=-1)	//specificato solo il giorno, si aggiungono mese ed anno corrente
dateField.value=dateField.value+"/"+curMonth+"/"+curYear;
  else if (dateField.value.search(/^\d{1,2}[\/\-\.]\d{1,2}$/)!=-1 || dateField.value.search(/^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]$/)!=-1)	//specificati giorno e mese, si aggiunge l'anno corrente
dateField.value=dateField.value+"/"+curYear;
  else if (dateField.value.search(/^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{1,4}$/)==-1)
     return false;
     
  // Normalizza la data
  var fields=dateField.value.split(/[\/\-\.]/);

  // Normalizza giorno
  if (fields[0].length==1)
     fields[0]="0"+fields[0];

  // Normalizza mese
  if (fields[1].length==1)
     fields[1]="0"+fields[1];

  fields[2]=new String(Number(fields[2]));
  
  // Normalizza anno
  switch (fields[2].length)
  {
     case 1:
     	fields[2]=new String(2000+Number(fields[2]));
     	break;
     case 2:
if (fields[2]<=pivotYear)
   	 fields[2]=new String(new Date().getFullYear()).substr(0,2)+fields[2];
else
   	 fields[2]=new String(new Date().getFullYear()-100).substr(0,2)+fields[2];
break;
     case 3:
fields[2]=new String(new Date().getFullYear()-1000).substr(0,1)+fields[2];
  }

  // Visualizza data normalizzata
  dateField.value=fields.join("/");

  // Controlla la data
  if (! isDate(fields[0],fields[1],fields[2]))
     return false;

  return true;
}*/
   
// @region eventManager// @startlock
	WAF.addListener("cdazie", "blur", cdazie.blur, "WAF");
	WAF.addListener("sesso", "blur", sesso.blur, "WAF");
	WAF.addListener("dtdimi", "blur", dtdimi.blur, "WAF");
	WAF.addListener("search_dtnasc", "keydown", search_dtnasc.keydown, "WAF");
	WAF.addListener("button8", "click", button8.click, "WAF");
	WAF.addListener("Drop_Dati", "click", Drop_Dati.click, "WAF");
	WAF.addListener("dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	WAF.addListener("dataGrid2", "onRowClick", dataGrid2.onRowClick, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("ConfermaDati", "click", ConfermaDati.click, "WAF");
	WAF.addListener("ok_delete", "click", ok_delete.click, "WAF");
	WAF.addListener("back_del", "click", back_del.click, "WAF");
	WAF.addListener("Back", "click", Back.click, "WAF");
	WAF.addListener("conferma", "click", conferma.click, "WAF");
	WAF.addListener("Apri_Insert", "click", Apri_Insert.click, "WAF");
	WAF.addListener("pop_del", "click", pop_del.click, "WAF");
	WAF.addListener("Search_Anag", "click", Search_Anag.click, "WAF");
// @endregion
};// @endlock



