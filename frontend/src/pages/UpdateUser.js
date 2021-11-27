import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { getTokenFromCookie } from '../components/Auth';
import UpdateComp from '../components/UpdateComp';

export const handleUpdateUser = async (id, pw, sido, phone ,pwcf) => {

  const token = getTokenFromCookie();

  if(pw!==pwcf) return {result:false,msg:"Password_Error"};
  if(isNaN(phone) || phone.length<9 || phone.length>12 ) return {result:false,msg:"Phone_Data_Not_Allowed"};

  console.log(id, pw, sido, phone ,pwcf);
  let res;
  await axios.get('http://localhost:4000/updateUser', {
    headers:{
      token:token,
    },
    params:{pw:pw, sido:sido, phone:phone},
  })
  .then(({data})=>{
    res=data;
  });

  return res;

};

const update = async (info,id,origin_pw,success) => {
  console.log(info);
  const pw = info.pw===''? origin_pw:info.pw;
  const pwcf = info.pw===''? origin_pw:info.pwcf;

  console.log('id: '+id+ '  pw: '+pw+ '   sido: '+info.sido+ '   phone: '+info.phone+ '   pw repeat: '+pwcf);

  const result = await handleUpdateUser(id, pw, info.sido, info.phone, pwcf);
  
  if(result===undefined) return;

  console.log(result);

  if(result.msg === "Password_Error"){
    Swal.fire(
      '비밀번호가 틀립니다.',
      '비밀번호 확인 바랍니다.',
      'error',
    );
  }
  else if(result.msg === "Phone_Data_Not_Allowed"){
    Swal.fire(
      '폰번호가 알맞은 형식이 아닙니다.',
      '한번 더 확인해주세요.',
      'error',
    );
  }
  else if(result.result === true){
    Swal.fire(
      '정보 수정에 성공했습니다.',
      '마이페이지로 이동합니다.',
      'success',
    ).then((result) => {
      if(result.isConfirmed)
        success();
      else if(result.isDismissed)
        success();
    });
  }
  else{
    Swal.fire(
      '정보 수정에 실패했습니다.',
      '('+'Error '+result.code+')'+result.msg,
      'error',
    );
  }

  return result;
};

const UpdateUser = ({ history }) => {
  const token = getTokenFromCookie();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    axios
      .get('http://localhost:4000/userInfo', {
        headers: {
          token: token,
        },
      })
      .then(({ data }) => setUserInfo(data[0]));
  }, []);

  
  const [sido, setSido] = useState();
  useEffect(() => {
    axios
      .get('http://localhost:4000/hospitalSido')
      .then(({ data }) => setSido(data));
  }, [userInfo]);

  function moveMy(){
    history.push('/MyPage');
  }


  if(sido!==undefined) 
    return <UpdateComp 
            data={userInfo} sido={sido} 
            finish={async (d)=>{await update(d,userInfo.id,userInfo.pw,()=>moveMy());}}
           ></UpdateComp>;
  return <div>로딩중</div>;
};

export default UpdateUser;
