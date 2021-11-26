import React, { useDispatch } from 'react';
import Cookie from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookie();

export const setTokenToCookie = (token) => {
  cookies.set('token', token, { sameSite: 'strict' });
};

export const getTokenFromCookie = () => {
  return cookies.get('token');
};

export const logout = () => {
  console.log('localStorage set logout!');
  window.localStorage.setItem('logout', Date.now());
  cookies.remove('token');
};

export const handleLogin = async (id, pw) => {
  const res = await axios.post('http://localhost:4000/login', {
    id: id,
    pw: pw,
  });
  if (res.data.token) {
    console.log('로그인 성공!');
    setTokenToCookie(res.data.token); // cookie에 refresh_token 저장
    return true;
  } else {
    console.log('로그인 실패');
    return false;
  }
};
