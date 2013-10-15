
DELIMITER $$

CREATE PROCEDURE prg_InsertAnagMatr(
d1codazie   int (5)
,d1codmatr  int(1)
,d1gencogn    			varchar(40)
,d1gennome           		varchar(40)
,d1gensess					varchar(1)
,d1datnasc      			date
,d1codfis    				varchar(16)	
,d1genctre       		varchar(40)   
,d1geninre	            varchar(40)
,d1gencpre		            varchar(7)
,d1genprre		        varchar(2)
,d1genfrre			varchar(40)
,d1genpres				varchar(40)
,d1genmail					varchar(60)
,d1datassu					date
,d1datcess					date
,d1codrepa					varchar(16)
,d1codrege					varchar(2)
,d1codfunz					varchar(22)
,d1codstgi				int(11)
,d1codrala				int(11)
,d1codcoec				varchar(2)
,d1codinec				varchar(10)
,d1codvar1				varchar(30)
,d1codvar2				varchar(30)
,d1codvar3				varchar(30)
)
BEGIN 


  INSERT INTO d1anagmatr           
          (d1codazie,d1codmatr,d1gencogn,d1gennome,d1gensess,d1datnasc,d1codfis,d1genctre,d1geninre,d1gencpre,d1genprre,d1genfrre,d1genpres,d1genmail,d1datassu,d1datcess,d1codrepa,d1codrege,d1codfunz,d1codstgi,d1codrala,d1codcoec,d1codinec,d1codvar1,d1codvar2,d1codvar3)
  VALUES (d1codazie,d1codmatr,d1gencogn,d1gennome,d1gensess,d1datnasc,d1codfis,d1genctre,d1geninre,d1gencpre,d1genprre,d1genfrre,d1genpres,d1genmail,d1datassu,d1datcess,d1codrepa,d1codrege,d1codfunz,d1codstgi,d1codrala,d1codcoec,d1codinec,d1codvar1,d1codvar2,d1codvar3);

end$$

DELIMITER ;
