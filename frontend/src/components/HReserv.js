import ModalBase from './ModalBase';
import styled from 'styled-components';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import img_close from '../imgs/close.png';
import '../imgs/share.css';
import RCal from './RCal';
import RTime from './RTime';
import RVac from './RVac';

const Wrap = styled.div`
  border-radius: 12px;
  padding-top: 12px;
  padding-bottom: 32px;
  width: 22em;
  height: 28em;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-top: -442px;
  z-index: 1000;
`;

const HReserv = ({
  orgcd,
  modalIsOpen,
  closeModal,
  day,
  setDay,
  selDay,
  setSelDay,
  canReserv,
  time,
  setTime,
  selTime,
  setSelTime,
  canSelectVaccine,
  vac,
  setVac,
  selVac,
  setSelVac,
  handleReservation,
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
            {selDay === undefined
              ? RCal({ day, setDay, setSelDay })
              : selTime === undefined
              ? RTime({
                  canReserv,
                  setSelDay,
                  time,
                  setTime,
                  setSelTime,
                  setVac,
                  setSelVac,
                  canSelectVaccine,
                })
              : RVac({
                  canSelectVaccine,
                  setSelTime,
                  vac,
                  setVac,
                  setSelVac,
                  handleReservation,
                })}
          </Wrap>
          <CloseButton src={img_close} onClick={closeModal} />
        </Body>
      </ModalBase>
    )
  );
};

export default HReserv;
