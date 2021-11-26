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
} from '../components/Card';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Body = styled.div``;

//홈페이지 로고, 통계, 마이페이지, 로그인
const Nav = ({ history }) => {
  return (
    <Body>
      <CardWrapper style={{ paddingTop: 0, paddingBottom: 0 }}>
        <CardHeader style={{ paddingTop: 12, paddingBottom: 12 }}>
          <CardHeading>코로나 ERP</CardHeading>
        </CardHeader>
      </CardWrapper>
      <CardWrapper>
        <CardBody style={{ marginTop: 32 }}>
          <Link to="/Login">
            <CardTitle>로그인하여 접종예약</CardTitle>
          </Link>
          <Link to="/">
            <CardTitle>홈</CardTitle>
          </Link>
          <Link to="/Hospital">
            <CardTitle>병원예약</CardTitle>
          </Link>
          <Link to="/Statistic">
            <CardTitle>접종통계</CardTitle>
          </Link>
        </CardBody>
      </CardWrapper>
    </Body>
  );
};

export default Nav;
