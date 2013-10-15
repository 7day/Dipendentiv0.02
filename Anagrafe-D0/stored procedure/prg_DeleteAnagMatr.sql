
DELIMITER $$

CREATE PROCEDURE prg_DeleteAnagMatr (
P_d1codazie					int(5)
,P_d1codmatr				int(1)
)
BEGIN
    DELETE FROM d1anagmatr
	WHERE d1codmatr=P_d1codmatr AND d1codazie=P_d1codazie;
END$$

DELIMITER ;
