import express from 'express';
import { init } from './config/db.js';
import login from './api/User/login.js';
import register from './api/User/register.js';
import doctorRegister from './api/Doctor/doctorRegister.js';
import doctorLogin from './api/Doctor/doctorLogin.js';
import cors from 'cors';
import hospitalInfo from './api/Hospital/hospitalInfo.js';
import hospitalUpdate from './api/Hospital/hospitalUpdate.js';
import hospitalSido from './api/Hospital/hospitalSido.js';
import hospitalSi from './api/Hospital/hospitalSi.js';
import hospitalReserve from './api/Hospital/hospitalReserve.js';
import hospitalListSearch from './api/Hospital/hospitalListSearch.js';
import bySido from './api/Statistic/bySido.js';
import bySidoPer from './api/Statistic/bySidoPer.js';
import byDay from './api/Statistic/byDay.js';
import byMonth from './api/Statistic/byMonth.js';
import byVaccination from './api/Statistic/byVaccination.js';
import company from './api/V_info/company.js';
import vaccineInfo from './api/V_info/vaccineInfo.js';
import injectionInfo from './api/User/Mypage/injectionInfo.js';
import updateUser from './api/User/Mypage/updateUser.js';
import updateDoctor from './api/Doctor/Mypage/updateDoctor.js';
import userInfo from './api/User/Mypage/userInfo.js';
import doctorInfo from './api/Doctor/Mypage/doctorInfo.js';
import injectionTable from './api/Doctor/injectionTable.js';
import updateInjectionTable from './api/Doctor/updateInjectionTable.js';
import reserveVaccine from './api/Vaccine/reserveVaccine.js';
import testJWT from './api/User/testJWT.js';
import corona from './api/GovData/corona.js';

const connection = init();

const app = express();

let corsOption = {
  origin: 'http://localhost:3000', // 허락하는 요청 주소
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};
app.use(cors(corsOption)); // CORS 미들웨어 추가
app.use(
  express.json({
    limit: '1000mb',
  }),
);

const router = express.Router();

app.set('port', process.env.PORT || 4000);

login(app, connection);
register(app, connection);
doctorLogin(app, connection);
doctorRegister(app, connection);
injectionInfo(app, connection);
hospitalInfo(app, connection);
hospitalUpdate(app, connection);
hospitalSido(app, connection);
hospitalSi(app, connection);
hospitalReserve(app, connection);
hospitalListSearch(app, connection);
bySido(app, connection);
bySidoPer(app, connection);
byDay(app, connection);
byMonth(app, connection);
byVaccination(app, connection);
company(app, connection);
vaccineInfo(app, connection);
updateUser(app, connection);
updateDoctor(app, connection);
userInfo(app, router, connection);
doctorInfo(app, connection);
injectionTable(app, connection);
updateInjectionTable(app, connection);
reserveVaccine(app, connection);
testJWT(app, connection);
corona(app, connection);

app.listen(app.get('port'), () => {
  console.log('Port : ' + app.get('port'));
});
