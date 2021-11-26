export default (app, connection) => {
  app.post('/updateInjectionTable', (req, res, next) => {
    const { inject_date, number } = req.body;
    connection.query(
      'UPDATE INJECTION I SET I.inject_date=? WHERE I.number=?;',
      [inject_date, number],
      (error, data) => {
        if (error) throw error;
        res.send({ result: true, msg: '접종 정보 업데이트 처리가 되었습니다.' });
      },
    );
  });
};