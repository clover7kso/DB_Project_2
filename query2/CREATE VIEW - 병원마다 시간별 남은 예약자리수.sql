CREATE VIEW RESERVE_LEFT_BY_TIME_AND_HOSPITAL AS
SELECT orgcd, DATE(reservation_time),HOUR(reservation_time), HOSPITAL.maxCapacityperhour-COUNT(*) AS REMAIN
FROM INJECTION NATURAL JOIN HOSPITAL
GROUP BY orgcd, DATE(reservation_time),HOUR(reservation_time);