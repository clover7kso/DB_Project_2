USE vaccine_erp;
DROP TABLE user;
CREATE TABLE user ( 
	id VARCHAR(32) PRIMARY KEY NOT NULL,
	email VARCHAR(32) NOT NULL,
    pw VARCHAR(32) NOT NULL,
    name VARCHAR(32) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    birth DATE
);