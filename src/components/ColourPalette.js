import React from 'react'

const ColourPalette = ({ palette, updatePickerState, updateBoxToChange }) => {

    const colours = Object.values(palette);
    const width = colours.length < 11 ? '35px' : '30px';

    // toggles showing colour picker and update which colour div has been pressed
    const changeColour = (num) => {
        updatePickerState();
        updateBoxToChange(num);
    }

    return (
        <div className='colour-palette'>

            {colours.map((colour, index) => (

                <div key={index} style={{ width: width, height: width, backgroundColor: `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})` }}
                    onClick={() => { changeColour(index) }}>
                </div>

            ))}
        </div>
    )
}

export default ColourPalette
