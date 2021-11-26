export default (app, connection) => {
    app.post('/updateDoctor', async (req, res, next) => {
      const { pw, number } = req.body;
        connection.query(
          'UPDATE DOCTOR SET pw = ? WHERE number = ?;',
          [ pw, number ],
          (error, data) => {
            if (error) throw error;
            res.send({ result: true, msg: '개인정보 변경이 완료되었습니다.' });
          },
        );
    });
  };