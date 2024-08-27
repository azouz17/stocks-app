
import React , {useState} from 'react'
import { Breadcrumb, Layout, Menu, theme, Button, Input,Col, Row, Spin, Space} from 'antd';
import Image from 'next/image'
import Nasdaq from '../assets/Nasdaq.png'
import '../assets/styles/ExploreStyles.css'
import { SearchOutlined } from '@ant-design/icons';
import StockCard  from '../Components/StockCard'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import StockNotFound from '../Components/StockNotFound'
import Timeout from '../Components/Timeout'

const { Header, Content, Footer } = Layout;
const { Search } = Input;

type StockType = {
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


const Explore = () => {
    const [empty , setEmpty] = useState(false)
    const [query , setQuery]:[string,any] = useState("")
    const [noResults, setNoResults]:[Boolean, any] = useState(false)
    const [TooManyRequests, SetTooManyRequests]:[Boolean, any] = useState(false)
    async function fetchStocks (value: string){
        try{
            const response = await fetch(`https://api.polygon.io/v3/reference/tickers?ticker=${value}&limit=24&apiKey=ZxXSYSrzpVv1RCNaE8gAXE0XJOhp96gh`,{
            })
            const json = await response.json()
            if(json.status == "ERROR"){
                setNoResults(false)
                SetTooManyRequests(true)   
                return 
            }
            if(json.status == "OK"){
                if(json.results.length <= 0){
                    setNoResults(true)
                    return json
                }
                setNoResults(false)
                SetTooManyRequests(false)
                return json
            }
            
            else{
                setNoResults(true)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const{
        data,
        isLoading,
        isPending,
        isError,
    } = useQuery({
        queryKey: [`stocks-${query}`],
        queryFn: () =>fetchStocks(query),
    })

    function renderStocks(){
        if(data?.count <= 0 || data?.status != 'OK'){
            return 
        }
        else{
            return data?.results.map((stock: StockType, key:number)=>{
                return(
                    <Col key={key} className='Column' span={6}>
                        <StockCard stock={stock} />
                    </Col>
                )
            })
        }
    }
    const handleChange = (event:any) =>{
        setQuery(event)
    }
    const clear = ()=>{
        setQuery('')
    }
  return (
    <div>
        <Layout className="Layout">
      <Header className="Header">
        <Image className='Nasdaq' src={Nasdaq} alt="nasdaqLogo" width={105} height={30} /> 
      </Header>

      <Content className="Content">
        <Row className="InputForm">
            <Col className="InputForm" span={12}>
            <Search
            prefix={<SearchOutlined style={{color: '##8C8C8C'}}/>}
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleChange}
            onClear={clear}
            className='input'
            />
            </Col>
        </Row>
        <Row className="Cards">
        <div className='CardContainer'> 
                {isLoading && <Spin />} 
                {noResults  && <StockNotFound />}
                {TooManyRequests  && <Timeout />}
            </div>
            {!isLoading && renderStocks()} 
        </Row>
      </Content>
    </Layout>
        
    </div>
  )
}

export default Explore