export default async (app, connection) => {
    app.get('/doctorInfo', async (req, res, next) => {
      const { number } = req.query;
      await connection.query(
        'SELECT * FROM DOCTOR WHERE number=?;',
        [number],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          console.log(result);
          return res.send(result);
        },
      );
    });
  };