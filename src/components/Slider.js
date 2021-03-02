import React from 'react'

const Slider = ({ initialValue, onChangeCb, minVal, maxVal }) => {
    return (
        <input type="range" min={minVal} max={maxVal} className="slider" defaultValue={initialValue}
            onChange={(e) => onChangeCb(e)}
        />
    )
}

export default Slider

