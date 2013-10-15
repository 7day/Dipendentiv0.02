  
exports.insert = function(connectionParams,tabella,d1codazie,d1codmatr,d1gencogn,d1gennome,d1gensess,d1datnasc,d1codfis,d1genctre,d1geninre,d1gencpre,d1genprre,d1genfrre,d1genpres,d1genmail,d1datassu,d1datcess,d1codrepa,d1codrege,d1codfunz,d1codstgi,d1codrala,d1codcoec,d1codinec,d1codvar1,d1codvar2,d1codvar3)
{
		var dbconn = require('waf-mysql');
		var res,result;
   		var connection= dbconn.connect(connectionParams);
				
		console.log("dati inviati al modulo rpc"+d1codazie,d1codmatr,d1gencogn,d1gennome,d1gensess,d1datnasc,d1codfis,d1genctre,d1geninre,d1gencpre,d1genprre,d1genfrre,d1genpres,d1genmail,d1datassu,d1datcess,d1codrepa,d1codrege,d1codfunz,d1codstgi,d1codrala,d1codcoec,d1codinec,d1codvar1,d1codvar2,d1codvar3);
		/*if (tabella=='d1anagdipe'){
			dbquery = 'CALL prg_InsertAnagDipe(' + '"' +CDAZIE  + '"' +','  + '"' + CDMATR + '"' +',' + '"' +COGNOME+'"' +',' + '"' +NOME+'"' +',' + '"' +SESSO+'"' +',' + '"' +DTNASC+'"' +',' + '"' +CODFIS+'"' +',' + '"' +CITTARES+'"' +',' + '"' +INDIRRES+'"' +',' + '"' +CAPRES + '"' +',' + '"' +PROVRES+'"' +',' + '"' +FRAZIONERES+'"' +',' + '"' +PRESSORES+'"' +',' + '"' +EMAIL+'"' +',' + '"' +DTASSU+'"' +',' + '"' +DTDIMI+'"' +',' + '"' +CDDISL+'"' +',' + '"' +CDMANS+'"' +',' + '"' +CDSTAG+'"' +',' + '"' +CDRAPL+'"' +')';
		}*/
		
		if (tabella=='d1anagmatr'){
			
			if (d1gencogn==""){
				campi=null;
			}else{
				campi='"' +d1gencogn+'"';
			}
			if (d1gennome==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1gennome+'"';
			}
			if (d1gensess==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1gensess+'"';
			}
			if (d1datnasc==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1datnasc+'"';
			}
			if (d1codfis==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1codfis+'"';
			}
			if (d1genctre==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1genctre+'"';
			}
			if (d1geninre==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1geninre+'"';
			}
			if (d1gencpre==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1gencpre+'"';
			}
			if (d1genprre==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1genprre+'"';
			}
			if (d1genfrre==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1genfrre+'"';
			}
			if (d1genpres==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1genpres+'"';
			}
			if (d1genmail==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1genmail+'"';
			}
			if (d1datassu==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1datassu+'"';
			}
			if (d1datcess==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1datcess+'"';
			}
			/*if (d1codrepa==""){
				campi+=',' + null;
			}else{*/
				campi+=',' +'"' +d1codrepa+'"';
			//}
			if (d1codrege==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1codrege+'"';
			}
			/*if (d1codfunz==""){
				campi+=',' + null;
			}else{*/
				campi+=',' +'"' +d1codfunz+'"';
			//}
			/*if (d1codstgi==""){
				campi+=',' + null;
			}else{*/
				campi+=',' +'"' +d1codstgi+'"';
			//}
			/*if (d1codrala==""){
				campi+=',' + null;
			}else{*/
				campi+=',' +'"' +d1codrala+'"';
			//}
			if (d1codcoec==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1codcoec+'"';
			}
			if (d1codinec==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1codinec+'"';
			}
			if (d1codvar1==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1codvar1+'"';
			}
			if (d1codvar2==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1codvar2+'"';
			}
			if (d1codvar3==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1codvar3+'"';
			}
			dbquery='INSERT INTO d1anagmatr (d1codazie,d1codmatr,d1gencogn,d1gennome,d1gensess,d1datnasc,d1codfis,d1genctre,d1geninre,d1gencpre,d1genprre,d1genfrre,d1genpres,d1genmail,d1datassu,d1datcess,d1codrepa,d1codrege,d1codfunz,d1codstgi,d1codrala,d1codcoec,d1codinec,d1codvar1,d1codvar2,d1codvar3)';		
			dbquery+='VALUES ('+d1codazie+','+d1codmatr +',' +campi+')';
			//dbquery = 'CALL prg_InsertAnagMatr(' +d1codazie+','+d1codmatr +',' +campi+')';
			//dbquery = 'CALL prg_InsertAnagMatr(' + '"' +d1codazie + '"' +',' + '"' + d1codmatr + '"' +',' + '"' +d1gencogn+'"' +',' + '"' +d1gennome+'"' +',' + '"' +d1gensess+'"' +',' + '"' +d1datnasc+'"' +',' + '"' +d1codfis+'"' +',' + '"' +d1genctre+'"' +',' + '"' +d1geninre+'"' +',' + '"' +d1gencpre + '"' +',' + '"' +d1genprre+'"' +',' + '"' +d1genfrre+'"' +',' + '"' +d1genpres+'"' +',' + '"' +d1genmail+'"' +',' + '"' +d1datassu+'"' +',' + '"' +d1datcess+'"' +',' + '"' +d1codrepa+'"' +',' + '"' +d1codrege+'"' +',' +'"' +d1codfunz+'"' +',' + '"' +d1codstgi+'"' +',' + '"' +d1codrala+'"'+',' + '"' +d1codcoec+'"'+',' + '"' +d1codinec+'"'+',' + '"' +d1codvar1+'"'+',' + '"' +d1codvar2+'"'+',' + '"' +d1codvar3+'"' +')';
			console.log(dbquery);
			console.log(campi);
		}
		
		if (tabella=='d1anagfunz'){
			
			if (d1codmatr==""){
				campi=null;
			}else{
				campi='"' + d1codmatr +'"' 
			}	
			if (d1gencogn==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1gencogn+'"';
			}
			if (d1gennome==""){
				campi+=',' + null;
			}else{
				campi+=',' +'"' +d1gennome+'"';
			}
	
			dbquery = 'INSERT INTO d1anagfunz(d1codfunz,d1desfubr,d1desfudl,d1gennote) VALUES ('+d1codazie+','+campi+')';
			//dbquery = 'INSERT INTO d1anagfunz(d1codfunz,d1desfubr,d1desfudl,d1gennote) VALUES ('+d1codazie +','+'"' + d1codmatr +'"' +',' + '"' +d1gencogn+'"' +',' + '"' +d1gennome+'"'+')';
			
		}
		 
		console.log(dbquery);
		res = connection.execute(dbquery);
		connection.close();
		return true;
 }
 
  exports.update = function(connectionParams,tabella,d1codazie,d1codmatr,d1gencogn,d1gennome,d1gensess,d1datnasc,d1codfis,d1genctre,d1geninre,d1gencpre,d1genprre,d1genfrre,d1genpres,d1genmail,d1datassu,d1datcess,d1codrepa,d1codrege,d1codfunz,d1codstgi,d1codrala,d1codcoec,d1codinec,d1codvar1,d1codvar2,d1codvar3)
{
		var dbconn = require('waf-mysql');
		var res,result;
   		var connection= dbconn.connect(connectionParams);
		
		if (tabella=='d1anagdipe'){
		 dbquery = 'CALL prg_UpdateAnagDipe(' +CDAZIE +',' + CDMATR +',' + '"' +COGNOME+'"' +',' + '"' +NOME+'"' +',' + '"' +SESSO+'"' +',' + '"' +DTNASC+'"' +',' + '"' +CODFIS+'"' +',' + '"' +CITTARES+'"' +',' + '"' +INDIRRES+'"' +',' + CAPRES +',' + '"' +PROVRES+'"' +',' + '"' +FRAZIONERES+'"' +',' + '"' +PRESSORES+'"' +',' + '"' +EMAIL+'"' +',' + '"' +DTASSU+'"' +',' + '"' +DTDIMI+'"' +',' + '"' +CDDISL+'"' +',' + '"' +CDMANS+'"' +',' + '"' +CDSTAG+'"' +',' + '"' +CDRAPL+'"' +')';
		}
		
		if (tabella=='d1anagmatr'){
		
			if (d1gencogn==""){
				P_d1gencogn=null;
			}else{
				P_d1gencogn='"' +d1gencogn+'"';
			}
			if (d1gennome==""){                         
				P_d1gennome= null;             
			}else{                                
				P_d1gennome='"' +d1gennome+'"';
			}                                     
			if (d1gensess==""){                   
				P_d1gensess= null;             		            
			}else{                                
				P_d1gensess='"' +d1gensess+'"';
			}                                     
			if (d1datnasc==""){                   
				P_d1datnasc= null;             					
			}else{                                		
				P_d1datnasc='"' +d1datnasc+'"';	
			}                                     
			if (d1codfis==""){                    				
				P_d1codfis= null;              				
			}else{                                
				P_d1codfis='"' +d1codfis+'"';  
			}                                     
			if (d1genctre==""){                   
				P_d1genctre= null;             
			}else{                                
				P_d1genctre='"' +d1genctre+'"';
			}                                     
			if (d1geninre==""){                   
				P_d1geninre= null;             
			}else{                                
				P_d1geninre='"' +d1geninre+'"';
			}                                     
			if (d1gencpre==""){                   
				P_d1gencpre= null;             
			}else{                                
				P_d1gencpre='"' +d1gencpre+'"';
			}                                     
			if (d1genprre==""){                   
				P_d1genprre= null;             
			}else{                                
				P_d1genprre='"' +d1genprre+'"';
			}                                     
			if (d1genfrre==""){                   
				P_d1genfrre= null;             
			}else{                                
				P_d1genfrre='"' +d1genfrre+'"';
			}                                     
			if (d1genpres==""){                   
				P_d1genpres= null;             
			}else{                                
				P_d1genpres='"' +d1genpres+'"';
			}                                     
			if (d1genmail==""){                   
				P_d1genmail= null;             
			}else{                                
				P_d1genmail='"' +d1genmail+'"';
			}                                     
			if (d1datassu==""){                   
				P_d1datassu= null;             
			}else{                                
				P_d1datassu='"' +d1datassu+'"';
			}                                     
			if (d1datcess==""){                   
				P_d1datcess= null;             
			}else{                                
				P_d1datcess='"' +d1datcess+'"';
			}                                     
			/*if (d1codrepa==""){                 
				campi+= null;                  
			}else{*/                              
				P_d1codrepa='"' +d1codrepa+'"';
			//}                                   
			if (d1codrege==""){                   
				P_d1codrege= null;             
			}else{                                
				P_d1codrege='"' +d1codrege+'"';
			}                                     
			/*if (d1codfunz==""){                 
				campi+= null;                  
			}else{*/                              
				P_d1codfunz='"' +d1codfunz+'"';
			//}                                   
			/*if (d1codstgi==""){                 
				campi+= null;                  
			}else{*/                              
				P_d1codstgi='"' +d1codstgi+'"';
			//}                                   
			/*if (d1codrala==""){                 
				campi+= null;                  
			}else{*/                              
				P_d1codrala='"' +d1codrala+'"';
			//}                                   
			if (d1codcoec==""){                   
				P_d1codcoec= null;             
			}else{                                
				P_d1codcoec='"' +d1codcoec+'"';
			}                                     
			if (d1codinec==""){                   
				P_d1codinec= null;             
			}else{                                
				P_d1codinec='"' +d1codinec+'"';
			}                                     
			if (d1codvar1==""){                   
				P_d1codvar1= null;             
			}else{                                
				P_d1codvar1='"' +d1codvar1+'"';
			}                                     
			if (d1codvar2==""){                   
				P_d1codvar2= null;             
			}else{                                
				P_d1codvar2='"' +d1codvar2+'"';
			}                                     
			if (d1codvar3==""){                   
				P_d1codvar3= null;             
			}else{                                
				P_d1codvar3='"' +d1codvar3+'"';
			}                                     
		// dbquery = 'CALL prg_UpdateAnagMatr(' +d1codazie+','+d1codmatr +',' +campi+')';
		dbquery='UPDATE d1anagmatr SET d1gennome='+P_d1gennome;
		dbquery+=',d1gencogn='+P_d1gencogn;
		dbquery+=',d1gensess='+P_d1gensess;
		dbquery+=',d1datnasc='+P_d1datnasc;
		dbquery+=',d1codfis='+P_d1codfis;  
		dbquery+=',d1genctre='+P_d1genctre;
		dbquery+=',d1geninre='+P_d1geninre;
		dbquery+=',d1gencpre='+P_d1gencpre;
		dbquery+=',d1genprre='+P_d1genprre;
		dbquery+=',d1genfrre='+P_d1genfrre;
		dbquery+=',d1genpres='+P_d1genpres;
		dbquery+=',d1genmail='+P_d1genmail;
		dbquery+=',d1datassu='+P_d1datassu;
		dbquery+=',d1datcess='+P_d1datcess;
		dbquery+=',d1codrepa='+P_d1codrepa;
		dbquery+=',d1codrege='+P_d1codrege;
		dbquery+=',d1codfunz='+P_d1codfunz;
		dbquery+=',d1codstgi='+P_d1codstgi;
		dbquery+=',d1codrala='+P_d1codrala;
		dbquery+=',d1codcoec='+P_d1codcoec;
		dbquery+=',d1codinec='+P_d1codinec;
		dbquery+=',d1codvar1='+P_d1codvar1;
		dbquery+=',d1codvar2='+P_d1codvar2;
		dbquery+=',d1codvar3='+P_d1codvar3;
		dbquery+=' WHERE d1codmatr='+d1codmatr+' AND d1codazie='+d1codazie;
		
		console.log(dbquery);
		
		}
		if (tabella=='d1anagfunz'){
			if (d1codmatr==""){
				d1codmatr=null;
			}else{
				d1codmatr='"' + d1codmatr +'"' 
			}	
			if (d1gencogn==""){
				d1gencogn=null;
			}else{
				d1gencogn='"' +d1gencogn+'"';
			}
			if (d1gennome==""){
				d1gennome=null;
			}else{
				d1gennome='"' +d1gennome+'"';
			}
			dbquery = 'UPDATE d1anagfunz SET d1desfubr='+d1codmatr+','+'d1desfudl='+d1gencogn+','+'d1gennote='+d1gennome+' WHERE d1codfunz='+'"'+d1codazie+'"';
			console.log(dbquery);
		}
		console.log(dbquery);
		res = connection.execute(dbquery);
		connection.close();
		return true;
		
 }
 
