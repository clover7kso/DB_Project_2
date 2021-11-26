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
import { getInfoFromCookie, logout } from '../components/Auth';
import { NavIcon } from '../components/NavIcon';

const Body = styled.div`
  position: fixed;
  width: 20%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Sel = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  background-color: #424242;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const UnSel = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  background-color: white;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const Tab = (title, url, page, setPage) => {
  console.log(url === page);
  return page === url ? (
    <Sel>
      {NavIcon(url, true)}
      <StyledLink
        to={url}
        onClick={() => {
          setPage(url);
        }}
      >
        <CardTitle style={{ color: 'white', fontSize: 16, paddingLeft: 16 }}>
          {title}
        </CardTitle>
      </StyledLink>
    </Sel>
  ) : (
    <UnSel>
      {NavIcon(url, false)}
      <StyledLink
        to={url}
        onClick={() => {
          setPage(url);
        }}
      >
        <CardTitle style={{ color: 'black', fontSize: 16, paddingLeft: 16 }}>
          {title}
        </CardTitle>
      </StyledLink>
    </UnSel>
  );
};

//홈페이지 로고, 통계, 마이페이지, 로그인
const Nav = ({ history }) => {
  const info = getInfoFromCookie();
  const [page, setPage] = useState('/');
  return (
    <Body>
      <CardWrapper style={{ paddingTop: 0, paddingBottom: 0 }}>
        <CardHeader style={{ paddingTop: 12, paddingBottom: 12 }}>
          <CardHeading>코로나 ERP</CardHeading>
        </CardHeader>
      </CardWrapper>
      {info ? (
        <CardWrapper>
          <CardBody style={{ marginTop: 32 }}>
            <CardTitle>
              {info.name + (info.type !== 'user' ? ' 의사선생' : '')}님
              환영합니다!
            </CardTitle>
            <CardTitle
              style={{ cursor: 'pointer' }}
              onClick={() => {
                logout();
                window.location.reload();
              }}
            >
              로그아웃
            </CardTitle>
          </CardBody>
        </CardWrapper>
      ) : null}
      <CardWrapper style={{ paddingTop: 32 }}>
        {info
          ? Tab('마이페이지', '/MyPage', page, setPage)
          : Tab('로그인', '/Login', page, setPage)}
        {Tab('홈', '/', page, setPage)}
        {Tab('병원예약', '/Hospital', page, setPage)}
        {Tab('접종통계', '/Statistic', page, setPage)}
      </CardWrapper>
    </Body>
  );
};

export default Nav;
