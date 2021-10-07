export default async (app,connection)=>{ 
    app.get('/hospitalList', async (req, res, next) => {
        const {offset} = req.query;
        await connection.query(
            'SELECT orgnm FROM hospital ORDER BY orgnm LIMIT 20 OFFSET ?',
            [Number(offset)],
            (error, data) => { 
                if (error) console.log(error);
                const result = data
                return res.send(result);
            }
        );
    });    
}