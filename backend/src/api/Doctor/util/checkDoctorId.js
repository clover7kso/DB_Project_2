export default (req, connection) => {
    return new Promise((resolve) => {
      const { id } = req.body;
      connection.query(
        'SELECT COUNT(id) as cnt FROM DOCTOR WHERE id = ?',
        [id],
        (error, data) => {
          if (error) return reject(error);
          const result = data[0].cnt === 1 ? true : false;
          //console.log(result?"id dup":"id ok");
          return resolve(result);
        },
      );
    });
  };
  