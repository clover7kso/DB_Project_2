export default (app,connection)=>{ 
    app.post('/manager', (req, res, next) => {
        const Info = req.body.hospitalInfo;
        console.log(Info);
        Info.map((v) => {
            connection.query(
                'INSERT IGNORE hospital(orgcd, orgnm, orgTlno, orgZipaddr, slrYmd, dywk, hldyYn, lunchSttTm, lunchEndTm, sttTm, endTm) VALUES (?,?,?,?,?,?,?,?,?,?,?);',
                [v.orgcd, v.orgnm, v.orgTlno, v.orgZipaddr, v.slrYmd, v.dywk, v.hldyYn, v.lunchSttTm, v.lunchEndTm, v.sttTm, v.endTm],
            );
        })
    });    
}