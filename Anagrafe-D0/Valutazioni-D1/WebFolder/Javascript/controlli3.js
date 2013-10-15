/* ************************************************************************************
 * Forms.js
 * Funzioni JavaScript comuni per forms
 * Browsers: IE e Gecko-based (Netscape, Mozilla)
 **************************************************************************************
 * BG xx/xxxx Versione Originale
 * LG 03/0062 Allineamento con Forms_IE.js
 *            Adattamento funzioni sul Trim
 * AB 19.04.06-NORMALIZZAZIONE DATA:SE INSERITA IN NUM. ALMENO 5 2006/237
 * MA 04.12.06-CORREZIONE DATEADD PER VALORI NEGATIVI 2006/
 * LG 04.01.07-AGGIUNTA FUNZIONE replaceApici()
 * LG 05.01.07-AGGIUNTI METODI PER GESTIONE/FORMATTAZIONE DECIMALI
 * SB 20.10.08 08/821 Modificate le function JavaScript per i campi ora
 * AB 12.10.10-nuove fuction per controllo (tramite dei regular expression dei cap, (cognome/nome)
 *             e indirizzi.
 *             prendono in input  field (this): l'oggetto campo contenente il valore ed eventuaLmente
 *             rilanciano un alert 
 *             chkCapBlur,  chkCapFocus  (ammette solo numeri)
 *             chkCoNoBlur, chkCoNoFocus (ammette solo numeri/lettere/. ' - )
 *             chdIndBlur,  chkIndFocus  (ammette solo numeri/lettere/. ' - / ( ) , )
 *             2010/671
 * SB 19.10.10-Migliorata la funzione checkDateOnBlur:	
 * 			   Ora ï¿½ possibile indicare una data di riferimento a cui aggiungere/sottrarre 
 * 			   un certo numero di giorni specificati nel campo con la sintassi 
 * 			   .GIORNI oppure ï¿½GIORNI rispettivamente per aggiungere o sottrarre.       
 * AB 27.12.2010 Ordinamento a colonne (x mappa di ricerca no anag)
 *               2010/864      
 * SB 11.01.11-Aggiunta la funzione formatTimeQty [Restituisce una quantitï¿½ oraria (ore,minuti) a partire dalla quantitï¿½ di minuti]
 * PL 18.11.11 2011/488 - Aggiunta la funzione chkNomeBlur, chkNomeFocus (ammette solo NUMERI/lettere/. ' - )  
 * LP 30-08-2012 Corretta sintassi di alcune funzioni x funzionare su tutti i browser 
**************************************************************************************/

/* Variabili per posizionamento finestre */
var winPosY=0;
var winPosX=0; 

/* Variabile per selezione MULTITAB */
var currTabSelected=0;

var wrongDate=false;

/* Per gestione dete e decimali */
var currentDate=new Date();
var intIncr=0.499999; // Per arrotondamento in eccesso numeri interi
var fltIncr=0.00499999; // Per arrotondamento in eccesso numeri con 2 decimali
var formatError=false; // Per errori di formattazione su campi con decimali
var erroreCap=false; //per controllo cap (evita doppio errore su blur/on focus)
var erroreCoNo=false; //per controllo cognome/nome (evita doppio errore su blur/on focus)
var erroreNome=false; //per controllo cognome/nome (evita doppio errore su blur/on focus)
var erroreInd=false; //per controllo indirizzo (evita doppio errore su blur/on focus)
var erroreTxtA=false; //per controllo text ara

/**
 * Strippa i blanks finali da una stringa.
 * Parametri: text String La stringa da strippare
 * Ritorna: text con i blanks finali rimossi
*/
function trim(text)
{
   return text.replace(/\x20+$/,"");
}

/**
 * Elimina i blanks e il carattere &nbsp; a sinistra in una stringa.
 * Parametri: stringa  String  La stringa da cui rimuovere i blanks
 * Ritorna: la stringa con i blanks eliminati
*/
function lTrim(stringa)
{
   return stringa.replace(/^[\x20,\xa0]+/,"");
}

/**
 * Elimina i blanks e il carattere &nbsp; a destra in una stringa.
 * Parametri: stringa  String  La stringa da cui rimuovere i blanks
 * Ritorna: la stringa con i blanks eliminati
*/
function rTrim(stringa)
{
   return stringa.replace(/[\x20,\xa0]+$/,"");
}

/**
 * Combinazione di lTrim e rTrim 
*/
function Trim(stringa)
{
   return rTrim(lTrim(stringa));
}

/**
 * MANTENUTO X COMPATIBILITA' CON I VECCHI APPLICATIVI!
 * Converte un carattere in maiuscolo
*/
function charToUpper()
{
   if (event.keyCode>=97 && event.keyCode<=122)
      event.keyCode=event.keyCode-32;
}

/**
 * Cattura l'evento KeyPress e permette solo:
 * cifre da 0 a 9 (numeri interi positivi)
 * altrimenti annulla l'evento.
*/
function isDigit(event)
{
   if (isIE)
   {
      if (event.keyCode>=32 && (event.keyCode<48 || event.keyCode>57))
	 		event.keyCode=0;

      return;
   }

   if (isNS)
   {
      if (event.charCode!=0 && ! event.altKey && ! event.ctrlKey && ! event.metaKey &&
	    (event.charCode<48 || event.charCode>57))
	 		event.preventDefault();
   }
}

/**
 * Cattura l'evento KeyPress e permette solo:
 * + o -
 * cifre da 0 a 9
 * . o , (numeri decimali con segno)
 *  altrimenti annulla l'evento.
*/
function isDecimalDigit(event)
{
   if (isIE)
   {
      if (event.keyCode>=32 && ! (event.keyCode>=48 && event.keyCode<=57 || event.keyCode>=43 && event.keyCode<=46))
	 event.keyCode=0;

      return;
   }

   if (isNS)
   {
      if (event.charCode!=0 && ! event.altKey && ! event.ctrlKey && ! event.metaKey &&
	    ! (event.charCode>=48 && event.charCode<=57 || event.charCode>=43 && event.charCode<=46))
	 event.preventDefault();
   }
}

/**
 * Cattura l'evento KeyPress e permette solo:
 * cifre da 0 a 9 (numeri interi positivi), i caratteri "-" e "," 
 * altrimenti annulla l'evento.
*/
function isEnumeratedDigit(event)
{
   if (isIE)
   {
      if (event.keyCode>=32 && (event.keyCode<48 || event.keyCode>57) && event.keyCode!=44 && event.keyCode!=45)
	 				event.keyCode=0;

      return;
   }

   if (isNS)
   {
      if (event.charCode!=0 && ! event.altKey && ! event.ctrlKey && ! event.metaKey &&
	    (event.charCode<48 || event.charCode>57) && event.charCode!=44 && event.charCode!=45)
	 		event.preventDefault();
   }
}

/**
 * Cattura l'evento KeyPress e permette solo:
 * cifre da 0 a 9
 * / o . o - (i caratteri di una data)
 * altrimenti annulla l'evento.
*/
function isDateChar(event)
{
   if (isIE)
   {
      if (event.keyCode>=32 && (event.keyCode<45 || event.keyCode>57))
	 event.keyCode=0;

      return;
   }

   if (isNS)
   {
      if (event.charCode!=0 && ! event.altKey && ! event.ctrlKey && ! event.metaKey &&
	    (event.charCode<45 || event.charCode>57))
	 event.preventDefault();
   }
}

/**
 * Cattura l'evento KeyPress e permette solo:
 * cifre da 0 a 9 oppure i separatori : . , ; (in pratica i caratteri di un ora)
 * altrimenti annulla l'evento.
 * Il parametro negativo indica se ï¿½ accettato il segno meno
*/
function isTimeChar(event,negativo)
{
   if (isIE)
   {
      if( (event.keyCode>=32 
      	 && (event.keyCode<48 || event.keyCode>57) 
      	 && event.keyCode!=46 && event.keyCode!=58
      	 && event.keyCode!=44 && event.keyCode!=59
      	 && event.keyCode!=45) || (!negativo && event.keyCode==45) )
	 		event.keyCode=0;

      return;
   }

   if (isNS)
   {
      if( (event.charCode!=0 && ! event.altKey && ! event.ctrlKey && ! event.metaKey 
      	 && (event.charCode<48 || event.charCode>57) 
      	 && event.charCode!=46 && event.charCode!=58
      	 && event.charCode!=44 && event.charCode!=59
      	 && event.keyCode!=45) || (!negativo && event.keyCode==45) )
	 event.preventDefault();
   }
}

// check ora valida
  function checkTime(field)
  { 
  	if (field.value!="")
  	{
      	if (!isTimeField(field))
      	{
      		alert("Ora non valida");
      		field.focus();
      		return false;
      	}
      	else
			return true;
     }
  }
  
// check quantitï¿½ oraria valida
  function checkTimeQty(field,maxHour)
  { 
  	if (field.value!="")
  	{
      	if (!isTimeQtyField(field,maxHour))
      	{
			  	var err="Quantita' oraria non valida (verificare se ";
			  	if(maxHour && isPositiveInteger(""+maxHour,false))
			  		err+="ore superiori a "+maxHour+" oppure "
		  		err+="minuti superiori a 59)";
      		alert(err);
      		field.focus();
      		return false;
      	}
      	else
			return true;
     }
  }  

// Restituisce una quantitï¿½ oraria (ore,minuti) a partire dalla quantitï¿½ di minuti  
function formatTimeQty(minute_)
{
	minute_=Math.round(minute_);
	var ret="0:00";
	var minute=minute_;

	if(minute_<0)
		minute=-minute_;

    var h = Math.floor(minute/60); 
    var m = minute - (h * 60); 
    if (m < 10)
		m = "0" + m; 
    
    ret=h+":"+m;
	if(minute_<0)
		ret="-"+ret;
	return ret;		
}   
  
/**
 * Converte in maiuscolo una stringa, rimuovendo i blanks finali.
 * Parametri: text String La stringa da convertire in maiuscolo
 * Ritorna: text convertita in maiuscolo e senza blanks finali
*/
function toUpper(text)
{
   return trim(text).toUpperCase();
}

/**
 * Verifica che una stringa rappresenti un numero intero positivo
 * (solo cifre da 0 a 9)
 * Parametri: value String La stringa da controllare
 *            zeroAdmitted, valore booleano True se ammesso 0, False se non ammesso              
 *  Ritorna: true se numerica, false altrimenti
*/
function isPositiveInteger(value,zeroAdmitted)
{
   if (value.search(/^\d+$/)==-1)
      return false;
      
	if (!zeroAdmitted)
		if (Number(value)==0)
			return false;
			
   return true;
}

/**
 * Verifica che una stringa rappresenti un importo
 * (numero decimale con segno, con massimo 15 cifre significative
 * di cui massimo 2 decimali e con separatore di migliaia e di
 * decimali)
 * Parametri: value String La stringa da controllare
 * Ritorna: true se rappresenta un importo
*/

function isCurrency(value)
{
   if (value.search(/^[\+\-]?\d[\d\.]{0,16}(,\d\d?)?$/)==-1)
      return false;

   var nDigits=0;

   for (var i=0;i<value.length && value.charAt(i)!=",";i++)
      if (value.charCodeAt(i)>=48 && value.charCodeAt(i)<=57)
	 nDigits++;

   if (nDigits>13)
      return false;

   return true;
}

/**
 * Verifica che una stringa rappresenti una data (giorno
 * su una o due cifre, separatore, mese su una o due cifre,
 * separatore, anno su una, due, tre o quattro cifre).
 * Normalizza la data nel formato GG/MM/AAAA e ne verifica
 * la correttezza formale.
 * Parametri: dateField Text con la data
 * Ritorna true se la data e' corretta, altrimenti false
*/
function isDateField(dateField)
{

   /*if (dateField.value.length>=5 && isPositiveInteger(dateField.value,true))
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

   return true;*/
   
   
   
   
 if (dateField.getValue().length>=5 && isPositiveInteger(dateField.getValue(),true))
   {
   		var comodo=dateField.getValue().substr(0,2)+"/"+dateField.getValue().substr(2,2)+"/"+dateField.getValue().substr(4);
   		dateField.setValue(comodo);
   }
   // Anno di pivoting
   var pivotYear=new String((new Date().getFullYear())+10).substr(2,2);
   
   //Anno corrente
   var curYear=new Date().getYear();
   
   //Mese corrente
   var curMonth=(new Date().getMonth())+1;

   // Verifica e completa il formato della stringa
   if (dateField.getValue().search(/^\d{1,2}$/)!=-1 || dateField.getValue().search(/^\d{1,2}[\/\-\.]$/)!=-1)	//specificato solo il giorno, si aggiungono mese ed anno corrente
		dateField.setValue(dateField.getValue()+"/"+curMonth+"/"+curYear);
   else if (dateField.getValue().search(/^\d{1,2}[\/\-\.]\d{1,2}$/)!=-1 || dateField.getValue().search(/^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]$/)!=-1)	//specificati giorno e mese, si aggiunge l'anno corrente
		dateField.setValue(dateField.getValue()+"/"+curYear);
   else if (dateField.getValue().search(/^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{1,4}$/)==-1)
      return false;
      
   // Normalizza la data
   var fields=dateField.getValue().split(/[\/\-\.]/);

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
   dateField.setValue(fields.join("/"));

   // Controlla la data
   if (! isDate(fields[0],fields[1],fields[2]))
      return false;

   return true;
}