exports.del = function(connectionParams,tabella,id,id2)
{
		var dbconn = require('waf-mysql');
		var res,result;
   		var connection= dbconn.connect(connectionParams);
		
		if (tabella=='d1anagdipe'){
			var dbquery='CALL prg_DeleteAnagDipe('+id+','+id2+')';				
		}
		
		if (tabella=='d1anagmatr'){
			var dbquery='DELETE FROM d1anagmatr WHERE(d1codmatr='+id2+' AND d1codazie='+id+')';
			//var dbquery='CALL prg_DeleteAnagMatr('+id+','+id2+')';				
		}
		
		if (tabella=='d1anagfunz'){
			var dbquery='DELETE FROM d1anagfunz WHERE(d1codfunz='+'"'+id+'"'+')';				
		}
		console.log(dbquery);
		res = connection.execute(dbquery);
		connection.close();
		return true;
 } 
 
 exports.LetturaDb = function(connectionParams,tabella)
{
		var dbconn = require('waf-mysql');
		var res,result;
   		var connection= dbconn.connect(connectionParams);
   		
		
		if (tabella=='d1anagdipe'){
			dbquery = 'SELECT CDAZIE,CDMATR,COGNOME,NOME,SESSO,DTNASC,CODFIS,CITTARES,INDIRRES,CAPRES,PROVRES,FRAZIONERES,PRESSORES,EMAIL,DTASSU,DTDIMI,CDDISL,CDMANS,CDSTAG,CDRAPL';
			dbquery+=' FROM ';
		}
		
		if (tabella=='d1anagfunz'){
			dbquery = 'SELECT d1codfunz,d1desfubr,d1desfudl,d1gennote';
			dbquery+=' FROM ';
		}
		
		if (tabella=='d1anagrepa'){
			dbquery = 'SELECT d1codrepa,d1desrebr,d1desredl,d1codrege,d1gennote';
			dbquery+=' FROM ';
		}
		
		if (tabella=='d1anagrala'){
			dbquery = 'SELECT d1codrala,d1desrabr,d1desradl,d1gennote';
			dbquery+=' FROM ';
		}
		if (tabella=='d1anagstgi'){
			dbquery = 'SELECT d1codstgi,d1desstbr,d1desstdl,d1gennote';
			dbquery+=' FROM ';
		}
		if (tabella=='d1anagmatr'){
			dbquery = 'SELECT d1codazie,d1codmatr,d1gencogn,d1gennome,d1gensess,d1datnasc,d1codfis,d1genctre,d1geninre,d1gencpre,d1genprre,d1genfrre,d1genpres,d1genmail,d1datassu,d1datcess,d1codrepa,d1codrege,d1codfunz,d1codstgi,d1codrala,d1codcoec,d1codinec,d1codvar1,d1codvar2,d1codvar3';
			dbquery+=' FROM ';
		}
		 
		
		
		dbquery+=tabella;
		console.log(dbquery);
		res = connection.execute(dbquery);
		result = res.getAllRows();
		connection.close();
		//console.log(result.getColumnName(1));
		return result;
		
 } 
  exports.NomeCampiDb = function(connectionParams,tabella)
{
		var dbconn = require('waf-mysql');
		var res,result;
   		var connection= dbconn.connect(connectionParams);
		
		if (tabella=='d1anagdipe'){
			dbquery = 'SELECT CDAZIE,CDMATR,COGNOME,NOME,SESSO,DTNASC,CODFIS,CITTARES,INDIRRES,CAPRES,PROVRES,FRAZIONERES,PRESSORES,EMAIL,DTASSU,DTDIMI,CDDISL,CDMANS,CDSTAG,CDRAPL';
			dbquery+=' FROM ';
		}
		
		if (tabella=='d1anagfunz'){
			dbquery = 'SELECT d1codfunz,d1desfubr,d1desfudl,d1gennote';
			dbquery+=' FROM ';
		}
		
		if (tabella=='d1anagrepa'){
			dbquery = 'SELECT d1codrepa,d1desrebr,d1desredl,d1codrege,d1gennote';
			dbquery+=' FROM ';
		}
		
		if (tabella=='d1anagrala'){
			dbquery = 'SELECT d1codrala,d1desrabr,d1desradl,d1gennote';
			dbquery+=' FROM ';
		}
		if (tabella=='d1anagstgi'){
			dbquery = 'SELECT d1codstgi,d1desstbr,d1desstdl,d1gennote';
			dbquery+=' FROM ';
		}
		if (tabella=='d1anagmatr'){
			dbquery = 'SELECT d1codazie,d1codmatr,d1gencogn,d1gennome,d1gensess,d1datnasc,d1codfis,d1genctre,d1geninre,d1gencpre,d1genprre,d1genfrre,d1genpres,d1genmail,d1datassu,d1datcess,d1codrepa,d1codrege,d1codfunz,d1codstgi,d1codrala,d1codcoec,d1codinec,d1codvar1,d1codvar2,d1codvar3';
			dbquery+=' FROM ';
		}
		 
		
		
		dbquery+=tabella;
		console.log(dbquery);
		res = connection.execute(dbquery);
		
		//converte i nomi e i tipi letti
		console.log(res.getColumnsCount());
		for (i=0;i<res.getColumnsCount();i++){  
			if (i==0){
				result=res.getColumnName(i);
			}else{
				result=result+'-,'+res.getColumnName(i);
			}
			if (res.getColumnType(i)== 3){
					result=result+':'+'number';
			}else if (res.getColumnType(i)== 253){
					result=result+':'+'string';
			}else if (res.getColumnType(i)== 10){
					result=result+':'+'date';
			}else{
				result=result+':'+res.getColumnType(i);
			}
			
			
			//console.log(result);
		}
		//result=res.getColumnName(0);
		//console.log(result);
		return result;
		
 } 
 
 
 

 
 exports.search = function(connectionParams,tabella,campo0,campo1,campo2,campo3,campo4,campodata0,valore0,valore1,valore2,valore3,valore4,valoredata0)
{
	var dbconn = require('waf-mysql');
	var res,result;
   	var connection= dbconn.connect(connectionParams);
   	var c=0;
   
   	console.log(connectionParams,tabella,campo0,campo1,campo2,campo3,campo4,campodata0,valore0,valore1,valore2,valore3,valore4,valoredata0);
   	
   	//inserire for per i campi
        //SELECT * FROM d1anagdipe WHERE (COGNOME LIKE "%p%" or "%p" or "p%") AND (NOME LIKE "%a%" or "%a" or "a%");
		//dbquery='SELECT * FROM d1anagdipe WHERE '+campo+' LIKE '+'"'+"%"+ valore+"%"+'"' +'OR'+'"'+"%"+ valore+'"'+'"'+valore+"%"+'"';
	if (tabella=='d1anagmatr'){
		
				
		
		dbquery='SELECT * FROM d1anagmatr';
		dbquery+=' WHERE ('+campo0+' LIKE '+'"'+"%"+valore0+"%"+'"'/*+'OR'+'"'+"%"+valore0+'"'*/+'OR'+'"'+valore0+"%"+'"'+')';
		if(valore1!=''){
			dbquery+=' AND ('+campo1+' LIKE '+'"'+"%"+valore1+"%"+'"'/*+'OR'+'"'+"%"+valore1+'"'*/+'OR'+'"'+valore1+"%"+'"'+')';
		}
		if(valore2!=''){
			dbquery+=' AND ('+campo2+' LIKE '+'"'+"%"+valore2+"%"+'"'/*+'OR'+'"'+"%"+valore2+'"'*/+'OR'+'"'+valore2+"%"+'"'+')';
		}
		if(valore3!=''){
			dbquery+=' AND ('+campo3+' LIKE '+'"'+"%"+valore3+"%"+'"'/*+'OR'+'"'+"%"+valore3+'"'*/+'OR'+'"'+valore3+"%"+'"'+')';
		}
		if(valore4!=''){
			dbquery+=' AND ('+campo4+' LIKE '+'"'+"%"+valore4+"%"+'"'/*+'OR'+'"'+"%"+valore4+'"'*/+'OR'+'"'+valore4+"%"+'"'+')';
		}				
		if (valoredata0 != undefined){ 
			dbquery+=' AND '+campodata0+' = '+'"'+valoredata0+'"';
		}
	}
	if (tabella=='d1anagfunz'){
		dbquery='SELECT * FROM d1anagfunz';
		
		if (campo2==''){
			if (campo3!=''){
				dbquery+=' WHERE ('+campo1+' LIKE '+'"'+"%"+campo3+"%"+'"'+'OR'+'"'+"%"+campo3+'"'+'OR'+'"'+campo3+"%"+'"'+')';
			}else{
				dbquery="";
			}
		}else{
			dbquery+=' WHERE ('+campo0+'='+campo2+')';
			if (campo3!=''){
				dbquery+=' OR ('+campo1+' LIKE '+'"'+"%"+campo3+"%"+'"'+'OR'+'"'+"%"+campo3+'"'+'OR'+'"'+campo3+"%"+'"'+')';
			}
		}
		/*dbquery+=' AND ('+campo2+' LIKE '+'"'+"%"+valore2+"%"+'"'+'OR'+'"'+"%"+valore2+'"'+'OR'+'"'+valore2+"%"+'"'+')';
		dbquery+=' AND ('+campo3+' LIKE '+'"'+"%"+valore3+"%"+'"'+'OR'+'"'+"%"+valore3+'"'+'OR'+'"'+valore3+"%"+'"'+')';
		dbquery+=' AND ('+campo4+' LIKE '+'"'+"%"+valore4+"%"+'"'+'OR'+'"'+"%"+valore4+'"'+'OR'+'"'+valore4+"%"+'"'+')';*/
	}	
		
		
		
		
		
		/*for (i=0;i<4;i++){
			if(window['valore'+i]!=''){
				if (c==0){
					dbquery+=' WHERE ('+window['campo'+i]+' LIKE '+'"'+"%"+ +window['valore'+i]+"%"+'"' +'OR'+'"'+"%"+window['valore'+i]+'"'+'"'+window['valore'+i]+"%"+'"'+')';
					c++;
					console.log("primo"+dbquery);
				}else{
				dbquery+=' AND ('+window['campo'+i]+' LIKE '+'"'+"%"+ +window['valore'+i]+"%"+'"' +'OR'+'"'+"%"+window['valore'+i]+'"'+'"'+window['valore'+i]+"%"+'"'+')';
				console.log("successivi"+dbquery);
				}
			}
		}*/
		
		console.log(dbquery);
		res = connection.execute(dbquery);
		result=res.getAllRows();
		connection.close();
		 return result;

 } 

 exports.findbykey = function(connectionParams,tabella,campo,valore)
{
	var dbconn = require('waf-mysql');
	var res,result;
   	var connection= dbconn.connect(connectionParams);
   	
   	console.log("entra findbykey");
   
	if (tabella=='d1anagfunz'){
		
		dbquery='SELECT * FROM d1anagfunz';
		
		if (valore!=''){
			dbquery+=' WHERE ('+campo+'='+valore+')';
		}
		console.log("findbykey");
		console.log(dbquery);
		res = connection.execute(dbquery);
		result=res.getAllRows();
		connection.close();
		 return result;
	}

 } 

 
