import React from 'react'

export const Left = props => {
    return (
        <div>
            <button onClick={props.goToPrevSlide}>&#60;</button>
        </div>
    );
};