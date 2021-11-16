export default async (app, connection) => {
  app.get('/hospitalListSearch', async (req, res, next) => {
    const { offset, orgnm, si, sido } = req.query;
    console.log(offset);
    console.log(orgnm);
    console.log(si);
    console.log(sido);
    await connection.query(
      'SELECT orgcd, orgnm, sido, si FROM hospital WHERE orgnm LIKE ? AND si = ? AND sido = ? ORDER BY orgnm LIMIT 20 OFFSET ?',
      [orgnm, si, sido, Number(offset)],
      (error, data) => {
        if (error) console.log(error);
        const result = data;
        console.log(result);
        return res.send(result);
      },
    );
  });
};
