export default async (app, connection) => {
  app.get('/bySidoOverPer50', async (req, res, next) => {
    await connection.query(
      'SELECT U.sido, COUNT(inject_date) / COUNT(*) * 100 AS 접종률 FROM USER U LEFT OUTER JOIN INJECTION I ON U.ssn = I.ssn GROUP BY U.sido HAVING 접종률 > 50;',
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
