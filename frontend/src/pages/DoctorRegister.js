import React, { useState } from 'react';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
  CardLink,
  CardTitle,
} from '../components/Card';
import Swal from 'sweetalert2';
import axios from 'axios';

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
const DoctorRegister = ({ history }) => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [orgcd, setOrgcd] = useState('');

  return (
    <div>
      <CardWrapper>
        <CardHeader>
          <CardHeading>회원가입</CardHeading>
        </CardHeader>

        <CardBody>

          <CardFieldset>
            <CardTitle>의사번호</CardTitle>
            <CardInput
              placeholder="'-'를 제외한 8자리 숫자"
              type="text"
              onChange={(e) => setNumber(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>병원기관코드</CardTitle>
            <CardInput
              placeholder="'-'를 제외한 8자리 숫자"
              type="text"
              onChange={(e) => setOrgcd(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>비밀번호</CardTitle>
            <CardInput
              placeholder="6~12 글자 대,소,특수문자 포함"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>성함</CardTitle>
            <CardInput
              placeholder="홍길동"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardButton
              type="button"
              onClick={async (e) => {
                if (await register(number, password, name, orgcd))
                  history.push('/login');
              }}
            >
              회원가입
            </CardButton>
          </CardFieldset>

          
          <CardFieldset>
            <CardLink to="/register">백신 접종자이신가요?</CardLink>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/DoctorLogin">이미 계정이 있으신가요?</CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
};

export default DoctorRegister;
