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
import { getTokenFromCookie } from '../components/Auth';

const Body = styled.div`
  position: fixed;
  width: 20%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Tab = (title, url, page, setPage) => {
  console.log(url === page);
  return page === url ? (
    <StyledLink
      to={url}
      onClick={() => {
        setPage(url);
      }}
    >
      <CardTitle>{title}</CardTitle>
    </StyledLink>
  ) : (
    <StyledLink
      to={url}
      onClick={() => {
        setPage(url);
      }}
    >
      <CardTitle>{title}</CardTitle>
    </StyledLink>
  );
};

//홈페이지 로고, 통계, 마이페이지, 로그인
const Nav = ({ history }) => {
  const token = getTokenFromCookie();
  const [page, setPage] = useState('/');
  return (
    <Body>
      <CardWrapper style={{ paddingTop: 0, paddingBottom: 0 }}>
        <CardHeader style={{ paddingTop: 12, paddingBottom: 12 }}>
          <CardHeading>코로나 ERP</CardHeading>
        </CardHeader>
      </CardWrapper>
      <CardWrapper>
        <CardBody style={{ marginTop: 32 }}>
          {Tab('로그인', '/Login', page, setPage)}
          {Tab('홈', '/', page, setPage)}
          {Tab('병원예약', '/Hospital', page, setPage)}
          {Tab('접종통계', '/Statistic', page, setPage)}
        </CardBody>
      </CardWrapper>
    </Body>
  );
};

export default Nav;
