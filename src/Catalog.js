import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Shop from './Shop';
import ShopPath from './ShopPath';
import './Catalog.css';
import shopsData from './shopsData.json';

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);
  const [shops] = useState(shopsData);
  const [locationFilter, setLocationFilter] = useState('');
  const [companyTypeFilter, setCompanyTypeFilter] = useState('');
  const navigate = useNavigate();

  const titleAnimation = useSpring({
    from: { transform: 'translateY(-100%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
    config: { duration: 1000 },
  });

  const shopAnimation = useSpring({
    from: { transform: 'translateY(100%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
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
  };

  const handleMainMenu = () => {
    navigate('/');
  };

  const locations = [...new Set(shops.map(shop => shop.location))];
  const companyTypes = [...new Set(shops.map(shop => shop.companyType))];

  return (
    <div className="catalog">
      <animated.h1 style={titleAnimation}>Shop360 HK</animated.h1>
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
          <div className="shops">
            {filteredShops.map((shop, index) => (
              <Shop 
                key={index} 
                name={shop.name} 
                image={shop.panoramaImages[0].url} 
                description={shop.description} 
                location={shop.location}
                companyType={shop.companyType}
                address={shop.address}
                animation={shopAnimation}
                onClick={() => handleShopClick(shop)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;