import React, { useState, useEffect } from 'react';
import Shoe1 from '../img/shoe1.jpg';
import Shoe2 from '../img/shoe2.jpg';
import Shoe3 from '../img/shoe3.jpg';
import './home.css';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';
  
  const items = [
    {
      src : Shoe1
    },
    {
      src : Shoe2
    },
    {
      src : Shoe3
    }
  ];
  
  const Home = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
      if(document.URL.search('search?q=') < 0){
        document.getElementById("search-text").value = null
      }
    },[]);
    
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img className="home-img" src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
  
    return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        className="home-carousel"
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
  }
  
  export default Home;