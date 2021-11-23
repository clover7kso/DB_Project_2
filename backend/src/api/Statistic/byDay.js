export default async (app, connection) => {
  app.get('/byDay', async (req, res, next) => {
    const { day } = req.query;
    await connection.query(
      'SELECT YEAR (inject_date) AS y_date, MONTH (inject_date) AS m_date, DAY(inject_date) AS d_date, COUNT(*) FROM INJECTION WHERE inject_date IS NOT NULL GROUP BY inject_date;',
      [day],
      (error, data) => {
        if (error) console.log(error);
        const result = data;

        let today = new Date();
        var day_count = new Array();
        for (var i = 0; i < day; i++) {
          var temp_year = today.getFullYear();
          var temp_month = today.getMonth() + 1;
          var temp_date = today.getDate();
          day_count[i] = {
            y_date: temp_year,
            m_date: temp_month,
            d_date: temp_date,
            count: 0,
          };
          today.setDate(today.getDate() - 1);
        }
        day_count.map((v1) => {
          result.map((v2) => {
            if (
              v1.y_date === v2.y_date &&
              v1.m_date === v2.m_date &&
              v1.d_date === v2.d_date
            ) {
              v1.count = v2['COUNT(*)'];
            }
          });
        });
        console.log(result);
        console.log(day_count);
        return res.send(day_count);
      },
    );
  });
};
