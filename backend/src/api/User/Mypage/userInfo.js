import auth from "../../modules/auth.js";
export default async (app, router, connection) => {
  app.get('/userInfo', auth);
  app.use('/userInfo', async (req, res, next) => {
    console.log(req.query);
    const { id } = req.query;
    await connection.query(
      'SELECT * FROM USER WHERE id=?;',
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      },
    );
  });
};