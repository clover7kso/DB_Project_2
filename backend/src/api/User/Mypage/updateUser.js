import auth from "../../modules/auth.js";

export default (app, connection) => {
  app.get('/updateUser', auth);  
  app.use('/updateUser', async (req, res, next) => {
    const { pw, phone, sido, ssn } = req.query;
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