import React, { Component, Fragment } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const Arrow = ({ icon, className }) => {
    return (
        <div
        className={className}
        >{icon}</div>
    );
};
  
export const ArrowLeft = Arrow({ icon: <FaArrowAltCircleLeft size={70}/>, className: 'arrow-prev' });
export const ArrowRight = Arrow({ icon: <FaArrowAltCircleRight size={70}/>, className: 'arrow-next' });