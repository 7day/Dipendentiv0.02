
DELIMITER $$

CREATE PROCEDURE prg_UpdateAnagMatr (
P_d1codazie   int (5)
,P_d1codmatr  int(1)
,P_d1gencogn    			varchar(40)
,P_d1gennome           		varchar(40)
,P_d1gensess					varchar(1)
,P_d1datnasc      			date
,P_d1codfis    				varchar(16)	
,P_d1genctre       		varchar(40)   
,P_d1geninre	            varchar(40)
,P_d1gencpre		            varchar(7)
,P_d1genprre		        varchar(2)
,P_d1genfrre			varchar(40)
,P_d1genpres				varchar(40)
,P_d1genmail					varchar(60)
,P_d1datassu					date
,P_d1datcess					date
,P_d1codrepa					varchar(16)
,P_d1codrege				varchar(2)
,P_d1codfunz					varchar(22)
,P_d1codstgi					int(11)
,P_d1codrala					int(11)
,P_d1codcoec				varchar(2)
,P_d1codinec				varchar(10)
,P_d1codvar1				varchar(30)
,P_d1codvar2				varchar(30)
,P_d1codvar3				varchar(30)
)
BEGIN
    UPDATE d1anagmatr
	SET d1gennome=P_d1gennome
		,d1gencogn=P_d1gencogn
		,d1gensess=P_d1gensess
		,d1datnasc=P_d1datnasc
		,d1codfis=P_d1codfis
		,d1genctre=P_d1genctre
		,d1geninre=P_d1geninre
		,d1gencpre=P_d1gencpre		            
		,d1genprre=P_d1genprre
		,d1genfrre=P_d1genfrre
		,d1genpres=P_d1genpres
		,d1genmail=P_d1genmail
		,d1datassu=P_d1datassu					
		,d1datcess=P_d1datcess		
		,d1codrepa=P_d1codrepa	
		,d1codrege=P_d1codrege
		,d1codfunz=P_d1codfunz				
		,d1codstgi=P_d1codstgi				
		,d1codrala=P_d1codrala
		,d1codcoec=P_d1codcoec
		,d1codinec=P_d1codinec
		,d1codvar1=P_d1codvar1
		,d1codvar2=P_d1codvar2
		,d1codvar3=P_d1codvar3
	
	WHERE d1codmatr=P_d1codmatr AND d1codazie=P_d1codazie;
END$$

DELIMITER ;
