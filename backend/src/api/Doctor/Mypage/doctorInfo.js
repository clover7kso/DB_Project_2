import auth from "../../modules/auth.js";
export default async (app, connection) => {
  app.get('/doctorInfo', auth);
  app.use('/doctorInfo', async (req, res, next) => {
    console.log(req.query);
    const { id } = req.query;
    await connection.query(
      'SELECT id, pw, name, orgnm, orgTlno, orgZipaddr, lunchSttTm, lunchEndTm, sttTm, endTm FROM DOCTOR D JOIN HOSPITAL H WHERE id=? AND D.orgcd=H.orgcd;',
      [id],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      },
    );
  });
};