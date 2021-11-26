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

const MyPage = async ({ history }) => {
  const token = getTokenFromCookie();
  console.log(token);
  const res = await axios.get('http://localhost:4000/userInfo', {
    headers: {
      token: token,
    },
  });
  console.log(res.data);
  return <div>MyPage</div>;
};

export default MyPage;
