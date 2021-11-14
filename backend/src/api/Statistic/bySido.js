export default async (app, connection) => {
  app.get('/bySido', async (req, res, next) => {
    await connection.query(
      'SELECT H.sido, COUNT(*) FROM HOSPITAL H NATURAL JOIN INJECTION I GROUP BY H.sido;',
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
