import styled from 'styled-components';
import { CardButtonNoHover } from './Card';
import { CardTitle } from './Card';

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
  padding-top: 12px;
  padding-bottom: 12px;
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
  font-size: 18px;
  color: ${(props) => (props.selected ? 'white' : '#2a2a2a')}!important;
`;

const RVac = ({
  canSelectVaccine,
  setSelTime,
  vac,
  setVac,
  setSelVac,
  handleReservation,
}) => {
  return (
    <Wrap>
      <Body style={{ flexDirection: 'row' }}>
        <CardTitle
          style={{
            color: '#e5195f',
            width: '40%',
            textAlign: 'center',
            fontSize: '20px',
          }}
        >
          백신종류
        </CardTitle>
        <CardTitle
          style={{
            color: '#e5195f',
            width: '40%',
            textAlign: 'center',
            fontSize: '20px',
          }}
        >
          전국백신
        </CardTitle>
      </Body>
      <Main>
        {canSelectVaccine.map((item) => {
          return (
            <ItemBody
              selected={vac === item.key}
              onClick={() => {
                if (item.value > 0) setVac(item.key);
              }}
            >
              <ItemTitle selected={vac === item.key}>{item.key}</ItemTitle>
              <ItemTitle selected={vac === item.key}>{item.value}개</ItemTitle>
            </ItemBody>
          );
        })}
      </Main>
      <ButtonWrapper>
        <CardButtonNoHover
          style={{
            width: '48%',
          }}
          onClick={() => setSelTime()}
        >
          뒤로가기
        </CardButtonNoHover>
        <CardButtonNoHover
          style={{
            width: '48%',
          }}
          onClick={() => {
            setSelVac(vac);
            handleReservation();
          }}
        >
          예약하기
        </CardButtonNoHover>
      </ButtonWrapper>
    </Wrap>
  );
};
export default RVac;
