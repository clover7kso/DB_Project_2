use db;
drop table gov_corona;
CREATE TABLE GOV_CORONA(
	seq INT NOT NULL PRIMARY KEY, 	#게시글번호
	accDefRate DOUBLE, 				#누적확진률 [o]
	accExamCnt INT,   				#누적검사수
	deathCnt INT, 					#사망자수 [o]
	decideCnt INT, 					#확진자수 [o]
	stateDt DATE,   				#기준일
	stateTime TIME,   				#기준시간
	updateDt DATETIME   			#수정일분초
);