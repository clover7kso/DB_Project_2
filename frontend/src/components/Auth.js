import React, { useDispatch } from 'react';
import Cookie from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookie();

export const setTokenToCookie = (token) => {
  cookies.set('token', token, { sameSite: 'strict' });
};
export const setInfoToCookie = (info) => {
  cookies.set('info', info, { sameSite: 'strict' });
};

export const getTokenFromCookie = () => {
  return cookies.get('token');
};
export const getInfoFromCookie = () => {
  return cookies.get('info');
};

export const logout = () => {
  console.log('localStorage set logout!');
  window.localStorage.setItem('logout', Date.now());
  cookies.remove('token');
  cookies.remove('info');
};

export const handleLogin = async (id, pw) => {
  const res = await axios.post('http://localhost:4000/login', {
    id: id,
    pw: pw,
  });
  if (res.data) {
    console.log('로그인 성공!');
    setTokenToCookie(res.data.token); // cookie에 refresh_token 저장
    setInfoToCookie(res.data); // cookie에 refresh_token 저장
    return true;
  } else {
    console.log('로그인 실패');
    return false;
  }
};

export const handleDoctorLogin = async (id, pw) => {
  const res = await axios.post('http://localhost:4000/doctorLogin', {
    id: id,
    pw: pw,
  });
  if (res.data) {
    console.log('로그인 성공!');
    setTokenToCookie(res.data.token); // cookie에 refresh_token 저장
    setInfoToCookie(res.data); // cookie에 refresh_token 저장
    return true;
  } else {
    console.log('로그인 실패');
    return false;
  }
};

export const handleUpdateUser = async (id, pw, sido, phone ,pwcf) => {
  if(pw!==pwcf) return {result:false,msg:"Password_Error"};
  if(isNaN(phone) || phone.length<9 || phone.length>12 ) return {result:false,msg:"Phone_Data_Not_Allowed"};

  console.log(id, pw, sido, phone ,pwcf);

  const res = await axios.post('http://localhost:4000/updateUser', {
    id: id,
    pw: pw,
    sido: sido,
    phone: phone
  });
  if (res.result) {
    console.log('업데이트 성공!');
    return {result:true,msg:"Sucess"};
  } else {
    console.log('업데이트 실패');
    return {result:false,msg:"QuerryError"};
  }
};

export const handleUpdateDoctor = async (id, pw, pwcf) => {
  if(pw!==pwcf) return {result:false,msg:"Password_Error"};

  console.log(id, pw, pwcf);

  const res = await axios.post('http://localhost:4000/updateDoctor', {
    id: id,
    pw: pw
  });
  if (res.result) {
    console.log('업데이트 성공!');
    return {result:true,msg:"Sucess"};
  } else {
    console.log('업데이트 실패');
    return {result:false,msg:"QuerryError"};
  }
};
