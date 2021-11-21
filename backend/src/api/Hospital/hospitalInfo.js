export default async (app, connection) => {
    app.get('/hospitalInfo', async (req, res, next) => {
      const { orgcd } = req.query;
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
              result[0].canSelectVaccine = {
                "화이자" : result1[3]['COUNT(*)'],
                "모더나" : result1[0]['COUNT(*)'],
                "아스트라제네카" : result1[1]['COUNT(*)'],
                "얀센" : result1[2]['COUNT(*)']
              }
              console.log(result);
              return res.send(result);
            }
          )
        },
      );
    });
  };
  