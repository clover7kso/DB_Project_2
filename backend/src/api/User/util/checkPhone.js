export default (req, connection) => {
  return new Promise((resolve) => {
    const { phone } = req.body;
    connection.query(
      'SELECT COUNT(phone) as cnt FROM user WHERE phone = ?',
      [phone],
      (error, data) => {
        if (error) return reject(error);
        const result = data[0].cnt === 1 ? true : false;
        //console.log(result?"phone dup":"phone ok");
        return resolve(result);
      },
    );
  });
};
