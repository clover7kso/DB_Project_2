USE DB;

INSERT USER(ssn, id, pw, phone, name, sido)
VALUES
('971220-1111111', 'tester1', 'imtester1', '01073037361', '홍길동', '서울특별시'),
('971220-1111112', 'tester2', 'imtester2', '01073037362', '조정우', '서울특별시'),
('971220-1111113', 'tester3', 'imtester3', '01073037363', '임경택', '서울특별시'),
('971220-1111114', 'tester4', 'imtester4', '01073037364', '류화랑', '서울특별시'),
('971220-1111115', 'tester5', 'imtester5', '01073037365', '강성운', '서울특별시'),
('971220-1111116', 'tester6', 'imtester6', '01073037366', '서유상', '서울특별시'),
('971220-1111117', 'tester7', 'imtester7', '01073037367', '전승권', '서울특별시'),
('971220-1111118', 'tester8', 'imtester8', '01073037368', '김하영', '서울특별시'),
('971220-1111119', 'tester9', 'imtester9', '01073037369', '이민석', '서울특별시');

INSERT V_INFO(name, company, min_temperature, max_temperature, clinical, max_capacity, characteristic, expiration_date)
VALUES
('화이자', '(주)화이자만든회사임', 30, 50, 3, 10, '화이자는 짱 좋아요.! 맞고 살아남으시길!', 14),
('모더나', '(주)모더나만든회사임', 20, 40, 2, 15, '모더나는 짱 좋아요.! 맞고 살아남으시길!', 7),
('아스트라제네카', '(주)아스트라제네카만든회사임', 0, 20, 3, 8, '아스트라제네카는 짱 좋아요.! 맞고 살아남으시길!', 21),
('얀센', '(주)얀센만든회사임', 10, 30, 3, 15, '얀센은 짱 좋아요.! 맞고 살아남으시길!', 14);

INSERT VACCINE(number, manufacturing_date, name)
VALUES
('HE0000', '2021-10-01', '화이자'),
('HE0001', '2021-10-01', '화이자'),
('HE0002', '2021-10-27', '화이자'),
('HE0003', '2021-10-27', '화이자'),
('MO0000', '2021-10-01', '모더나'),
('MO0001', '2021-10-27', '모더나'),
('MO0002', '2021-10-27', '모더나'),
('AE0000', '2021-10-01', '아스트라제네카'),
('AE0001', '2021-10-01', '아스트라제네카'),
('AE0002', '2021-10-23', '아스트라제네카'),
('AE0003', '2021-10-23', '아스트라제네카'),
('AE0004', '2021-10-22', '아스트라제네카'),
('AE0005', '2021-10-01', '아스트라제네카'),
('YA0000', '2021-10-14', '얀센'),
('YA0001', '2020-10-26', '얀센'),
('YA0002', '2020-10-27', '얀센');

#HOSPITAL테이블은 API를 통한 데이터 INSERT

INSERT DOCTOR(number, name, orgcd)
VALUES
(11111111, '안철수', '21303568'),
(22222222, '김상은', '35323175'),
(33333333, '돌팔이', '21345970'),
(44444444, '김성생', '35306611'),
(55555555, '화타', '33316228'),
(66666666, '김지성', '21311072');

INSERT INJECTION(number, ssn, orgcd, inject_date, reservation_time)
VALUES
('HE0000', '971220-1111111', '21303568', '2021-10-27 16:00:10', '2021-10-27 16:00:00'),
('HE0001', '971220-1111112', '35323175', '2021-10-27 16:00:10', '2021-10-27 16:00:00'),
('HE0002', '971220-1111111', '21303568', '2021-11-19 16:00:10', '2021-11-19 16:00:00');
('MO0000', '971220-1111113', '21345970', '2021-10-27 16:00:10', '2021-10-27 16:00:00'),
('MO0001', '971220-1111114', '35306611', '2021-10-27 16:00:10', '2021-10-27 16:00:00'),
('AE0000', '971220-1111115', '33316228', '2021-10-27 16:00:10', '2021-10-27 16:00:00');
