import ModalBase from './ModalBase';
import styled from 'styled-components';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import img_close from '../imgs/close.png';
import '../imgs/share.css';

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.img`
  display: flex;
  flex-direction: column;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: -36px;
  margin-top: -330px;
  z-index: 1000;
`;

const CalWrapper = styled.div`
  padding-top: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HReserv = ({ modalIsOpen, closeModal, selectedDay, setSelectedDay }) => {
  return (
    modalIsOpen && (
      <ModalBase
        noBack={true}
        visible={modalIsOpen}
        closable={true}
        maskClosable={true}
        onClose={closeModal}
      >
        <Body>
          <CalWrapper>
            <Calendar
              value={selectedDay}
              onChange={setSelectedDay}
              calendarClassName="custom-calendar" // and this
              shouldHighlightWeekends
            />
          </CalWrapper>
          <CloseButton src={img_close} onClick={closeModal} />
        </Body>
      </ModalBase>
    )
  );
};

export default HReserv;
