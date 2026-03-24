/**
 * Carousel Component
 * Auto-sliding carousel with bookstore banners
 */

import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel data - Bookstore banners
  const slides = [
    {
      id: 1,
      title: 'Welcome to Bookstore',
      tagline: 'Discover your next great read',
      imageURL: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=400&fit=crop',
      color: '#FF6B6B',
    },
    {
      id: 2,
      title: 'Explore Fiction Novels',
      tagline: 'Dive into amazing stories and adventures',
      imageURL: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
      color: '#4ECDC4',
    },
    {
      id: 3,
      title: 'Learn with Non-Fiction',
      tagline: 'Expand your knowledge with insightful books',
      imageURL: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=400&fit=crop',
      color: '#45B7D1',
    },
    {
      id: 4,
      title: 'Special Book Collections',
      tagline: 'Handpicked collections for every reader',
      imageURL: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
      color: '#FFA502',
    },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel">
      {/* Slides */}
      <div className="carousel-slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            {/* Background Image */}
            <img src={slide.imageURL || slide.image} alt={slide.title} className="slide-image" />

            {/* Overlay */}
            <div className="slide-overlay"></div>

            {/* Content */}
            <div className="slide-content">
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-tagline">{slide.tagline}</p>
              <button className="slide-button">Explore Books</button>
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button className="carousel-button prev" onClick={prevSlide}>
        ❮
      </button>

      {/* Next Button */}
      <button className="carousel-button next" onClick={nextSlide}>
        ❯
      </button>

      {/* Indicators/Dots */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
