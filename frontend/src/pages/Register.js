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

const register = async (email, password, phone, name, id) => {
  const res = await axios.post('http://localhost:4000/register', {
    email: email,
    password: password,
    phone: phone,
    name: name,
    id: id,
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

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  return (
    <div>
      <CardWrapper>
        <CardHeader>
          <CardHeading>회원가입</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardTitle>이메일</CardTitle>
            <CardInput
              placeholder="vaccine@good.com"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
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
            <CardTitle>휴대전화</CardTitle>
            <CardInput
              placeholder="010-0000-0000"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
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
            <CardTitle>주민번호</CardTitle>
            <CardInput
              placeholder="000000-0000000"
              type="text"
              onChange={(e) => setId(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardButton
              type="button"
              onClick={async (e) => {
                if (await register(email, password, phone, name, id))
                  history.push('/login');
              }}
            >
              회원가입
            </CardButton>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/login">이미 계정이 있으신가요?</CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
};

export default Register;
