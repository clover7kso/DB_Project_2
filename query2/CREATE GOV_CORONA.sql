use db;
CREATE TABLE GOV_CORONA(
	seq INT NOT NULL PRIMARY KEY, 	#게시글번호
	accDefRate DOUBLE, 				#누적확진률
	accExamCnt INT,   				#누적검사수
	accExamCompCnt INT, 			#누적검사완료수
	careCnt INT, 					#치료중 환자 수
	clearCnt INT, 					#격리해제 수
	createDt DATETIME, 				#등록일시분초
	deathCnt INT, 					#사망자수
	decideCnt INT, 					#확진자수
	examCnt INT, 					#검사진행수
	resutlNegCnt INT, 				#결과음성수
	stateDt DATE,   				#기준일
	stateTime TIME,   				#기준시간
	updateDt DATETIME   			#수정일분초
);