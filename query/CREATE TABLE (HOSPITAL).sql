USE vaccine_erp;
CREATE TABLE hospital ( 
	orgcd VARCHAR(64) PRIMARY KEY NOT NULL,
	orgnm VARCHAR(200) NOT NULL,
    orgTlno VARCHAR(64) NOT NULL,
    orgZipaddr VARCHAR(200) NOT NULL,
    slrYmd VARCHAR(64) NOT NULL,
    dywk VARCHAR(64) NOT NULL,
    hldyYn VARCHAR(64) NOT NULL,
    lunchSttTm VARCHAR(64),
    lunchEndTm VARCHAR(64),
    sttTm VARCHAR(64),
    endTm VARCHAR(64)
);