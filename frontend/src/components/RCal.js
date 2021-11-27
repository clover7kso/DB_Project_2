import styled from 'styled-components';
import { CardButtonNoHover } from '../components/Card';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const Main = styled.div`
  margin-top: 7px;
  flex: 1;
`;
const ButtonWrapper = styled.div`
  width: 84%;
  padding-left: 8%;
  padding-right: 8%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const RCal = ({ day, setDay, setSelDay }) => {
  return (
    <Wrap>
      <Main>
        <Calendar
          value={day}
          onChange={setDay}
          colorPrimary="#e5195f" // added this
          calendarClassName="custom-calendar" // and this
          shouldHighlightWeekends
        />
      </Main>
      <ButtonWrapper>
        <CardButtonNoHover
          style={{
            width: '100%',
          }}
          onClick={() => {
            console.log(day);
            const today = new Date();
            const sel = new Date();
            sel.setFullYear(day.year);
            sel.setMonth(day.month - 1);
            sel.setDate(day.day);

            if (today < sel) setSelDay(day);
          }}
        >
          예약자리 확인
        </CardButtonNoHover>
      </ButtonWrapper>
    </Wrap>
  );
};
export default RCal;
