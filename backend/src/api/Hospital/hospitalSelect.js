export default async (app, connection) => {
  app.get('/hospitalSelect', async (req, res, next) => {
    const { offset, orgnm, si, sido } = req.query;
    await connection.query(
      'SELECT orgnm, sido, si FROM hospital WHERE orgnm LIKE ? AND si = ? AND sido = ? ORDER BY orgnm LIMIT 20 OFFSET ?',
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
