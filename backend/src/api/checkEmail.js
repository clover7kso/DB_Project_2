export default (req, connection)=>{ 
    return new Promise((resolve, reject) => {
        const {email} = req.body;
        connection.query(
            'SELECT COUNT(email) as cnt FROM user WHERE email = ?',
            [email],
            (error, data) => { 
                if (error) return reject(error);
                const result = data[0].cnt === 1 ? true : false
                //console.log(result?"email dup":"email ok");
                return resolve(result);
            }
        )
    });
}