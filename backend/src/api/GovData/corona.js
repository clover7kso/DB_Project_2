import checkGovCorona from '../modules/checkGovCorona.js';
export default (app, connection) => {
  app.get('/corona', checkGovCorona);
  app.use('/corona', (req, res, next) => {
    const { startCreateDt, endCreateDt } = req.query;

    connection.query(
      'SELECT * FROM GOV_CORONA WHERE ? <= stateDt and stateDt <= ? ORDER BY stateDt;',
      [startCreateDt, endCreateDt],
      async (error, data) => {
        if (error || data.length === 0) res.send(error);
        else res.send(data);
      },
    );
  });
};
