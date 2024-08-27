import React from 'react'
import closeCircle from '../assets/close-circle.png'
import Image from 'next/image'
import {Button} from 'antd'
import '../assets/styles/StockNotFoundStyles.css'

const Timeout = () => {
  return (
    <div className='container'>
    <Image className="Image" src={closeCircle}  alt="Stock Not Found" width={80} height={80}/>
    <p className="Description">You have reached the maximum number of requests</p>
    <Button className="Button" size='middle' type='primary' >Retry</Button>
    </div>
  )
}

export default Timeout