
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Ricerca_Funzioni.';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	
	console.log(data.userData);
	console.log(data.userData.modalita);
	
	modalita=data.userData.modalita;
	console.log(modalita);
	CheckDB();	
	
	
	// @region namespaceDeclaration// @startlock
	var search_d1codfunz = {};	// @textField
	var search_d1desfubr = {};	// @textField
	var dataGrid1 = {};	// @dataGrid
	var conferma = {};	// @buttonImage
	var Back = {};	// @buttonImage
	var Del_Mans = {};	// @buttonImage
	var Search_Anag = {};	// @buttonImage
	var Ins_upMans = {};	// @buttonImage
	// @endregion// @endlock

	// eventHandlers// @lock

	search_d1codfunz.keydown = function search_d1codfunz_keydown (event)// @startlock
	{// @endlock
		if (event.keyCode==13){
			if(modalita!="lettura"){
				$$(getHtmlId('Ins_upMans')).show();
			}
			Ricerca_Mans("anagrafica");
		}
	};// @lock
	
	$("#component3_search_d1codfunz").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return false;
	  }else{
	  	   return true;
	  }
     });
     

	search_d1codfunz.blur = function search_d1codfunz_blur (event)// @startlock
	{// @endlock
		chkCapBlur(this);
		
	};// @lock
	

	search_d1desfubr.keydown = function search_d1desfubr_keydown (event)// @startlock
	{// @endlock
		if (event.keyCode==13){
			if(modalita!="lettura"){
				$$(getHtmlId('Ins_upMans')).show();
			}
		
			Ricerca_Mans("anagrafica");
		}
	};// @lock
	/*$("#component3_search_d1desfubr").keypress(function (e)
     {
     //if the letter is not char then display error and don't type anything
     if( e.which>=32 && (e.which<48 || e.which>57))
     {
	     return true;
	  }else{
	  	   return false;
	  }
     });*/

	search_d1desfubr.focus = function search_d1desfubr_focus (event)// @startlock
	{// @endlock
		chkIndDescBlur(this);
	};// @lock

	search_d1desfubr.blur = function search_d1desfubr_blur (event)// @startlock
	{// @endlock
		chkIndDescBlur(this);
	};// @lock
	

	dataGrid1.onRowClick = function dataGrid1_onRowClick (event)// @startlock
	{// @endlock
		if(modalita!="lettura"){
		 	$$(getHtmlId('Del_Mans')).show();
		}
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		if(modalita!="lettura"){
			data.userData=sources.mansioni3.getCurrentElement();
			
			$$("tabView3").selectTab(2);
			$$('component1').loadComponent({path: '/Webcomponent/Dettaglio_Funzione.waComponent', userData:  { 'dati':data.userData,'modalita': 'update','cur':sources.mansioni3.getCurrentElement() }});
			
		}
	};// @lock

	conferma.click = function conferma_click (event)// @startlock
	{// @endlock
		console.log(modalita);
		if(modalita=="lettura"){
			
			var connectionParams= Rpc2.connetti();
			mansioni = Rpc2.LetturaDb(connectionParams,'d1anagfunz');
			source.mansioni.sync();
			$$("tabView3").selectTab(2);
			var sel_elem=sources.mansioni3.getCurrentElement();		
			$$('d1desfubr').setValue(sel_elem.d1desfubr); 
			$$('component3').removeComponent();
			
		}else{
			document.location.href = "/Default.waPage/index.html";
			/*alert("la finestra sarà chiusa");
			window.close();*/
		}
		
						  	
	};// @lock

	Back.click = function Back_click (event)// @startlock
	{// @endlock
		if(modalita=="lettura"){
			var connectionParams= Rpc2.connetti();
			mansioni = Rpc2.LetturaDb(connectionParams,'d1anagfunz');
			source.mansioni.sync();
			
			$$("tabView3").selectTab(2);
			$$('component3').removeComponent();
		}else{
			
				document.location.href = "/Default.waPage/index.html";
		}
		
		
	};// @lock

	Del_Mans.click = function Del_Mans_click (event)// @startlock
	{// @endlock
		var scelta=window.confirm("Eliminare l'elemento corrente?");
		
		if (scelta){
			var id=sources.mansioni3.getCurrentElement().d1codfunz;
			
			var connectionParams= Rpc2.connetti();
			
			mansioni3= Rpc2.delAsync({
	                'onSuccess': function (result) {
	                   console.log("ok");
	                },  
	                'onError': function (error) {
	                	CheckDB();
	                   alert('errore');
	                    console.log("errore");
	                },  
	                'params': [connectionParams,'d1anagfunz',id,0]
	             }); 
		            		
			Ricerca_Mans("anagrafica"); 
		} 
		/*var connectionParams= Rpc2.connetti();
			mansioni3 = Rpc2.LetturaDb(connectionParams,'d1anagfunz');
			sources.mansioni3.sync();*/
	};// @lock

	Search_Anag.click = function Search_Anag_click (event)// @startlock
	{// @endlock
		CheckDB();
		
		if(modalita!="lettura"){
			$$(getHtmlId('Ins_upMans')).show();
		}		
		//if(lettura){
			/*var connectionParams= Rpc2.connetti();
			mansioni3 = Rpc2.LetturaDb(connectionParams,'d1anagfunz');
			sources.mansioni3.sync();*/
		//}
		
		Ricerca_Mans("anagrafica");    
	};// @lock

	Ins_upMans.click = function Ins_upMans_click (event)// @startlock
	{// @endlock
		
		data.userData='prova';
		//if(modalita!="lettura"){
			$$("tabView3").selectTab(2);
		//}
		$$('component1').loadComponent({path: '/Webcomponent/Dettaglio_Funzione.waComponent', userData:  { 'dati':data.userData,'modalita': 'insert','search_id':$$(getHtmlId('search_d1codfunz')).getValue(),'search_desc':$$(getHtmlId('search_d1desfubr')).getValue() }});
		
	};// @lock
	/*arr2 = [ {"name": "Smith", "age": 45, "job" : "Administrator","myid" : "P01"  }, {"name": "Wesson", "age": 24, "job" : "Accountant","myid" : "P02"}]; 
	
	WAF.dataSource.create({
            'id' : 'arr2', // datasource name
            'binding' : 'arr2', //target JavaScript variable name (same name is recommended)
            'data-source-type': 'array', //type for array datasources
            //'data-attributes': window[nom_tip[0]]
            	
            'data-attributes': 'name:string,age:number,job:string' //declare attributes
        }).sync();
        console.log(sources.arr2.getAttributeNames());

    

	var buttonElement = document.createElement('div'); //HTML tag
        buttonElement.setAttribute('id','dataGrid222'); // ID that links to the widget constructor ID
        buttonElement.setAttribute('style','width:700px;height:600px;left:128px;top:511px;position:absolute');
        buttonElement.setAttribute('class','waf-widget waf-dataGrid default inherited');
        document.body.appendChild(buttonElement);
        
	var dataGrid222 = new WAF.widget.Grid({
            'id': 'dataGrid222', // ID        
            'data-text': 'grid4', // title for the button                         
            'data-binding': 'arr2', // datasource ID
            //'data-column':[{'sourceAttID':'name','colID':'name','width':'150','title':'name'},{'sourceAttID':'age','colID':'age','width':'150','title':'age'},{'sourceAttID':'job','colID':'job','width':'150','title':'job'}],    
			'data-selection-mode':'single',
			'data-constraint-left':'true',
			'data-constraint-top':'true'	
            });
            
            //[{'sourceAttID':'name','colID':'name','width':'150','title':'name'},{'sourceAttID':'age','colID':'age','width':'150','title':'age'},{'sourceAttID':'job','colID':'job','width':'150','title':'job'}]
       
 	//console.log(dataGrid222[0].name);*/
 	//var tabella='d1anagfunz';
	/*var connectionParams= Rpc2.connetti();
 	mansioni3= Rpc2.LetturaDb(connectionParams,'d1anagfunz');
	sources.mansioni3.sync();*/
	//console.log(mansioni3);
		
	// @region eventManager// @startlock
	WAF.addListener(this.id + "_search_d1codfunz", "keydown", search_d1codfunz.keydown, "WAF");
	WAF.addListener(this.id + "_search_d1desfubr", "keydown", search_d1desfubr.keydown, "WAF");
	WAF.addListener(this.id + "_search_d1codfunz", "blur", search_d1codfunz.blur, "WAF");
	WAF.addListener(this.id + "_search_d1desfubr", "focus", search_d1desfubr.focus, "WAF");
	WAF.addListener(this.id + "_search_d1desfubr", "blur", search_d1desfubr.blur, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowClick", dataGrid1.onRowClick, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_conferma", "click", conferma.click, "WAF");
	WAF.addListener(this.id + "_Back", "click", Back.click, "WAF");
	WAF.addListener(this.id + "_Del_Mans", "click", Del_Mans.click, "WAF");
	WAF.addListener(this.id + "_Search_Anag", "click", Search_Anag.click, "WAF");
	WAF.addListener(this.id + "_Ins_upMans", "click", Ins_upMans.click, "WAF");
	// @endregion// @endlock

	};// @lock
	function Ricerca_Mans(tipo){
		//console.log($$(getHtmlId('search_d1codfunz')).id);
		if (tipo=="anagrafica"){
			
			//if(modalita=="lettura"){
				if ($$(getHtmlId('search_d1codfunz')).getValue()=='' || $$(getHtmlId('search_d1desfubr')).getValue()==''){
						var connectionParams= Rpc2.connetti();
						mansioni3 = Rpc2.LetturaDb(connectionParams,'d1anagfunz');
						sources.mansioni3.sync();
						
				}
				
			//}		
			if ($$(getHtmlId('search_d1codfunz')).getValue()!='' || $$(getHtmlId('search_d1desfubr')).getValue()!='' && isNaN($$(getHtmlId('search_d1desfubr')).getValue()[0]) /*|| $$('search_d1genmail').getValue()!='' || $$('search_d1genctre').getValue()!='' || $$('search_d1codfis').getValue()!=''||$$('search_d1datnasc').getValue()!=''*/){
				var connectionParams= Rpc2.connetti();
				console.log($$(getHtmlId('search_d1codfunz')).getValue());
				console.log($$(getHtmlId('search_d1desfubr')).getValue());
				mansioni3 = Rpc2.search(connectionParams,'d1anagfunz','d1codfunz','d1desfubr',$$(getHtmlId('search_d1codfunz')).getValue(),$$(getHtmlId('search_d1desfubr')).getValue(),0,0,0,0,0,0,0,0);
				sources.mansioni3.sync();
				}/*else{
					
					if(modalita!="lettura"){
						alert("inserisci i dati obbligatori");
					}
				}*/
			}
			sources.mansioni3.select(-1);	
	}
	
	function CheckDB(){
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
 	}
	
	

//$$('yourComponentID').loadComponent({path: '/folder/myComponent.waComponent', userData: {myData: 'Some value'}});
// data.userData 
}// @startlock
return constructor;
})();// @endlock