/**
 * Verifica che una stringa rappresenti un'ora
 * (ora su una/due cifre, separatore, minuti su una/due cifre).
 * I separatori ammessi sono : . , ;
 * Normalizza l'ora nel formato OO:MM e ne verifica
 * la correttezza formale.
 * Parametri: timeField Text con l'ora
 * Ritorna true se l'ora e' corretta, altrimenti false
*/
function isTimeField(timeField)
{
	//Il campo contiene solo numeri (nessun separatore)
   if (timeField.value.length>=1 && isPositiveInteger(timeField.value,true))
   {
   		var comodo;
   		if (timeField.value.length==1)
   		{
   			comodo=timeField.value;
   			timeField.value="0"+comodo+"00";
   		}
   		if (timeField.value.length==2)
   		{
   			comodo=timeField.value;
   			timeField.value=comodo+"00";
   		}
   		if (timeField.value.length==3)
   		{
   			comodo="0"+timeField.value.substr(0,1)+timeField.value.substr(1,2);
   			timeField.value=comodo;
   		}
   		comodo=timeField.value.substr(0,2)+":"+timeField.value.substr(2);
   		timeField.value=comodo;
   }

	// Verifica il formato della stringa
   if (timeField.value.search(/^\d{1,2}[\:\.\,\;](\d{1,2})?$/)==-1)
      return false;

   // Suddivide il campo in base sul separatore
   var fields=timeField.value.split(/[\:\.\,\;]/);

   // Normalizza l'ora
   if (fields[0].length==1)
      fields[0]="0"+fields[0];

   // Normalizza i minuti
   if (fields.length==1 || fields[1].length<=0)
      fields[1]="00";
   else if (fields[1].length==1)
      fields[1]="0"+fields[1];

   // Visualizza ora normalizzata
   timeField.value=fields.join(":");

   // Controlla l'ora
   if (fields[0]>23)
      return false;

	// Controlla i munuti
   if (fields[1]>59)
      return false;

   return true;
}

/**
 * Verifica che una stringa rappresenti una quantitï¿½ oraria 
 * (eventuale segno negativo, ora su una/piï¿½ cifre, separatore, minuti su una/due cifre).
 * Normalizza nel formato OOOO:MM e ne verifica
 * la correttezza formale.
 * I separatori ammessi sono : . , ;
 * Parametri: timeField Text con l'ora, valore massimo caonsentito per l'ora
 * Ritorna true se la quantitï¿½ oraria e' corretta, altrimenti false
*/
function isTimeQtyField(timeField,maxHour)
{
	// Verifica il formato della stringa
   if (timeField.value.search(/^-?\d+([\:\.\,\;]\d{1,2})?$/)==-1)
      return false;
      
	var segno="";
	if(timeField.value!="" && timeField.value.substr(0,1)=="-")
	{
		timeField.value=timeField.value.substr(1,timeField.value.length);
		segno="-";
	}      

   // Suddivide il campo in base sul separatore
   var fields=timeField.value.split(/[\:\.\,\;]/);

   // Normalizza i minuti
   if (fields.length==1 || fields[1].length<=0)
      fields[1]="00";
   else if (fields[1].length==1)
      fields[1]="0"+fields[1];

   // Visualizza quantitï¿½ normalizzata
   timeField.value=segno+fields.join(":");

   // Controlla l'ora
   if (maxHour && isPositiveInteger(""+maxHour,false) && fields[0]>maxHour)
      return false;
      
   // Controlla i minuti
   if (fields[1]>59)
      return false;

   return true;
}

/**
 * Verifica che una data sia corretta.
 * Parametri: day String
 *	      month String
 *	      year String
 * Ritorna: true se la data e' corretta, false altrimenti
*/
function isDate(day
	       ,month
	       ,year)
{
   // Controlla range giorno
   if (day<1 || day>31)
      return false;
	
   // Controlla range mese
   if (month<1 || month>12)
      return false;

   /*
      Controllo range anno:
      1753: entrata in vigore del calendario gregoriano
	    in tutti i paesi europei.
      4902: anno bisestile anche se non dovrebbe esserlo
   */
   if (year<1753 || year>4902)
      return false;

   // Controllo giorni del mese
   switch (Number(month))
   {
      case 2:
	 if (day>29)
	    return false;

	 if (day==29)
	    if (year%4!=0 || (year%100==0 && year%400!=0))
	       return false;

	 break;

      case 4:
      case 6:
      case 9:
      case 11:
	 if (day>30)
	    return false;
   }

   return true;
}

/**
 * Ottiene un oggetto Date a partire da una stringa nel formato "GG/MM/AAAA"
*/
function getDateFromText(text)
{
	if (text.length!=10)
	{
		alert("Data in formato non valido");
		return null;
	}
	return new Date(text.substr(6),text.substr(3,2)-1,text.substr(0,2));		
}

/**
 * Confronta due date limitandosi al giorno.
 * Parametri: obj1, primo oggetto da confrontare
 *            obj2, secondo oggetto da confrontare
 * Ritorna: -1: se la prima data e' minore
 *           0: se le due date sono uguali
 *           1: se la prima data e' maggiore
*/
function compareDate(obj1
                    ,obj2)
{
   var dapp1;
   var dapp2;
   
   // obj1 e' una stringa che rappresenta una data
   if (typeof(obj1)=="string")
   {
   	dapp1=getDateFromText(obj1);
   }
   // obj1 e' un campo INPUT
   else if (obj1.tagName!=undefined)
   {
   	dapp1=getDateFromText(obj1.value);				
   }
   // obj1 e' un oggetto Date
   else
   {
   	dapp1=new Date(obj1.getFullYear(),obj1.getMonth(),obj1.getDate(),0,0,0,0);
   }
   
   // obj2 e' una stringa che rappresenta una data
   if (typeof(obj2)=="string")
   {
   	dapp2=getDateFromText(obj2);
   }
   // obj2 e' un campo INPUT
   else if (obj2.tagName!=undefined)
   {
   	dapp2=getDateFromText(obj2.value);				
   }
   // obj2 e' un oggetto Date
   else
   {
   	dapp2=new Date(obj2.getFullYear(),obj2.getMonth(),obj2.getDate(),0,0,0,0);
   }
    
   if (dapp1<dapp2)
      return -1;

   if (dapp1>dapp2)
      return 1;
   else
      return 0;
}

/**
 * Confronta due campi ora
 * Parametri: time1 Stringa ora
 *            time2 Stringa ora
 * Ritorna: -1: se la prima e' minore
 *           0: se sono uguali
 *           1: se la prima e' maggiore
 * N.B.: i campi ora devono essere formattati nel formato "HH:MM"
*/
function compareTime(time1
                    ,time2)
{
   var tapp1=new Date(0,0,0,Number(time1.substr(0,2)),Number(time1.substr(3,2)),0,0);
   var tapp2=new Date(0,0,0,Number(time2.substr(0,2)),Number(time2.substr(3,2)),0,0);   
   
   if (tapp1<tapp2)
      return -1;

   if (tapp1>tapp2)
      return 1;
   else
      return 0;
}


/**
 * Variabile globale usata da alternateString
*/
var flipState=true;

/**
 * Ritorna string1 o string2 alternativamente ogni volta che viene chiamata
 * Parametri: string1 String
 *	          string2 String
 * Ritorna: string1 se il numero di chiamata e' dispari, altrimenti string2
 * ATTENZIONE: viene usata la variabile globale flipState
*/
function alternateString(string1
			,string2)
{
   if (flipState)
   {
      flipState=false;
      return string1;
   }
   else
   {
      flipState=true;
      return string2;
   }
}

/**
 * Sposta tutte le OPTION da una SELECT all'altra.
 * Parametri: selDa HTMLSelectElement Select da cio spostare
 *            selA  "                 Select su cui spostare
 *            docA   HTMLDocument     Documento
*/
function selMoveOptions(selDa
                       ,selA
                       ,docA)
{
   for (var i=0;i<selDa.options.length;i++)
   {
      var option=docA.createElement("OPTION");

      option.value=selDa.options[i].value;
      option.text=selDa.options[i].text;

      if (isIE)
         selA.add(option);

      if (isNS)
         selA.add(option,null);
   }
}

/**
 * Ricerca in una SELECT la OPTION con un determinato VALUE.
 * Parametri: select  HTMLSelectElement Select in cui cercare
 *            value   Stringa            Valore da ricercare
 * Ritorna  : l'indice della OPTION con il VALUE.
 *            -1 se non lo trova.
*/
function searchOptionByValue(select
                            ,value)
{
   for (var i=0;i<select.options.length;i++)
      if (select.options[i].value==value)
         return i;

   return -1;
}

/**
 * Riempie la SELECT con valori di anni.
 * Viene sempre inserito l'anno corrente ed un range di anni passati
 * e/o futuri.
 * Parametri: range Numero di anni da inserire (numerico)
 *            dir   Assume i seguenti valori:
 *                  <0 Inserisce anno corrente e anni passati
 *                  0 Inserisce anno corrente e anni futuri e passati
 *                  >0 Inserisce anno corrente e anni futuri
*/
function fillYear(range
                 ,dir)
{
   var limInf;
   var limSup=new Date().getFullYear();

   if (dir<0)
      limInf=limSup-range;

   if (dir>0)
   {
      limInf=limSup;
      limSup+=range;
   }

   if (dir==0)
   {
      limInf=limSup-range;
      limSup+=range;
   }

   for (var i=limInf;i<=limSup;document.writeln("<OPTION VALUE="+i+">"+i++));
}

/**
 * Generazione automatica del messaggio di nessun dato trovato per
 *  tabelle risultato di ricerche.
 * Parametri: table Tabella        Tabella in cui inserire il messaggio
 *             nrRowHeading Numeric Numero righe di intestazione fisse
 *                                  della tabella
 *             nrColumns    Numeric Numero di colonne della tabella
*/
function tableEmptyMsg(table
                      ,nrRowHeading
                      ,nrColumns)
{
   // Se non c'e'nessuna riga oltre all'intestazione
   if (table.rows.length<=nrRowHeading)
   {
      // Inserisce una nuova riga con una cella
      var msgCell=table.insertRow().insertCell();
						
      msgCell.colSpan=nrColumns;
			
      // Inserimento messaggio nella colonna
      msgCell.innerHTML="Nessun dato trovato";
			
      // Stile
      msgCell.style.fontWeight="bold";
   }
}

/**
 * Restituisce un float da una Stringa
 * Input:  5.368.191,287
 * Output: 5368191.287
*/
function toNumber(numero)
{
   if (numero=="")
      return 0;
   else
      return parseFloat(numero.replace(/\./g,"").replace(/,/g,"."));
}

/**
 * Formatta un numero (float)
 * Input:  7123456.789
 * Parametri opzionali: posizioni decimali: predefinito 2
 *                      separatore delle Migliaia: predefinito .
 *                      separatore dei Decimali: predefinito ,
 * Output: 7.123.456,79 (con parametri predefiniti)
*/
function formatNumber(numero, decpos, sepmigl, sepdec)
{
   var fattore=1;

   var posDecimali=2;
   var sepMigliaia=".";
   var sepDecimali=",";
   var neg="";
	   
   if (decpos!=null)
      posDecimali=decpos;
   if (sepmigl!=null)
      sepMigliaia=sepmigl;
   if (sepdec!=null)
      sepDecimali=sepdec;
	
   for (i_formatNumber=0;i_formatNumber<posDecimali;i_formatNumber++)
      fattore*=10;
	
   numero=Math.round(numero*fattore)/fattore;
   
   if (numero<0)
   {   
      neg="-";
      numero=String(numero);
      numero=numero.substr(1,numero.length-1);
   }
   
   numero=Number(numero); 
   
   var tmp="";
   var num="";

   var parteDecimale="0";
   if ((""+numero).search(/\./g)!=-1)
   {
      parteDecimale=(""+numero).substr((""+numero).search(/\./g)+1);
      num=(""+numero).substr(0,(""+numero).search(/\./g));
   }
   else
      num=""+numero;

   for (i_formatNumber=parteDecimale.length;i_formatNumber<posDecimali;i_formatNumber++)
      parteDecimale+="0";

   var $1=num.length%3;
   var $2=Math.floor(num.length/3);

   if (sepMigliaia!="")
   {
	   if ($1>0)
	   {
	      tmp+=num.substring(0, $1)+".";
	      for (i_formatNumber=0;i_formatNumber<$2;i_formatNumber++)
	         tmp+=num.substring($1+(i_formatNumber*3),($1+3)+(i_formatNumber*3))+sepMigliaia;
	   }
	   else
	   {
	      if ($1==0&&$2>0)
	         for (i_formatNumber=0;i_formatNumber<$2;i_formatNumber++)
	            tmp+=num.substring(i_formatNumber*3,3+(i_formatNumber*3))+sepMigliaia;
	   }
	   tmp=tmp.substring(0,tmp.length-1);
	}
	else
		tmp=num;

   return(neg+tmp+sepDecimali+parteDecimale);
}

