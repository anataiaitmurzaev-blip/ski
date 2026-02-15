import React from 'react';

const Banner = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="banner">
      <img src={imageUrl} alt="" className="banner-image" />
      <div className="banner-content">
        <h1 className="banner-title">{title}</h1>
        <p className="banner-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;
