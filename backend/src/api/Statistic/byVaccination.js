export default async (app, connection) => {
    app.get('/byVaccination', async (req, res, next) => {
      await connection.query(
        'SELECT I.ssn, COUNT(*) AS count FROM INJECTION I RIGHT JOIN USER U ON I.ssn=U.ssn GROUP BY U.ssn;',
        [],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          var vaccination = {
              "미접종자" : 0,
              "1차 접종자" : 0,
              "접종 완료자" : 0
          }
          result.map((v) => {
              if(v.ssn !== null && v.count === 2){
                  vaccination['접종 완료자']++;
              } else if(v.ssn !== null && v.count === 1){
                  vaccination['1차 접종자']++;
              } else{
                  vaccination['미접종자']++;
              } 
          })
          console.log(vaccination);
          return res.send(vaccination);
        },
      );
    });
  };
  