import React from 'react';
import {
  CardWrapper,
  CardBody,
  CardHeader,
  CardHeading,
  CardFieldset,
  CardLink,
} from '../components/Card';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Body = styled.div`
  align-items: 'center';
  justify-content: 'center';
`;

const Table = styled.table`
border=0;
`;

const T_Col = styled.tr`
`;

const T_Row = styled.td`
`;

const T_RowBold = styled.th`
`;

export class MyPageComp extends React.Component {
  render() {
    var Data = this.props.data;

    return (
      <Body style={{}}>
        <CardWrapper>
          <CardHeader>
            <CardHeading>회원 정보</CardHeading>
          </CardHeader>

          <CardBody>
            <Table>
                <T_Col>
                    <T_RowBold colSpan="2">인적사항</T_RowBold>
                </T_Col>
                <T_Col>
                    <T_RowBold>주민번호</T_RowBold>
                    <T_Row>{Data.ssn}</T_Row>
                </T_Col>
                <T_Col>
                    <T_RowBold>이름</T_RowBold>
                    <T_Row>{Data.name}</T_Row>
                </T_Col>
                <T_Col>
                    <T_RowBold>전화번호</T_RowBold>
                    <T_Row>{Data.phone}</T_Row>
                </T_Col>
                <T_Col>
                    <T_RowBold>지역</T_RowBold>
                    <T_Row>{Data.sido}</T_Row>
                </T_Col>
                <T_Col>
                    <T_RowBold colSpan="2">아이디/패스워드</T_RowBold>
                </T_Col>
                <T_Col>
                    <T_RowBold>아이디</T_RowBold>
                    <T_Row>{Data.id}</T_Row>
                </T_Col>
                <T_Col>
                    <T_RowBold>비밀번호</T_RowBold>
                    <T_Row>{Data.pw}</T_Row>
                </T_Col>
            </Table>
            <CardFieldset>
              <CardLink link="/UserUpdate">정보 수정을 원하시나요?</CardLink>
            </CardFieldset>
          </CardBody>
        </CardWrapper>
      </Body>
    );
  }
}

export default MyPageComp;
