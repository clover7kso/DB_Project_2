export default async (app, connection) => {
    app.get('/userInfo', async (req, res, next) => {
      const { ssn } = req.query;
      await connection.query(
        'SELECT * FROM USER WHERE ssn=?;',
        [ssn],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          console.log(result);
          return res.send(result);
        },
      );
    });
  };