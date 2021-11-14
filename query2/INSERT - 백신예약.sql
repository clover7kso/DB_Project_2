INSERT INJECTION(number, ssn, orgcd, reservation_time)
SELECT "HE0003", "971220-1111119", "21303568", "2021-11-04 14:00:00"
FROM DUAL
WHERE NOT EXISTS(SELECT * 
				FROM VACCINE AS V JOIN V_INFO AS V_I ON V.name = V_I.name
				WHERE V.number = "HE0003" AND DATE_ADD(V.manufacturing_date, INTERVAL V_I.expiration_date DAY) < now())
