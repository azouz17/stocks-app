import React from 'react'
import '../assets/styles/CardStyles.css'

type Stock = {
    active: Boolean,
    cik: string,
    composite_figi: string,
    currency_name:string,
    last_updated_utc: string,
    locale: string,
    market: string,
    name: string,
    primary_exchange: string,
    share_class_figi: string,
    ticker: string,
    type: string
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
                    {stock.ticker}
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