/**
 * Inverte le visualizzazione di 2 oggetti.
 * Valido per qualsiasi elemento che supporti lo style "display"
 * Parametri: obj1   elemento da visualizzare
 *            obj2   elemento da non visualizzare
*/
function alternateDisplay(obj1,obj2)
{
   obj1.style.display="inline";
   obj2.style.display="none";
}

/**
 * Formatta una tabella con colori alternati
*/
function formatRow(table)
{
	var classColor;
	
	flipState=true;
	
	for (var i=1;i<table.rows.length;i++)
   {
     	classColor=alternateString("dispari","pari");
     	table.rows[i].className=classColor;
   }
}

/**
 * Ordina in modo crescente o decrescente una lista
 * Prende in input: actionOrd: azione di ordinamento;
 *                  colOrd: colonna di ordinamento;
 *                  tipOrd: tipo di ordinamento ('A' ascendente, 'D' discendente);
 *                  img: immagine;
 *                  headerRows: FACOLTATIVO, indica il numero di righe di intestazione
 *                              (1 per default);
 *                  formP nome del form "search" "record".... (redord dedault)
*/
function ordina(actionOrd,colOrd,tipOrd,img,headerRows, formP)
{
	var hr=headerRows || 1;
	var formR=formP || "record";
	
	if (frames["list"].document.getElementById("list").rows.length>hr)
	{								
		// Ciclo di deselezione colonne di ordinamento e selezione della colonna corrente
		var tr=img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		
		parent.list_currentColOrd=img.parentNode.parentNode.parentNode.parentNode.parentNode.cellIndex;
		
		for(var i=0;i<tr.cells.length;i++)
			tr.cells[i].lastChild.rows[0].cells[0].style.color="#000000";
		
		document.forms[0].COLORD.value=colOrd;
		document.forms[0].TIPORD.value=tipOrd;
						
		document.forms[0].action=actionOrd
	                      +"?SESSIONID="
	                      +parent.document.forms[formR].elements["SESSIONID"].value
	                      +"&FORMORD="
	                      +parent.document.forms[formR].elements["FORMORD"].value;
			
		document.forms[0].target="_self";
		document.forms[0].submit();
		
	}																	
}


/**
 * Intercetta uno o piï¿½ tasti che vanno ignorati
 * Tasti ignorati: BACKSPACE, F1-F12
 * N.B.: controllo da inserire nell'evento di ONKEYDOWN del BODY
 *       Ignorato su controlli INPUT e TEXTAREA
*/
function detectKeysToIgnore(e)
{		
	var isExploder=true;//default ï¿½ esplorer
	try
	{
		isExploder=isIE;
	}catch (err){}
  	// Backspace
	if (isExploder)
	{
	  	if (e.keyCode==8)
	  	{
		  	if ((e.srcElement.type=="text" && !e.srcElement.disabled && !e.srcElement.readOnly) || (e.srcElement.type=="textarea" && !e.srcElement.readOnly)) 
		  		return;
	  		e.keyCode=0;
	  	}
	  	
	  	// Function keys
		if (e.keyCode>=112 && e.keyCode<=123)
		{
			e.keyCode=0;
			e.returnValue=false;
		}
	}
	else
	{
		if (e.which==8)
		{
		  	if ((e.target.type=="text" && !e.target.disabled && !e.target.readOnly) || (e.target.type=="textarea" && !e.target.readOnly))
		  		return;
			e.preventDefault();
		}
	}
} 

/**
 * Intercetta la pressione del tasto INVIO e annulla l'invio del form quando 
 * all'interno del BODY ï¿½ presente un solo campo TEXT
 * N.B.: controllo da inserire nell'evento di ONKEYDOWN del BODY
*/
function ignoreEnterOnSingleText(e)
{
	if (e.keyCode==13)
		if (e.srcElement.type=="text" && !e.srcElement.disabled) 
			document.forms[0].onsubmit=function() {return false};
}  

/**
 * Posiziona l'angolo superiore sinistro della finestra in base alla posizione
 * del cursore all'interno del documento 
 * Prende in input: h: altezza finestra;
 *                  w: larghezza finestra;
 *                  evt: l'evento;
*/
function setWindow(h,w,evt)
{		     
  	var widthFirstFrame=screen.width-document.body.scrollWidth;

  	winPosY=document.body.scrollTop+(screen.height-h)/2-50;
	winPosX=evt.screenX-widthFirstFrame+20;		
	if ((evt.screenX+w)>screen.width)
		winPosX-=(evt.screenX+w)-screen.width+30;
																																												
}

/**
 * Visualizza la tabella associata al TAB correntemente selezionato
 * Prende in input: tdSel: cella selezionata;
*/
function selTab(tdSel)
{
  	// Deseleziona tutti i tab
  	for (var i=0;i<tdSel.parentNode.childNodes.length;i++)
  	{
  		if (tdSel.parentNode.childNodes[i].DISAB!="S")
  			tdSel.parentNode.childNodes[i].className="deselected";	
  	}
			      		
  	// Seleziona il tab corrente
  	tdSel.className="selected";
		  	
  	// Nasconde la precedente tabella
  	document.getElementById("tab"+currTabSelected).style.display="none";		
 
  	// Imposta il nome della cella selezionata
  	currTabSelected=tdSel.id;
		  	
  	// Visualizza la tabella selezionata
  	document.getElementById("tab"+currTabSelected).style.display="block";		
}

/**
 * Esegue la sostituzione di uno o piu' caratteri con altri caratteri
 * Prende in input text: stringa contenente i caratteri da sostituire;
 *                 toBeReplaced: caratteri che devono essere sostituiti; 
 *                 toReplace: caratteri sostituiti;
 *                 substituteFirst: facoltativo; se true esegue sostituzione
 *                                solo sul primo carattere trovato	
 */
function strReplace(text,toBeReplaced,toReplace,substituteFirst)
{
	var newToBeReplaced="";
	
	for(var i=0;i<toBeReplaced.length;i++)
	{
		// Elabora caratteri riservati dell'oggetto RegExp
		switch (toBeReplaced.substr(i,1))
		{
			case "^":
			case "$":
			case "*":
			case "+":
			case "?":
			case "[":
			case "]":
			case "(":
			case ")":
			case "|": 
				newToBeReplaced+="\\"+toBeReplaced.substr(i,1);
				break;
			default:
				excape=/\\/g;
				newToBeReplaced=toBeReplaced.replace(excape,"\\\\");	
		}	
	}
	
	if (newToBeReplaced=="")
		newToBeReplaced=toBeReplaced;
	
	if (substituteFirst)
		rg=new RegExp(newToBeReplaced)
	else
		rg=new RegExp(newToBeReplaced,"g");
	
	return text.replace(rg,toReplace);
}

function checkDateFieldsBeforeZoom()
{
	for (var i=0;i<document.getElementsByTagName("INPUT").length;i++)
	{
		if (document.getElementsByTagName("INPUT")[i].type=="text")
		{
			if (document.getElementsByTagName("INPUT")[i].value!="")
			{
				if (document.getElementsByTagName("INPUT")[i].name.substr(2,2)=="DT")	
				{
					if (!isDate(document.getElementsByTagName("INPUT")[i].value.substr(0,2),
									document.getElementsByTagName("INPUT")[i].value.substr(3,2),
									document.getElementsByTagName("INPUT")[i].value.substr(6)))
					{
		        		alert("Data in formato errato");
		        		document.getElementsByTagName("INPUT")[i].focus();
		        		return false;
		         }
				}
			}
		}
	}
	return true;
}

/*
Controlla la lunghezza del testo immesso in una TEXTAREA
	accetta in input: field: l'oggetto TEXTAREA su cui effettuare il controllo
	                  
	                  count field: l'oggetto input di tipo text che visualizza i caratteri
	                               a disposizione, settarlo a 'none' se non si utilizza questa opzione
	                  maxlimit: il limite massimo di caratteri utilizzabile per il campo             
                     
*/

function textAreaControl(field, countfield, maxlimit) 
{
   if (field.value.length > maxlimit)
      field.value = field.value.substring(0, maxlimit);
   else if(countfield != "none") 
      countfield.value = maxlimit - field.value.length;
}

/**
 * Impostazione data su onFocus
 * Prende in input: field: l'oggetto campo contenente il valore 
*/
function checkDateOnFocus(field)
{
 /*  if (field.value!="")
      if (!isDate(field.value.substr(0,2),field.value.substr(3,2),field.value.substr(6,4)))
      	wrongDate=false;*/
   
   if (field.getValue()!="")
      if (!isDate(field.getValue().substr(0,2),field.getValue().substr(3,2),field.getValue().substr(6,4)))
      	wrongDate=false;
}
   
/**
 * Controllo data su onBlur
 * Prende in input: 
 * 		field: l'oggetto campo contenente il valore
 * 		dataBaseField: l'oggetto campo contenente la data di base a cui aggiungere l'offset			   
*/
function checkDateOnBlur(field,dataBaseField)
{	
	
	/*if (wrongDate)	
  	{	
  		wrongDate=false;
  		return;
  	}
  		
  	if (field.value!="")
  	{
  		//se il campo comincia con il carattere . oppure - seguito da un numero
  		//si aggiungere/sottrae alla dataBase il numero di giorni specificato
  		if((field.value.substr(0,1)=="." || field.value.substr(0,1)=="-") 
  			 && dataBaseField && isDateField(dataBaseField))
  		{
  			var offset=parseInt(field.value.substr(1));
  			if(!isNaN(offset))	//se l'offset ï¿½ un numero
  			{
  				if(offset>9999)
  					offset=9999;
  				if(offset!=0)
  					offset--;	//in modo che la differenza fra data di partenza e quella finale coincide con l'offset
  				if(field.value.substr(0,1)=="-")
  					offset=-offset;
	  			var d = getDateFromText(dataBaseField.value);
	    		d.setDate(d.getDate()+offset);
				var curr_date = d.getDate();
				var curr_month = d.getMonth();
				curr_month++;
				var curr_year = d.getFullYear();
	  			field.value=curr_date + "/" + curr_month + "/" + curr_year;
  			}
  		}	
  		
	  	if (!isDateField(field))
	  	{
	  		alert("Data non valida");
	  		field.focus();
	  		wrongDate=true;
	  	}
	  	else
	  		wrongDate=false;
   }
   else
      wrongDate=false;
      if (wrongDate)	
  	{	
  		wrongDate=false;
  		return;
  	}*/
  	
  	if (field.getValue()!="")
  	{
  		//se il campo comincia con il carattere . oppure - seguito da un numero
  		//si aggiungere/sottrae alla dataBase il numero di giorni specificato
  		
  		if((field.getValue().substr(0,1)=="." || field.getValue().substr(0,1)=="-") 
  			 && dataBaseField && isDateField(dataBaseField))
  		{
  			var offset=parseInt(field.getValue().substr(1));
  			if(!isNaN(offset))	//se l'offset ï¿½ un numero
  			{
  				if(offset>9999)
  					offset=9999;
  				if(offset!=0)
  					offset--;	//in modo che la differenza fra data di partenza e quella finale coincide con l'offset
  				if(field.getValue().substr(0,1)=="-")
  					offset=-offset;
	  			var d = getDateFromText(dataBaseField.getValue());
	    		d.setDate(d.getDate()+offset);
				var curr_date = d.getDate();
				var curr_month = d.getMonth();
				curr_month++;
				var curr_year = d.getFullYear();
	  			field.setValue(curr_date + "/" + curr_month + "/" + curr_year);
  			}
  		}	
  		
	  	if (!isDateField(field))
	  	{
	  		alert("Data non valida");
	  		field.focus();
	  		wrongDate=true;
	  	}
	  	else
	  		wrongDate=false;
   }
   else
      wrongDate=false;
}
	
