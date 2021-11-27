import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { getTokenFromCookie } from '../components/Auth';
import UpdateDoctorComp from '../components/UpdateDoctorComp';


export const handleUpdateDoctor = async (id, pw, pwcf) => {
  if(pw!==pwcf) return {result:false,msg:"Password_Error"};

  console.log(id, pw, pwcf);

  const token = getTokenFromCookie();

  let res;
  await axios.get('http://localhost:4000/updateDoctor', {
    headers:{
      token:token,
    },params:{pw:pw}
  }).then(({data})=>{
    res = data;
  });
  return res;
};


const updateDoctor = async (info,id,origin_pw,success) => {
  console.log(info);
  const pw = info.pw===''? origin_pw:info.pw;
  const pwcf = info.pw===''? origin_pw:info.pwcf;

  console.log('id: '+id+ '  pw: '+pw+ '   pw repeat: '+pwcf);
  let result;
  result = await handleUpdateDoctor(id, pw, pwcf);
  
  console.log(result);
    if(result.result === true){
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
    else {
        Swal.fire(
        '비밀번호가 틀립니다.',
        '비밀번호 확인 바랍니다.',
        'error',
        );
    }

    return result;
};

const UpdateDoctor = ({ history }) => {
  const token = getTokenFromCookie();
  const [doctorInfo, setDoctorInfo] = useState();
  useEffect(() => {
    axios
      .get('http://localhost:4000/doctorInfo', {
        headers: {
          token: token,
        },
      })
      .then(({ data }) => setDoctorInfo(data[0]));
  }, []);

  function moveMy(){
    history.push('/DoctorMyPage');
  }

    if(doctorInfo!==undefined){
    return <UpdateDoctorComp 
            data={doctorInfo}
            finish={async (d)=>{await updateDoctor(d,doctorInfo.id,doctorInfo.pw,()=>moveMy());}}
            ></UpdateDoctorComp>;
    }
    return <div>로딩중</div>;
};

export default UpdateDoctor;
