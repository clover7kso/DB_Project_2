-- 같은이름의프로시저있으면삭제
DROP PROCEDURE IF EXISTS cursor_test;
DELIMITER $$
CREATE PROCEDURE cursor_test()
BEGIN
         -- 반복문변수선언
         DECLARE done INTEGER DEFAULT 0;
         -- 커서에서사용할변수선언
         DECLARE v_aaa varchar(10);
         DECLARE v_bbb varchar(10);
         -- 커서에서사용할Select 테이블선언
         DEClARE openCursor CURSOR FOR SELECT aaa, bbb FROM testTable;
         -- 반복문핸들러선언
         DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = true;
         -- 커서오픈
         OPEN openCursor;
                  -- 반복문시작
                  read_loop: LOOP
                           -- 커서에서데이터가져옴
                           FETCH openCursor INTO v_aaa, v_bbb;
                           -- 반복문종료시조건
                           IF done THEN
                                   LEAVE read_loop;
                           END IF;
                           -- 조건에맞는데이터데이터찾아서변수에임시저장
                           Select @codeName := codeName  From codeTable Where codeCode = v_bbb;

                           -- 테이블에저장
                           insert into `insertTable` (`iCode`, `iCodeName`) values(v_bbb, @codeName);

             -- 반복문끝
                  END LOOP read_loop;

         -- 커서해제
         CLOSE openCursor;
END$$
DELIMITER ;

-- 프로시저실행
CALL cursor_test();