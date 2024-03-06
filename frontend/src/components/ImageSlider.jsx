import React, { useState, useEffect } from 'react';
import '../styles/ImageSlider.css';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      image: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1709211804201_redlorryweb.jpg',
      text: 'Slide 1 Text',
    },
    {
      image: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1709640671913_ewde.jpg',
      text: 'Slide 2 Text',
    },
    {
      image: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1709293823376_punepaponweb.jpg',
      text: 'Slide 3 Text',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Transition duration is set to 1 second in CSS

    return () => clearTimeout(transitionTimeout);
  }, [currentSlide]);

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="slider">
        <div>
      <button onClick={prevSlide} className="prev">
        &#10094;
      </button>
      <div className={`slides-container ${isTransitioning ? 'transitioning' : ''}`}>
        {slides.map((slide, index) => (
          <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            {/* <div className="text">{slide.text}</div> */}
          </div>
        ))}
      </div>
      <button onClick={nextSlide} className="next">
        &#10095;
      </button>
      </div>
      <div className="indicators">
        {slides.map((_, index) => (
          <span key={index} onClick={() => goToSlide(index)} className={index === currentSlide ? 'active' : ''}></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;



// import React, { useState , useEffect } from 'react';
// import '../styles/ImageSlider.css';

// const ImageSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       image: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1709640671913_ewde.jpg',
//       text: 'Slide 1 Text',
//     },
//     {
//       image: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1709211804201_redlorryweb.jpg',
//       text: 'Slide 2 Text',
//     },
//     {
//       image: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1709293823376_punepaponweb.jpg',
//       text: 'Slide 3 Text',
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
//     }, 1000); // Change slide every 1 second

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
//   };

//   return (
//     <div className="slider">
//       <button onClick={prevSlide} className="prev">
//         &#10094;
//       </button>
//       {slides.map((slide, index) => (
//         <div key={index} className={index === currentSlide ? 'slide active' : 'slide'}>
//           <img src={slide.image} alt={`Slide ${index + 1}`} />
//           <div className="text">{slide.text}</div>
//         </div>
//       ))}
//       <button onClick={nextSlide} className="next">
//         &#10095;
//       </button>
//     </div>
//   );
// };

// export default ImageSlider;
