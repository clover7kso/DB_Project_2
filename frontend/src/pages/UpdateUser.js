import React, { useState, useEffect } from 'react';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardButton,
} from '../components/Card';
import axios from 'axios';
import Swal from 'sweetalert2';

import { getTokenFromCookie, handleUpdateUser } from '../components/Auth';
import UpdateComp from '../components/UpdateComp';

const update = async (info,id,origin_pw,success) => {
  console.log(info);
  const pw = info.pw===''? origin_pw:info.pw;
  const pwcf = info.pw===''? origin_pw:info.pwcf;

  console.log('id: '+id+ '  pw: '+pw+ '   sido: '+info.sido+ '   phone: '+info.phone+ '   pw repeat: '+pwcf);
  let result;
  try{
    result = await handleUpdateUser(id, pw, info.sido, info.phone, pwcf);
  }catch(msg){
    console.log('Catched!!')
    if(msg!==null && msg!==undefined){
      Swal.fire(
        '정보 수정에 실패했습니다.',
         msg,
        'error',
      );
      return false;
    }
    else console.log('Error Code Null');
  } 
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
      '정보를 한번더 확인해주세요.',
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
