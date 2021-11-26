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

const Col = styled.div`
  align-items: 'center';
  justify-content: 'center';
`;

const Table = styled.table`
  border:1;
  border-color:'white';
  display:'flex';
  width:80%;
`;

const T_Col = styled.tr`
  width:100%;
`;

const T_Row = styled.td`
  background-color:#FAFAFA;
  padding-top:5px;
  padding-bottom:5px;
  width:100%;
`;

const T_RowBold = styled.th`
  background-color:#EEEEEE;
  padding-top:5px;
  padding-bottom:5px;
  width:30%;
`;

const T_RowTitle = styled.th`
  background-color:#E2E2E2;
  padding-top:5px;
  padding-bottom:5px;
  width:70%;
`;

class DataLine extends React.Component{
    render(){
        var name = this.props.title;
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
    console.log(Data);

    if(Data!==undefined){
    return (
      <Col>
        <CardWrapper style={{width:'100%'}}>
          <CardHeader>
            <CardHeading>회원 정보</CardHeading>
          </CardHeader>

          <CardBody style={{width:'100%'}}>
            <Table>
                <T_Col>
                    <T_RowTitle colSpan="2">인적사항</T_RowTitle>
                </T_Col>
                <DataLine title='이름' value={Data.name}/>
                <DataLine title='주민등록번호' value={Data.ssn}/>
                <DataLine title='전화번호' value={Data.phone}/>
                <DataLine title='지역' value={Data.sido}/>
                <T_Col>
                    <T_RowTitle colSpan="2">아이디/패스워드</T_RowTitle>
                </T_Col>
                <DataLine title='아이디' value={Data.id}/>
                <DataLine title='비밀번호' value={Data.pw}/>
            </Table>
            <CardFieldset>
              <CardLink link="/UserUpdate">정보 수정을 원하시나요?</CardLink>
            </CardFieldset>
          </CardBody>
        </CardWrapper>
      </Col>
    );
    }else return <div>로딩 중....</div>;
  }
}

export default MyPageComp;
