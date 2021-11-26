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
} from '../components/Card';
import Swal from 'sweetalert2';
import { handleDoctorLogin } from '../components/Auth';

const login = async (id, pw) => {
  const result = await handleDoctorLogin(id, pw);
  console.log(result);
  if (result === true) {
    Swal.fire(
      '로그인이 성공하였습니다.',
      '국민 건강을 위하여 백신접종은 필수입니다.',
      'success',
    ).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  } else {
    Swal.fire(
      '아이디 또는 비밀번호가 틀립니다.',
      '회원가입 또는 계정찾기를 진행해주세요.',
      'error',
    );
  }

  return result;
};

const DoctorLogin = ({ history }) => {
  const [id, setID] = useState('');
  const [pw, setPassword] = useState('');

  return (
    <div>
      <CardWrapper>
        <CardHeader>
          <CardHeading>의사 로그인</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardInput
              placeholder="의사번호"
              type="text"
              onChange={(e) => setID(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardInput
              placeholder="비밀번호"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardFieldset>

          <CardFieldset>
            <CardButton
              type="button"
              onClick={async (e) => {
                if (await login(id, pw)) {
                  history.push('/');
                }
              }}
            >
              로그인
            </CardButton>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/DoctorRegister">계정이 없으신가요?</CardLink>
          </CardFieldset>

          <CardFieldset>
            <CardLink to="/login">접종기관 의사가 아니신가요?</CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
};

export default DoctorLogin;
