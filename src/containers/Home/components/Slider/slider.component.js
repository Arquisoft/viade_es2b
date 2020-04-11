import React, { useState } from 'react';
import { SliderWrapper, ImageWrapper, ImageContainer } from './Slider.style';

const Slider = props => {
    const [count, setCount] = useState(0);
    const images = props.imgs;

    const clickLeft = () => {
        if(count > 0)
            setCount(count - 1)
    }

    const clickRight = () => {
        if(count < images.length-5)
            setCount(count + 1);
    }

    return (images === undefined ? <SliderWrapper></SliderWrapper> :
        <SliderWrapper>
            {images.length > 5 &&
                <button id="left" onClick={clickLeft}>&lt;</button>
            }
            {images.slice(count, count+5).map(image => 
                    <ImageContainer>
                        <ImageWrapper src={URL.createObjectURL(image)} alt="imagen"/>
                    </ImageContainer>
                )
            }
            {images.length > 5 &&
                <button id="right" onClick={clickRight}>&gt;</button>
            }
        </SliderWrapper>
    );
};

export default Slider;