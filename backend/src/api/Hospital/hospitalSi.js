export default async (app, connection) => {
  app.get('/hospitalSi', async (req, res, next) => {
    const { sido } = req.query;

    await connection.query(
      'SELECT DISTINCT si FROM hospital WHERE sido = ? ORDER BY si',
      [sido],
      (error, data) => {
        if (error) return reject(error);
        const result = data;
        return res.send(result);
      },
    );
  });
};
