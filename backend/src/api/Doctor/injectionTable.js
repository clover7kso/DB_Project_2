export default async (app, connection) => {
    app.get('/injectionTable', async (req, res, next) => {
      const { number } = req.query;
      await connection.query(
        'SELECT I.number AS 백신일련번호, I.ssn AS 환자주민번호, I.inject_date AS 백신접종날짜, I.reservation_time AS 접종예정날짜, D.name AS 담당의사이름 FROM INJECTION I, DOCTOR D WHERE I.orgcd=D.orgcd AND D.number=?;',
        [number],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          console.log(result);
          return res.send(result);
        },
      );
    });
};