import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromCookie } from '../components/Auth';
import DoctorMyPageComp from '../components/DoctorMyPageComp';

const DoctorMyPage = ({ history }) => {
  const token = getTokenFromCookie();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    axios
      .get('http://localhost:4000/doctorInfo', {
        headers: {
          token: token,
        },
      })
      .then(({ data }) => setUserInfo(data[0]));
  }, []);
  console.log(userInfo);

  return <DoctorMyPageComp data={userInfo}/>;
};

export default DoctorMyPage;