import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import DoctorRegisterComp from '../components/DoctorRegisterComp';

const register = async (number, password, name, orgcd) => {
  const res = await axios.post('http://localhost:4000/doctorRegister', {
    number: number,
    pw : password,
    name: name,
    orgcd: orgcd,
  });
  const { result, msg } = res.data;
  if (result === true) {
    Swal.fire(
      '회원가입에 성공하였습니다.',
      '국민 건강을 위하여 백신은 필수입니다. 로그인을 진행하여주세요',
      'success',
    );
  } else {
    Swal.fire('회원가입에 실패했습니다.', msg, 'error');
  }

  return result;
};
//number, pw, name, orgcd
const Register = ({ history }) => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [orgcd, setOrgcd] = useState('');

  return (
    <DoctorRegisterComp 
      register={register} history={history}
      number={{number,setNumber}} password={{password, setPassword}} name={{name, setName}} orgcd={{orgcd, setOrgcd}}></DoctorRegisterComp>
  );
};

export default Register;
