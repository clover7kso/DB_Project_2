import styled from 'styled-components';
import { CardButtonNoHover } from './Card';
import { CardTitle } from '../components/Card';

const Body = styled.div`
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const ItemBody = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  background-color: ${(props) => (props.selected ? '#e5195f' : 'white')};
  border: 0;
  border-radius: 35px;
  outline: 0;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const ButtonWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemTitle = styled(CardTitle)`
  width: 40%;
  text-align: center;
  color: ${(props) => (props.selected ? 'white' : '#2a2a2a')}!important;
`;

const RTime = ({ canReserv, setDate, time, setTime }) => {
  return (
    <Wrap>
      <Body style={{ flexDirection: 'row' }}>
        <CardTitle
          style={{
            width: '40%',
            textAlign: 'center',
            fontSize: '20px',
          }}
        >
          시간
        </CardTitle>
        <CardTitle
          style={{
            width: '40%',
            textAlign: 'center',
            fontSize: '20px',
          }}
        >
          잔여석
        </CardTitle>
      </Body>
      {canReserv.map((item) => {
        return (
          <ItemBody
            selected={time === item.key}
            onClick={() => {
              if (item.value > 0) setTime(item.key);
            }}
          >
            <ItemTitle selected={time === item.key}>{item.key}시</ItemTitle>
            <ItemTitle selected={time === item.key}>{item.value}석</ItemTitle>
          </ItemBody>
        );
      })}
      <ButtonWrapper>
        <CardButtonNoHover
          style={{
            width: '48%',
          }}
          onClick={() => setDate()}
        >
          다른날짜
        </CardButtonNoHover>
        <CardButtonNoHover
          style={{
            width: '48%',
          }}
          onClick={() => {
            console.log('nice');
          }}
        >
          예약하기
        </CardButtonNoHover>
      </ButtonWrapper>
    </Wrap>
  );
};
export default RTime;
