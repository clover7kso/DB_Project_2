export default async (app, connection) => {
    app.get('/hospitalInfo', async (req, res, next) => {
      const { orgcd } = req.query;
      await connection.query(
        'SELECT * FROM HOSPITAL WHERE orgcd = ?;',
        [orgcd],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          console.log(result);
          return res.send(result);
        },
      );
    });
  };
  