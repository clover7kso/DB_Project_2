export default async (app, connection) => {
  app.get('/injectionInfo', async (req, res, next) => {
    const { ssn } = req.query;
    await connection.query(
      'SELECT I.inject_date, H.orgnm, V.name AS Vname, U.name AS Uname  FROM INJECTION I, USER U, HOSPITAL H, VACCINE V WHERE I.ssn = U.ssn AND I.orgcd = H.orgcd AND I.number = V.number AND U.ssn = ?;',
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
