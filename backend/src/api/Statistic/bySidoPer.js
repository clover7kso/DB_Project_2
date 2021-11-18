export default async (app, connection) => {
  app.get('/bySidoPer', async (req, res, next) => {
    await connection.query(
      'WITH bysido as (SELECT U.sido, COUNT(inject_date) / COUNT(*) * 100 AS 접종률 FROM USER U LEFT OUTER JOIN INJECTION I ON U.ssn = I.ssn GROUP BY U.sido), Hsido as (SELECT DISTINCT sido FROM HOSPITAL) SELECT Hsido.sido, IFNULL(접종률,0) AS 접종률 FROM bysido RIGHT JOIN Hsido ON bysido.sido=Hsido.sido;',
      [],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      },
    );
  });
};
