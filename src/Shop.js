import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Shop.css';

function Shop({ name, image, description, location, animation, onClick, onLocationClick, companyType, address }) {
  return (
    <animated.div className="shop" style={animation}>
      <div className="shop-content">
        <div className="shop-description">
          <h2>{name}</h2>
          <p>{description}</p>
          <p><strong>Location:</strong> <span className="location-link" onClick={onLocationClick}>{location}</span></p>
          <p><strong>Type:</strong> {companyType}</p>
          <p><strong>Address:</strong> {address}</p>
        </div>
        <button className="shop-button" onClick={onClick}>View {name}</button>
      </div>
    </animated.div>
  );
}

export default Shop;