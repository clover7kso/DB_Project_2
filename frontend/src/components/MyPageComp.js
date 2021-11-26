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
  margin-left:35px;
  margin-bottom:20px;
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

const DateTransForm = (raw_date)=>{
    const d_t = raw_date.split('T');
    const day = d_t[0].split('-');
    const time = d_t[1].split(':');
    return day[0]+'년 '+day[1]+'월 '+day[2]+'일 / '+time[0]+'시 '+time[1]+'분';
}
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

class InjectResult extends React.Component{
    render(){
        const count = this.props.injCount;
        const value = this.props.value;

        const inj = value.inject_date;
        const rsv = value.reservation_time;
        const vname = value.Vname;
        const org = value.orgnm;
        //const number = value.number;

        var i_str = DateTransForm(inj);
        var r_str = DateTransForm(rsv);

        //var inject_date = inj.split('T').split('');

        return(
            <Table>
                <T_Col>
                    <T_RowTitle colSpan="2">{count}차 접종 {inj!==null?'완료':'예정'}</T_RowTitle>
                </T_Col>
                <DataLine title="접종 기관" value={org}/>
                <DataLine title="백신명" value={vname}/>
                {/*<DataLine title="백신 일련번호" value={number}/>*/}
                <DataLine title="백신 예약일자" value={r_str}/>
                {inj===null?'':<DataLine title="백신 접종일자" value={i_str}/>}
            </Table>
        );
    }
}

class InjectList extends React.Component{
    render(){
        var injData = this.props.value;
        return(
            <CardWrapper style={{width:'100%'}}>
              <CardHeader>
                <CardHeading>접종 기록</CardHeading>
              </CardHeader>
              <CardBody style={{width:'100%'}}>
                
                {injData.map((inj,index) => {
                    return <InjectResult injCount={index+1} value={inj}/> ;
                })}

              </CardBody>
            </CardWrapper>
        );
    }
}

class PersonList extends React.Component{
    render(){
        var Data = this.props.value;
        return(
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
            <DataLine title='비밀번호' value={"*".repeat(Data.pw.length)}/>
        </Table>
        <CardFieldset>
            <CardLink link="/UserUpdate">정보 수정을 원하시나요?</CardLink>
        </CardFieldset>
        </CardBody>
        </CardWrapper>
        );
    }
}

export class MyPageComp extends React.Component {
  render() {
    const Data = this.props.data;
    const injData = this.props.inj;
    console.log(Data);
    console.log(injData);

    if(Data!==undefined && injData!==undefined){
    return (
      <Col>
        <PersonList value={Data}/>
        <InjectList value={injData}/>
      </Col>
    );
    }else return <div>로딩 중....</div>;
  }
}

export default MyPageComp;
