import React from 'react'

export const Slide = (props, index) => {
    return(
        <section>
            <div className={
            index === props.activeIndex ? 'active' : 'slide'}>
                <h1>{props.title}</h1>
            </div>
          </section>
      )
    }