/**
 * Aggiunge un numero di giorni, mesi e anni a una data
 * Prende in input: strStartDate: la stringa che rappresenta la data di riferimento;
 *                  days: giorni da aggiungere (o da sottrarre);
 *                  months: mesi da aggiungere (o da sottrarre);
 *                  years: anni da aggiungere (o da sottrarre);
 * Ritorna: una stringa che rappresenta la data calcolata;   
*/ 
function dateAdd(strStartDate,days,months,years)
{

	var giorno=Number(strStartDate.substr(0,2));
	var mese=Number(strStartDate.substr(3,2));
	var anno=Number(strStartDate.substr(6,4));
	var tmpGiorno,tmpMese,tmpAnno;
	var strGiorno,strMese;
	var maxDay;
	
	if (!isDate(giorno,mese,anno))
		return "";
	
	tmpGiorno=giorno+days;
	tmpMese=mese+months;
	tmpAnno=anno+years;
	while (tmpMese<=0 || tmpGiorno<=0)
	{
		if (tmpMese<=0)
		{
			// Devo passare all'anno precedente
			tmpAnno-=1;
			tmpMese+=12;
		}
		if (tmpGiorno<=0)
		{
			// Devo passare al mese precedente
			tmpMese-=1;
			switch (tmpMese)
			{
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					maxDay=31;
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					maxDay=30;
					break;
				case 2:
			      if (tmpAnno%4!=0 || (tmpAnno%100==0 && tmpAnno%400!=0))
			         maxDay=28
			      else
			      	maxDay=29;
			}
			tmpGiorno+=maxDay;
		}
	}
	switch (tmpMese)
	{
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			maxDay=31;
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			maxDay=30;
			break;
		case 2:
	      if (tmpAnno%4!=0 || (tmpAnno%100==0 && tmpAnno%400!=0))
	         maxDay=28
	      else
	      	maxDay=29;
	}
	if (tmpGiorno>maxDay)
	{
		tmpGiorno=tmpGiorno-maxDay;
		tmpMese+=1;	
	}

	if (tmpMese>12)
	{
		tmpMese=tmpMese-12;
		tmpAnno+=1;	
	}


	while (!isDate(tmpGiorno,tmpMese,tmpAnno))
	{
		tmpGiorno-=1;
		if (tmpGiorno<0)
			break;			
	}
	 
	if (isDate(tmpGiorno,tmpMese,tmpAnno))
	{
		if (tmpGiorno<10)
			strGiorno="0"+tmpGiorno
		else
			strGiorno=tmpGiorno;
			
		if (tmpMese<10)
			strMese="0"+tmpMese
		else
			strMese=tmpMese;
				
		return strGiorno+"/"+strMese+"/"+tmpAnno;
	}
	else
		return "";
}	
	
/**
 * Esegue un controllo sulla lunghezza dei singoli valori di un campo di input, 
 * estraendoli da una sequenza di valori/intervalli.
 * Parametri: stringa  String  La stringa su cui eseguire i controlli
 *				  limit    Number  Limite lunghezza valore
 * Ritorna: true se la stringa rispetta i controlli
 *				false in caso negativo (alert di avvertimento e focus sul campo)
 */
function checkFieldEnumLength(field, limit)
{
	sequences = field.value.split(",");

	for (var i = 0; i < sequences.length; i++) 
	{
		intervals = sequences[i].split("-");

		for (var j = 0; j < intervals.length; j++) 
		{
			if (intervals[j].length > limit)
			{
				alert("Il valore specificato eccede la lunghezza del campo");
				field.focus();
				return false;
			}
		}			
	}
	
	return true;
}

/**
 * Valuta se una stringa contiene caratteri alfabetici (cioe' senza numeri)
 * Parametri: strictAlfabetica, se true consente solo la presenza di caratteri alfabetici
 *                   A-z, a-z, punteggiatura esclusa;
 *                   Se non viene passato consente la presenza di tutti i caratteri alfanumerici.
 *            length, lunghezza della sottostringa da analizzare a partire dall'inizio
 *                   Se non viene passato, analizza tutta la stringa.
 * Ritorna: true se la stringa e' alfabetica, false altrimenti.
 * ATTENZIONE: e' un metodo dell'oggetto String!  
*/
String.prototype.isAlfabetica=function(strictAlfabetica,length)
                              {
                                 if (arguments.length>2)
   									 	   throw new Error("String.isAlfabetica(): parametri non corretti");
                              		
                              	var stringa=length?this.substr(0,length):this;

                              	// Controlla esistenza caratteri numerici
                              	if (/^\d/g.test(stringa))
                              		return false;
                              	
                              	// Controlla esistenza di caratteri punteggiatura (se richiesto)
                              	if (strictAlfabetica)
                              		if (/^[^A-Z,a-z]/g.test(stringa))
                              			return false;
                              	
                              	return true;
                              }  
 
/**
 * Applica (o rimuove) uno stile di alpha-blending (blurred) all'elemento specificato.
 * Richiede Internet Explorer 4 o superiore. Browser differenti semplicemente ignorano lo stile.
*/
function blurElement(element, state)
{
  	if (state == true)
  		element.style.filter="Alpha(style=0,opacity=25)";
  	else
  		element.style.filter="";
}
  
/**
 * Intercetta la pressione del tasto Invio ed esegue la funzione passata come parametro
 * Prende in input: evt: l'evento;
 *                  fun: la stringa che rappresenta la funzione da eseguire
 */
function detectInvio(evt,fun)
{		
	var funWithNoParameters="";
				
	if (fun)
	{
		if (evt.keyCode=="13")
		{
			funWithNoParameters=fun.substring(0,fun.indexOf("(")>-1?fun.indexOf("("):fun.length);
			if (eval("this."+funWithNoParameters))
				eval(fun) 
		}
	}
}

/**
 * Aggiorna il contenuto di un campo input con il valore della voce della select selezionata 
 * Prende in input: select: l'oggetto select;
 *                  input: l'oggetto input;
 *                  valueFormat (facoltativo): il formato dell'eventuale sottostringa del valore 
 *                     della select da impostare nel campo input.
 *                     Vedi funzione parseValueFormat per dettagli; 
 */
function getValueFromSelect(select,input,valueFormat)
{
	var selectValue=select.options[select.selectedIndex].value;
	var len=selectValue.length;
	var obj={S:0,E:len};
	
	if (valueFormat)
		obj=parseValueFormat(valueFormat,obj,len);	
	input.value=selectValue.substring(obj.S,obj.E);	
}

/**
 * N.B.: Estensione della funzione searchOptionByValue().
 * Seleziona la voce di una select se trova corrispondenza con il valore di un campo input
 * Prende in input: input: l'oggetto input;
 *                  select: l'oggetto select;
 *                  valueFormat (facoltativo): il formato dell'eventuale sottostringa del valore 
 *                     della select da confrontare col valore del campo input.
 *                     Vedi funzione parseValueFormat per dettagli;
 *                  msgError (facoltativo): messaggio da visualizzare se non viene trovata corrispondenza; 
 */
function setSelectFromValue(input,select,valueFormat,msgError)
{
	var selIdx=-1;
	if (input.value=="")
		select.selectedIndex=0
	else
	{
		for (var i=0;i<select.options.length;i++)
	   {
	   	var selectValue=select.options[i].value;
	   	var len=selectValue.length;
	   	var obj={S:0,E:len};
	   	if (valueFormat)
				obj=parseValueFormat(valueFormat,obj,len);		
	   	if (selectValue.substring(obj.S,obj.E)==input.value)
	      {	
				selIdx=i;
				break;
			}
		}
		if (selIdx==-1)
		{
			alert(msgError?msgError:"Codice inesistente");
			input.focus();	
		}
		else
			select.selectedIndex=selIdx;	
	}
}

/** 
 * Ad esclusivo uso interno delle funzioni getValueFromSelect e setSelectFromValue;
 *   restituisce l'indice di partenza e di arrivo contenuto nella stringa formatValue;
 * Prende in input: valueFormat: il formato dell'eventuale sottostringa del valore 
 *                               della select da confrontare col valore del campo input.
 *                               Formati validi: "X"   - Considera la sottostringa compresa 
 *                                                 tra il carattere in posizione X e la fine 
 *                                                 della stringa (X>=0) Es: "4", "10";
 *                                               "X-Y" - Considera la sottostringa compresa 
 *                                                 tra il carattere in posizione X e il carattere 
 *                                                 in posizione Y compreso (X,Y>=0) Es: "0-4", "3-7";
 *                                               "-X"  - Considera la sottostringa composta
 *                                                 dagli ultimi X caratteri della stringa;  
 *                  obj: oggetto restituito alle funzioni chiamanti;
 *                  len: lunghezza del valore da confrontare;  
*/
function parseValueFormat(valueFormat,obj,len)
{
	// Formato "X"
	if (!isNaN(valueFormat) && parseInt(valueFormat)>=0)
	{
		if (parseInt(valueFormat)<len) obj.S=parseInt(valueFormat);
		return obj;
	}
	// Formato "X-Y" oppure "-X"
	else
	{
		var arr=/^(\d{0,})(-)?(\d{1,}$)/.exec(valueFormat);
		
		if (arr==null) return obj;
		
		// Formato "-X"
		if (arr[1]=="")
			obj.S=len-parseInt(arr[3]);
		// Formato "X-Y"
		else
		{
			if (parseInt(arr[3])>len || parseInt(arr[3])<parseInt(arr[1])) return obj;
			obj.S=parseInt(arr[1]);
			obj.E=parseInt(arr[3])+1;																										
		}
		return obj;
	}
}  

/**
* Valuta se una stringa contiene solo dei numeri. Se li trova ritorna true altrimenti false
* Parametri
* - stringa: stringa da valutare
*/
function isAllDigit(stringa)
{

   // Controlla se nella stringa ci sono caratteri numerici
   /*if (/^\d+$/g.test(stringa))
      return true;	
   else
   	  return false;*/
   	  
	   if (/^\d+$/g.test(stringa))
	      return true;	
	   else
	   	  return false;
  
 
}

/**
* Valuta se una stringa contiene solo dei caratteri. Se li trova ritorna true altrimenti false
* Parametri
* - stringa: stringa da valutare
* - minus: se ï¿½ impostato a true vengono considerati come caratteri anche le lettere minuscole
*          se ï¿½ impostato a false NON vengono considerati come caratteri le lettere minuscole
*/
function isAllAlfa(stringa, minusc)
{

  var strReg="";

  if(minusc)
  	strReg="^[A-Za-z]+$";
  else
	strReg="^[A-Z]+$";	
				
  regexp=new RegExp(strReg);
				
  if (regexp.test(stringa))
    return true;
  else
    return false;
 	
}

/**
* Valuta se una stringa contiene caratteri e dei numeri. Se li trova ritorna true altrimenti false
* Parametri
* - stringa: stringa da valutare
* - minus: se ï¿½ impostato a true vengono considerati come caratteri anche le lettere minuscole
*          se ï¿½ impostato a false NON vengono considerati come caratteri le lettere minuscole
*/
function isAllAlfaNum(stringa, minusc)
{

  var strReg="";
  
  if(minusc)
  	strReg="^[A-Za-z0-9]+$";
  else
	strReg="^[A-Z0-9]+$";	
				
  regexp=new RegExp(strReg);
				
  if (regexp.test(stringa))
    return true;
  else
    return false;
}

/**
 * Restituisce, a partire da una data passata, una delle seguenti date:
 * - data inizio mese;
 * - data fine mese;
 * - data inizio anno;
 * - data fine anno;
 * Parametri: objData, oggetto contenente una data
 *            tipo: data da restituire ("IM","FM","IA","FA")               
 * Ritorna: una stringa contenente la data ottenuta;
*/
function getDataRiferimento(objData,tipo)
{
	var dataInput;
	var dataOutput;
	var giorno;
	var mese;
	var anno;
   
   // objData e' una stringa che rappresenta una data
   if (typeof(objData)=="string")
   {
   	data=getDateFromText(objData);
   }
   // objData e' un campo INPUT
   else if (objData.tagName!=undefined)
   {
   	data=getDateFromText(objData.value);				
   }
   // objData e' un oggetto Date
   else
   {
   	data=new Date(objData.getFullYear(),objData.getMonth(),objData.getDate(),0,0,0,0);
   }
	
	anno=data.getFullYear();
	
	switch (tipo)
	{
		// Torna data INIZIO ANNO
		case "IA":
			giorno=1;
			mese=1;
			break;
			
		// Torna data FINE ANNO
		case "FA":
			giorno=31;
			mese=12;
			break;
			
		// Torna data INIZIO MESE
		case "IM":
			giorno=1;
			mese=data.getMonth()+1;
			break;
			
		// Torna data FINE MESE
		case "FM":
			mese=data.getMonth()+1;
			switch (mese)
			{
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					giorno=31;
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					giorno=30;
					break;
				case 2:
					if (anno%4!=0 || (anno%100==0 && anno%400!=0))
	         		giorno=28;
			      else
			      	giorno=29;
			}
			break;
			
		// Stringa vuota
		default:
			return "";
	}
	
	// Normalizzazione giorno/mese
	if (giorno<10)
		giorno="0"+giorno;
	
	if (mese<10)
		mese="0"+mese;
		
	// Data in formato GG/MM/AAAA
	return giorno+"/"+mese+"/"+anno;

}  

