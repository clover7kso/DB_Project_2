import auth from "../../modules/auth.js";

export default (app, connection) => {
  app.get('/updateDoctor', auth);  
  app.use('/updateDoctor', async (req, res, next) => {
    const { pw, id } = req.query;
      connection.query(
        'UPDATE DOCTOR SET pw = ? WHERE id = ?;',
        [ pw, id ],
        (error, data) => {
          if (error) throw error;
          res.send({ result: true, msg: '개인정보 변경이 완료되었습니다.' });
        },
      );
  });
};