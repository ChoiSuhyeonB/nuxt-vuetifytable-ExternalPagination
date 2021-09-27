DELIMITER $$
CREATE PROCEDURE myFunctions() 
BEGIN
    DECLARE i INT DEFAULT 1; 
    WHILE (i <= 50000) DO 
        INSERT  INTO `todolist` (name) VALUES (i);
        SET i = i + 1;
    END WHILE;
END$$

CALL myFunctions();