import React from 'react'
import Nasdaq from '../assets/Nasdaq.png'
import Image from 'next/image'
import '../globals.css'

const Splash = () => {
  return (
    <div className="splash">
        <Image className='Nasdaq' src={Nasdaq} alt="nasdaqLogo" width={100} height={100} />
    </div>
  )
}

export default Splash