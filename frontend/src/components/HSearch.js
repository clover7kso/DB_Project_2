import React from 'react';
import {
  CardWrapper,
  CardBody,
  CardFieldset,
  CardTitle,
  CardInput,
  CardSelect,
  CardSelectOption,
} from './Card';

export const HSearch = ({
  orgnm,
  setOrgnm,
  sido,
  setSelSido,
  si,
  setSelSi,
}) => {
  return (
    <CardWrapper
      style={{
        width: '100%',
      }}
    >
      <CardBody>
        <CardFieldset style={{ paddingTop: 32 }}>
          <CardTitle>접종기관 검색</CardTitle>
        </CardFieldset>
        <CardFieldset>
          <CardTitle>병원명</CardTitle>
          <CardInput
            placeholder="병원명을 입력해주세요"
            type="text"
            onChange={(e) => setOrgnm(e.target.value)}
            value={orgnm}
          />
        </CardFieldset>
        <CardFieldset>
          <CardTitle>시/도</CardTitle>
          <CardSelect
            defaultValue="강원도"
            onChange={(e) => setSelSido(e.target.value)}
          >
            {sido.map((item) => {
              return (
                <CardSelectOption value={item.sido}>
                  {item.sido}
                </CardSelectOption>
              );
            })}
          </CardSelect>
        </CardFieldset>
        <CardFieldset>
          <CardTitle>시/구</CardTitle>
          <CardSelect onChange={(e) => setSelSi(e.target.value)}>
            {si.map((item) => {
              return (
                <CardSelectOption value={item.si}>{item.si}</CardSelectOption>
              );
            })}
          </CardSelect>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
  );
};

export default HSearch;
