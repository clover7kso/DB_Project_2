import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { getTokenFromCookie } from '../components/Auth';
import UpdateComp from '../components/UpdateComp';

const UpdateUser = () => {
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

  
  const [sido, setSido] = useState();
  useEffect(() => {
    axios
      .get('http://localhost:4000/hospitalSido')
      .then(({ data }) => setSido(data));
  }, [userInfo]);

  const updateData = (data)=>{
    axios
      .get('http://localhost:4000/updateUser',{
        pw:data.pw,
        phone:data.phone,
        sido:data.sido,
        
        id:data.id
      })
      .then(({ data }) => setSido(data));
  };

  const confirm = (data) => {
    console.log(data);
    if(data.phone.length<0 && data.phone.length>14) return 1;
    if(data.pw!==data.pwcf) return 2;
    if(updateData(data)) return 3;
    return 0;
  };

  if(sido!==undefined) return <UpdateComp data={userInfo} sido={sido} finish={(d)=>confirm(d)}></UpdateComp>;
  return <div>로딩중</div>;
};

export default UpdateUser;
