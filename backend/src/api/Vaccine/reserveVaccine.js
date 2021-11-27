import auth from '../../api/modules/auth.js';

export default (app, connection) => {
  app.get('/reserveVaccine', auth);
  app.use('/reserveVaccine', (req, res, next) => {
    const { vaccine_name, orgcd, reservation_time, id } = req.query;
    connection.query(
      'SELECT number, name FROM VACCINE V WHERE V.name = ? AND NOT EXISTS(SELECT number FROM INJECTION I WHERE I.number = V.number)',
      [vaccine_name],
      (error, data) => {
        if (error) throw error;
        if (data.length === 0) res.send(false);

        connection.query(
          'SELECT ssn FROM USER WHERE id=?;',
          [id],
          (error1, data1) => {
            if (error1) throw error1;

            connection.query(
              'INSERT INTO INJECTION(number, ssn, orgcd, inject_date, reservation_time) VALUES (?,?,?,NULL,?)',
              [data[0].number, data1[0].ssn, orgcd, reservation_time],
              (error2, data2) => {
                if (error2) throw error2;
                res.send(true);
              },
            );
          },
        );
        console.log(data);
      },
    );
  });
};
