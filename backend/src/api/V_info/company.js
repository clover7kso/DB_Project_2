export default async (app, connection) => {
  app.get('/company', async (req, res, next) => {
    await connection.query(
      'SELECT DISTINCT company FROM V_INFO',
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
