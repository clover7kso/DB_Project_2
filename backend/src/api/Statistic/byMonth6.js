export default async (app, connection) => {
  app.get('/byMonth6', async (req, res, next) => {
    await connection.query(
      'SELECT MONTH (inject_date) AS m_date, COUNT(*) FROM INJECTION WHERE TIMESTAMPDIFF(MONTH, now(), inject_date) >= 0 AND TIMESTAMPDIFF(MONTH, now(), inject_date) <= 6 AND inject_date IS NOT NULL GROUP BY m_date;',
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
