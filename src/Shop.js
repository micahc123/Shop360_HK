import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Shop.css';

function Path({ name, image, description, location, animation, onClick, companyType }) {
  return (
    <animated.div className="path" style={animation}>
      <div className="path-content">
        <div className="path-description">
          <h2>{name}</h2>
          <p>{description}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Type:</strong> {companyType}</p>

        </div>
          <button className= "shop-button"onClick={onClick}>View {name}</button>
        </div>
    </animated.div>
  );
}

export default Path;