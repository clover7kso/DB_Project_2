import React from 'react';
import sel_home from '../imgs/sel_home.png';
import sel_inject from '../imgs/sel_inject.png';
import sel_per from '../imgs/sel_per.png';
import sel_statistic from '../imgs/sel_statistic.png';
import unsel_home from '../imgs/unsel_home.png';
import unsel_inject from '../imgs/unsel_inject.png';
import unsel_per from '../imgs/unsel_per.png';
import unsel_statistic from '../imgs/unsel_statistic.png';

const ImgSelItems = {
  '/MyPage': <img src={sel_per} width={24} height={24} alt="icon" />,
  '/DoctorMyPage': <img src={sel_per} width={24} height={24} alt="icon" />,
  '/Login': <img src={sel_per} width={24} height={24} alt="icon" />,
  '/': <img src={sel_home} width={24} height={24} alt="icon" />,
  '/Hospital': <img src={sel_inject} width={24} height={24} alt="icon" />,
  '/PatientInfo': <img src={sel_inject} width={24} height={24} alt="icon" />,
  '/Statistic': <img src={sel_statistic} width={24} height={24} alt="icon" />,
};
const ImgUnselItems = {
  '/MyPage': <img src={unsel_per} width={24} height={24} alt="icon" />,
  '/DoctorMyPage': <img src={unsel_per} width={24} height={24} alt="icon" />,
  '/Login': <img src={unsel_per} width={24} height={24} alt="icon" />,
  '/': <img src={unsel_home} width={24} height={24} alt="icon" />,
  '/Hospital': <img src={unsel_inject} width={24} height={24} alt="icon" />,
  '/PatientInfo': <img src={unsel_inject} width={24} height={24} alt="icon" />,
  '/Statistic': <img src={unsel_statistic} width={24} height={24} alt="icon" />,
};

export const NavIcon = (url, sel) => {
  return sel ? ImgSelItems[url] : ImgUnselItems[url];
};
