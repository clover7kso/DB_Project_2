import authDoctor from "../../modules/authDoctor.js";
export default async (app, connection) => {
  app.get('/doctorInfo', authDoctor);
  app.use('/doctorInfo', async (req, res, next) => {
    console.log(req.query);
    const { id } = req.query;
    await connection.query(
      'SELECT * FROM DOCTOR WHERE id=?;',
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