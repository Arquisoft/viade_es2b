import React from 'react'
import {
    Left,
    Right
} from './children'

export const Slider = props => {
    var actualIndex = 0;

    const goToPrevSlide = () => {
        let index = actualIndex;
        let length = 5;
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
        let length = 5;
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
        <Right goToNextSlide={() => goToNextSlide()}></Right>
    </div>
    );
};