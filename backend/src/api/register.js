import checkEmail from "./checkEmail.js";
import checkId from "./checkId.js";
import checkPhone from "./checkPhone.js";

export default (app,connection)=>{ 
    app.post('/register', async (req, res, next) => {
        const {id, email, password, name, phone} = req.body;
        if(await checkEmail(req,connection)) res.send({result:false, msg:"이미 존재하는 이메일입니다."});
        else if(await checkPhone(req,connection)) res.send({result:false, msg:"이미 존재하는 전화번호입니다."});
        else if(await checkId(req,connection)) res.send({result:false, msg:"이미 존재하는 주민등록입니다."});
        else connection.query(
            'INSERT INTO user(id, email, password, name, phone) VALUES (?,?,?,?,?);',
            [id, email, password, name, phone],
            (error, data) => { 
                if (error) throw error;
                res.send({result:true, msg:"회원가입이 완료되었습니다."});
            }
        );
    });
}