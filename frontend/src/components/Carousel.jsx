import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css"; // Import custom CSS

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Auto slide every 3 seconds
    arrows: true, // Show arrows for navigation
    pauseOnHover: false, // Continue autoplay on hover
  };

  const slides = [
    {
      imgSrc: "/src/assets/b9d5a6b12975421497eca55ac51ab27b.webp",
      alt: "First slide",
    },
    {
      imgSrc: "/src/assets/f343286577a4412699095046fedc59a4.webp",
      alt: "Second slide",
    },
    {
      imgSrc: "/src/assets/7d0afd8ae9cf4036975648d2e8022594.webp",
      alt: "Third slide",
    },
    // Add more slides as needed
  ];

  return (
    <div className="carousel-container w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={slide.imgSrc}
              alt={slide.alt}
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
