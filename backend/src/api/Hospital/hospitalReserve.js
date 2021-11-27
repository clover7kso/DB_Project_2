export default async (app, connection) => {
  app.get('/hospitalReserve', async (req, res, next) => {
    const { orgcd, y, m, d } = req.query;
    connection.query(
      'select lunchSttTm/100 ls, lunchEndTm/100 le, maxCapacityperhour max from hospital where orgcd=?;',
      [orgcd],
      (error1, data1) => {
        if (error1) console.log(error1);
        var result = [
          { key: 9, value: 0 },
          { key: 10, value: 0 },
          { key: 11, value: 0 },
          { key: 12, value: 0 },
          { key: 13, value: 0 },
          { key: 14, value: 0 },
          { key: 15, value: 0 },
          { key: 16, value: 0 },
          { key: 17, value: 0 },
        ];
        //점심시간 삭제
        var lunch_start = data1[0].ls - 9;
        var lunch_end = data1[0].le - 9;
        var deleteNum = lunch_end - lunch_start;
        result.splice(lunch_start, deleteNum);

        //Max로 세팅
        const max = data1[0].max;
        for (var i = 0; i < result.length; i++) result[i].value = max;

        connection.query(
          'with oymdh_max as (select i.orgcd o, year(reservation_time) y ,month(reservation_time) m,day(reservation_time) d,hour(reservation_time) h,count(*) c, h.maxCapacityperhour max from injection i left join hospital h on i.orgcd=h.orgcd group by o,y,m,d,h) select o,y,m,d,h,c,max,max-c r from oymdh_max where y=? and m=? and d =? and o=?;',
          [y, m, d, orgcd],
          (error2, data2) => {
            if (error2) console.log(error2);

            for (var i = 0; i < result.length; i++) {
              for (var j = 0; j < data2.length; j++) {
                if (result[i].key === data2[j].h) result[i].value = data2[j].r;
              }
            }
            console.log(result);

            res.send(result);
          },
        );
      },
    );
  });
};
