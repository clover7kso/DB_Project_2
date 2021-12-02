import checkId from "../User/util/checkId.js";
import checkDoctorId from "./util/checkDoctorId.js";

export default (app, connection) => {
  app.post('/doctorRegister', async (req, res, next) => {
    const { id, pw, name, orgcd } = req.body;
    if (await checkDoctorId(req, connection))
      res.send({ result: false, msg: '이미 존재하는 의사면허번호입니다.' });
    else if (await checkId(req, connection))
      res.send({ result: false, msg: '이미 존재하는 의사면허번호입니다.' });
    else
      connection.query(
        'INSERT INTO DOCTOR(id, pw, name, orgcd) VALUES (?,?,?,?);',
        [id, pw, name, orgcd],
        (error, data) => {
          if (error) res.send({ result: false, msg: error.sqlMessage });
          else
            res.send({ result: true, msg: '의사회원가입이 완료되었습니다.' });
        },
      );
  });
};