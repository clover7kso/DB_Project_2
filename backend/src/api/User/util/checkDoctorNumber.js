export default (req, connection) => {
    return new Promise((resolve) => {
      const { number } = req.body;
      connection.query(
        'SELECT COUNT(number) as cnt FROM DOCTOR WHERE number = ?',
        [number],
        (error, data) => {
          if (error) return reject(error);
          const result = data[0].cnt === 1 ? true : false;
          //console.log(result?"id dup":"id ok");
          return resolve(result);
        },
      );
    });
  };
  