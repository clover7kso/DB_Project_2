import React from 'react';
import { CardButton } from '../components/Card';
import axios from 'axios';

const getResult = async () => {
  const res = await axios.post('http://localhost:4000/hospitalUpdate');
  return res.data;
};

const Manager = () => {
  return (
    <div>
      <CardButton type="button" onClick={() => getResult()}>
        병원정보 DB 업로드
      </CardButton>
    </div>
  );
};

export default Manager;
