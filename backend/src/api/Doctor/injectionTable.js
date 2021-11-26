import auth from "../../api/modules/auth.js"
export default async (app, connection) => {
  app.get('/injectionTable', auth);  
  app.use('/injectionTable', async (req, res, next) => {
      const { id } = req.query;
      console.log(req.query)
      await connection.query(
        'SELECT I.number AS vnumber, I.ssn AS ssn, I.inject_date AS inject_date, I.reservation_time AS reservation_time, D.name AS dname FROM INJECTION I, DOCTOR D WHERE I.orgcd=D.orgcd AND D.id=?;',
        [ id ],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          console.log(result);
          return res.send(result);
        },
      );
    });
};