/*exports.ChangeParams = function(d1codazie,d1genrags,d1genindi,d1gencitt,d1genprov,d1gencap,d1gentel,d1genfax,d1genema1,d1genema2,d1genema3,d1genhost,d1genuser,d1genpass,d1gendb,d1genport,d1genssl,d1desvar1,d1desvar2,d1desvar3)
{
	
	//console.log(d1codazie.length,d1genrags.length,d1genindi.length,d1gencitt.length,d1genprov.length,d1gencap.length,d1gentel.length,d1genfax.length,d1genema1.length,d1genema2.length,d1genema3.length,d1genhost.length,d1genuser.length,d1genpass.length,d1gendb.length,d1genport.length,d1genssl.length,d1desvar1.length,d1desvar2.length,d1desvar3.length);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
	console.log(d1codazie,d1genrags,d1genindi,d1gencitt,d1genprov,d1gencap,d1gentel,d1genfax,d1genema1,d1genema2,d1genema3,d1genhost,d1genuser,d1genpass,d1gendb,d1genport,d1genssl,d1desvar1,d1desvar2,d1desvar3);
 	
 	if (d1genssl==0){
 		d1genssl=false;
 	}
 	if (d1genssl==1){
 		d1genssl=true;
 	}
 	 		
 	
 	 this.connectionParams = {
	        hostname: d1genhost,
	        port: d1genport,
	        user: d1genuser,
	        password: d1genpass,
	     	database: d1gendb,
	        charSet: 192,
	        ssl: d1genssl
	    };
 
 	console.log("connetti a ");
	console.log(connectionParams);
 } */
 	
	   	/* var connectionParams = {
	        hostname: 'localhost',
	        port: 3306,
	        user: 'root',
	        password: 'Salsiccia',
	     	database: 'D1Valutazioni',
	        charSet: 192,
	        ssl: false
	    };*/
 
 exports.connetti = function()
{
		
	d1genssl=ds.Parametri.first().d1genssl;
	
	if (d1genssl==0){
 		d1genssl=false;
 	}
 	if (d1genssl==1){
 		d1genssl=true;
 	}
 	 		
 	
 	 var connectionParams = {
	        hostname: ds.Parametri.first().d1genhost,
	        port: ds.Parametri.first().d1genport,
	        user: ds.Parametri.first().d1genuser,
	        password: ds.Parametri.first().d1genpass,
	     	database: ds.Parametri.first().d1gendb,
	        charSet: 192,
	        ssl: d1genssl
	    };
	  
	    console.log("connetti a ");
		console.log(connectionParams);
		
		 return connectionParams;
		 //return true;
 } 
 
 exports.testconnessione = function()
{
var dbconn = require('waf-mysql');

d1genssl=ds.Parametri.first().d1genssl;
	
	if (d1genssl==0){
 		d1genssl=false;
 	}
 	if (d1genssl==1){
 		d1genssl=true;
 	}
	var connectionParams ={
				hostname: ds.Parametri.first().d1genhost,
		        port: ds.Parametri.first().d1genport,
		        user: ds.Parametri.first().d1genuser,
		        password: ds.Parametri.first().d1genpass,
		     	database: ds.Parametri.first().d1gendb,
		        charSet: 192,
		        ssl: d1genssl	
	     };
	  /*var connectionParams = {
	        hostname: 'localhost',
	        port: 3306,
	        user: 'root',
	        password: 'Salsiccia',
	     	database: 'D1Valutazioni',
	        charSet: 192,
	        ssl: false
	    };*/
	     
	var connection= dbconn.connect(connectionParams);
	//dbconn.close();
	return connection.isConnected;
	
	 //return false;
}
