export default (app, connection) => {
  app.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    connection.query(
      'SELECT COUNT(email) as cnt FROM user WHERE email = ? and password = ?',
      [email, password],
      (error, data) => {
        if (error) throw error;
        const result = data[0].cnt === 1 ? true : false;
        res.send(result);
      },
    );
  });
};
