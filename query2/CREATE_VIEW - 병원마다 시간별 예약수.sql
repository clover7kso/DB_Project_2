CREATE VIEW RESERVE_BY_TIME_AND_HOSPITAL AS
SELECT orgcd, DATE(reservation_time),HOUR(reservation_time),  COUNT(*)
FROM INJECTION
GROUP BY orgcd, DATE(reservation_time),HOUR(reservation_time);