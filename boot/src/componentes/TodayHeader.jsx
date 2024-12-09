import React from 'react';
import './TodayHeader.css'

const TodayHeader = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR');
  return <h4 id='data_atual'>{`${formattedDate}`}</h4>;
};

export default TodayHeader;
