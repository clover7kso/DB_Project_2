import axios from 'axios';

const getHospitals = async () => {
  var hospitalInfo = [];
  for (var page = 1; page < 17; page++) {
    var base = 'https://api.odcloud.kr/api/apnmOrg/v1/list?';
    var perPage = '&perPage=1000&';
    var apiKey =
      'l2B42YXbMbwPze7EVaUikAcFr8mrfMe3y2xA37lXcWQv2mUgAIBm4jc16yHtlsXFVdQ9iYRhrkYGwEfL%2B%2BdrSA%3D%3D';
    const response = await axios.get(
      base + 'page=' + page + perPage + 'serviceKey=' + apiKey,
    );
    response.data.data.map((v) => {
      return hospitalInfo.push(v);
    });
  }
  return hospitalInfo;
};

export default (app, connection) => {
  app.post('/hospitalUpdate', async (req, res, next) => {
    const Info = await getHospitals();

    Info.map((v) => {
      const addr = v.orgZipaddr.split(' ');
      const sido = addr[0];
      const si = addr[1];
      connection.query(
        'INSERT IGNORE hospital(orgcd, orgnm, orgTlno, sido, si, orgZipaddr, slrYmd, dywk, hldyYn, lunchSttTm, lunchEndTm, sttTm, endTm) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);',
        [
          v.orgcd,
          v.orgnm,
          v.orgTlno,
          sido,
          si,
          v.orgZipaddr,
          v.slrYmd,
          v.dywk,
          v.hldyYn,
          v.lunchSttTm,
          v.lunchEndTm,
          "00:09:00",
          "00:18:00",
        ],
      );
    });
  });
};
