SELECT inject_date, COUNT(*)
FROM INJECTION
WHERE TIMESTAMPDIFF(DAY, now(), inject_date) < 7 AND inject_date IS NOT NULL
GROUP BY inject_date;