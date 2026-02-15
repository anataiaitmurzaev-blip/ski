import React from 'react';
import '../styles.css';

const Section = (props) => {
  return (
    <div className="section">
      <h3 className="section-title">{props.title}</h3>
      <img className="section-image" src={props.image} alt={props.title} />
      <p className="section-description">{props.description}</p>
    </div>
  );
};

export default Section;
