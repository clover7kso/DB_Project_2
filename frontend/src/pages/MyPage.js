import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromCookie } from '../components/Auth';
import MyPageComp from '../components/MyPageComp';

const MyPage = ({ history }) => {
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
  console.log(userInfo);

  const [injInfo, setInjInfo] = useState();
  useEffect(() => {
    if(userInfo!==undefined){
      axios
        .get('http://localhost:4000/injectionInfo',{
          headers: {
            token: token,
          },
        })
        .then(({ data }) => setInjInfo(data));
    }
  }, [userInfo]);
  console.log(injInfo);
  

  return <MyPageComp data={userInfo} inj={injInfo}/>;
};

export default MyPage;
