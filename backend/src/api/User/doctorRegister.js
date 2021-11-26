import checkDoctorNumber from './util/checkDoctorNumber.js';

export default (app, connection) => {
  app.post('/doctorRegister', async (req, res, next) => {
    const { number, pw, name, orgcd } = req.body;
    if (await checkDoctorNumber(req, connection))
      res.send({ result: false, msg: '이미 존재하는 의사면허번호입니다.' });
    else
      connection.query(
        'INSERT INTO DOCTOR(number, pw, name, orgcd) VALUES (?,?,?,?);',
        [number, pw, name, orgcd],
        (error, data) => {
          if (error) throw error;
          res.send({ result: true, msg: '의사회원가입이 완료되었습니다.' });
        },
      );
  });
};