/**
 * Ritorna la data di inizio mese in relazione ad una data 
*/
function getDataInizioMese(dataInput)
{
	return getDataRiferimento(dataInput,"IM");
}

/**
 * Ritorna la data di fine mese in relazione ad una data 
*/
function getDataFineMese(dataInput)
{
	return getDataRiferimento(dataInput,"FM");
}

/**
 * Ritorna la data di inizio anno in relazione ad una data 
*/
function getDataInizioAnno(dataInput)
{
	return getDataRiferimento(dataInput,"IA");
}

/**
 * Ritorna la data di fine anno in relazione ad una data 
*/
function getDataFineAnno(dataInput)
{
	return getDataRiferimento(dataInput,"FA");
}

/** 
 * Esegue la trasformazione degli apici da doppi a singoli e viceversa
 * Trasforma il carattere " in '' (doppie virgolette in due apici);
 * Trasforma il carattere ' in " (apice in doppie virgolette);
 * Parametri: text, testo da analizzare
 *            charToSubst: carattere che deve essere sostituito
 * N.B.: Attenzione ad utilizzarla nel contesto giusto onde evitare 
 *       terminazioni di stringa indesiderate;       
*/
function replaceApici(text,charToSubst)
{
	/*if (!charToSubst) return text;
	// Trasforma " in ''
	if (charToSubst=="\"")
		return strReplace(text,"\"","''");
	// Trasforma ' in "
	else
		return strReplace(text,"'","\"");*/
		
	if (!charToSubst) return text;
	// Trasforma " in ''
	if (charToSubst=="\"")
		return strReplace(text,"\"","''");
	// Trasforma ' in "
	else
		return strReplace(text,"'","''");
	

		
		
}

/**
 * returnPrefixStr: se 'condition' e' vera, ritorna 'prefixStr'+'inputStr', 
 *                  altrimenti solo inputStr;  
*/
function returnPrefixStr(inputStr,condition,prefixStr)
{
  	return ((eval(condition))?prefixStr:"")+inputStr;		
}

/**
 * returnPostfixStr: se 'condition' e' vera, ritorna 'inputStr'+'postfixStr', 
 *                   altrimenti solo inputStr;  
*/
function returnPostfixStr(inputStr,condition,postfixStr)
{
  	return inputStr+((eval(condition))?postfixStr:"");		
}

/**
 * returnCurrentDate: ritorna la data corrente nel formato DD/MM/YYYY 
*/ 
function returnCurrentDate()
{
	return returnPrefixStr(currentDate.getDate(),"inputStr<10","0")+"/"+returnPrefixStr(currentDate.getMonth()+1,"inputStr<10","0")+"/"+currentDate.getFullYear();
}

/**
 * Cattura l'evento KeyPress e permette solo:
 * + o - (a seconda del parametro conSegno)
 * cifre da 0 a 9
 * . o , (numeri decimali con segno)
 *  altrimenti annulla l'evento.
 * Inoltre trasforma il . in , (in pratica si imposta sempre la , come separatore dei decimali)
*/
function checkAllDecimalDigit(event,field,conSegno)
{
   var condizioneSegno;
   
   if (isIE)
   {
   	if(conSegno==true)
   		condizioneSegno=(event.keyCode>=43 && event.keyCode<=46);
   	else
   		condizioneSegno=(event.keyCode==44 || event.keyCode==46);
   
      if (event.keyCode>=32 && ! ((event.keyCode>=48 && event.keyCode<=57) || condizioneSegno))
	 		event.keyCode=0;
	 	else if(event.keyCode==46) //si sostituisce il . con la ,
			event.keyCode=44;

      return;
   }

   if (isNS)
   {
   	if(conSegno==true)
   		condizioneSegno=(event.charCode>=43 && event.charCode<=46);
   	else
   		condizioneSegno=(event.charCode==44 || event.charCode==46);

      if (event.charCode!=0 && ! event.altKey && ! event.ctrlKey && ! event.metaKey &&
	    ! ((event.charCode>=48 && event.charCode<=57) || condizioneSegno))
			event.preventDefault();
	 	else if(event.charCode==46)  //si sostituisce il . con la ,
	 	{
			if (event.preventDefault) 
			{
			  event.preventDefault();
			}
			
			/* NOTA: field e' il campo di input contenete la stringa in esame */
			var oldSelectionStart = field.selectionStart;
			var oldSelectionEnd = field.selectionEnd;
			var selectedText = field.value.substring(oldSelectionStart,oldSelectionEnd);
	      var newText=",";
	      
	      field.value = field.value.substring(0, oldSelectionStart) +
							        newText +
			   				     field.value.substring(oldSelectionEnd);
								     field.setSelectionRange(oldSelectionStart + newText.length,oldSelectionStart + newText.length);
			return;
 	   }
	 }
}

/**
 * Cattura l'evento KeyPress e permette solo:
 * + o -
 * cifre da 0 a 9
 * . o , (numeri decimali con segno)
 *  altrimenti annulla l'evento.
 * Inoltre trasforma il . in , (in pratica si imposta sempre la , come separatore dei decimali)
*/
function checkDecimalDigit(event,field)
{
	checkAllDecimalDigit(event,field,true);
}

/**
 * Cattura l'evento KeyPress e permette solo:
 * cifre da 0 a 9
 * . o , (numeri decimali con segno)
 *  altrimenti annulla l'evento.
 * Inoltre trasforma il . in , (in pratica si imposta sempre la , come separatore dei decimali)
*/
function checkPositiveDecimalDigit(event,field)
{
	checkAllDecimalDigit(event,field,false);
}

/**
 * Controlla e formatta il numero decimale presente nel field.
 * Si controlla che il numero abbia al piu' lunghezzaInteri interi e al piu' lunghezzaDecimali decimali.
 * Per la formattazione si fa riferimento alle funzioni contenute in NumberFormat153.js. 
 * Se visualizzaSeparatoreMigliaia==false nella formattazione si eliminano i . (ossia i separatori della migliaia).
 * NOTA: si assume separatoreMigliaia="." e  separatoreDecimali=","
*/
function formatDecimal(field,lunghezzaInteri,lunghezzaDecimali,visualizzaSeparatoreMigliaia)
{
	var obj;

	formatError=false;

	if (field.toString().indexOf("object")>=0)
		obj=field.value; 
	else 
		obj=field+"";
	
	if (obj=="")
		return;

	var reSeparatoreMigliaia = /\./g;
	
   // Controllo formato numero
   var reFormato = new RegExp('^([-+]?\\d{1,'+lunghezzaInteri+'}\\,\\d{0,'+lunghezzaDecimali+'}|([-+]?\\d{1,'+lunghezzaInteri+'}))$');
   var app=obj.replace(reSeparatoreMigliaia,"");	//elimina il separatoreMigliaia dal testo 
   if (app.search(reFormato)==-1)
   {
   	alert("Numero in formato errato \n(Formato ammesso: massimo "+lunghezzaInteri+" interi e massimo "+lunghezzaDecimali+" decimali)");
   	if (field.toString().indexOf("object")>=0) field.focus();
   	formatError=true;
		return;	
   }
	
	// Formattazione tramite NumberFormat153.js
	var num = new NumberFormat();
	num.setInputDecimal(',');		//separatore dei decimali
	num.setNumber(obj);	//imposta il numero da formattare
	num.setPlaces(lunghezzaDecimali);	//numero di decimali, Nota: con -1 non si esegue arrotondamenti sui decimali
	//num.setCurrencyValue('ï¿½');	//simbolo valuta
	num.setCurrency(false);			//visualizzazione del simbolo valuta
	num.setCurrencyPosition(num.LEFT_OUTSIDE);	//posizionamento del simbolo valuta
	num.setNegativeFormat(num.LEFT_DASH);	//posizionamento del segno
	num.setNegativeRed(false);	//in rosso i numeri negativi
	num.setSeparators(true, '.', ',');	//separatore delle migliaia e dei decimali
	obj = num.toFormatted();		//esegue la formattazione
	
	// Elimina il separatore delle migliaia se non richiesto
	if (visualizzaSeparatoreMigliaia==false)
		obj=obj.replace(reSeparatoreMigliaia,"");
		
	if (field.toString().indexOf("object")<0) 
		return obj;
	else
		field.value=obj;	
}

/** 
 * Controlla e formatta un importo
*/
function formatImporto(field)
{
	if (field.toString()!="[object]")
		return formatDecimal(field,9,2,true);
	else
		formatDecimal(field,9,2,true);
}

/** 
 * Controlla e formatta una percentuale
*/
function formatPerc(field)
{
   if (getNumberForEval(field.value)>100)
   {
   	alert("Una percentuale non puo' essere > di 100");
   	if (field.toString()=="[object]") field.focus();
		return;	
   }
	
	if (field.toString()!="[object]")
		return formatDecimal(field,3,3,false);
	else
		formatDecimal(field,3,3,false);
}

/** 
 * Controlla e formatta un valore
*/
function formatValore(field)
{
	formatDecimal(field,9,6,true);
}

/**
 * Riceve in ingresso una stringa che rappresenta un numero intero o decimale 
 * eventualmente formattato (con separatore delle migliaia "." e separatore decimale=",")
 * e restituisce un float nel formato PARTEINTERA.PARTEDECIMALE 
 * N.B.: Non va utilizzato per impostare il value di un campo INPUT ma solo
 *       per effettuare confronti e calcoli interni lato JS.
*/
function getNumberForEval(value)
{ 
   // Sostituisce i "." con "" e la "," con "."
   if (value=="") value="0";
   value=value.replace(/\./g,"");
   value=value.replace(/\,/,".");
   return parseFloat(value);
}   

/** 
 * ATTENZIONE: Blocco di funzioni per gestione decimali - NON UTILIZZARE! 
 * Nome file originale: NumberFormat153.js
 *
 * -----------------------------------
 * NumberFormat153.js INIZIO BLOCCO    
 * -----------------------------------
*/ 

/*
 * NumberFormat constructor
 * num - The number to be formatted.
 *  Also refer to setNumber
 * inputDecimal - (Optional) The decimal character for the input
 *  Also refer to setInputDecimal
 */
function NumberFormat(num, inputDecimal)
{
	// constants
	this.COMMA = ',';
	this.PERIOD = '.';
	this.DASH = '-'; // v1.5.0 - new - used internally
	this.LEFT_PAREN = '('; // v1.5.0 - new - used internally
	this.RIGHT_PAREN = ')'; // v1.5.0 - new - used internally
	this.LEFT_OUTSIDE = 0; // v1.5.0 - new - currency
	this.LEFT_INSIDE = 1;  // v1.5.0 - new - currency
	this.RIGHT_INSIDE = 2;  // v1.5.0 - new - currency
	this.RIGHT_OUTSIDE = 3;  // v1.5.0 - new - currency
	this.LEFT_DASH = 0; // v1.5.0 - new - negative
	this.RIGHT_DASH = 1; // v1.5.0 - new - negative
	this.PARENTHESIS = 2; // v1.5.0 - new - negative
	this.NO_ROUNDING = -1 // v1.5.1 - new

	// member variables
	this.num;
	this.numOriginal;
	this.hasSeparators = false;  // v1.5.0 - new
	this.separatorValue;  // v1.5.0 - new
	this.inputDecimalValue; // v1.5.0 - new
	this.decimalValue;  // v1.5.0 - new
	this.negativeFormat; // v1.5.0 - new
	this.negativeRed; // v1.5.0 - new
	this.hasCurrency;  // v1.5.0 - modified
	this.currencyPosition;  // v1.5.0 - new
	this.currencyValue;  // v1.5.0 - modified
	this.places;
	this.roundToPlaces; // v1.5.1 - new

	// external methods
	this.setNumber = setNumberNF;
	this.toUnformatted = toUnformattedNF;
	this.setInputDecimal = setInputDecimalNF; // v1.5.0 - new
	this.setSeparators = setSeparatorsNF; // v1.5.0 - new - for separators and decimals
	this.setCommas = setCommasNF;
	this.setNegativeFormat = setNegativeFormatNF; // v1.5.0 - new
	this.setNegativeRed = setNegativeRedNF; // v1.5.0 - new
	this.setCurrency = setCurrencyNF;
	this.setCurrencyPrefix = setCurrencyPrefixNF;
	this.setCurrencyValue = setCurrencyValueNF; // v1.5.0 - new - setCurrencyPrefix uses this
	this.setCurrencyPosition = setCurrencyPositionNF; // v1.5.0 - new - setCurrencyPrefix uses this
	this.setPlaces = setPlacesNF;
	this.toFormatted = toFormattedNF;
	this.toPercentage = toPercentageNF;
	this.getOriginal = getOriginalNF;
	this.moveDecimalRight = moveDecimalRightNF;
	this.moveDecimalLeft = moveDecimalLeftNF;

	// internal methods
	this.getRounded = getRoundedNF;
	this.preserveZeros = preserveZerosNF;
	this.justNumber = justNumberNF;
	this.expandExponential = expandExponentialNF;
	this.getZeros = getZerosNF;
	this.moveDecimalAsString = moveDecimalAsStringNF;
	this.moveDecimal = moveDecimalNF;
	this.addSeparators = addSeparatorsNF;

	// setup defaults
	if (inputDecimal == null) 
		this.setNumber(num, this.PERIOD);
	else 
		this.setNumber(num, inputDecimal); // v.1.5.1 - new
	this.setCommas(true);
	this.setNegativeFormat(this.LEFT_DASH); // v1.5.0 - new
	this.setNegativeRed(false); // v1.5.0 - new
	this.setCurrency(false); // v1.5.1 - false by default
	this.setCurrencyPrefix('$');
	this.setPlaces(2);
}

