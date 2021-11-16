SELECT YEAR (inject_date) AS y_date, MONTH (inject_date) AS m_date, COUNT(*) 
FROM INJECTION 
WHERE inject_date IS NOT NULL GROUP BY m_date;