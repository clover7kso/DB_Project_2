export default async (app, connection) => {
  app.get('/hospitalInfo', async (req, res, next) => {
    const { orgcd } = req.query;
    console.log(orgcd);
    await connection.query(
      'SELECT orgcd, orgnm, orgTlno, orgZipaddr, lunchSttTm, lunchEndTm, sttTm, endTm FROM HOSPITAL WHERE orgcd = ?;',
      [orgcd],
      (error, data) => {
        if (error) console.log(error);
        connection.query(
          'SELECT name as mkey, COUNT(*) as value FROM VACCINE V WHERE NOT EXISTS(SELECT number FROM INJECTION I WHERE I.number = V.number) GROUP BY name;',
          (error1, data1) => {
            if (error1) console.log(error1);

            for (var i = 0; i < data1.length; i++) {
              if (data1[i].hasOwnProperty('mkey')) {
                data1[i].key = data1[i].mkey;
                delete data1[i].mkey;
              }
            }

            data[0].canSelectVaccine = data1;
            console.log(data1);
            return res.send(data);
          },
        );
      },
    );
  });
};
