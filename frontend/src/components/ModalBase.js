import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import img_close from '../imgs/close.png';
import Portal from './Portal';

const CloseWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-flex-start;
  justify-content: flex-end;
`;

const CloseButton = styled.img`
  width: 28px;
  height: 28px;
`;

function ModalBase({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
  noBack,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        visible={visible}
      >
        {noBack ? (
          <ModalInnerNoBack tabIndex={0} className="modal-inner">
            {closable && !noBack && (
              <CloseWrap>
                <CloseButton
                  src={img_close}
                  className="modal-close"
                  onClick={close}
                />
              </CloseWrap>
            )}
            {children}
          </ModalInnerNoBack>
        ) : (
          <ModalInner tabIndex={0} className="modal-inner">
            {closable && (
              <CloseWrap>
                <CloseButton
                  src={img_close}
                  className="modal-close"
                  onClick={close}
                />
              </CloseWrap>
            )}
            {children}
          </ModalInner>
        )}
      </ModalWrapper>
    </Portal>
  );
}

ModalBase.defaultProps = {
  visible: false,
  closable: true,
  maskClosable: true,
};

ModalBase.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 70%;
  max-width: 70%;
  height: 70%;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
`;

const ModalInnerNoBack = styled.div`
  box-sizing: border-box;
  position: relative;
  border-radius: 10px;
  width: 70%;
  max-width: 70%;
  height: 70%;
  top: 40%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
`;

export default ModalBase;
