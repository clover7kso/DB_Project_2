import React from 'react';
import {
  CardWrapper,
  CardBody,
  CardTitle,
  CardHeader,
  CardHeading,
  CardFieldset,
  CardLink,
} from '../components/Card';
import styled from 'styled-components';
import org from '../imgs/hospital.svg';
import loc from '../imgs/location.svg';
import call from '../imgs/call.svg';
import time from '../imgs/time.svg';
import lunch from '../imgs/lunch.svg';
import unsel_inject from '../imgs/unsel_inject.png';

const Col = styled.div`
  align-items: 'center';
  justify-content: 'center';
`;


const Body = styled.div`
  margin-top: 12px;
`;

const ItemWrapper = styled.div`
  padding-bottom: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ItemName = styled.div`
  padding-top: 0.1em;
  padding-left: 1em;
  font-family: inherit;
  text-align: left;
  width: 20%;
  font-size: 12px;
  color: #2c2c2c;
`;
const ItemInfo = styled.div`
  padding-top: 0.1em;
  padding-left: 1em;
  font-family: inherit;
  text-align: left;
  width: 100%;
  font-size: 12px;
  color: #2c2c2c;
`;
const ItemIcon = styled.img`
  width: 16px;
  height: 16px;
`;


const ItemEmptyIcon = styled.rect`
  width: 16px;
  height: 16px;
`;

const DateTransForm = (raw_date)=>{
    const d_t = raw_date.split(' ');
    const day = d_t[0].split('-');
    const time = d_t[1].split(':');
    return day[0]+'년 '+day[1]+'월 '+day[2]+'일 / '+time[0]+'시 '+time[1]+'분';
}

const DateTransFormTZ = (raw_date)=>{
  const d_t = raw_date.split('T');
  const day = d_t[0].split('-');
  const time = d_t[1].split(':');
  return day[0]+'년 '+day[1]+'월 '+day[2]+'일 / '+time[0]+'시 '+time[1]+'분';
}
class DataLine extends React.Component{
    render(){
        var name = this.props.title;
        var value = this.props.value;
        var icon = this.props.icon;
        return(
          <ItemWrapper style={{marginLeft:'-12px'}}>
            {icon===undefined?'':<ItemIcon style={{marginLeft:'12px'}} src={icon} />}
            <ItemName>{name}</ItemName>
            <ItemInfo> : {value}</ItemInfo>
          </ItemWrapper>
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
        const orgnm = value.orgnm;
        //const number = value.number;

        var i_str = inj//DateTransForm(inj);
        var r_str = rsv//DateTransFormTZ(rsv);

        return(
          <CardBody>
            <CardFieldset>
              <CardTitle style={count>1?{ marginTop: '2em' }:{}}>{count}차 접종 정보{inj===null?'(예정)':'(완료)'}</CardTitle>
                <DataLine title="접종 기관" value={orgnm} icon={org}/>
                <DataLine title="백신명" value={vname} icon={unsel_inject}/>
                {/*<DataLine title="백신 일련번호" value={number}/>*/}
                <DataLine title="백신 예약일자" value={r_str} icon={time}/>
                {inj===null?'':<DataLine title="백신 접종일자" value={i_str} icon={time}/>}
              </CardFieldset>
            </CardBody>
        );
    }
}

class InjectList extends React.Component{
    render(){
        var injData = this.props.value;
        return(
            <CardWrapper style={{width:'100%'}}>
              <CardHeader>
                <CardHeading style={{marginBottom:'0px'}}>접종 기록</CardHeading>
              </CardHeader>
              <CardBody style={{width:'100%'}}>
                {injData.length==0? '접종예약이 되지 않았습니다.':''}
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
            <CardHeading style={{marginBottom:'0px'}}>회원 정보</CardHeading>
          </CardHeader>
          <CardBody style={{width:'100%'}}>
          <CardBody>
            <CardFieldset style={{marginLeft:'16px'}}>
              <CardTitle>인적 사항</CardTitle>
              <DataLine title='이름' value={Data.name}/>
              <DataLine title='주민등록번호' value={Data.ssn}/>
              <DataLine title='전화번호' value={Data.phone}/>
              <DataLine title='지역' value={Data.sido}/>
            </CardFieldset>

            <CardFieldset style={{marginLeft:'16px'}}>
              <CardTitle style={{ marginTop: '2em' }}>아이디/비밀번호</CardTitle>
              <DataLine title='아이디' value={Data.id}/>
              <DataLine title='비밀번호' value={"*".repeat(Data.pw.length)}/>
            </CardFieldset>
          </CardBody>

            <CardFieldset style={{ marginTop: '2em',marginLeft:'-64px'}}>
              <CardLink to="/UpdateUser">정보 수정을 원하시나요?</CardLink>
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
      <div>
        <PersonList value={Data}/>
        <InjectList value={injData}/>
      </div>
    );
    }else return <div>로딩 중....</div>;
  }
}

export default MyPageComp;
