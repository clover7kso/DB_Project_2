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
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { ReactComponent as arrow_right } from '../imgs/arrow_left.svg';
import org from '../imgs/hospital.svg';
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

const TimeButton = styled.button`
  width: '20%';
  border: 2px solid #cdcdcd;
  background: ${(props) => props.background || 'gray'};
  cursor: pointer;
  display: block;
  left: 0%;
  right: auto;
  position: relative;
  transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1);

  &:hover {
    background-color: #c8c8c8;
    text-shadow: nthree;
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

  var [orginfo, setOrginfo] = useState();
  var [nine, setNine] = useState(0);
  var [ten, setTen] = useState(0);
  var [eleven, setEleven] = useState(0);
  var [twelve, setTwelve] = useState(0);
  var [one, setOne] = useState(0);
  var [two, setTwo] = useState(0);
  var [three, setThree] = useState(0);
  var [four, setFour] = useState(0);
  var [five, setFive] = useState(0);
  useEffect(() => {
    if (hcode !== '') {
      axios
        .get('http://localhost:4000/hospitalInfo', { params: { orgcd: hcode } })
        .then(({ data }) => {
          setOrginfo(data[0]);
        });
      axios
        .get('http://localhost:4000/hospitalReserve', {
          params: { orgcd: hcode, date: new Date() },
        })
        .then((tmdata) => {
          setNine(tmdata.data['09']);
          setTen(tmdata.data['10']);
          setEleven(tmdata.data['11']);
          setTwelve(tmdata.data['12']);
          setOne(tmdata.data['13']);
          setTwo(tmdata.data['14']);
          setThree(tmdata.data['15']);
          setFour(tmdata.data['16']);
          setFive(tmdata.data['17']);
        });
    }
  }, [hcode]);

  var [revTm, setRevTm] = useState(0);
  var [revVaccine, setRevVaccine] = useState('');

  const divRef = useRef(false);
  function handleChecked(target) {
    const vCheck = divRef.current.getElementsByTagName('input');

    for (var i = 0; i < vCheck.length; i++) vCheck[i].checked = false;
    target.checked = true;
  }

  return (
    <Body>
      <CardWrapper
        style={{
          width: '100%',
        }}
      >
        <CardBody>
          <CardFieldset style={{ paddingTop: 32 }}>
            <CardTitle>접종기관 검색</CardTitle>
          </CardFieldset>
          <CardFieldset>
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
            <CardSelect onChange={(e) => setSelSi(e.target)}>
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
          height="350px"
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
          marginBottom: '32px',
          width: '100%',
        }}
      >
        <CardBody>
          <CardFieldset>
            <CardTitle>선택한 접종기관 정보</CardTitle>
          </CardFieldset>
          <CardFieldset>
            {orginfo != null ? (
              <CardFieldset>
                <CardTitle style={{ fontSize: '24px' }}>
                  <img src={org} width="32px" height="32px" />
                  {orginfo.orgnm}
                </CardTitle>
                <CardTitle>
                  <img src={loc} width="32px" height="32px" />
                  {orginfo.orgZipaddr}
                </CardTitle>
                <CardTitle>
                  <img src={call} width="32px" height="32px" />
                  {orginfo.orgTlno}
                </CardTitle>
                <CardTitle>
                  <img src={time} width="32px" height="32px" />
                  {orginfo.sttTm.substr(3, 7)} ~ {orginfo.endTm.substr(3, 7)}
                </CardTitle>
                <CardTitle>
                  {orginfo.lunchSttTm.substr(0, 2)}:
                  {orginfo.lunchSttTm.substr(2, 4)} ~{' '}
                  {orginfo.lunchEndTm.substr(0, 2)}:
                  {orginfo.lunchEndTm.substr(2, 4)}
                </CardTitle>
                <CardTitle style={{ color: 'gray' }}>
                  화이자 : {orginfo.canSelectVaccine.화이자} | 모더나 :{' '}
                  {orginfo.canSelectVaccine.모더나} | 얀센 :{' '}
                  {orginfo.canSelectVaccine.얀센} | 아스트라제네카 :{' '}
                  {orginfo.canSelectVaccine.아스트라제네카}
                </CardTitle>
                <div className="setRevVaccine" ref={divRef}>
                  <input
                    type="checkbox"
                    id="pfizer"
                    onClick={(e) => handleChecked(e.target)}
                  />
                  <label for="pfizer">화이자</label>
                  <input
                    type="checkbox"
                    id="moderna"
                    onClick={(e) => handleChecked(e.target)}
                  />
                  <label for="moderna">모더나</label>
                  <input
                    type="checkbox"
                    id="jansen"
                    onClick={(e) => handleChecked(e.target)}
                  />
                  <label for="jansen">얀센</label>
                  <input
                    type="checkbox"
                    id="az"
                    onClick={(e) => handleChecked(e.target)}
                  />
                  <label for="az">아스트라제네카</label>
                </div>
                <div className="setRevTime">
                  <CardButton
                    style={{ backgroundColor: nine > 0 ? 'green' : 'gray' }}
                    onclick={(e) => {
                      setRevTm(9);
                    }}
                  >
                    9시 ~ 10시 남은 예약수 : {nine}
                  </CardButton>
                  <CardButton
                    style={{ backgroundColor: ten > 0 ? 'green' : 'gray' }}
                    onclick={(e) => {
                      setRevTm(10);
                    }}
                  >
                    10시 ~ 11시 남은 예약수 : {ten}
                  </CardButton>
                  <CardButton
                    style={{ backgroundColor: eleven > 0 ? 'green' : 'gray' }}
                    onclick={(e) => {
                      setRevTm(11);
                    }}
                  >
                    11시 ~ 12시 남은 예약수 : {eleven}
                  </CardButton>
                  <CardButton
                    style={{ backgroundColor: twelve > 0 ? 'green' : 'gray' }}
                    onclick={(e) => {
                      setRevTm(12);
                    }}
                  >
                    12시 ~ 13시 남은 예약수 : {twelve}
                  </CardButton>
                  <CardButton
                    style={{ backgroundColor: one > 0 ? 'green' : 'gray' }}
                    onclick={(e) => {
                      setRevTm(13);
                    }}
                  >
                    13시 ~ 14시 남은 예약수 : {one}
                  </CardButton>
                  <CardButton
                    style={{ backgroundColor: two > 0 ? 'green' : 'gray' }}
                    onclick={(e) => {
                      setRevTm(14);
                    }}
                  >
                    14시 ~ 15시 남은 예약수 : {two}
                  </CardButton>
                  <CardButton
                    style={{ backgroundColor: three > 0 ? 'green' : 'gray' }}
                    onclick={(e) => {
                      setRevTm(15);
                    }}
                  >
                    15시 ~ 16시 남은 예약수 : {three}
                  </CardButton>
                  <CardButton
                    style={{ backgroundColor: four > 0 ? 'green' : 'gray' }}
                    onclick={(e) => {
                      setRevTm(16);
                    }}
                  >
                    16시 ~ 17시 남은 예약수 : {four}
                  </CardButton>
                  <CardButton
                    style={{ backgroundColor: five > 0 ? 'green' : 'gray' }}
                    onclick={(e) => {
                      setRevTm(17);
                    }}
                  >
                    17시 ~ 18시 남은 예약수 : {five}
                  </CardButton>
                </div>
                <div className="revBtn" align="center">
                  <CardButton style={{ width: '40%' }}>
                    잔여백신 당일예약하기
                  </CardButton>
                </div>
              </CardFieldset>
            ) : null}
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </Body>
  );
};

export default Hospital;