/*
 * setInputDecimal
 * val - The decimal value for the input.
 *
 * v1.5.0 - new
 */
function setInputDecimalNF(val)
{
	this.inputDecimalValue = val;
}

/*
 * setNumber - Sets the number
 * num - The number to be formatted
 * inputDecimal - (Optional) The decimal character for the input
 *  Also refer to setInputDecimal
 * 
 * If there is a non-period decimal format for the input,
 * setInputDecimal should be called before calling setNumber.
 *
 * v1.5.0 - modified
 */
function setNumberNF(num, inputDecimal)
{
	if (inputDecimal != null) 
		this.setInputDecimal(inputDecimal); // v.1.5.1 - new
	
	this.numOriginal = num;
	this.num = this.justNumber(num);
}

/*
 * toUnformatted - Returns the number as just a number.
 * If the original value was '100,000', then this method will return the number 100000
 * v1.0.2 - Modified comments, because this method no longer returns the original value.
 */
function toUnformattedNF()
{
	return (this.num);
}

/*
 * getOriginal - Returns the number as it was passed in, which may include non-number characters.
 * This function is new in v1.0.2
 */
function getOriginalNF()
{
	return (this.numOriginal);
}

/*
 * setNegativeFormat - How to format a negative number.
 * 
 * format - The format. Use one of the following constants.
 * LEFT_DASH   example: -1000
 * RIGHT_DASH  example: 1000-
 * PARENTHESIS example: (1000)
 *
 * v1.5.0 - new
 */
function setNegativeFormatNF(format)
{
	this.negativeFormat = format;
}

/*
 * setNegativeRed - Format the number red if it's negative.
 * 
 * isRed - true, to format the number red if negative, black if positive;
 *  false, for it to always be black font.
 *
 * v1.5.0 - new
 */
function setNegativeRedNF(isRed)
{
	this.negativeRed = isRed;
}

/*
 * setSeparators - One purpose of this method is to set a
 *  switch that indicates if there should be separators between groups of numbers.
 *  Also, can use it to set the values for the separator and decimal.
 *  For example, in the value 1,000.00
 *   The comma (,) is the separator and the period (.) is the decimal.
 *
 * Both separator or decimal are not required.
 * The separator and decimal cannot be the same value. If they are, decimal with be changed.
 * Can use the following constants (via the instantiated object) for separator or decimal:
 *  COMMA
 *  PERIOD
 * 
 * isC - true, if there should be separators; false, if there should be no separators
 * separator - the value of the separator.
 * decimal - the value of the decimal.
 *
 * v1.5.0 - new
 */
function setSeparatorsNF(isC, separator, decimal)
{
	this.hasSeparators = isC;
	
	// Make sure a separator was passed in
	if (separator == null) separator = this.COMMA;
	
	// Make sure a decimal was passed in
	if (decimal == null) decimal = this.PERIOD;
	
	// Additionally, make sure the values aren't the same.
	//  When the separator and decimal both are periods, make the decimal a comma.
	//  When the separator and decimal both are any other value, make the decimal a period.
	if (separator == decimal) 
		this.decimalValue = (decimal == this.PERIOD) ? this.COMMA : this.PERIOD;
	else 
		this.decimalValue = decimal;
	
	// Since the decimal value changes if decimal and separator are the same,
	// the separator value can keep its setting.
	this.separatorValue = separator;
}

/*
 * setCommas - Sets a switch that indicates if there should be commas.
 * The separator value is set to a comma and the decimal value is set to a period.
 * isC - true, if the number should be formatted with separators (commas); false, if no separators
 *
 * v1.5.0 - modified
 */
function setCommasNF(isC)
{
	this.setSeparators(isC, this.COMMA, this.PERIOD);
}

/*
 * setCurrency - Sets a switch that indicates if should be displayed as currency
 * isC - true, if should be currency; false, if not currency
 */
function setCurrencyNF(isC)
{
	this.hasCurrency = isC;
}

/*
 * setCurrencyPrefix - Sets the symbol for currency.
 * val - The symbol
 */
function setCurrencyValueNF(val)
{
	this.currencyValue = val;
}

/*
 * setCurrencyPrefix - Sets the symbol for currency.
 * The symbol will show up on the left of the numbers and outside a negative sign.
 * cp - The symbol
 *
 * v1.5.0 - modified - This now calls setCurrencyValue and setCurrencyPosition(this.LEFT_OUTSIDE)
 */
function setCurrencyPrefixNF(cp)
{
	this.setCurrencyValue(cp);
	this.setCurrencyPosition(this.LEFT_OUTSIDE);
}

/*
 * setCurrencyPosition - Sets the position for currency,
 *  which includes position relative to the numbers and negative sign.
 * cp - The position. Use one of the following constants.
 *  This method does not automatically put the negative sign at the left or right.
 *  They are left by default, and would need to be set right with setNegativeFormat.
 *	LEFT_OUTSIDE  example: $-1.00
 *	LEFT_INSIDE   example: -$1.00
 *	RIGHT_INSIDE  example: 1.00$-
 *	RIGHT_OUTSIDE example: 1.00-$
 *
 * v1.5.0 - new
 */
function setCurrencyPositionNF(cp)
{
	this.currencyPosition = cp
}

/*
 * setPlaces - Sets the precision of decimal places
 * p - The number of places.
 *  -1 or the constant NO_ROUNDING turns off rounding to a set number of places.
 *  Any other number of places less than or equal to zero is considered zero.
 *
 * v1.5.1 - modified
 */
function setPlacesNF(p)
{
	this.roundToPlaces = !(p == this.NO_ROUNDING); // v1.5.1
	this.places = (p < 0) ? 0 : p; // v1.5.1 - Don't leave negatives.
}

/*
 * v1.5.2 - new
 *
 * addSeparators
 * The value to be formatted shouldn't have any formatting already.
 *
 * nStr - A number or number as a string
 * inD - Input decimal (string value). Example: '.'
 * outD - Output decimal (string value). Example: '.'
 * sep - Output separator (string value). Example: ','
 */
function addSeparatorsNF(nStr, inD, outD, sep)
{
	nStr += '';
	var dpos = nStr.indexOf(inD);
	var nStrEnd = '';
	if (dpos != -1) 
	{
		nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
		nStr = nStr.substring(0, dpos);
	}
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) 
	{
		nStr = nStr.replace(rgx, '$1' + sep + '$2');
	}
	return nStr + nStrEnd;
}

/*
 * toFormatted - Returns the number formatted according to the settings (a string)
 *
 * v1.5.0 - modified
 * v1.5.1 - modified
 */
function toFormattedNF()
{	
	var pos;
	var nNum = this.num; // v1.0.1 - number as a number
	var nStr;            // v1.0.1 - number as a string
	var splitString = new Array(2);   // v1.5.0
	
	// round decimal places - modified v1.5.1
	// Note: Take away negative temporarily with Math.abs
	if (this.roundToPlaces) 
	{
		nNum = this.getRounded(nNum);
		nStr = this.preserveZeros(Math.abs(nNum)); // this step makes nNum into a string. v1.0.1 Math.abs
	} 
	else 
		nStr = this.expandExponential(Math.abs(nNum)); // expandExponential is called in preserveZeros, so call it here too
	
	// v1.5.3 - lost the if in 1.5.2, so putting it back
	if (this.hasSeparators) 
		// v1.5.2
		// Note that the argument being passed in for inD is this.PERIOD
		//  That's because the toFormatted method is working with an unformatted number
		nStr = this.addSeparators(nStr, this.PERIOD, this.decimalValue, this.separatorValue);
	
	// negative and currency
	// $[c0] -[n0] $[c1] -[n1] #.#[nStr] -[n2] $[c2] -[n3] $[c3]
	var c0 = '';
	var n0 = '';
	var c1 = '';
	var n1 = '';
	var n2 = '';
	var c2 = '';
	var n3 = '';
	var c3 = '';
	var negSignL = (this.negativeFormat == this.PARENTHESIS) ? this.LEFT_PAREN : this.DASH;
	var negSignR = (this.negativeFormat == this.PARENTHESIS) ? this.RIGHT_PAREN : this.DASH;
		
	if (this.currencyPosition == this.LEFT_OUTSIDE) 
	{
		// add currency sign in front, outside of any negative. example: $-1.00	
		if (nNum < 0) 
		{
			if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n1 = negSignL;
			if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n2 = negSignR;
		}
		if (this.hasCurrency) c0 = this.currencyValue;
	} 
	else if (this.currencyPosition == this.LEFT_INSIDE) 
	{
		// add currency sign in front, inside of any negative. example: -$1.00
		if (nNum < 0) 
		{
			if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n0 = negSignL;
			if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n3 = negSignR;
		}
		if (this.hasCurrency) c1 = this.currencyValue;
	}
	else if (this.currencyPosition == this.RIGHT_INSIDE) 
	{
		// add currency sign at the end, inside of any negative. example: 1.00$-
		if (nNum < 0) 
		{
			if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n0 = negSignL;
			if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n3 = negSignR;
		}
		if (this.hasCurrency) c2 = this.currencyValue;
	}
	else if (this.currencyPosition == this.RIGHT_OUTSIDE) 
	{
		// add currency sign at the end, outside of any negative. example: 1.00-$
		if (nNum < 0) 
		{
			if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n1 = negSignL;
			if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n2 = negSignR;
		}
		if (this.hasCurrency) c3 = this.currencyValue;
	}

	nStr = c0 + n0 + c1 + n1 + nStr + n2 + c2 + n3 + c3;
	
	// negative red
	if (this.negativeRed && nNum < 0) 
		nStr = '<font color="red">' + nStr + '</font>';

	return (nStr);
}

/*
 * toPercentage - Format the current number as a percentage.
 * This is separate from most of the regular formatting settings.
 * The exception is the number of decimal places.
 * If a number is 0.123 it will be formatted as 12.3%
 *
 * !! This is an initial version, so it doesn't use many settings.
 * !! should use some of the formatting settings that toFormatted uses.
 * !! probably won't want to use settings like currency.
 *
 * v1.5.0 - new
 */
function toPercentageNF()
{
	nNum = this.num * 100;
	
	// round decimal places
	nNum = this.getRounded(nNum);
	
	return nNum + '%';
}

/*
 * Return concatenated zeros as a string. Used to pad a number.
 * It might be extra if already have many decimal places
 * but is needed if the number doesn't have enough decimals. 
 */
function getZerosNF(places)
{
		var extraZ = '';
		var i;
		for (i=0; i<places; i++) 
		{
			extraZ += '0';
		}
		return extraZ;
}

/*
 * Takes a number that JavaScript expresses in notational format
 * and makes it the full number (as a string).
 * e.g. Makes -1e-21 into -0.000000000000000000001
 *
 * If the value passed in is not a number (as determined by isNaN),
 * this function just returns the original value.
 *
 * Exponential number formats can include 1e21 1e+21 1e-21
 *  where 1e21 and 1e+21 are the same thing.
 *
 * If an exponential number is evaluated by JavaScript,
 * it will change 12.34e-9 to 1.234e-8,
 * which is a benefit to this method, because
 * it prevents extra zeros that occur for certain numbers
 * when using moveDecimalAsString
 *
 * Returns a string.
 *
 * v1.5.1 - new
 */
function expandExponentialNF(origVal)
{
	if (isNaN(origVal)) return origVal;

	var newVal = parseFloat(origVal) + ''; // parseFloat to let JavaScript evaluate number
	var eLoc = newVal.toLowerCase().indexOf('e');

	if (eLoc != -1) 
	{
		var plusLoc = newVal.toLowerCase().indexOf('+');
		var negLoc = newVal.toLowerCase().indexOf('-', eLoc); // search for - after the e
		var justNumber = newVal.substring(0, eLoc);
		
		if (negLoc != -1) 
		{
			// shift decimal to the left
			var places = newVal.substring(negLoc + 1, newVal.length);
			justNumber = this.moveDecimalAsString(justNumber, true, parseInt(places));
		} 
		else 
		{
			// shift decimal to the right
			// Check if there's a plus sign, and if not refer to where the e is.
			// This is to account for either formatting 1e21 or 1e+21
			if (plusLoc == -1) plusLoc = eLoc;
			var places = newVal.substring(plusLoc + 1, newVal.length);
			justNumber = this.moveDecimalAsString(justNumber, false, parseInt(places));
		}
		
		newVal = justNumber;
	}

	return newVal;
} 

