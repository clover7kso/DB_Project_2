export default (req, connection) => {
  return new Promise((resolve) => {
    const { ssn } = req.body;
    connection.query(
      'SELECT COUNT(ssn) as cnt FROM user WHERE ssn = ?',
      [ssn],
      (error, data) => {
        if (error) return reject(error);
        const result = data[0].cnt === 1 ? true : false;
        //console.log(result?"ssn dup":"ssn ok");
        return resolve(result);
      },
    );
  });
};
