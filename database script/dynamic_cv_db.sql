CREATE DATABASE dynamic_cv
	CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;
    
CREATE USER 'site_admin'@'localhost'
	IDENTIFIED BY 'weakpassword123!';
    
GRANT ALL PRIVILEGES ON dynamic_cv.* TO 'site_admin'@'localhost';

FLUSH PRIVILEGES;
