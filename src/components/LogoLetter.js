import React from 'react'

const LogoLetter = ({ letter, bgColour, moveY }) => {
    return (
        <div className='logo-letter-container box-shadow' style={{ background: bgColour, marginTop: moveY }}>

            <h1 className="pixel-font">{letter}</h1>

        </div>
    )
}

export default LogoLetter
