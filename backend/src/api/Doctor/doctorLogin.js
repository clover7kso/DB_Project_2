import { sign } from '../modules/jwt.js';

export default (app, connection) => {
  app.post('/doctorLogin', (req, res, next) => {
    const { id, pw } = req.body;
    connection.query(
      'SELECT id, name FROM DOCTOR WHERE id = ? and pw = ?;',
      [id, pw],
      async (error, data) => {
        if (error) throw error;
        const result = data[0] && data[0].id ? true : false;
        console.log(data);
        if (result === true) {
          const jwtToken = await sign(id, pw);
          jwtToken.name = data[0].name;
          jwtToken.type = 'doctor';
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
