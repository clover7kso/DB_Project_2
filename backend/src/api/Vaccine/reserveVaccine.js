export default (app, connection) => {
    app.post('/reserveVaccine', (req, res, next) => {
      const { vaccine_name, ssn, orgcd, reservation_time } = req.body;
       connection.query(
        'SELECT number, name FROM VACCINE V WHERE V.name = ? AND NOT EXISTS(SELECT number FROM INJECTION I WHERE I.number = V.number)',
        [vaccine_name],
        (error, data) => {
            if (error) console.log(error);
            const result = data;
            console.log(result);
            if(result.length === 0){
                res.send(false);
            }
            connection.query(
                'INSERT INTO INJECTION(number, ssn, orgcd, inject_date, reservation_time) VALUES (?,?,?,NULL,?)',
                [result[0].number, ssn, orgcd, reservation_time],
                (error1, data1) => {
                    if (error1) throw error;
                    res.send(true);
                },
            );
            console.log(result);
        },
      );
    });
  };
  