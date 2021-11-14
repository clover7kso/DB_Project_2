export default async (app, connection) => {
  app.get('/hospitalSido', async (req, res, next) => {
    await connection.query(
      'SELECT DISTINCT sido FROM hospital ORDER BY sido',
      [],
      (error, data) => {
        if (error) return reject(error);
        const result = data;
        return res.send(result);
      },
    );
  });
};
