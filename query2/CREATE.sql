DROP DATABASE DB;
CREATE DATABASE DB;
USE DB;
CREATE TABLE USER(
 ssn CHAR(16) NOT NULL PRIMARY KEY,					#주민번호
 id  VARCHAR(16) NOT NULL,							#아이디
 pw VARCHAR(21) NOT NULL,							#비밀번호
 phone VARCHAR(12) NOT NULL UNIQUE,					#전화번호
 name VARCHAR(30) NOT NULL,							#이름
 sido VARCHAR(200) NOT NULL							#사용자 주소 시도
);
DELIMITER $$
CREATE TRIGGER trig_user_check BEFORE INSERT ON USER
FOR EACH ROW 
BEGIN 
IF (NEW.ssn REGEXP '[0-9]{6}-[0-9]{7}') = 0 THEN 
  SIGNAL SQLSTATE '10001'
     SET MESSAGE_TEXT = "주민번호는 총 13자리 입니다.";
ELSEIF (NEW.id REGEXP '[A-za-z0-9]{5,15}') = 0 THEN 
  SIGNAL SQLSTATE '10002'
     SET MESSAGE_TEXT = "id는 영문이나 숫자고 길이는 5~15자 입니다.";
ELSEIF (NEW.pw REGEXP '(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,20}') = 0 THEN 
  SIGNAL SQLSTATE '10003'
     SET MESSAGE_TEXT = "비밀번호는 8~20자, 최소 하나의 문자 및 하나의 숫자를 포함해야 합니다.";
ELSEIF (NEW.phone REGEXP '[0-9]{9,12}' ) = 0 THEN 
  SIGNAL SQLSTATE '10004'
     SET MESSAGE_TEXT = "전화번호는 9~11자 입니다.";
END IF; 
END$$
DELIMITER ;

CREATE TABLE V_INFO(
 name VARCHAR(50) NOT NULL PRIMARY KEY,				#백신명
 company VARCHAR(50) NOT NULL,						#회사명
 min_temperature INT NOT NULL,						#최소보관온도
 max_temperature INT NOT NULL,						#최대보관온도
 clinical TINYINT NOT NULL,							#임상3상
 max_capacity TINYINT NOT NULL,						#한병당 접종가능인원
 characteristic VARCHAR(500),						#특징
 expiration_date INT UNSIGNED NOT NULL				#유통기한(일)
);
CREATE TABLE VACCINE(
	number VARCHAR(7) NOT NULL PRIMARY KEY,				#일련번호
	manufacturing_date DATE NOT NULL,					#제조일
	name VARCHAR(50) NOT NULL,							#백신명
	FOREIGN KEY (name) REFERENCES V_INFO(name)
);
DELIMITER $$
CREATE TRIGGER trig_vaccine_number_check BEFORE INSERT ON VACCINE
FOR EACH ROW 
BEGIN 
IF (NEW.number REGEXP '^[A-Z]{2}[0-9]{4}$') = 0 THEN 
  SIGNAL SQLSTATE '20001'
     SET MESSAGE_TEXT = "백신 일련번호는 차례대로 영어대문자 2자리 숫자 4자리로 구성되어야한다.";
END IF; 
END$$
DELIMITER ;



CREATE TABLE HOSPITAL (
	orgcd VARCHAR(64) NOT NULL PRIMARY KEY,			#기관코드
	orgnm VARCHAR(200) NOT NULL,					#기관명
    orgTlno VARCHAR(64) NOT NULL,					#기관전화번호
    sido VARCHAR(200) NOT NULL,						#시, 도
    si VARCHAR(200) NOT NULL,						#시
    orgZipaddr VARCHAR(200) NOT NULL,				#기관주소
    slrYmd VARCHAR(64) NOT NULL,					#기준일자(현재날짜)
    dywk VARCHAR(64) NOT NULL,						#기준일자 요일
    hldyYn VARCHAR(64) NOT NULL,					#기준일자 휴무일여부
    lunchSttTm VARCHAR(64),							#기준일자 점심시작시간
    lunchEndTm VARCHAR(64),							#기준일자 점심종료시간
    sttTm TIME default "09:00:00" NOT NULL,			#기준일자 오픈시간
    endTm TIME default "18:00:00" NOT NULL,			#기준일자 마감시간
    maxCapacityperhour INT default 10				#시간당 접종가능인원수
);
CREATE TABLE INJECTION (
    number VARCHAR(7) PRIMARY KEY NOT NULL,			#일련번호
    ssn CHAR(20) NOT NULL,							#접종자 주민번호
    orgcd VARCHAR(64) NOT NULL,						#병원테이블 id
    inject_date datetime DEFAULT NULL,				#접종날짜
    reservation_time datetime,						#예약시간
	FOREIGN KEY (orgcd) REFERENCES HOSPITAL(orgcd),
    FOREIGN KEY (ssn) REFERENCES USER(ssn),
    FOREIGN KEY (number) REFERENCES VACCINE(number)
);
DELIMITER $$
CREATE TRIGGER vaccine_count_check BEFORE INSERT ON INJECTION
FOR EACH ROW 
BEGIN 
IF (
    (SELECT COUNT(*)
    FROM INJECTION
    WHERE ssn = NEW.ssn)>1
) THEN 
  SIGNAL SQLSTATE '30001'
     SET MESSAGE_TEXT = "백신접종은 1인당 2번이 최대이다.";
END IF; 
END$$
DELIMITER ;

CREATE TABLE DOCTOR (
    number INT PRIMARY KEY NOT NULL,				#의사면허번호
    name varchar(100) NOT NULL,						#의사 이름
    orgcd VARCHAR(64) NOT NULL,						#병원테이블 id
    FOREIGN KEY (orgcd) REFERENCES HOSPITAL(orgcd)
);
DELIMITER $$
CREATE TRIGGER trig_doctor_number_check BEFORE INSERT ON DOCTOR
FOR EACH ROW 
BEGIN 
IF (NEW.number REGEXP '^[0-9]{8}$') = 0 THEN 
  SIGNAL SQLSTATE '40001'
     SET MESSAGE_TEXT = "의사 면허번호는 차례대로 숫자8자리로 구성되어야한다.";
END IF; 
END$$
DELIMITER ;