/*
 * Move decimal right.
 * Returns a number.
 *
 * v1.5.1 - new
 */
function moveDecimalRightNF(val, places)
{
	var newVal = '';
	
	if (places == null) 
		newVal = this.moveDecimal(val, false);
	else 
		newVal = this.moveDecimal(val, false, places);
	
	return newVal;
}

/*
 * Move decimal left.
 * Returns a number.
 *
 * v1.5.1 - new
 */
function moveDecimalLeftNF(val, places)
{
	var newVal = '';
	
	if (places == null) 
		newVal = this.moveDecimal(val, true);
	else 
		newVal = this.moveDecimal(val, true, places);
	
	return newVal;
}

/*
 * moveDecimalAsString
 * This is used by moveDecimal, and does not run parseFloat on the return value.
 * 
 * Normally a decimal place is moved by multiplying by powers of 10
 * Multiplication and division in JavaScript can result in floating point limitations.
 * So use this method to move a decimal place left or right.
 *
 * Parameters:
 * val - The value to be shifted. Can be a number or a string,
 *  but don't include special characters. It should evaluate to a number.
 * left - If true, then move decimal left. If false, move right.
 * places - (optional) If not included, then use the objects this.places
 *  The purpose is so this method can be used independent of the state of the object.
 *
 * The regular expressions:
 * re1
 * Pad with zeros in case there aren't enough numbers to cover the spaces shift.
 * A left shift pads to the left, and a right shift pads to the right.
 * Can't just concatenate. There might be a negative sign or the value could be an exponential.
 *
 * re2
 * Switch the decimal.
 * Need the first [0-9]+ to force the search to start rightmost.
 * The \.? and [0-9]{} criteria are the pieces that will be switched
 *
 * Other notes:
 * This method works on exponential numbers, e.g. 1.7e-12
 * because the regular expressions only modify the number and decimal parts.
 *
 * Mozilla can't handle [0-9]{0} in the regular expression.
 *  Fix: Since nothing changes when the decimal is shifted zero places, return the original value.
 *
 * IE is incorrect if exponential ends in .
 *  e.g. -8500000000000000000000. should be -8.5e+21
 *  IE counts it as -8.5e+22
 *	Fix: Replace trailing period, if there is one, using replace(/\.$/, '').
 *
 * Netscape 4.74 cannot handle a leading - in the string being searched for the re2 expressions.
 *  e.g. /([0-9]*)(\.?)([0-9]{2})/ should match everything in -100.00 except the -
 *  but it matches nothing using Netscape 4.74.
 *  It might be a combination of the * ? special characters.
 *  Fix: (-?) was added to each of the re2 expressions to look for - one or zero times.
 *
 * Returns a string.
 *
 * v1.5.1 - new
 * v1.5.2 - modified
 */
function moveDecimalAsStringNF(val, left, places)
{
	var spaces = (arguments.length < 3) ? this.places : places;
	if (spaces <= 0) return val; // to avoid Mozilla limitation
			
	var newVal = val + '';
	var extraZ = this.getZeros(spaces);
	var re1 = new RegExp('([0-9.]+)');
	if (left) 
	{
		newVal = newVal.replace(re1, extraZ + '$1');
		var re2 = new RegExp('(-?)([0-9]*)([0-9]{' + spaces + '})(\\.?)');		
		newVal = newVal.replace(re2, '$1$2.$3');
	} 
	else 
	{
		var reArray = re1.exec(newVal); // v1.5.2
		if (reArray != null) 
			newVal = newVal.substring(0,reArray.index) + reArray[1] + extraZ + newVal.substring(reArray.index + reArray[0].length); // v1.5.2
		var re2 = new RegExp('(-?)([0-9]*)(\\.?)([0-9]{' + spaces + '})');
		newVal = newVal.replace(re2, '$1$2$4.');
	}
	newVal = newVal.replace(/\.$/, ''); // to avoid IE flaw
	
	return newVal;
}

/*
 * moveDecimal
 * Refer to notes in moveDecimalAsString
 * parseFloat is called here to clear away the padded zeros.
 *
 * Returns a number.
 *
 * v1.5.1 - new
 */
function moveDecimalNF(val, left, places)
{
	var newVal = '';
	
	if (places == null) 
		newVal = this.moveDecimalAsString(val, left);
	else 
		newVal = this.moveDecimalAsString(val, left, places);
	
	return parseFloat(newVal);
}

/*
 * getRounded - Used internally to round a value
 * val - The number to be rounded
 * 
 *  To round to a certain decimal precision,
 *  all that should need to be done is
 *  multiply by a power of 10, round, then divide by the same power of 10.
 *  However, occasional numbers don't get exact results in most browsers.
 *  e.g. 0.295 multiplied by 10 yields 2.9499999999999997 instead of 2.95
 *  Instead of adjusting the incorrect multiplication,
 *  this function uses string manipulation to shift the decimal.
 *
 * Returns a number.
 *
 * v1.5.1 - modified
 */
function getRoundedNF(val)
{
	val = this.moveDecimalRight(val);
	val = Math.round(val);
	val = this.moveDecimalLeft(val);
	
	return val;
}

/*
 * preserveZeros - Used internally to make the number a string
 * 	that preserves zeros at the end of the number
 * val - The number
 */
function preserveZerosNF(val)
{
	var i;

	// make a string - to preserve the zeros at the end
	val = this.expandExponential(val);
	
	if (this.places <= 0) return val; // leave now. no zeros are necessary - v1.0.1 less than or equal
	
	var decimalPos = val.indexOf('.');
	if (decimalPos == -1) 
	{
		val += '.';
		for (i=0; i<this.places; i++) 
		{
			val += '0';
		}
	} 
	else 
	{
		var actualDecimals = (val.length - 1) - decimalPos;
		var difference = this.places - actualDecimals;
		for (i=0; i<difference; i++) 
		{
			val += '0';
		}
	}
	
	return val;
}
      
function padStringLeft(stringa, lung, carattere)
{
  while (stringa.length<lung)
  {
  	  stringa=carattere+stringa;
  }
  return stringa;
}
	
function padStringRight(stringa, lung, carattere)
{
  while (stringa.length<lung)
  {
	  stringa=stringa+carattere;
  }
  return stringa;
}

/*
 * justNumber - Used internally to parse the value into a floating point number.
 * Replace all characters that are not 0-9, a decimal point, or a negative sign.
 *
 *  A number can be entered using special notation.
 *  For example, the following is a valid number: 0.0314E+2
 *
 * v1.0.2 - new
 * v1.5.0 - modified
 * v1.5.1 - modified
 * v1.5.2 - modified
 */
function justNumberNF(val)
{
	newVal = val + '';
	
	var isPercentage = false;
	
	// check for percentage
	// v1.5.0
	if (newVal.indexOf('%') != -1) 
	{
		newVal = newVal.replace(/\%/g, '');
		isPercentage = true; // mark a flag
	}
		
	// Replace everything but digits - + ( ) e E
	var re = new RegExp('[^\\' + this.inputDecimalValue + '\\d\\-\\+\\(\\)eE]', 'g');	// v1.5.2	
	newVal = newVal.replace(re, '');
	// Replace the first decimal with a period and the rest with blank
	// The regular expression will only break if a special character
	//  is used as the inputDecimalValue
	//  e.g. \ but not .
	var tempRe = new RegExp('[' + this.inputDecimalValue + ']', 'g');
	var treArray = tempRe.exec(newVal); // v1.5.2
	if (treArray != null) 
	{
	   var tempRight = newVal.substring(treArray.index + treArray[0].length); // v1.5.2
		newVal = newVal.substring(0,treArray.index) + this.PERIOD + tempRight.replace(tempRe, ''); // v1.5.2
	}
	
	// If negative, get it in -n format
	if (newVal.charAt(newVal.length - 1) == this.DASH ) 
	{
		newVal = newVal.substring(0, newVal.length - 1);
		newVal = '-' + newVal;
	}
	else if (newVal.charAt(0) == this.LEFT_PAREN
	 && newVal.charAt(newVal.length - 1) == this.RIGHT_PAREN) 
	{
		newVal = newVal.substring(1, newVal.length - 1);
		newVal = '-' + newVal;
	}
	
	newVal = parseFloat(newVal);
	
	if (!isFinite(newVal)) 
		newVal = 0;
	
	// now that it's a number, adjust for percentage, if applicable.
   // example. if the number was formatted 24%, then move decimal left to get 0.24
   // v1.5.0 - updated v1.5.1
   if (isPercentage) 
  		newVal = this.moveDecimalLeft(newVal, 2);
		
	return newVal;
}

/**
 * --------------------------------
 * NumberFormat153.js FINE BLOCCO
 * --------------------------------
*/                   	


/*
 * Formatta anno (se passato delta somma il delta per capire se anno futoro o passata es:
 * siamo nel 2010 nel val passo 11 e nel delta passo 1 considero 2011
 * siamo nel 2010 nel val passo 11 e nel delta passo 0 considero 1911
 */
function formatYear(val, deltaAnnoFuturo)
{
	// Ultime 2 cifre dell'anno corrente+(delta)anni
	if (deltaAnnoFuturo>0 && deltaAnnoFuturo<99)
		var ult=Number(String(new Date().getYear()).substr(2,2))+deltaAnnoFuturo;
	else
		var ult=Number(String(new Date().getYear()).substr(2,2));

		switch (val.length)
		{
			case 1:
			case 2:
				if (val.length==1)
					val="0"+val;
				if	(Number(val)>ult)
					return 1900+Number(val)
				else
					return 2000+Number(val);
			case 3:
				return 1000+Number(val);
			default:
				return val;
		}
}

/**
 * controlla il cap sull'evento on focus
 * ammette solo numeri
 * @param field
 */

function chkCapFocus(field)
{
	if (!erroreCap)
	{
    	if (field.value!="")
    	{
    		if (field.value.search("^[0-9]+$") == -1)
    		{
    			alert("il campo contiene dei caratteri non ammessi")
		  		field.focus();
    		}
    	}
    	erroreCap=false;
	}
}

/**
 * controlla il cap sull'evento on blur
 * ammette solo numeri
 * @param field
 */
function chkCapBlur(field)
{
	/*if (field.value!="")
	{
		if (field.value.search("^[0-9]+$") == -1)
		{
    		erroreCap=true;
			alert("il campo contiene dei caratteri non ammessi")
	  		field.focus();

		}
	}*/
	if (field.getValue()!="")
	{
		if (field.getValue().search("^[0-9]+$") == -1)
		{
    		erroreCap=true;
			alert("il campo contiene dei caratteri non ammessi");
			field.setValue("");
	  		field.focus();

		}
	}
}

/**
 * controlla cognome/nome sull'evento on focus
 * ammette solo numeri/lettere/. ' -
 * @param field
 */
function chkCoNoFocus(field)
{
	/*if (!erroreCoNo)
	{
    	if (field.value!="")
    	{
    		var campo=field.value.replace(/\s/g,"");
    		if (campo.search("^[a-zA-Z.'-]+$") == -1)
    		{
    			alert("il campo contiene dei caratteri non ammessi")
		  		field.focus();
    		}
    	}
    	erroreCoNo=false;
	}*/
	if (!erroreCoNo)
	{
    	if (field.getValue()!="")
    	{
    		var campo=field.getValue();
    		campo=campo.replace(/\s/g,"");
    		if (campo.search("^[a-zA-Z,.'-]+$") == -1)
    		{
    			alert("il campo contiene dei caratteri non ammessi");
    			field.setValue("");
		  		field.focus();
    		}
    	}
    	erroreCoNo=false;
	}
}

/**
 * controlla cognome/nome sull'evento on blur
 * ammette solo numeri/lettere/. ' -
 * @param field
 */
function chkCoNoBlur(field)
{
	/*if (field.value!="")
	{
		var campo=field.value.replace(/\s/g,"");
		if (campo.search("^[a-zA-Z.'-]+$") == -1)
		{
			erroreCoNo=true;
			alert("il campo contiene dei caratteri non ammessi")
	  		field.focus();
		}
	}*/
	if (field.getValue()!="")
	{
		var campo=field.getValue();
		campo=campo.replace(/\s/g,"");
		if (campo.search("^[a-zA-Z,.'-]+$") == -1)
		{
			erroreCoNo=true;
			alert("il campo contiene dei caratteri non ammessi");
			field.setValue("");
	  		field.focus();
		}
	}
}

/**
 * controlla descrizione generica sull'evento on blur
 * ammette solo numeri/lettere/. ' -
 * @param field
 */
