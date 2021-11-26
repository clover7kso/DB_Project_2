export default (app, connection) => {
  app.post('/login', (req, res, next) => {
    const { id, pw } = req.body;
    connection.query(
      'SELECT COUNT(id) as cnt FROM user WHERE id = ? and pw = ?',
      [id, pw],
      (error, data) => {
        if (error) throw error;
        const result = data[0].cnt === 1 ? true : false;
        res.send(result);
      },
    );
  });
};
