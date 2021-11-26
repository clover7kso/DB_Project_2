import React from 'react';
import { CardWrapper, CardBody, CardFieldset, CardTitle } from './Card';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReactComponent as arrow_right } from '../imgs/arrow_left.svg';

const Body = styled.div`
  align-items: center;
  justify-content: center;
`;

const ItemBody = styled.div`
  padding: 32px 32px 0px;
  display: flex;
  flex-direction: horizontal;
`;

const ItemMain = styled.div`
  width: 100%;
`;

const ItemAddr = styled.div`
  padding-bottom: 8px;
  text-align: left;
  width: 100%;
  font-size: 12px;
  color: #2c2c2c;
`;

const ItemTitle = styled.div`
  text-align: left;
  width: 100%;
  font-size: 16px;
  color: #3a3a3a;
`;

const ItemIcon = styled(arrow_right)``;

const ItemButton = styled.button`
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e2e2e2;
  }
  &:active {
    background: #c8c8c8;
  }
`;

export const HList = ({ selSido, selSi, hostpitals, next, setHcode }) => {
  return (
    <CardWrapper
      style={{
        padding: '32px 0 0px',
        width: '100%',
      }}
    >
      <CardBody>
        <CardFieldset>
          <CardTitle>
            {selSido} {selSi}의 접종기관 목록
          </CardTitle>
        </CardFieldset>
      </CardBody>

      <InfiniteScroll
        height="350px"
        dataLength={hostpitals.length} //This is important field to render the next data
        next={next}
        hasMore={true}
        loader={
          <ItemBody>
            <ItemTitle style={{ paddingBottom: '20px' }}>
              불러오는 중...
            </ItemTitle>
          </ItemBody>
        }
      >
        {hostpitals.map((item) => {
          return (
            <ItemBody>
              <ItemButton
                onClick={(e) => {
                  setHcode(item.orgcd);
                }}
              >
                <ItemMain>
                  <ItemAddr>{item.sido + ' > ' + item.si}</ItemAddr>
                  <ItemTitle>{item.orgnm}</ItemTitle>
                </ItemMain>
              </ItemButton>
              <ItemIcon width="16px" position="right" />
            </ItemBody>
          );
        })}
      </InfiniteScroll>
    </CardWrapper>
  );
};

export default HList;
