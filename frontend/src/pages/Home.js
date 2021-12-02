import React, { useEffect, useState } from 'react';
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
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { Line, Bar } from 'react-chartjs-2';

const Body = styled.div`
  align-items: 'center';
  justify-content: 'center';
`;

const Home = ({ history }) => {
  var [result, setResult] = useState([]);
  const start = new Date();
  const end = new Date();
  start.setDate(start.getDate() - 8);
  end.setDate(end.getDate());
  var startCreateDt = moment(start).format('YYYYMMDD');
  var endCreateDt = moment(end).format('YYYYMMDD');

  useEffect(() => {
    axios
      .get('http://localhost:4000/corona', {
        params: {
          startCreateDt: startCreateDt,
          endCreateDt: endCreateDt,
        },
      })
      .then(({ data }) => setResult(data));
  }, []);
  console.log(result);

  return (
    <Body style={{}}>
      <CardWrapper>
        <CardHeader>
          <CardHeading>확진자</CardHeading>
        </CardHeader>

        <CardBody>
          <Line
            data={{
              labels: result.map((item) => item.stateDt),
              datasets: [
                {
                  backgroundColor: 'rgba(232, 28, 92, 0.7)',
                  barThickness: 30,
                  data: result.map((item) => item.decideCnt),
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              legend: { display: false },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      drawOnChartArea: false,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 500,
                      min: 0,
                    },
                  },
                ],
              },
            }}
          />
        </CardBody>
      </CardWrapper>

      <CardWrapper>
        <CardHeader>
          <CardHeading>검사자</CardHeading>
        </CardHeader>

        <CardBody>
          <Line
            data={{
              labels: result.map((item) => item.stateDt),
              datasets: [
                {
                  backgroundColor: 'rgba(232, 28, 92, 0.7)',
                  barThickness: 30,
                  data: result.map((item) => item.accExamCnt),
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              legend: { display: false },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      drawOnChartArea: false,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 5000,
                      min: 0,
                    },
                  },
                ],
              },
            }}
          />
        </CardBody>
      </CardWrapper>

      <CardWrapper>
        <CardHeader>
          <CardHeading>확진율</CardHeading>
        </CardHeader>

        <CardBody>
          <Line
            data={{
              labels: result.map((item) => item.stateDt),
              datasets: [
                {
                  backgroundColor: 'rgba(232, 28, 92, 0.7)',
                  barThickness: 30,
                  data: result.map((item) => item.accDefRate),
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              legend: { display: false },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      drawOnChartArea: false,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      stepSize: 0.1,
                    },
                  },
                ],
              },
            }}
          />
        </CardBody>
      </CardWrapper>

      <CardWrapper>
        <CardHeader>
          <CardHeading>사망자</CardHeading>
        </CardHeader>

        <CardBody>
          <Bar
            data={{
              labels: result.map((item) => item.stateDt),
              datasets: [
                {
                  backgroundColor: 'rgba(232, 28, 92, 0.7)',
                  barThickness: 30,
                  data: result.map((item) => item.deathCnt),
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              legend: { display: false },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      drawOnChartArea: false,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 10,
                      min: 0,
                    },
                  },
                ],
              },
            }}
          />
        </CardBody>
      </CardWrapper>
    </Body>
  );
};

export default Home;
