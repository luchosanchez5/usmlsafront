import React from "react";
import {Image } from "react-bootstrap";
import Junction from "../assets/images/auth-section2-image.svg";
import img from '../assets/images/soccer-cup-golden-winners-cup-middle-stadium-celebrating-victory-with-audience_1014870-61060.avif'
import "../assets/css/auth-slider.css";

const AuthSlider = ({ slides }) => {
  return (
    // <Carousel
    //   controls={false}
    //   indicators={false}
    //   interval={3000}
    //   data-aos="fade-left"
    // >
    //   {slides.map((slide, index) => {
    //     return (
    //       <Carousel.Item key={index}>
    //         <img className="d-block w-100" src={slide.img} alt="Slide" />
    //         <div class="overlay"></div>
    //         <Carousel.Caption className="slide-caption">
    //           <h3 className="slide-title">{slide.title}</h3>
    //           <p className="slide-description">{slide.description}</p>
    //         </Carousel.Caption>
    //       </Carousel.Item>
    //     );
    //   })}
    // </Carousel>

    <div className="slider-section d-flex justify-content-around h-100 flex-column">
      
      <Image
        fluid
        src={img}
        alt="Logo"
        loading="lazy"
        style={{height:'961px',mixBlendMode:'multiply'}}

        xs="12"
        md="6"
        className="d-none d-lg-block img-fluid img-auth"
      />
    </div>
  );
};

export default AuthSlider;
