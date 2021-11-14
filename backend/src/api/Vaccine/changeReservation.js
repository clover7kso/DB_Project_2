export default async (app, connection) => {
  app.get('/changeReservation', async (req, res, next) => {
    const { reservation_time, orgcd } = req.query;

    await connection.query(
      'UPDATE INJECTION SET reservation_time = ? WHERE orgcd = ? AND EXISTS ( SELECT * FROM RESERVE_LEFT_BY_TIME_AND_HOSPITAL WHERE REMAIN > 0 );',
      [reservation_time, orgcd],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      },
    );
  });
};
