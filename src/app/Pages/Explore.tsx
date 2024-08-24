import React from 'react'
import { Breadcrumb, Layout, Menu, theme, Input,Col, Row} from 'antd';
import Image from 'next/image'
import Nasdaq from '../assets/Nasdaq.png'
import '../assets/styles/ExploreStyles.css'
import Search from '../assets/Search.png'
import { SearchOutlined } from '@ant-design/icons';
import StockCard  from '../Components/StockCard'

const { Header, Content, Footer } = Layout;

type Stock = {
    abb: string,
    ticker: string,
    name: string
}

const stockData: Stock[] = [
    {
      abb: 'AA',
      ticker: 'AAPL',
      name: 'Apple Inc.',
    },
    {
      abb: 'MS',
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
    },
    {
      abb: 'GO',
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
    },
    // Add more stocks as needed
  ];

const Explore = () => {
  return (
    <div>
        <Layout>
      <Header className="Header">
        <Image className='Nasdaq' src={Nasdaq} alt="nasdaqLogo" width={105} height={30} /> 
      </Header>

      <Content style={{ padding: '0 48px' , marginTop:'20px' }}>
        <Row className="InputForm">
            <Col className="InputForm" span={12}>
                <Input size="large" placeholder="search for stocks by entering ticker e.g.:AAPL, MCFT" prefix={<SearchOutlined />} />
            </Col>
        </Row>
        <Row className="Cards">
            <Col span={6}>
            {stockData.map((stock, index) => (
        <StockCard key={index} stock={stock} />
                ))}
            </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>

    </Layout>
        
    </div>
  )
}

export default Explore