/*	The helloWorld() function can be executed from any of your project's server-side JavaScript file using the require() method as follows:
	var result = require('Rpc2').helloWorld();

	For more information, refer to http://doc.wakanda.org/Wakanda Studio0.Beta/help/Title/en/page3355.html
*/


exports.insert = function(connectionParams,tabella,CDAZIE,CDMATR,COGNOME,NOME,SESSO,DTNASC,CODFIS,CITTARES,INDIRRES,CAPRES,PROVRES,FRAZIONERES,PRESSORES,EMAIL,DTASSU,DTDIMI,CDDISL,CDMANS,CDSTAG,CDRAPL)
{
		var dbconn = require('waf-mysql');
		var res,result;
   		var connection= dbconn.connect(connectionParams);
				
		
		if (tabella=='d1anagdipe'){
			dbquery = 'CALL prg_InsertAnagDipe(' +CDAZIE +',' + CDMATR +',' + '"' +COGNOME+'"' +',' + '"' +NOME+'"' +',' + '"' +SESSO+'"' +',' + '"' +DTNASC+'"' +',' + '"' +CODFIS+'"' +',' + '"' +CITTARES+'"' +',' + '"' +INDIRRES+'"' +',' + CAPRES +',' + '"' +PROVRES+'"' +',' + '"' +FRAZIONERES+'"' +',' + '"' +PRESSORES+'"' +',' + '"' +EMAIL+'"' +',' + '"' +DTASSU+'"' +',' + '"' +DTDIMI+'"' +',' + '"' +CDDISL+'"' +',' + '"' +CDMANS+'"' +',' + '"' +CDSTAG+'"' +',' + '"' +CDRAPL+'"' +')';
		}
		 
		res = connection.execute(dbquery);
		connection.close();
		return true;
 }
 
 
exports.del = function(connectionParams,id,id2)
{
		var dbconn = require('waf-mysql');
		var res,result;
   		var connection= dbconn.connect(connectionParams);
	
		var dbquery='CALL prg_DeleteAnagDipe('+id+','+id2+')';				
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
		
		if (tabella=='d1anagmans'){
			dbquery = 'SELECT CDMANS,DEMANS,DLMANS,NOTE';
			dbquery+=' FROM ';
		}
		
		if (tabella=='d1anagdisl'){
			dbquery = 'SELECT CDDISL,DEDISL,DLDISL,CDDEDI,NOTE';
			dbquery+=' FROM ';
		}
		
		if (tabella=='d1anagrapl'){
			dbquery = 'SELECT CDRAPL,DERAPL,NOTE';
			dbquery+=' FROM ';
		}
		if (tabella=='d1anagstag'){
			dbquery = 'SELECT CDSTAG,DESTAG,NOTE';
			dbquery+=' FROM ';
		}
		
		
		
		dbquery+=tabella;
		console.log(dbquery);
		res = connection.execute(dbquery);
		result = res.getAllRows();
		connection.close();
		console.log(result);
		return result;
		
 } 
 
 
 
 exports.update = function(connectionParams,tabella,CDAZIE,CDMATR,COGNOME,NOME,SESSO,DTNASC,CODFIS,CITTARES,INDIRRES,CAPRES,PROVRES,FRAZIONERES,PRESSORES,EMAIL,DTASSU,DTDIMI,CDDISL,CDMANS,CDSTAG,CDRAPL)
{
		var dbconn = require('waf-mysql');
		var res,result;
   		var connection= dbconn.connect(connectionParams);
		
		if (tabella=='d1anagdipe'){
		 dbquery = 'CALL prg_UpdateAnagDipe(' +CDAZIE +',' + CDMATR +',' + '"' +COGNOME+'"' +',' + '"' +NOME+'"' +',' + '"' +SESSO+'"' +',' + '"' +DTNASC+'"' +',' + '"' +CODFIS+'"' +',' + '"' +CITTARES+'"' +',' + '"' +INDIRRES+'"' +',' + CAPRES +',' + '"' +PROVRES+'"' +',' + '"' +FRAZIONERES+'"' +',' + '"' +PRESSORES+'"' +',' + '"' +EMAIL+'"' +',' + '"' +DTASSU+'"' +',' + '"' +DTDIMI+'"' +',' + '"' +CDDISL+'"' +',' + '"' +CDMANS+'"' +',' + '"' +CDSTAG+'"' +',' + '"' +CDRAPL+'"' +')';
		}
		
		res = connection.execute(dbquery);
		connection.close();
		return true;
		
 }
 
 exports.search = function(connectionParams,tabella,campo0,campo1,campo2,campo3,campo4,campodata0,valore0,valore1,valore2,valore3,valore4,valoredata0)
{
	var dbconn = require('waf-mysql');
	var res,result;
   	var connection= dbconn.connect(connectionParams);
   	var c=0;
   
   	console.log(connectionParams,tabella,campo0,campo1,campo2,campo3,campo4,campodata0,valore0,valore1,valore2,valore3,valore4,valoredata0);
   	
   	//inserire for per i campi
        //SELECT * FROM d1anagdipe WHERE (COGNOME LIKE "%p%" or "%p" or "%p%") AND (NOME LIKE "%a%" or "%a" or "a%");
		//dbquery='SELECT * FROM d1anagdipe WHERE '+campo+' LIKE '+'"'+"%"+ valore+"%"+'"' +'OR'+'"'+"%"+ valore+'"'+'"'+valore+"%"+'"';
	
		dbquery='SELECT * FROM d1anagdipe';
		dbquery+=' WHERE ('+campo0+' LIKE '+'"'+"%"+valore0+"%"+'"'+'OR'+'"'+"%"+valore0+'"'+'OR'+'"'+valore0+"%"+'"'+')'
		dbquery+=' AND ('+campo1+' LIKE '+'"'+"%"+valore1+"%"+'"'+'OR'+'"'+"%"+valore1+'"'+'OR'+'"'+valore1+"%"+'"'+')';
		dbquery+=' AND ('+campo2+' LIKE '+'"'+"%"+valore2+"%"+'"'+'OR'+'"'+"%"+valore2+'"'+'OR'+'"'+valore2+"%"+'"'+')';
		dbquery+=' AND ('+campo3+' LIKE '+'"'+"%"+valore3+"%"+'"'+'OR'+'"'+"%"+valore3+'"'+'OR'+'"'+valore3+"%"+'"'+')';
		dbquery+=' AND ('+campo4+' LIKE '+'"'+"%"+valore4+"%"+'"'+'OR'+'"'+"%"+valore4+'"'+'OR'+'"'+valore4+"%"+'"'+')';	
			
	if (valoredata0 != undefined){ 
		dbquery+=' AND '+campodata0+' = '+'"'+valoredata0+'"';
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
  
 
 exports.connetti = function()
{
		var connectionParams = {
	        hostname: 'localhost',
	        port: 3306,
	        user: 'root',
	        password: 'Salsiccia',
	        database: 'D1Valutazioni',
	     //  database: 'mydb',
	        charSet: 192,
	        ssl: false
	    };
	    
	    console.log("connetti a ");
		console.log(connectionParams);
		 return connectionParams;
		 //return true;
 } 

