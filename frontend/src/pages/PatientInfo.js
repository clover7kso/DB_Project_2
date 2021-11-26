import React, { useState, useEffect, useRef } from 'react';
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
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

const Body = styled.div``;

const BoxWrapper = styled.div`
`;

const CardBox = styled.div`
  display: block;
  width: 95%;
  padding: 12px 0;
  margin: 8px 8px 8px 8px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #000000;
  background-color: white;
  border: 0;
  border-radius: 35px;
  box-shadow: 10px 10px 10px 10px rgba(0.05, 0.05, 0.05, 0.05);
  cursor: pointer;
  display: inline-block;
  outline: 0;
`;
 
const ItemBody = styled.div`
  padding: 32px 32px 0px;
  display: flex;
  flex-direction: horizontal;
`;

const ItemMain = styled.div`
  width: 100%;
`;

const ItemAddr = styled.div`
  padding-bottom: 8px;
  text-align: left;
  width: 100%;
  font-size: 12px;
  color: #2c2c2c;
`;

const ItemTitle = styled.div`
  text-align: left;
  width: 100%;
  font-size: 16px;
  color: #3a3a3a;
`;

const ItemButton = styled.button`
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e2e2e2;
  }
  &:active {
    background: #c8c8c8;
  }
`;

const colWrapper = styled.div`
  width: 20%;
  background-color: #000000;
`;

const PatientInfo = ({ history }) => {
    const token = getTokenFromCookie();
    const [injectionTable, setInjectionTable] = useState();
    useEffect(() => {
        axios.get('http://localhost:4000/injectionTable', {
            headers: {
              token: token,
            },
          })
          .then(({ data }) => {setInjectionTable(data)});
    }, []);
    console.log(injectionTable);
    return (
        <Body>
            <CardWrapper>
                <CardHeader>
                    <CardHeading>환자 정보</CardHeading>
                </CardHeader>
                {injectionTable?
                <BoxWrapper>
                    <colWrapper>백신번호</colWrapper>
                    <colWrapper>주민번호</colWrapper>
                    <colWrapper>접종날짜</colWrapper>
                    <colWrapper>예정날짜</colWrapper>
                    <colWrapper>의사이름</colWrapper>
                    <InfiniteScroll dataLength={injectionTable.length}>
                        {injectionTable.map((item) => {
                            return (
                                <div>
                                    <colWrapper>{item.vnumber}</colWrapper>
                                    <colWrapper>{item.ssn}</colWrapper>
                                    <colWrapper>{item.inject_date}</colWrapper>
                                    <colWrapper>{item.reservation_time}</colWrapper>
                                    <colWrapper>{item.dname}</colWrapper>
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </BoxWrapper>:null}
            </CardWrapper>
        </Body>
    );
};

export default PatientInfo;