'use strict'

import React from 'react'
import { TwitterPicker } from 'react-color'

const ColorPicker = ({ showColourPicker, colours, colourToChange, updatePalette, draw, pixels }) => {
    const popover = {
        zIndex: '10',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
        zIndex: '0',
    }

    // updates colour palette and sets pixel targets to new colour
    const updateColours = (color) => {
        colours[colourToChange] = Object.values(color.rgb);
        updatePalette(colours);
        draw({ pixels: pixels, colour_of_k: colours });
    }

    // chosen colours, must be hex to trigger event clickes
    const hex = ['#9195A2', '#232A74', '#140B49', '#24327D', '#8A85BC'];

    return (
        <div>
            <div style={popover} className="control-container">
                <div style={cover} onClick={showColourPicker} />
                <TwitterPicker onChangeComplete={updateColours} triangle="hide" width="100%" colors={hex} />
            </div>
        </div>
    )
}

export default ColorPicker