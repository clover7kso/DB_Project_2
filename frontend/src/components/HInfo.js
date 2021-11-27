import React from 'react';
import {
  CardWrapper,
  CardBody,
  CardFieldset,
  CardTitle,
  CardButton,
} from '../components/Card';
import styled from 'styled-components';
import org from '../imgs/hospital.svg';
import loc from '../imgs/location.svg';
import call from '../imgs/call.svg';
import time from '../imgs/time.svg';
import lunch from '../imgs/lunch.svg';

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
const ItemInfo = styled.div`
  padding-top: 0.1em;
  padding-left: 1em;
  font-family: inherit;
  text-align: left;
  width: 100%;
  font-size: 12px;
  color: #2c2c2c;
`;
const ItemIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const HInfo = ({ orginfo, openModal }) => (
  <CardWrapper
    style={{
      marginBottom: '32px',
      width: '100%',
    }}
  >
    <CardBody>
      <CardFieldset>
        <CardTitle style={{ marginTop: '2em' }}>선택한 접종기관 정보</CardTitle>
        {orginfo != null ? (
          <Body>
            <ItemWrapper>
              <ItemIcon src={org} />
              <ItemInfo> {orginfo.orgnm}</ItemInfo>
            </ItemWrapper>
            <ItemWrapper>
              <ItemIcon src={loc} />
              <ItemInfo> {orginfo.orgZipaddr}</ItemInfo>
            </ItemWrapper>
            <ItemWrapper>
              <ItemIcon src={call} />
              <ItemInfo>{orginfo.orgTlno}</ItemInfo>
            </ItemWrapper>
            <ItemWrapper>
              <ItemIcon src={time} />
              <ItemInfo>
                {orginfo.sttTm.substr(3, 7)} ~ {orginfo.endTm.substr(3, 7)}
              </ItemInfo>
            </ItemWrapper>
            <ItemWrapper>
              <ItemIcon src={lunch} />
              <ItemInfo>
                {orginfo.lunchSttTm.substr(0, 2)}:
                {orginfo.lunchSttTm.substr(2, 4)} ~{' '}
                {orginfo.lunchEndTm.substr(0, 2)}:
                {orginfo.lunchEndTm.substr(2, 4)}
              </ItemInfo>
            </ItemWrapper>
            <CardButton
              style={{ width: '100%', marginTop: '24px' }}
              onClick={openModal}
            >
              백신 예약하기
            </CardButton>
          </Body>
        ) : null}
      </CardFieldset>
    </CardBody>
  </CardWrapper>
);

export default HInfo;
