import React from 'react'

const Button = ({ text, bgColour, buttonClick, disableBtn }) => {

    const onCallback = () => {
        if (disableBtn) {
            return;
        }

        buttonClick();
    }

    return (
        <button className="btns" style={{ background: bgColour }} onClick={onCallback}>
            <h3 className="pixel-font">{text}</h3>
        </button>
    )
}

export default Button
