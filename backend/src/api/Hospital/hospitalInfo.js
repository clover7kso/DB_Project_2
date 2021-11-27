export default async (app, connection) => {
  app.get('/hospitalInfo', async (req, res, next) => {
    const { orgcd } = req.query;
    console.log(orgcd);
    await connection.query(
      'SELECT orgcd, orgnm, orgTlno, orgZipaddr, lunchSttTm, lunchEndTm, sttTm, endTm FROM HOSPITAL WHERE orgcd = ?;',
      [orgcd],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        connection.query(
          'SELECT name, COUNT(*) FROM VACCINE V WHERE NOT EXISTS(SELECT number FROM INJECTION I WHERE I.number = V.number) GROUP BY name;',
          (error1, data1) => {
            if (error1) console.log(error1);
            const result1 = data1;
            console.log(result1);
            result[0].canSelectVaccine = [
              { key: '화이자', value: result1[3]['COUNT(*)'] },
              { key: '모더나', value: result1[0]['COUNT(*)'] },
              { key: '아스트라제네카', value: result1[1]['COUNT(*)'] },
              { key: '얀센', value: result1[2]['COUNT(*)'] },
            ];
            console.log(result);
            return res.send(result);
          },
        );
      },
    );
  });
};
