import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate, Link } from 'react-router-dom';
import Shop from './Shop';
import ShopPath from './ShopPath';
import MapPopup from './MapPopup';
import './Catalog.css';
import shopsData from './shopsData.json';

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);
  const [shops] = useState(shopsData);
  const [locationFilter, setLocationFilter] = useState('');
  const [companyTypeFilter, setCompanyTypeFilter] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const navigate = useNavigate();

  const titleAnimation = useSpring({
    from: { transform: 'translateY(-100%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
    config: { duration: 1000 },
  });

  const shopAnimation = useSpring({
    from: { transform: 'translateX(-100%)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
    config: { duration: 1000 },
  });

  const filteredShops = shops.filter(shop => 
    (shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (locationFilter === '' || shop.location === locationFilter) &&
    (companyTypeFilter === '' || shop.companyType === companyTypeFilter)
  );

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
  };

  const handleBack = () => {
    setSelectedShop(null);
    setSearchTerm('');
    setLocationFilter('');
    setCompanyTypeFilter('');
  };

  const handleMainMenu = () => {
    navigate('/');
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLocationClick = (location, address) => {
    setSelectedLocation(location);
    setSelectedAddress(address);
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
    setSelectedLocation(null);
    setSelectedAddress('');
  };

  const locations = [...new Set(shops.map(shop => shop.location))];
  const companyTypes = [...new Set(shops.map(shop => shop.companyType))];

  return (
    <div className="catalog">
      <animated.h1 style={titleAnimation}>
        <span 
          className="shop360-title" 
          onClick={handleBack}
          tabIndex={0}
          role="button"
        >
          Shop360 HK
        </span>
      </animated.h1>
      <div className="top-right-icons">
        <Link to="/add-business" className="add-business-icon">+</Link>
        <div className="info-icon" onClick={togglePopup}>?</div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>About Shop360 HK</h2>
            <p>Shop360 HK is a virtual shop viewing platform that allows you to explore various shops in Hong Kong. You can search for shops, filter by location and company type, and view detailed information about each shop.</p>
          </div>
          <span className="close-btn" onClick={togglePopup}>×</span>
        </div>
      )}
      {!selectedShop && (
        <div className="filters">
          <input 
            type="text" 
            placeholder="Search shops..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <select 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <select 
            value={companyTypeFilter} 
            onChange={(e) => setCompanyTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {companyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      )}
      <div className="content-wrapper">
        {selectedShop ? (
          <ShopPath path={selectedShop} onBack={handleBack} onMainMenu={handleMainMenu} />
        ) : (
          <div className="shops-list">
            {filteredShops.map((shop, index) => (
              <animated.div style={shopAnimation} key={index}>
                <Shop 
                  name={shop.name} 
                  image={shop.panoramaImages[0].url} 
                  description={shop.description} 
                  location={shop.location}
                  companyType={shop.companyType}
                  address={shop.address}
                  onClick={() => handleShopClick(shop)}
                  onLocationClick={() => handleLocationClick(shop.location, shop.address)}
                />
              </animated.div>
            ))}
          </div>
        )}
      </div>
      {showMap && (
        <div className="map-overlay">
          <div className="map-container">
            <button className="close-map" onClick={closeMap}>×</button>
            <MapPopup location={selectedLocation} address={selectedAddress} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalog;