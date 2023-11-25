import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderImages = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider className='m-5' {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img className='h-[400px] w-full' src={image} alt={`Slide ${index}`} />
        </div>
      ))}
    </Slider>
  );
};

export default SliderImages;
