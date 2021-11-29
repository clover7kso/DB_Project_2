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

  const s_date = new Date(s_y, s_m, s_d);
  const e_date = new Date(e_y, e_m, e_d);
  const elapsedMSec = e_date.getTime() - s_date.getTime();
  const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;

  req.query.startCreateDt = start;
  req.query.endCreateDt = end;

  console.log(elapsedDay);
  connection.query(
    'SELECT count(*) c FROM GOV_CORONA WHERE ? <= stateDt and stateDt <= ?',
    [start, end],
    async (error, data) => {
      if (error || data.length === 0) res.send(error);
      else if (data[0].c === elapsedDay + 1) next();
      else {
        updateCorona({ startCreateDt, endCreateDt, elapsedDay });
        next();
      }
    },
  );
};
