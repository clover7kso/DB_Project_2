import checkId from './util/checkId.js';
import checkSsn from './util/checkSsn.js';
import checkPhone from './util/checkPhone.js';
import checkDoctorId from '../Doctor/util/checkDoctorId.js';

export default (app, connection) => {
  app.post('/register', async (req, res, next) => {
    const { ssn, id, pw, phone, name, sido } = req.body;
    if (await checkId(req, connection))
      res.send({ result: false, msg: '이미 존재하는 아이디입니다.' });
    else if (await checkDoctorId(req, connection))
      res.send({ result: false, msg: '이미 존재하는 아이디입니다.' });
    else if (await checkPhone(req, connection))
      res.send({ result: false, msg: '이미 존재하는 전화번호입니다.' });
    else if (await checkSsn(req, connection))
      res.send({ result: false, msg: '이미 존재하는 주민등록번호입니다.' });
    else
      connection.query(
        'INSERT INTO user(ssn, id, pw, phone, name, sido) VALUES (?,?,?,?,?,?);',
        [ssn, id, pw, phone, name, sido],
        (error, data) => {
          if (error) res.send({ result: false, msg: error.sqlMessage });
          else 
            res.send({ result: true, msg: '회원가입이 완료되었습니다.' });
        },
      );
  });
};