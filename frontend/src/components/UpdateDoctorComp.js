import React from 'react';
import {
  CardWrapper,
  CardBody,
  CardTitle,
  CardHeader,
  CardHeading,
  CardFieldset,
  CardLink,
  CardInput,
  CardButton,
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

function DataLine(arg /*name,fix,value,ph,type*/) {
  return(
    <CardFieldset>
    <ItemWrapper style={{marginLeft:'-12px'}}>
      <ItemName>{arg.title}</ItemName>
      
      <CardInput onChange={(e)=>{arg.onChange(e.target.value)}}
        type={arg.type} style={{marginRight:'20%'}}
        defaultValue={arg.value} placeholder={arg.placeholder}
        disabled={arg.disable}
      />
    </ItemWrapper>
    </CardFieldset>
  );
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
function PersonInsert(arg){
  const Data = arg.value;
  const onFinish = arg.onFinish;

  var res = {pw:'',pwcf:''};

  function valChange(target){
    return (val)=>{
      res[target]=val;
      console.log(target+":"+res[target]+"["+val+"]");
    };
  }
    return(
    <CardWrapper style={{width:'100%'}}>
      <CardHeader>
        <CardHeading style={{marginBottom:'0px'}}>회원 정보 (의사)</CardHeading>
      </CardHeader>
      <CardBody style={{width:'100%'}}>
        {/*id, pw, name, orgnm, orgTlno, orgZipaddr, lunchSttTm, lunchEndTm, sttTm, endTm*/}
        <CardFieldset style={{marginLeft:'16px'}}>
          <CardTitle>인적 사항</CardTitle>
          <DataLine title='이름' value={Data.name} disable='true'/>
          <DataLine title='의사번호' value={Data.id} disable='true'/>
        </CardFieldset>
        
        <CardFieldset style={{marginLeft:'16px'}}>
          <CardTitle>병원 정보</CardTitle>
          <DataLine title='병원명' value={Data.orgnm} disable='true'/>
          <DataLine title='연락처' value={Data.orgTlno} disable='true'/>
          <DataLine title='주소' value={Data.orgZipaddr} disable='true'/>
          <DataLine title='운영시간' value={DateTransForm(Data.sttTm)+' ~ '+DateTransForm(Data.endTm)} disable='true'/>
          <DataLine title='점심시간' value={LunchTransForm(Data.lunchSttTm)+' ~ '+LunchTransForm(Data.lunchEndTm)} disable='true'/>
        </CardFieldset>

        <CardFieldset style={{marginLeft:'16px'}}>
          <CardTitle style={{ marginTop: '2em' }}>아이디/비밀번호</CardTitle>
          <DataLine title='아이디' value={Data.id} disable='true'/>
          <DataLine onChange={valChange('pw')} title='비밀번호' type="password" placeholder={"*".repeat(Data.pw.length)}/>
          <DataLine onChange={valChange('pwcf')} title='비밀번호확인' type="password"/>
        </CardFieldset>

        <CardFieldset style={{ marginTop: '2em',marginLeft:'-64px',display:'flex',alignItems: 'center',justifyContent: 'center'}}>
          <CardButton style={{ width:'20%'}} onClick={()=>onFinish(res)}>수정</CardButton>
          <CardLink style={{marginLeft:'30%',fontSize:'15px',color:'#555555'}} to="/MyPage">취소</CardLink>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
    );
}

export class UpdateDoctorComp extends React.Component {
  render() {
    const Data = this.props.data;
    const onFinish = this.props.finish;
    console.log(Data);

    if(Data!==undefined){
    return (
      <div>
        <PersonInsert value={Data} onFinish={(d)=>onFinish(d)}/>
      </div>
    );
    }else return <div>로딩 중....</div>;
  }
}

export default UpdateDoctorComp;
