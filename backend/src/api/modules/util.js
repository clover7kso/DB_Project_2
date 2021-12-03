import { XMLParser } from 'fast-xml-parser';
import request from 'request-promise';
import { init } from '../../config/db.js';

export const fail = (CODE, MESSAGE) => {
  return { code: CODE, msg: MESSAGE };
};

export const xmlTojson = (xml) => {
  const parser = new XMLParser();
  let jObj = parser.parse(xml);
  var json = JSON.stringify(jObj);
  const obj = JSON.parse(json);
  return obj;
};

export const updateCorona = async ({
  startCreateDt,
  endCreateDt,
  elapsedDay,
  next,
}) => {
  var serviceKey =
    'k1vga37e9djZ4wyxwWuN%2BKbKpJMy%2FPZGwELs%2B3XG6GvGzuy4IlDwkxdAaWH%2BwU3%2F8kw%2B4ZgrxRoOhstLHkEfqQ%3D%3D';

  var url =
    'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
  var queryParams =
    '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /* Service Key*/
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent(elapsedDay); /* */
  queryParams +=
    '&' +
    encodeURIComponent('startCreateDt') +
    '=' +
    encodeURIComponent(startCreateDt); /* */
  queryParams +=
    '&' +
    encodeURIComponent('endCreateDt') +
    '=' +
    encodeURIComponent(endCreateDt); /* */

  const connection = init();
  await request({
    url: url + queryParams,
    method: 'GET',
  }).then(async (response) => {
    console.log('Status', response.statusCode);
    //console.log('Response', response);
    //console.log('Body', body);
    var jsonData = xmlTojson(response);
    var a_c = jsonData.response.body.items.item;
    a_c.sort((a, b) => a.seq - b.seq);

    for (var i = 0; i < a_c.length; i++) {
      var stateDt = String(a_c[i].stateDt);
      var y = stateDt.slice(0, 4);
      var m = stateDt.slice(4, 6);
      var d = stateDt.slice(6, 8);
      a_c[i].stateDt = y + '-' + m + '-' + d;
      a_c[i].stateTime = a_c[i].stateTime + ':00';
    }
    console.log(a_c);

    //Insert Result
    let sql = `INSERT IGNORE INTO GOV_CORONA VALUES?`;
    let values = [];

    for (let i = 1; i < a_c.length; i++) {
      values.push([
        a_c[i].seq,
        a_c[i].accDefRate,
        a_c[i].accExamCnt - a_c[i - 1].accExamCnt,
        a_c[i].deathCnt - a_c[i - 1].deathCnt,
        a_c[i].decideCnt - a_c[i - 1].decideCnt,
        a_c[i].stateDt,
        a_c[i].stateTime,
        a_c[i].updateDt,
      ]);
    }

    await connection.query(sql, [values], (err, result) => {
      if (err) throw err;
      console.log('rows affected ' + result.affectedRows);
      next();
    });
  });
};
