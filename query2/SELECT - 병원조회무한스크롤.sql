SELECT orgnm, sido, si 
FROM HOSPITAL 
WHERE orgnm LIKE "%서울%" AND si = "강남구" AND sido = "서울특별시"
ORDER BY orgnm LIMIT 20 OFFSET 0;