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
border:1;
border-color:'white';
`;

const T_Col = styled.tr`
`;

const T_Row = styled.td`
background-color:#FFFFFF;
`;

const T_RowBold = styled.th`
background-color:#EEEEEE;
`;

const T_RowTitle = styled.th`
background-color:#E2E2E2;
`;

class DataLine extends React.Component{
    render(){
        var name = this.props.name;
        var value = this.props.value;
        return(
            <T_Col>
                <T_RowBold>{name}</T_RowBold>
                <T_Row>{value}</T_Row>
            </T_Col>
        );
    }
}

export class MyPageComp extends React.Component {
  render() {
    var Data = this.props.data;

    return (
      <Body>
        <CardWrapper>
          <CardHeader>
            <CardHeading>회원 정보</CardHeading>
          </CardHeader>

          <CardBody>
            <Table>
                <T_Col>
                    <T_RowTitle colSpan="2">인적사항</T_RowTitle>
                </T_Col>
                <DataLine name='이름' value={Data.name}/>
                <DataLine name='주민등록번호' value={Data.ssn}/>
                <DataLine name='전화번호' value={Data.phone}/>
                <DataLine name='지역' value={Data.sido}/>
                <T_Col>
                    <T_RowTitle colSpan="2">아이디/패스워드</T_RowTitle>
                </T_Col>
                <DataLine name='아이디' value={Data.id}/>
                <DataLine name='비밀번호' value={Data.pw}/>
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
