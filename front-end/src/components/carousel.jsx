import React, { useState, useEffect } from 'react';
import './carousel.css';
import clavier from './produits/clavier1.jpg';

const Carousels = () => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1619597455322-4fbbd820250a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlc2t0b3AlMjBjb21wdXRlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      title: 'Our new Desktop',
      buttonText: 'Check it out',
      buttonUrl: 'https://example.com/image1',
    },
    {
      url: clavier,
      title: 'Clavier',
      buttonText: 'Check it out',
      buttonUrl: 'https://example.com/image2',
    },
    {
      url: 'https://img.phonandroid.com/2018/01/nintendo-switch.jpg',
      title: 'Nintendo Switch',
      buttonText: 'Check it out',
      buttonUrl: '/about_us',
    },
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="carousel">
      <div className="carousel-container" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image.url} alt={image.title} />
            <div className={`carousel-banner ${index === slideIndex ? 'active' : ''}`}>
              <h3>{image.title}</h3>
              <a href={image.buttonUrl}  rel="noopener noreferrer">
                <button>{image.buttonText}</button>
              </a>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-prev-btn" onClick={prevSlide}>&#10094;</button>
      <button className="carousel-next-btn" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default Carousels;
