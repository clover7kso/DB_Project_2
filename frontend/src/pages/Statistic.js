import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CardWrapper,
  CardBody,
  CardHeader,
  CardHeading,
} from '../components/Card';
import styled from 'styled-components';

import StatisticComp from '../components/StatisticComp';

const Body = styled.div`
  display: flex;
  flex-direction: horizontal;
`;
const Col = styled.div``;

const Statistic = ({ history }) => {

  //최근 일주일 접종자수
  const DAY = 7;
  var [day, setDay] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/byDay?day=' + DAY)
      .then(({ data }) => setDay(data.reverse()));
  }, []);
  console.log(day);

  
  //지역별 접종 현황
  var [sido, setSido] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/bySidoPer')
      .then(({ data }) => {
          var colered = [];
          for(var i=0;i<data.length;i++){
            colered.push({
              sido : data[i].sido,
              percent : data[i].접종률!=null?data[i].접종률:0,
              //0x000000 ~ 0xFFFFFF
              bar_coler : '#'+0xFFAAFF
            });
          }
        setSido(colered);
      });
  }, []);
  console.log(sido);

  //월별 접종자 수
  const MONTH = 12;
  var [month, setMonth] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/byMonth?month=' + MONTH)
      .then(({ data }) => setMonth(data.reverse()));
  }, []);
  console.log(month);

  //지역별 접종 현황
  var [step, setStep] = useState([]);
  useEffect(() => {
    var temp = [];
    axios
      .get('http://localhost:4000/byVaccination')
      .then(({ data }) => {
          temp.push({
            inject : '미접종자',
            count : data.미접종자,
            pie_coler : '#FF5555'
          });
          temp.push({
            inject : '1차 접종자',
            count : data.접종_1차,
            pie_coler : '#5555FF'
          });
          temp.push({
            inject : '접종 완료자',
            count : data.접종_완료자,
            pie_coler : '#55AA55'
          });
          setStep(temp);
        });
  }, []);
  console.log(step);

  //render
  return (
    <StatisticComp day={day} sido={sido} month={month} step={step} ></StatisticComp>
  );
};

export default Statistic;
