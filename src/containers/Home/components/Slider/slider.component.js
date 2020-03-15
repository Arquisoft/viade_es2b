import React from 'react'
import {
    Left,
    Right,
    Slide
} from './children'

export const Slider = props => {
    var actualIndex = 0;
    var actualLength = props.elements.length;

    const goToPrevSlide = () => {
        let index = actualIndex;
        let length = actualLength;
        if(index < 1) {
            index = length - 1;
        }
        else {
            index--;
        }
        actualIndex = index;
    }
    
    const goToNextSlide = () => {
        let index = actualIndex;
        let length = actualLength;
        if(index === length - 1) {
            index = 0
        }
        else {
            index++;
        }
        actualIndex = index;
    }

    return (
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <Left goToPrevSlide={() => goToPrevSlide()}></Left>
        <div className='slider-text'>
          <Slide
            activeIndex = {actualIndex}
            title = {props.elements[1].title}
          />
        </div>
        <Right goToNextSlide={() => goToNextSlide()}></Right>
    </div>
    );
};