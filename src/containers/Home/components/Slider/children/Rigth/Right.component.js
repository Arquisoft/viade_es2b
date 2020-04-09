import React from 'react'

export const Right = props => {
    return (
        <div>
            <button onClick={props.goToNextSlide}>&#62;</button>
        </div>
    );
};