import React, { useRef } from 'react';
import {
  CardWrapper,
  CardBody,
  CardTitle,
  CardHeader,
  CardHeading,
  CardFieldset,
  CardLink,
  CardInput,
  CardSelect,
  CardSelectOption,
  CardButton,
} from './Card';
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

function DataSel(arg){
  return(
    <ItemWrapper style={{marginLeft:'-12px'}}>
      <ItemName>{arg.title}</ItemName>
      <CardSelect style={{marginRight:'20%'}} 
       defaultValue={arg.sido} 
       onChange={(e)=>{arg.onChange(e.target.value)}}
      >
        {arg.sido.map((item) => {
          return (
            <CardSelectOption value={item.sido}>
              {item.sido}
            </CardSelectOption>
          );
        })}
      </CardSelect>
    </ItemWrapper>
  );
}

function PersonInsert(arg){
    const Data = arg.value;
    const sido = arg.sido;
    const onFinish = arg.onFinish;

    var res = {pw:'',pwcf:'',sido:Data.sido,phone:Data.phone};

    function valChange(target){
      return (val)=>{
        res[target]=val;
        console.log(target+":"+res[target]+"["+val+"]");
      };
    }

    return(
      <CardWrapper style={{width:'100%'}}>
        <CardHeader>
          <CardHeading style={{marginBottom:'0px'}}>회원 정보 수정</CardHeading>
        </CardHeader>
        <CardBody style={{width:'100%'}}>
        <CardBody>
          <CardFieldset style={{marginLeft:'16px'}}>
            <CardTitle>인적 사항</CardTitle>
            <DataLine title='이름' value={Data.name} disable='true'/>
            <DataLine title='주민등록번호' value={Data.ssn} disable='true'/>
            <DataLine onChange={valChange('phone')} title='전화번호' value={Data.phone} placeholder="'-'제외하고 입력 (9~12자리)"/>
            <DataSel onChange={valChange('sido')} title='지역' sido={sido} defaultValue={Data.sido}/>
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

        </CardBody>
      </CardWrapper>
    );
}

export class UpdateComp extends React.Component {
  render() {
    const Data = this.props.data;
    const sido = this.props.sido;
    const func = (d) => this.props.finish(d);
    console.log(Data);
    console.log(sido);

    if(Data!==undefined && sido!==undefined){
      return (
        <div>
          <PersonInsert value={Data} sido={sido} onFinish={func}/>
        </div>
      );
    }
    return <div>로딩 중....</div>;
  }
}

export default UpdateComp;
