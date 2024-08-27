import React from 'react'
import StockNotFoundImage from '../assets/StockNotFound.png'
import Image from 'next/image'
import {Button} from 'antd'
import '../assets/styles/StockNotFoundStyles.css'

const StockNotFound = () => {
  return (
    <div className='container'>
        <Image className="Image" src={StockNotFoundImage}  alt="Stock Not Found" width={253} height={293}/>
        <p className="Description">Stock Not Found</p>
        <Button className="Button" size='middle' type='primary' >Reset Search</Button>
    </div>
  )
}

export default StockNotFound