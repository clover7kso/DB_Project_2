SELECT * 
FROM INJECTION
WHERE inject_date BETWEEN DATE_SUB(now(), INTERVAL 7 DAY) AND now();