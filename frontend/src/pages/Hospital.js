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
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { ReactComponent as arrow_right } from '../imgs/arrow_left.svg';
import call from '../imgs/call.svg';
import loc from '../imgs/location.svg';
import time from '../imgs/time.svg';

const Body = styled.div``;

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

const ItemIcon = styled(arrow_right)``;

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

const Hospital = ({ history }) => {
  var [orgnm, setOrgnm] = useState('');
  var [selSido, setSelSido] = useState('강원도');
  var [selSi, setSelSi] = useState('');

  var [hcode, setHcode] = useState('');

  var [sido, setSido] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/hospitalSido')
      .then(({ data }) => setSido(data));
  }, []);

  var [si, setSi] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/hospitalSi', { params: { sido: selSido } })
      .then(({ data }) => {
        setSi(data);
        setSelSi(data[0].si);
      });
  }, [selSido]);

  var [offset, setOffset] = useState(0);
  var [hostpitals, setHospitals] = useState([]);
  useEffect(() => {
    if (selSi !== '') {
      axios
        .get('http://localhost:4000/hospitalListSearch', {
          params: {
            offset: 0,
            orgnm: '%' + orgnm + '%',
            si: selSi,
            sido: selSido,
          },
        })
        .then(({ data }) => {
          setHospitals(data);
          setOffset(hostpitals.length);
        });
    }
  }, [orgnm, selSi]);

  const next = () => {
    axios
      .get('http://localhost:4000/hospitalListSearch', {
        params: {
          offset: offset,
          orgnm: '%' + orgnm + '%',
          si: selSi,
          sido: selSido,
        },
      })
      .then(({ data }) => {
        setHospitals((prevState) => [...prevState, ...data]);
        setOffset(hostpitals.length);
      });
  };

  var [orginfo, setOrginfo] = useState([]);
  useEffect(() => {
    if (hcode !== '') {
      axios
        .get('http://localhost:4000/hospitalInfo', { params: { orgcd: hcode } })
        .then(({ data }) => {
          setOrginfo(data);
        });
    }
  }, [hcode]);

  const [modal, setModal] = useState(false);

  return (
    <Body style={{ paddingBottom: 32 }}>
      <CardWrapper
        style={{
          width: '100%',
        }}
      >
        <CardBody>
          <CardFieldset>
            <CardTitle style={{ marginTop: 32, marginBottom: 32 }}>
              접종기관 검색
            </CardTitle>
            <CardTitle>병원명</CardTitle>
            <CardInput
              placeholder="병원명을 입력해주세요"
              type="text"
              onChange={(e) => setOrgnm(e.target.value)}
              value={orgnm}
            />
          </CardFieldset>

          <CardFieldset>
            <CardTitle>시/도</CardTitle>
            <CardSelect
              defaultValue="강원도"
              onChange={(e) => setSelSido(e.target.value)}
            >
              {sido.map((item) => {
                return (
                  <CardSelectOption value={item.sido}>
                    {item.sido}
                  </CardSelectOption>
                );
              })}
            </CardSelect>
          </CardFieldset>

          <CardFieldset>
            <CardTitle>시/구</CardTitle>
            <CardSelect onChange={(e) => setSelSi(e.target.value)}>
              {si.map((item) => {
                return (
                  <CardSelectOption value={item.si}>{item.si}</CardSelectOption>
                );
              })}
            </CardSelect>
          </CardFieldset>
        </CardBody>
      </CardWrapper>

      <CardWrapper
        style={{
          height: '260px',
          padding: '32px 0 0px',
          width: '100%',
        }}
      >
        <CardBody>
          <CardFieldset>
            <CardTitle>
              {selSido} {selSi}의 접종기관 목록
            </CardTitle>
          </CardFieldset>
        </CardBody>

        <InfiniteScroll
          scrollThreshold="220px"
          height="220px"
          dataLength={hostpitals.length} //This is important field to render the next data
          next={next}
          hasMore={true}
          loader={
            <ItemBody>
              <ItemTitle style={{ paddingBottom: '20px' }}>
                불러오는 중...
              </ItemTitle>
            </ItemBody>
          }
        >
          {hostpitals.map((item) => {
            return (
              <ItemBody>
                <ItemButton
                  onClick={(e) => {
                    setHcode(item.orgcd);
                  }}
                >
                  <ItemMain>
                    <ItemAddr>{item.sido + ' > ' + item.si}</ItemAddr>
                    <ItemTitle>{item.orgnm}</ItemTitle>
                  </ItemMain>
                </ItemButton>
                <ItemIcon width="16px" position="right" />
              </ItemBody>
            );
          })}
        </InfiniteScroll>
      </CardWrapper>

      <CardWrapper
        style={{
          height: '400px',
          width: '100%',
        }}
      >
        <CardBody>
          <CardTitle style={{ marginTop: 32, marginBottom: 32 }}>
            접종기관 조회
          </CardTitle>
          {orginfo.map((data) => {
            return (
              <CardFieldset>
                <h2 align="left"> {data.orgnm} </h2>
                <table width="100%" border="0">
                  <tr>
                    <td colSpan="2" align="left">
                      <p>
                        화이자 {data.canSelectVaccine.화이자} | 모더나{' '}
                        {data.canSelectVaccine.모더나} | 얀센{' '}
                        {data.canSelectVaccine.얀센} | 아스트라제네카{' '}
                        {data.canSelectVaccine.아스트라제네카}
                      </p>
                    </td>
                  </tr>
                  <tr width="32px" height="32px">
                    <td style={{ width: '32px' }}>
                      <img src={loc} width="32px" alt="" />
                    </td>
                    <td align="left">{data.orgZipaddr}</td>
                  </tr>
                  <tr width="32px" height="32px">
                    <td style={{ width: '32px' }}>
                      <img src={call} width="32px" alt="" />
                    </td>
                    <td align="left">{data.orgTlno}</td>
                  </tr>
                  <tr width="32px" height="32px">
                    <td style={{ width: '32px' }}>
                      <img src={time} width="32px" alt="" />
                    </td>
                    <td align="left">
                      {data.sttTm} ~ {data.endTm}
                    </td>
                  </tr>
                  <td colSpan="2" align="center">
                    <CardButton
                      style={{ width: '40%' }}
                      onClick={(e) => {
                        setModal(true);
                      }}
                    >
                      잔여백신 당일예약하기
                    </CardButton>
                  </td>
                </table>
              </CardFieldset>
            );
          })}
        </CardBody>
      </CardWrapper>
    </Body>
  );
};

export default Hospital;
