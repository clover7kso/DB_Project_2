import express from 'express';
import {init} from './config/db.js';
import login from './api/login.js'
import register from './api/register.js'
import cors from 'cors';
import hospitalUpdate from './api/hospitalUpdate.js';
import hospitalSido from './api/hospitalSido.js';
import hospitalSi from './api/hospitalSi.js';
import hospitaListSearch from './api/hospitaListSearch.js';

const connection = init();

const app = express();

let corsOption = {
    origin: 'http://localhost:3000', // 허락하는 요청 주소
    credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
} 
app.use(cors(corsOption)); // CORS 미들웨어 추가
app.use(express.json({
  limit : "1000mb"
}));

app.set('port', process.env.PORT || 4000);

login(app, connection);
register(app, connection);
hospitalUpdate(app, connection);
hospitalSido(app, connection);
hospitalSi(app, connection);
hospitaListSearch(app, connection);

app.listen(app.get('port'), () => {
  console.log('Port : ' + app.get('port'));
});