import { sign } from "../modules/jwt.js";

export default (app, connection) => {
    app.post('/doctorLogin', (req, res, next) => {
      const { number, pw } = req.body;
      connection.query(
        'SELECT COUNT(number) as cnt, name FROM DOCTOR WHERE number = ? and pw = ?;',
        [number, pw],
        async (error, data) => {
          if (error) throw error;
          const result = data[0].cnt === 1 ? true : false;
          if(result == true) {
            const jwtToken = await sign(number, pw);
            jwtToken.name = data[0].name;
            jwtToken.type = "doctor";
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
  