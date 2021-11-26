export default (app, connection) => {
    app.post('/doctorLogin', (req, res, next) => {
      const { number, pw } = req.body;
      connection.query(
        'SELECT COUNT(number) as cnt FROM DOCTOR WHERE number = ? and pw = ?',
        [number, pw],
        (error, data) => {
          if (error) throw error;
          const result = data[0].cnt === 1 ? true : false;
          res.send(result);
        },
      );
    });
  };
  