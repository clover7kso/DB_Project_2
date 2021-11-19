export default async (app, connection) => {
    app.get('/hospitalReserve', async (req, res, next) => {
      const { orgcd, date } = req.query;
      await connection.query(
        'SELECT I.orgcd, DATE_FORMAT(I.reservation_time, "%Y.%m.%d") AS reserve_date, HOUR(I.reservation_time) AS reserve_hour, H.maxCapacityperhour FROM INJECTION I NATURAL JOIN HOSPITAL H WHERE I.orgcd=?;',
        [orgcd],
        (error, data) => {
          if (error) console.log(error);
          const result = data;
          console.log(result);
          if(result.length === 0){
            var Reserve = {
                orgcd : orgcd,
                date : date,
                "09" : 10,
                "10" : 10,
                "11" : 10,
                "12" : 10,
                "13" : 10,
                "14" : 10,
                "15" : 10,
                "16" : 10,
                "17" : 10                
            };
            console.log(Reserve);
            return res.send(Reserve);
          } else {
            var maxCap = result[0].maxCapacityperhour;
            var Reserve = {
                orgcd : orgcd,
                date : date,
                "09" : maxCap,
                "10" : maxCap,
                "11" : maxCap,
                "12" : maxCap,
                "13" : maxCap,
                "14" : maxCap,
                "15" : maxCap,
                "16" : maxCap,
                "17" : maxCap 
            };
            for(var i=0; i<result.length; i++){
                if(result[i].reserve_date === Reserve.date) {//일치하는 날짜일경우 예약되어 있는 시간개수만큼 여석 줄여줌
                    Reserve[result[i].reserve_hour]--;
                }
            }
            console.log(Reserve);
            return res.send(Reserve);
          }
        },
      );
    });
  };
  