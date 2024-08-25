
import React, { useEffect } from 'react'
import Nasdaq from '../assets/Nasdaq.png'
import Image from 'next/image'
import '../globals.css'
import {Spin} from 'antd'
import '../assets/styles/SplashStyles.css'
import { NavLink, redirect, useNavigate } from 'react-router-dom'


const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
       console.log('ay haga')
       navigate(`/Explore`, { replace: true }); // <-- redirect
    }, 3000);
  })
  return (
    <div className="Splash">
        <Image className='Nasdaq' src={Nasdaq} alt="nasdaqLogo" width={527} height={150} />
            <p className="subtitle">By Mostafa Azouz</p>
        <Spin size='large'  className="spin"/>
    </div>
  )
}

export default Splash