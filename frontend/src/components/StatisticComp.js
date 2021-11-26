import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  CardWrapper,
  CardBody,
  CardHeader,
  CardHeading,
} from '../components/Card';
import styled from 'styled-components';

const Body = styled.div`
  align-items: 'center';
  justify-content: 'center';
`;

export class StatisticComp extends React.Component {
  render() {
    var day = this.props.day;
    var sido = this.props.sido;
    var month = this.props.month;
    var step = this.props.step;

    return (
      <Body style={{}}>
        <CardWrapper>
          <CardHeader>
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
        <CardWrapper>
          <CardHeader>
            <CardHeading>지역별 접종 현황</CardHeading>
          </CardHeader>

          <CardBody>
            <Bar
              data={{
                labels: sido.map((item) => item.sido),
                datasets: [
                  {
                    label: '접종률',
                    data: sido.map((item) => item.percent),
                    fill: true,
                    tension: 0.1,
                    backgroundColor: sido.map((item) => item.bar_coler),
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
                      gridLines: {
                        drawOnChartArea: true,
                      },
                      ticks: {
                        beginAtZero: true,
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
            <CardHeading>최근 일년 접종자 수</CardHeading>
          </CardHeader>

          <CardBody>
            <Line
              data={{
                labels: month.map((item) => item.y_date + '.' + item.m_date),
                datasets: [
                  {
                    data: month.map((item) => item.count),
                    fill: true,
                    borderColor: 'rgb(75,192,192)',
                    tension: 0.1,
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
        <CardWrapper style={{ marginBottom: 32 }}>
          <CardHeader>
            <CardHeading>접종단계 현황</CardHeading>
          </CardHeader>

          <CardBody>
            <Pie
              data={{
                labels: step.map((item) => item.inject),
                datasets: [
                  {
                    data: step.map((item) => item.count),
                    fill: true,
                    tension: 0.1,
                    backgroundColor: step.map((item) => item.pie_coler),
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {},
              }}
            />
          </CardBody>
        </CardWrapper>
      </Body>
    );
  }
}

export default StatisticComp;
