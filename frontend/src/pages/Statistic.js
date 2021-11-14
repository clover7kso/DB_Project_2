import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  CardWrapper,
  CardBody,
  CardHeader,
  CardHeading,
} from '../components/Card';

const Body = styled.div`
  display: flex;
  flex-direction: horizontal;
`;
const Col = styled.div``;

const Statistic = ({ history }) => {
  const DAY = 7;
  var [day, setDay] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/byDay?day=' + DAY)
      .then(({ data }) => setDay(data));
  }, []);
  console.log(day);

  return (
    <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Col style={{ width: '80%', height: '40%' }}>
        <CardWrapper
          style={{
            width: '100%',
          }}
        >
          <CardHeader style={{ marginBottom: '0px' }}>
            <CardHeading>최근 일주일 접종자 수</CardHeading>
          </CardHeader>

          <CardBody>
            <Line
              data={{
                labels: day.map(
                  (item) => item.y_date + '.' + item.m_date + '.' + item.d_date,
                ),
                datasets: [
                  {
                    data: day.map((item) => item.count),
                    fill: true,
                    borderColor: 'rgb(75,192,192)',
                    tension: 0.1,
                  },
                ],
              }}
              options={{
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
                      gridLines: {
                        drawOnChartArea: false,
                      },
                      ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        min: 0,
                      },
                    },
                  ],
                },
              }}
            />
          </CardBody>
        </CardWrapper>
      </Col>
    </Body>
  );
};

export default Statistic;
