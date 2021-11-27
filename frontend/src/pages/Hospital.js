import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HInfo from '../components/HInfo';
import HList from '../components/HList';
import HSearch from '../components/HSearch';
import HReserv from '../components/HReserv';

const Body = styled.div``;

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

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    console.log('Open Modal:' + modalIsOpen);
    console.log(date);
    setIsOpen(true);
  };
  const closeModal = () => {
    console.log('Close Modal:' + modalIsOpen);
    setDate();
    setIsOpen(false);
  };

  const today = new Date();
  const defaultValue = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
  const [day, setDay] = useState(defaultValue);
  const [date, setDate] = useState();

  const [canReserv, setCanReserv] = useState();
  useEffect(() => {
    if (hcode && day)
      axios
        .get('http://localhost:4000/hospitalReserve', {
          params: {
            orgcd: hcode,
            y: day.year,
            m: day.month,
            d: day.day,
          },
        })
        .then(({ data }) => {
          setCanReserv(data);
          setTime(data[0].key);
        });
  }, [day]);
  console.log(canReserv);

  const [time, setTime] = useState();

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
      {HInfo({ orginfo, openModal })}
      {HReserv({
        orgcd: hcode,
        modalIsOpen,
        closeModal,
        day,
        setDay,
        date,
        setDate,
        canReserv,
        time,
        setTime,
      })}
    </Body>
  );
};

export default Hospital;