function chkDescBlur(field)
{
	if (field.value!="")
	{
		var campo=field.value.replace(/\s/g,"");
		if (campo.search("^[a-zA-Z0-9.'()/,%*\-]+$") == -1)
		{
			erroreNome=true;
			alert("il campo contiene dei caratteri non ammessi")
	  		field.focus();
		}
	}
}
/**
 * controlla descrizione generica sull'evento on focus
 * ammette solo numeri/lettere/. ' -
 * @param field
 */
function chkDescFocus(field)
{
	if (!erroreNome)
	{
    	if (field.value!="")
    	{
    		var campo=field.value.replace(/\s/g,"");
    		if (campo.search("^[a-zA-Z0-9.'()/,%*\-]+$") == -1)
    		{
    			alert("il campo contiene dei caratteri non ammessi")
		  		field.focus();
    		}
    	}
    	erroreNome=false;
	}
}

/**
 * controlla cognome/nome sull'evento on blur
 * ammette solo numeri/lettere/. ' -
 * @param field
 */
function chkNomeBlur(field)
{
	if (field.value!="")
	{
		var campo=field.value.replace(/\s/g,"");
		if (campo.search("^[a-zA-Z0-9.'-]+$") == -1)
		{
			erroreNome=true;
			alert("il campo contiene dei caratteri non ammessi")
	  		field.focus();
		}
	}
}
/**
 * controlla cognome/nome sull'evento on focus
 * ammette solo numeri/lettere/. ' -
 * @param field
 */
function chkNomeFocus(field)
{
	if (!erroreNome)
	{
    	if (field.value!="")
    	{
    		var campo=field.value.replace(/\s/g,"");
    		if (campo.search("^[a-zA-Z0-9.'-]+$") == -1)
    		{
    			alert("il campo contiene dei caratteri non ammessi")
		  		field.focus();
    		}
    	}
    	erroreNome=false;
	}
}

/**
 * controlla cognome/nome sull'evento on focus
 * ammette solo numeri/lettere/. ' - / ( ) ,
 * @param field
 */
function chkIndFocus(field)
{
	if (!erroreInd)
	{
    	if (field.value!="")
    	{
    		var campo=field.value.replace(/\s/g,"");
    		if (campo.search("^[a-zA-Z0-9.',/()-]+$") == -1)
    		{
    			erroreInd=true;
    			alert("il campo contiene dei caratteri non ammessi")
    	  		field.focus();
    		}
    	}
    	erroreInd=false;
	}
}

/**
 * controlla cognome/nome sull'evento on blur
 * ammette solo numeri/lettere/. ' - / ( ) ,
 * @param field
 */
function chkIndBlur(field)
{
	/*if (field.value!="")
	{
		var campo=field.value.replace(/\s/g,"");
		if (campo.search("^[a-zA-Z0-9.',/()-]+$") == -1)
		{
			erroreInd=true;
			alert("il campo contiene dei caratteri non ammessi")
	  		field.focus();
		}
	}*/
	//console.log(field);
	//console.log(field.getValue());
	
	if (field.getValue()!="")
	{
		var campo=field.getValue();
		campo=campo.replace(/\s/g,"");
		if (campo.search("^[a-zA-Z0-9.',/()-]+$") == -1)
		{
			erroreInd=true;
			alert("il campo contiene dei caratteri non ammessi")
	  		field.focus(true);
		}
	}
}

/**
 * controlla txt area on focus
 * ammette tutto tranne doppi apici e dollaro
 * @param field
 */
function chkTxtAFocus(field)
{
	if (!erroreTxtA)
	{
    	if (field.value!="")
    	{
    		var campo=field.value.replace(/\s/g,"");
    		if (campo.search("^[\$\"]+$") > -1)
    		{
    			erroreTxtA=true;
    			alert("il campo contiene dei caratteri non ammessi (doppi apici e/o dollaro)")
    	  		field.focus();
    		}
    	}
    	erroreTxtA=false;
	}
}

/**
 * controlla txt area sull'evento on blur
 * ammette tutto tranne doppi apici e dollaro
 * @param field
 */
function chkTxtABlur(field)
{
	if (field.value!="")
	{
		var campo=field.value.replace(/\s/g,"");
		if (campo.search("^[\$\"]+$") > -1)
		{
			erroreTxtA=true;
			alert("il campo contiene dei caratteri non ammessi (doppi apici e/o dollaro)")
	  		field.focus();
		}
	}
}
/**
 * 
 * @param field campo da troncare (separatore decimale=. no virgole
 * @param dec decimale max da tenere
 * @returns
 */
function tronca(field,dec)
{
	dec++;
	field=field.toString();
	if(field.indexOf(".")>0){
		field=field.substring(0,field.indexOf(".")+dec);
	}
	field=parseFloat(field);
	return field;
}

function openHelpDoc(nomeSottosistema,nomeDocumento,nomeSegnalibro)
{
	var cartella;
	if(nomeSottosistema=='WHR')
		cartella="whre0"
	//Se e' un pdf
	if (nomeDocumento.toLowerCase().indexOf(".pdf")!=-1)
   	dependentWindow=open("/exec/htmls/static/"+cartella+"/help-doc/"+nomeDocumento+"#nameddest="+nomeSegnalibro+""
             ,"docprova"//+now.getTime() //rende univoco il nome della finestra          
             ,"height=700,width=900"
            +",left="+((screen.width-800)/2)
            +",top=30"
            +",scrollbars=yes"
            +",resizable=yes"
            +",menubar=no");
	else
	   	dependentWindow=open("/exec/htmls/static/"+cartella+"/help-doc/"+nomeDocumento+"#"+nomeSegnalibro+""
	             ,"docprova"//+now.getTime() //rende univoco il nome della finestra          
	             ,"height=700,width=900"
	            +",left="+((screen.width-800)/2)
	            +",top=30"
	            +",scrollbars=yes"
	            +",resizable=yes"
	            +",menubar=no");
	
}    

/********************************************************************************
 * Function : mostraAttenderePrego
 * Desc.    : Attiva se presente il messaggio di ATTENDERE PREGO oscurando i
 *            la view corrente
 *            Per usare al meglio questa funzionalita' occorre:
 *            - inserire un DIV all'interno della pagina principale cosi'
 *              fatto, se il DIV non esiste, non viene fatto nulla
 *              <DIV ID="attenderePrego" CLASS="loading" STYLE="display:none;cursor:wait" CREATO="N"></DIV>
 *              Il div deve essere posizionato in fondo alla pagina, all'interno del tag
 *              FRAME e prima di tutti gli iframe che si vogliono utilizzare,
 *              come quelli per gli zoom e per il lancio della stampa generalizzata
 *            - inserire il seguente codice all'interno della function che blocca i campi della
 *              view, se presente, o comunque dopo il richiamo dell'action java
 *              mostraAttenderePrego();
 * Autore   : Marco Aquino
 * Data     : 05.12.2006
 * Note     : Assicurarsi che sia referenziato il CSS di wfsmw
 *				  <LINK REL="stylesheet" TYPE="text/css" HREF="/exec/htmls/static/webcc/forms/forms.css">
 *******************************************************************************/
function mostraAttenderePrego(msg)
{
 	if(msg==undefined || msg==null)
 		msg="Elaborazione in corso...";

	// Controllo che il DIV sia presente, se non e' presente, per ora non faccio
	// nulla, in futuro si potrebbe creare
	var div = document.getElementById("attenderePrego");
	if (div == null)
		return;
	div.innerHTML="";

	// DIV non presente, inserisco il codice al suo interno
	var obj
	var tabTemp = document.createElement("TABLE");
	tabTemp.width="100%";
	tabTemp.height="96%";
	var tab = div.appendChild(tabTemp);
		
	var primaRiga = tab.insertRow(0);
	primaRiga.style.height = "40%";
	var celw1 = primaRiga.insertCell(0);
	celw1.style.width="30%";
	celw1.style.height = "300";
	celw1.innerHTML="&nbsp;";
	var celw2 = primaRiga.insertCell(1);
	celw2.style.width="30%";
	var celw3 = primaRiga.insertCell(2);
	celw3.style.width="30%";     

	var secondaRiga = tab.insertRow(1);
	secondaRiga.style.height = "20%";
		
	var terzaRiga = tab.insertRow(2);
	terzaRiga.style.height = "40%";
	var celww1 = terzaRiga.insertCell(0);
	celw1.style.width="30%";
	var celww2 = terzaRiga.insertCell(1);
	celw2.style.width="30%";
	var celww3 = terzaRiga.insertCell(2);
	celw3.style.width="30%"; 

	var cel1 = secondaRiga.insertCell(0);
	cel1.style.width="30%";
	var cel = secondaRiga.insertCell(1);
	var cel2 = secondaRiga.insertCell(2);
	cel2.style.width="30%";      		
	cel.valign = "middle";
	cel.align  = "left";
	cel.style.border = "1px black solid";
	
	var tabTemp2 = document.createElement("TABLE");
	tabTemp2.width="100%";
	tabTemp2.height="100%";
	var tab2 = cel.appendChild(tabTemp2)
	
	var firstRow = tab2.insertRow(0);
	firstRow.style.height="50%"
	var firstCel = firstRow.insertCell(0);
	firstCel.colSpan="2";
	
	firstCel.innerHTML="<IMG SRC='/exec/htmls/static/webcc/images/dedalus_loader.gif' />";
	
	var secondRow = tab2.insertRow(1);
	secondRow.style.heigh="50%";
	var firstCel2 = secondRow.insertCell(0);
	firstCel2.style.width="30%";
	var secondCel2 = secondRow.insertCell(1);
	secondCel2.style.width="70%";			
	
	firstCel2.innerHTML="<IMG SRC='/exec/htmls/static/webcc/images/dedalus_loader2.gif' />";
	//obj = secondCel2.appendChild(document.createElement("<SPAN STYLE='font-size: 14px;font-weight: bold; '>"));
	var spanTemp = document.createElement("SPAN");
	spanTemp.style.fontSize="14 px";
	spanTemp.style.fontWeight="bold";
	obj = secondCel2.appendChild(spanTemp);
	//obj = secondCel2.innerHTML="<SPAN STYLE='font-size: 14px;font-weight: bold; '>";
	obj.innerHTML = msg;

	div.CREATO = "S";      		div.ondblclick = function () { if (this.style.cursor!='wait') {nascondiAttenderePrego();} }
	div.oncontextmenu = function () { if (event.ctrlKey && event.altKey) this.style.cursor='normal'; }

	// mostro il DIV
	div.style.display = "block";
	div.style.width   = "100%";
	div.style.height  = "100%";
}

/********************************************************************************
 * Function : nascondiAttenderePrego
 * Desc.    : Nasconde se presente il messaggio di ATTENDERE PREGO
 *            Per usare al meglio questa funzionalita' occorre:
 *            - inserire il seguente codice all'interno della function che sblocca i campi della
 *              view, se presente, o comunque quando si vuole ridare il controllo alla view
 *              nascondiAttenderePrego();
 * Autore   : Marco Aquino
 * Data     : 05.12.2006
 *******************************************************************************/
function nascondiAttenderePrego()
{
	var div = document.getElementById("attenderePrego");
	if (div == null)
		return;
	div.style.display = "none";
}

/********************************************************************************
 * Function : chkMailBlur
 * Desc.    : controllo on blur dell indirizzo mail
 * Data     : 04.10.2013
 *******************************************************************************/
function chkMailBlur(field)
{
	if (field.getValue()!="")
	{
		var campo=field.getValue();
		campo=campo.replace(/\s/g,"");
		if (campo.search("^[a-zA-Z0-9.@-]+$") == -1)
		{
			erroreNome=true;
			alert("il campo contiene dei caratteri non ammessi")
			field.setValue("");
	  		field.focus();
		}
	}
}

/********************************************************************************
 * Function : chkIndDescBlur
 * Desc.    : controllo on blur di descrizioni e Indirizzi 
 * Data     : 04.10.2013
 *******************************************************************************/

function chkIndDescBlur(field)
{
	if (field.getValue()!="")
	{
		var campo=field.getValue();
		campo=campo.replace(/\s/g,"");
		if (campo.search("^[a-zA-Z0-9èéìàùό','.°*^\/]+$") == -1)
		{
			erroreCoNo=true;
			alert("il campo contiene dei caratteri non ammessi");
			field.setValue("");
	  		field.focus();
		}
	}
}

/********************************************************************************
 * Function : chkLocazioneBlur
 * Desc.    : controllo on blur di descrizioni e Indirizzi 
 * Data     : 04.10.2013
 *******************************************************************************/

function chkLocazioneBlur(field)
{
	if (field.getValue()!="")
	{
		var campo=field.getValue();
		campo=campo.replace(/\s/g,"");
		if (campo.search("^[a-zA-Zèéìàùό']+$") == -1)
		{
			erroreCoNo=true;
			alert("il campo contiene dei caratteri non ammessi");
			field.setValue("");
	  		field.focus();
		}
	}
}

