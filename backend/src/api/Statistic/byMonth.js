export default async (app, connection) => {
  app.get('/byMonth', async (req, res, next) => {
    const { month } = req.query;
    await connection.query(
      'SELECT YEAR (inject_date) AS y_date, MONTH (inject_date) AS m_date, COUNT(*) FROM INJECTION WHERE inject_date IS NOT NULL GROUP BY m_date, inject_date;',
      [month],
      (error, data) => {
        if (error) console.log(error);
        const result = data;

        let today = new Date();
        var month_count = new Array();
        for (var i = 0; i < month; i++) {
          var temp_year = today.getFullYear();
          var temp_month = today.getMonth() + 1;
          month_count[i] = {
            y_date: temp_year,
            m_date: temp_month,
            count: 0,
          };
          today.setMonth(today.getMonth() - 1);
        }
        month_count.map((v1) => {
          result.map((v2) => {
            if (v1.y_date === v2.y_date && v1.m_date === v2.m_date)
              v1.count += v2['COUNT(*)'];
          });
        });
        console.log("month : ", month_count);
        return res.send(month_count);
      },
    );
  });
};
