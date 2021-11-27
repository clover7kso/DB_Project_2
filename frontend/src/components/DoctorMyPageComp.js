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

class DataLine extends React.Component{
  render(){
      var name = this.props.title;
      var value = this.props.value;
      var icon = this.props.icon;
      return(
        <ItemWrapper style={{marginLeft:'-12px'}}>
          <ItemName>{name}</ItemName>
          <ItemInfo> : {value}</ItemInfo>
        </ItemWrapper>
      );
  }
}

const DateTransForm = (raw_date)=>{
  const time = raw_date.split(':');
  return time[1]+':'+time[2];
}

const zeroPadding = (value,len)=>{
  return "0".repeat(len-value.length) + value;
}

const LunchTransForm = (raw_date)=>{
  return zeroPadding(''+raw_date/100,2)+':'+zeroPadding(''+raw_date%100,2);
}
class PersonList extends React.Component{
    render(){
        var Data = this.props.value;
        return(
        <CardWrapper style={{width:'100%'}}>
          <CardHeader>
            <CardHeading style={{marginBottom:'0px'}}>회원 정보 (의사)</CardHeading>
          </CardHeader>
          <CardBody style={{width:'100%'}}>
          <CardBody>
            {/*id, pw, name, orgnm, orgTlno, orgZipaddr, lunchSttTm, lunchEndTm, sttTm, endTm*/}
            <CardFieldset style={{marginLeft:'16px'}}>
              <CardTitle>인적 사항</CardTitle>
              <DataLine title='이름' value={Data.name}/>
              <DataLine title='의사번호' value={Data.id}/>
            </CardFieldset>
            
            <CardFieldset style={{marginLeft:'16px'}}>
              <CardTitle>병원 정보</CardTitle>
              <DataLine title='병원명' value={Data.orgnm}/>
              <DataLine title='연락처' value={Data.orgTlno}/>
              <DataLine title='주소' value={Data.orgZipaddr}/>
              <DataLine title='운영시간' value={DateTransForm(Data.sttTm)+' ~ '+DateTransForm(Data.endTm)}/>
              <DataLine title='점심시간' value={LunchTransForm(Data.lunchSttTm)+' ~ '+LunchTransForm(Data.lunchEndTm)}/>
            </CardFieldset>

            <CardFieldset style={{marginLeft:'16px'}}>
              <CardTitle>아이디/비밀번호</CardTitle>
              <DataLine title='아이디' value={Data.id}/>
              <DataLine title='비밀번호' value={"*".repeat(Data.pw.length)}/>
            </CardFieldset>
          </CardBody>

            <CardFieldset style={{ marginTop: '2em',marginLeft:'-64px'}}>
              <CardLink to="/UpdateDoctor">정보 수정을 원하시나요?</CardLink>
            </CardFieldset>
          </CardBody>
        </CardWrapper>
        );
    }
}

export class MyPageComp extends React.Component {
  render() {
    const Data = this.props.data;
    console.log(Data);

    if(Data!==undefined){
    return (
      <div>
        <PersonList value={Data}/>
      </div>
    );
    }else return <div>로딩 중....</div>;
  }
}

export default MyPageComp;
