export default async (app, connection) => {
  app.get('/byDay7', async (req, res, next) => {
    await connection.query(
      'SELECT inject_date, COUNT(*) FROM INJECTION WHERE TIMESTAMPDIFF(DAY, now(), inject_date) >= 0 AND TIMESTAMPDIFF(DAY, now(), inject_date) <= 7 AND inject_date IS NOT NULL GROUP BY inject_date;',
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
