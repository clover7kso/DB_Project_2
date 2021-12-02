import { init } from '../../config/db.js';
import { updateCorona } from './util.js';

const connection = init();

export default async (req, res, next) => {
  const { startCreateDt, endCreateDt } = req.query;
  console.log(startCreateDt, endCreateDt);
  const s_y = startCreateDt.slice(0, 4);
  const s_m = startCreateDt.slice(4, 6);
  const s_d = startCreateDt.slice(6, 8);
  const e_y = endCreateDt.slice(0, 4);
  const e_m = endCreateDt.slice(4, 6);
  const e_d = endCreateDt.slice(6, 8);
  const start = s_y + '-' + s_m + '-' + s_d;
  const end = e_y + '-' + e_m + '-' + e_d;
  console.log(start);
  console.log(end);

  const s_date = new Date(start + ' 00:00');
  s_date.setDate(s_date.getDate());
  const e_date = new Date(end + ' 00:00');
  const elapsedMSec = e_date.getTime() - s_date.getTime();
  const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;

  req.query.startCreateDt = start;
  req.query.endCreateDt = end;

  console.log(elapsedDay);
  await connection.query(
    'SELECT count(*) c FROM GOV_CORONA WHERE ? <= stateDt and stateDt <= ?',
    [start, end],
    async (error, data) => {
      if (error || data.length === 0) res.send(error);
      else if (data[0].c === elapsedDay) next();
      else {
        await updateCorona({ startCreateDt, endCreateDt, elapsedDay, next });
      }
    },
  );
};
