SELECT *
FROM V_INFO
WHERE name IN(
   SELECT name
   FROM V_INFO
   WHERE name = '화이자')