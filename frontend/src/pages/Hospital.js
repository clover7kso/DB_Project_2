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
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import HInfo from '../components/HInfo';
import HList from '../components/HList';
import HSearch from '../components/HSearch';

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

  var [orginfo, setOrginfo] = useState();
  useEffect(() => {
    if (hcode !== '') {
      axios
        .get('http://localhost:4000/hospitalInfo', { params: { orgcd: hcode } })
        .then(({ data }) => {
          setOrginfo(data[0]);
        });
    }
  }, [hcode]);

  const defaultValue = {
    year: 2019,
    month: 10,
    day: 5,
  };

  const [selectedDay, setSelectedDay] = useState(defaultValue);

  return (
    <Body>
      {HSearch({
        orgnm,
        setOrgnm,
        sido,
        setSelSido,
        si,
        setSelSi,
      })}
      {HList({ selSido, selSi, hostpitals, next, setHcode })}
      {HInfo({ orginfo })}
    </Body>
  );
};

export default Hospital;
