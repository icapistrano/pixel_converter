import React from 'react'
import LogoLetter from './LogoLetter'

const Header = () => {
    return (

        <div className="logo-grid-container">
            <LogoLetter letter='P' bgColour='#D30000'></LogoLetter>
            <LogoLetter letter='I' bgColour='#E57C00'></LogoLetter>
            <LogoLetter letter='X' bgColour='#E3CD00'></LogoLetter>
            <LogoLetter letter='E' bgColour='#5FBD00'></LogoLetter>
            <LogoLetter letter='L' bgColour='#008EAD'></LogoLetter>
            <div></div>
            <LogoLetter letter='M' bgColour='#D30000'></LogoLetter>
            <LogoLetter letter='A' bgColour='#E57C00'></LogoLetter>
            <LogoLetter letter='K' bgColour='#E3CD00'></LogoLetter>
            <LogoLetter letter='E' bgColour='#5FBD00'></LogoLetter>
            <LogoLetter letter='R' bgColour='#008EAD'></LogoLetter>
        </div>

    )
}

export default Header
