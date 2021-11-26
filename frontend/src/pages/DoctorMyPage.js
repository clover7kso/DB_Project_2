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

const DoctorMyPage = async ({ history }) => {
  const token = getTokenFromCookie();
  console.log(token);
  const res = await axios.get('http://localhost:4000/doctorInfo', {
    headers: {
        token: token
    }
  });
  console.log(res.data);
  return <div>DoctorMyPage</div>;
};

export default DoctorMyPage;
