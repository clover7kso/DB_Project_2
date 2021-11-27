import styled from 'styled-components';
import { CardButtonNoHover } from './Card';
import { CardTitle } from '../components/Card';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 30px;
  width: 80%;
  height: 100%;
`;
const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Body = styled.div`
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemTitle = styled(CardTitle)`
  width: 40%;
  text-align: center;
  color: ${(props) => (props.selected ? 'white' : '#2a2a2a')}!important;
`;

const RTime = ({
  canReserv,
  setSelDay,
  time,
  setTime,
  setSelTime,
  setVac,
  setSelVac,
  canSelectVaccine,
}) => {
  return (
    <Wrap>
      <Body>
        <CardTitle
          style={{
            color: '#e5195f',
            width: '40%',
            textAlign: 'center',
            fontSize: '20px',
          }}
        >
          시간
        </CardTitle>
        <CardTitle
          style={{
            color: '#e5195f',
            width: '40%',
            textAlign: 'center',
            fontSize: '20px',
          }}
        >
          잔여석
        </CardTitle>
      </Body>
      <Main>
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
      </Main>
      <ButtonWrapper>
        <CardButtonNoHover
          style={{
            width: '48%',
          }}
          onClick={() => setSelDay()}
        >
          다른날짜
        </CardButtonNoHover>
        <CardButtonNoHover
          style={{
            width: '48%',
          }}
          onClick={() => {
            setSelTime(time);
            setVac(canSelectVaccine[0].key);
            setSelVac(canSelectVaccine[0].key);
          }}
        >
          백신선택
        </CardButtonNoHover>
      </ButtonWrapper>
    </Wrap>
  );
};
export default RTime;
