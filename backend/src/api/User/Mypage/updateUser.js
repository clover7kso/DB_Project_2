import auth from "../../modules/auth.js";

export default (app, connection) => {
  app.get('/updateUser', auth);  
  app.use('/updateUser', async (req, res, next) => {
    const { pw, phone, sido, id } = req.query;
      connection.query(
        'UPDATE USER SET pw=?, phone=?, sido=? WHERE id = ?;',
        [ pw, phone, sido, id ],
        (error, data) => {
          if (error) throw error;
          console.log(error);
          console.log(data);
          res.send({ result: true, msg: '개인정보 변경이 완료되었습니다.' });
        },
      );
  });
};