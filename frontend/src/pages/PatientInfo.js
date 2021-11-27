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


const Col = styled.div`
  align-items: 'center';
  justify-content: 'center';
`;


const Body = styled.div`
  margin-top: 12px;
`;

const ItemWrapper = styled.div`
  padding-bottom: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ItemName = styled.div`
  padding-top: 0.1em;
  padding-left: 1em;
  font-family: inherit;
  text-align: left;
  width: 20%;
  font-size: 12px;
  color: #2c2c2c;
`;
const ItemInfo = styled.div`
  padding-top: 0.1em;
  padding-left: 1em;
  font-family: inherit;
  text-align: left;
  width: 100%;
  font-size: 12px;
  color: #2c2c2c;
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
        <Body style={{}}>
            <CardWrapper>
                <CardHeader>
                    <CardHeading>환자 정보</CardHeading>
                </CardHeader>
                {injectionTable?
                <CardBody>
                  <CardFieldset>
                    <ItemWrapper>
                      <ItemInfo>백신번호</ItemInfo>
                      <ItemInfo>주민번호</ItemInfo>
                      <ItemInfo>접종날짜</ItemInfo>
                      <ItemInfo>예정날짜</ItemInfo>
                      <ItemInfo>의사이름</ItemInfo>
                    </ItemWrapper>
                  </CardFieldset>
                  
                  <CardFieldset>
                    <InfiniteScroll dataLength={injectionTable.length}>
                        {injectionTable.map((item) => {
                            return (
                              <ItemWrapper>
                                <ItemInfo>{item.vnumber}</ItemInfo>
                                <ItemInfo>{item.ssn}</ItemInfo>
                                <ItemInfo>{item.inject_date}</ItemInfo>
                                <ItemInfo>{item.reservation_time}</ItemInfo>
                                <ItemInfo>{item.dname}</ItemInfo>
                              </ItemWrapper>
                            );
                        })}
                    </InfiniteScroll>
                  </CardFieldset>
                </CardBody>:null}
            </CardWrapper>
        </Body>
    );
};

export default PatientInfo;