import React, { useState } from 'react';
import { SliderWrapper, ImageWrapper } from './Slider.style';

const Slider = props => {
    const [count, setCount] = useState(0);
    const images = props.imgs;
    const [nElements] = useState(images.length);

    const clickLeft = () => {
        if(count > 0)
            setCount(count - 1)
    }

    const clickRight = () => {
        if(count < nElements-1)
            setCount(count + 1);
        console.log(nElements);
    }

    return (
        <SliderWrapper>
            <button id="left" onClick={clickLeft}>&lt;</button>
            {images.slice(count,count+5 < nElements-1 ? count+5 : nElements-1).map(image => 
                    <ImageWrapper src={image.src} alt="imagen"/>
                )
            }
            <button id="right" onClick={clickRight}>&gt;</button>
        </SliderWrapper>
    );
};

export default Slider;