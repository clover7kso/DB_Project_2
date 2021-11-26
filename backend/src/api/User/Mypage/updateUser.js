export default (app, connection) => {
  app.post('/updateUser', async (req, res, next) => {
    const { pw, phone, sido, ssn } = req.body;
      connection.query(
        'UPDATE USER SET pw=?, phone=?, sido=? WHERE ssn = ?;',
        [ pw, phone, sido, ssn ],
        (error, data) => {
          if (error) throw error;
          res.send({ result: true, msg: '개인정보 변경이 완료되었습니다.' });
        },
      );
  });
};