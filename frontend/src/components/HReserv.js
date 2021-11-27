import ModalBase from './ModalBase';
import styled from 'styled-components';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import img_close from '../imgs/close.png';
import '../imgs/share.css';
import RCal from './RCal';
import RTime from './RTime';

const Wrap = styled.div`
  border-radius: 12px;
  padding-top: 12px;
  width: 22em;
  min-height: 26.5em;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

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
  margin-top: -392px;
  z-index: 1000;
`;

const HReserv = ({
  orgcd,
  modalIsOpen,
  closeModal,
  day,
  setDay,
  date,
  setDate,
  canReserv,
  time,
  setTime,
}) => {
  console.log('m:' + modalIsOpen);
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
          <Wrap>
            {date === undefined
              ? RCal({ day, setDay, setDate })
              : RTime({ canReserv, setDate, time, setTime })}
          </Wrap>
          <CloseButton src={img_close} onClick={closeModal} />
        </Body>
      </ModalBase>
    )
  );
};

export default HReserv;
