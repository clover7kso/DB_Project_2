import { sign } from '../modules/jwt.js';

export default (app, connection) => {
  app.post('/login', (req, res, next) => {
    const { id, pw } = req.body;
    connection.query(
      'SELECT COUNT(id) as cnt FROM user WHERE id = ? and pw = ?',
      [id, pw],
      async (error, data) => {
        if (error) throw error;
        const result = data[0].cnt === 1 ? true : false;
        if (result == true) {
          const jwtToken = await sign(id, pw);
          console.log(jwtToken);
          res.send(jwtToken);
        } else {
          console.log('fail');
          res.send(null);
        }
      },
    );
  });
};
