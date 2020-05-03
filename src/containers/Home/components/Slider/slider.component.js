import React, { useState } from "react";
import { SliderWrapper, ImageList, ImageWrapper, ImageContainer } from "./Slider.style";
import Modal from "./children";

const Slider = (props) => {
    const [count, setCount] = useState(0);
    const [modal, setModal] = useState(false);
    const images = props.imgs;
    const [actualImage, setActualImage] = useState();

    const clickLeft = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const clickRight = () => {
        if (count < images.length - 5) {
            setCount(count + 1);
        }
    };

    const showModal = (x) => {
        setModal(true);
        setActualImage(URL.createObjectURL(x));
    };

    const onclose = (e) => {
        setModal(false);
    };

    return (images === undefined ? <SliderWrapper></SliderWrapper> :
        <SliderWrapper className="slider-wrapper">
            {images.length > 5 &&
                <button id="left" onClick={clickLeft}>&lt;</button>
            }
            <ImageList className="image-list">
                {images.slice(count, count + 5).map((image, index) =>
                    <ImageContainer className="image-container" key={"image" + index}>
                        <ImageWrapper className="image-wrapper" src={URL.createObjectURL(image)} alt="imagen" onClick={ (e) => {showModal(image);}}/>
                    </ImageContainer>
                )}
            </ImageList>
            {images.length > 5 &&
                <button id="right" onClick={clickRight}>&gt;</button>
            }
            <Modal className="modal" show={modal} image={actualImage} onClick={(e) => {onclose(e);}} >
            </Modal>
        </SliderWrapper>
    );
};

export default Slider;