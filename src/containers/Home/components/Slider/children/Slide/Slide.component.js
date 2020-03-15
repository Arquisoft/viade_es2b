import React from 'react'

export const Slide = (props, s, index) => {
    return(
        <section>
            <div className={
              index === props.activeIndex ? 'active' : 'slide'}
              key={index}>
                <h1>{s.title}</h1>
                <p>{s.description}</p>
            </div>
          </section>
      )
    }