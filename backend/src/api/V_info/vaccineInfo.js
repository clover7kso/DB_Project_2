export default async (app, connection) => {
  app.get('/vaccineInfo', async (req, res, next) => {
    const { vaccineName } = req.query;

    await connection.query(
      'SELECT * FROM V_INFO WHERE name IN (SELECT name FROM V_INFO WHERE name = ?);',
      [vaccineName],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      },
    );
  });
};
