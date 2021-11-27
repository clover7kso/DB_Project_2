import React, { useState, useEffect } from 'react';
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
  CardSelect,
  CardSelectOption,
} from '../components/Card';
import Swal from 'sweetalert2';
import axios from 'axios';

const register = async (ssn, id, pw, phone, name, sido) => {
  const res = await axios.post('http://localhost:4000/register', {
    ssn: ssn,
    id: id,
    pw: pw,
    phone: phone,
    name: name,
    sido: sido,
  });
  const { result, msg } = res.data;
  if (result === true) {
    Swal.fire(
      '회원가입에 성공하였습니다.',
      '국민 건강을 위하여 백신접종은 필수입니다. 로그인을 진행하여주세요',
      'success',
    );
  } else {
    Swal.fire('회원가입에 실패했습니다.', msg, 'error');
  }

  return result;
};

const Register = ({ history }) => {
  const [ssn, setSsn] = useState('');
  const [id, setID] = useState('');
  const [pw, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  var [selSi, setSelSi] = useState('');
  var [sido, setSido] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/hospitalSido')
      .then(({ data }) => setSido(data));
  }, []);

  return (
    <div>
      <CardWrapper>
        <CardHeader>
          <CardHeading>국민 회원가입</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardTitle>아이디</CardTitle>
            <CardInput
              placeholder="5~15 영문 및 숫자를 포함"
              type="text"
              onChange={(e) => setID(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>비밀번호</CardTitle>
            <CardInput
              placeholder="8~20 최소 하나의 문자 및 하나의 숫자 포함"
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
            <CardTitle>휴대전화</CardTitle>
            <CardInput
              placeholder="- 제외하고 입력 ex) 01012345678"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>주민번호</CardTitle>
            <CardInput
              placeholder="000000-0000000"
              type="text"
              onChange={(e) => setSsn(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>시/구</CardTitle>
            <CardSelect onChange={(e) => setSelSi(e.target.value)}>
              {sido.map((item) => {
                return (
                  <CardSelectOption value={item.sido}>
                    {item.sido}
                  </CardSelectOption>
                );
              })}
            </CardSelect>
          </CardFieldset>

          <CardFieldset>
            <CardButton
              type="button"
              onClick={async (e) => {
                if (await register(ssn, id, pw, phone, name, selSi))
                  history.push('/login');
              }}
            >
              회원가입
            </CardButton>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/login">이미 계정이 있으신가요?</CardLink>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/DoctorRegister">접종기관 의사이신가요?</CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
};

export default Register;
