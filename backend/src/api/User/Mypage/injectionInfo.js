import auth from "../../modules/auth.js"
export default async (app, connection) => {
  app.get('/injectionInfo', auth);  
  app.use('/injectionInfo', async (req, res, next) => {
    const { id } = req.query;
    await connection.query(
      'SELECT ssn FROM USER WHERE id=?;',
      [ id ],
      (error, data) => {
        if (error) console.log(error);
        connection.query(
          'SELECT I.inject_date, I.reservation_time, H.orgnm, V.name AS Vname, U.name AS Uname  FROM INJECTION I, USER U, HOSPITAL H, VACCINE V WHERE I.ssn = U.ssn AND I.orgcd = H.orgcd AND I.number = V.number AND U.ssn = ? ORDER BY reservation_time;',
          [data[0].ssn],
          (error1, data1) => {
            if (error1) console.log(error);
            const result1 = data1;
            console.log(result1);
            return res.send(result1);
          },
        )
      },
    );
  });
};
