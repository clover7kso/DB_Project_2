import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HInfo from '../components/HInfo';
import HList from '../components/HList';
import HSearch from '../components/HSearch';
import HReserv from '../components/HReserv';
import { getTokenFromCookie } from '../components/Auth';
import { toSqlDatetime } from '../util';
import Swal from 'sweetalert2';

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
    setSelDay();
    setSelTime();
    setSelVac();
    setIsOpen(true);
  };
  const closeModal = () => {
    console.log('Close Modal:' + modalIsOpen);
    setSelDay();
    setSelTime();
    setSelVac();
    setIsOpen(false);
  };

  const today = new Date();
  const defaultValue = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
  const [day, setDay] = useState(defaultValue);
  const [selDay, setSelDay] = useState();

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
  }, [day, hcode]);

  const [time, setTime] = useState();
  const [selTime, setSelTime] = useState();

  const [vac, setVac] = useState();
  const [selVac, setSelVac] = useState();

  const handleReservation = () => {
    const mDate = toSqlDatetime(
      new Date(selDay.year, selDay.month - 1, selDay.day, time, 0, 0),
    );
    const token = getTokenFromCookie();

    axios
      .get('http://localhost:4000/reserveVaccine', {
        headers: {
          token: token,
        },
        params: { vaccine_name: vac, orgcd: hcode, reservation_time: mDate },
      })
      .then(({ data }) => {
        console.log(data);
        closeModal();
        if (data === true) {
          Swal.fire(
            '예약이 완료되었습니다.',
            '예약날짜에 맞추어 병원에 방문바랍니다.',
            'success',
          );
        } else {
          Swal.fire(
            '예약이 실패하였습니다.',
            '이미 누가 예약했거나 시스템 문제가 있습니다.',
            'error',
          );
        }
      });
  };

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
      {orginfo
        ? HReserv({
            orgcd: hcode,
            modalIsOpen,
            closeModal,
            day,
            setDay,
            selDay,
            setSelDay,
            canReserv,
            time,
            setTime,
            selTime,
            setSelTime,
            canSelectVaccine: orginfo.canSelectVaccine,
            vac,
            setVac,
            selVac,
            setSelVac,
            handleReservation,
          })
        : null}
    </Body>
  );
};

export default Hospital;
