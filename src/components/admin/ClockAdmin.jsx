import React from 'react';
import Clock from 'react-live-clock';

const ClockAdmin = () => {
  return (
    <Clock format="HH:mm:ss" ticking={true} interval={1000} />
  );
}

export default ClockAdmin;
