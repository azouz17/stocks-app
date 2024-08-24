import React from 'react'
import '../assets/styles/CardStyles.css'

type Stock = {
    abb: string,
    ticker: string,
    name: string
}
type StockType = {
    stock: Stock
}

const StockCard: React.FC<StockType> = ({stock}) => {
  return (
    <div className='Card'>
        <div className='CardContent'>
            <div className='logo'>
                <p>
                    {stock.abb}
                </p>
            </div>
            <div className='StockInfo'>
                <p className='ticker'>
                    {stock.ticker}
                </p>
                <p className='stockName'>
                    {stock.name}
                </p>
            </div>
        </div>
    </div>
  )
}

export default StockCard