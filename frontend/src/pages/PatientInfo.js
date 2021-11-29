import React, { useState, useEffect, useRef } from 'react';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardButton,
  CardButtonNoHover,
  CardButtonAble,
} from '../components/Card';
import axios from 'axios';
import { getTokenFromCookie } from '../components/Auth';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import Swal from 'sweetalert2';


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

const ItemWrapperHover = styled.div`
  padding:8px;
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor:pointer;
  border-radius: 10px;
  &:hover{
    background-color:#E2E2E2;
  }
`;


const ItemLine = styled.hr`
margin-top:8px;
margin-bottom:10px;
width:100%;
`;


function TimeGet(){
  let time = new Date();
  return time;
}

class PTableLine extends React.Component{

  render(){
    const item = this.props.item;
    const vnum = item.vnumber;
    const selected = this.props.sel;

    return (
      <CardFieldset>
        <ItemWrapperHover style={selected?{backgroundColor:'#AAAAAA'}:{}} onClick={()=>this.props.func(vnum)}>
          <ItemInfo>{item.vnumber}</ItemInfo>
          <ItemInfo>{item.ssn}</ItemInfo>
          <ItemInfo>{item.inject_date}</ItemInfo>
          <ItemInfo>{item.reservation_time}</ItemInfo>
          <ItemInfo>{item.dname}</ItemInfo>
        </ItemWrapperHover>
      </CardFieldset>
    );
  }
}

const PatientInfo = ({ history }) => {
    var  inj_date;
    const [vac_num,setVacNum] = useState('');

    const [buttonAble, setButtonAble] = useState(false);
    useEffect(()=>setButtonAble(vac_num!==''),[vac_num]);

    const token = getTokenFromCookie();
    const [injectionTable, setInjectionTable] = useState();
    useEffect(() => {
        axios.get('http://localhost:4000/injectionTable', {
            headers: {
              token: token,
            },
          })
          .then(({ data }) => {setInjectionTable(data)});
    }, []);
    console.log(injectionTable);

    const NowDate = ()=>{
      var date = new Date();
      return date.toISOString().replace("T"," ").split('.')[0];

    }

    const ChangeInject = (vaccine_num, date) => {

      axios.post('http://localhost:4000/updateInjectionTable', {
            inject_date:date, number:vaccine_num
          })
          .then(({ data }) => { 
              const result = data
              if(result.result === true){
                Swal.fire(
                  '정보 수정에 성공했습니다.',
                  '',
                  'success',
                ).then((result) => {
                  if(result.isConfirmed)
                    window.location.reload();
                  else if(result.isDismissed)
                    window.location.reload();
                });
              }
              else{
                Swal.fire(
                  '정보 수정에 실패했습니다.',
                  '('+'Error '+result.code+')'+result.msg,
                  'error',
                );
              }
          });
    };
    console.log(injectionTable);

    return (
        <Body>
          <Col>
            <CardWrapper>
                <CardHeader>
                    <CardHeading>환자 정보</CardHeading>
                </CardHeader>
                <CardBody>
                
                  <CardFieldset style={{display:'flex'}}>
                    <CardButtonAble disabled={!buttonAble} onClick={()=>ChangeInject(vac_num,NowDate())}>접종완료</CardButtonAble> 
                    <CardButtonAble disabled={!buttonAble}>완료일자 변경</CardButtonAble> 
                    <CardButtonAble disabled={!buttonAble} onClick={()=>ChangeInject(vac_num,null)}>접종일자 제거</CardButtonAble>
                  </CardFieldset>

                  <ItemLine/>

                  <CardFieldset>
                    <ItemWrapper>
                      <ItemInfo>백신번호</ItemInfo>
                      <ItemInfo>주민번호</ItemInfo>
                      <ItemInfo>접종날짜</ItemInfo>
                      <ItemInfo>예정날짜</ItemInfo>
                      <ItemInfo>의사이름</ItemInfo>
                    </ItemWrapper>
                  </CardFieldset>
                  
                  <ItemLine/>

                {injectionTable?
                  <CardFieldset>
                    <InfiniteScroll dataLength={injectionTable.length}>
                        {injectionTable.map((item) => {
                          console.log(item);
                          return(
                            <PTableLine sel={vac_num===item.vnumber} item={item} func={setVacNum}/>
                          )
                        })}
                    </InfiniteScroll>
                  </CardFieldset>
                :null}


                </CardBody>
            </CardWrapper>
          </Col>
        </Body>
    );
};

export default PatientInfo;