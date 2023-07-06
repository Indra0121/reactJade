import React from 'react';
import { Link } from 'react-router-dom';
import Carousels from './carousel';
import './home.css';
import hardwareImage from './img/computer-hardware.jpg';
import phoneImage from './img/phonecat.jpg';

import consoleImage from './img/consolecat.jpg';
import laptopImage from './img/pccat.jpg';

const CategoryCard = ({ imageSrc, title, link }) => {
  return (
    <div className="category-card">
      <img src={imageSrc} alt="Category Image" />
      <h3 className="category-title">{title}</h3>
      <Link to={link} className="see-more-button">See More</Link>
    </div>
  );
};

const Home = () => {
  return (
<>
<div id="partx"> 
        <div id="part4">
            <h1>Welcome to <span>Jade</span> Shop</h1>
            <p>Best Apple product seller</p>
        </div>
</div>
<div className='cat'>
      <CategoryCard
        imageSrc={hardwareImage}
        title="Nos Hardware"
        link="/hardware"
      />
      <CategoryCard
        imageSrc={phoneImage}
        title="Nos telephones"
        link="/telephones"
      />
      <CategoryCard
        imageSrc={consoleImage}
        title="Nos consoles"
        link="/consoles"
      />
      <CategoryCard
        imageSrc={laptopImage}
        title="Nos ordinateurs portables"
        link="/ordinateurs-portables"
      />
    </div>
    <h1 style={{ textAlign: 'center', color: 'rgb(172, 248, 172)', fontSize: '40px' }}>HOTTEST ARRIVAL</h1>
<Carousels />

</>
  );
};

export default Home;
