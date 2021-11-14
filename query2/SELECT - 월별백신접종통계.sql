SELECT MONTH(inject_date) AS m_date, COUNT(*)
FROM INJECTION
WHERE  TIMESTAMPDIFF(MONTH, now(), inject_date) < 6 AND inject_date IS NOT NULL
GROUP BY m_date;