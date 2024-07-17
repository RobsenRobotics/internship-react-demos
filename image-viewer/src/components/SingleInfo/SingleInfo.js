import React from 'react';
import './SingleInfo.css';

const SingleInfo = ({ label, value }) => {
  return (
    <div className="single-info">
      <div className="info-label">{label}</div>
      <div className="info-value">{value}</div>
    </div>
  );
};

export default SingleInfo;