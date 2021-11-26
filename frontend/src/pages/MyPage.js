import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromCookie } from '../components/Auth';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardButton,
} from '../components/Card';

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
  return <div>MyPage</div>;
};

export default MyPage;
