export default async (app, connection) => {
  app.get('/bySido', async (req, res, next) => {
    await connection.query(
      'WITH bysido as (SELECT H.sido, COUNT(*) AS COUNT FROM INJECTION I LEFT JOIN HOSPITAL H ON H.orgcd=I.orgcd GROUP BY H.sido), Hsido as (SELECT DISTINCT sido FROM HOSPITAL) SELECT Hsido.sido, IFNULL(COUNT,0) AS COUNT FROM bysido RIGHT JOIN Hsido ON bysido.sido=Hsido.sido;',
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
