
import React , {useEffect, useState, memo} from 'react'
import { Breadcrumb, Layout, Menu, theme, Button, Input,Col, Row, Spin, Space} from 'antd';
import Image from 'next/image'
import Nasdaq from '../assets/Nasdaq.png'
import '../assets/styles/ExploreStyles.css'
import { SearchOutlined } from '@ant-design/icons';
import StockCard  from '../Components/StockCard'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import StockNotFound from '../Components/StockNotFound'
import Timeout from '../Components/Timeout'
import {useInView} from 'react-intersection-observer'

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
    const {ref , inView} = useInView()
    const [showData, setShowData]:[Boolean, any] = useState(true)
    

    async function fetchStocks(value: string, pageParam: string = "") {
        const LIMIT = 24;
        let url = ""
        if(pageParam == ""){
            url = `https://api.polygon.io/v3/reference/tickers?search=${value}&limit=${LIMIT}&cursor=${pageParam}&apiKey=ZxXSYSrzpVv1RCNaE8gAXE0XJOhp96gh`
        }
        else{
            url = pageParam+"&apiKey=ZxXSYSrzpVv1RCNaE8gAXE0XJOhp96gh"
        }
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json)
    
            if (json.status === "ERROR") {
                setShowData(false)
                setNoResults(false);
                SetTooManyRequests(true);
                console.log('Error')
                return { data: null, nextPage: pageParam };
            }
    
            if (json.status === "OK") {
                setShowData(true);
                if (json.results.length <= 0) {
                    setNoResults(true);
                    return { data: json, nextPage: null }; 
                }
                setNoResults(false);
                SetTooManyRequests(false);

    
                return {
                    data: json,
                    nextPage: json.next_url ? json.next_url : null, 
                };
            } else {
                setNoResults(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const {
        data,
        error,
        isFetching,
        isLoading,
        status,
        fetchNextPage, 
        hasNextPage,  
    } = useInfiniteQuery({
        queryKey: [`stocks-${query}`],
        queryFn: ({ pageParam = "" }) => fetchStocks(query, pageParam),
        initialPageParam: "",
        getNextPageParam: (lastPage) => lastPage?.nextPage ?? null,  
    });
    
    useEffect(() =>{
        if(inView && hasNextPage){
            fetchNextPage();
        }
    }, [fetchNextPage,  inView])

    function renderStocks() {
        if (!data){
            return null;
        } 
        return data.pages.map((page, pageIndex) =>
            page?.data?.results?.map((stock: StockType, stockIndex: number) => (
                <Col key={`${pageIndex}-${stock.ticker}`} className='Column' span={6}>
                    <StockCard stock={stock} />
                </Col>
            ))
        );
    }
    
    const handleChange = (event:any) =>{
        setQuery(event)
    }
    const clear = ()=>{
        setNoResults(false)
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
        <div className='CardContainer'> 
        {isLoading  && <Spin  className="Spin"/>} 
        <Row className="Cards">
                {!isLoading  && renderStocks()} 
        </Row>  
        <Row className="errors">
            <Col span={12} className="errors">
                {noResults  && <StockNotFound />}
                {TooManyRequests  && <Timeout />}
                {isFetching && !isLoading && <Spin className='Spin'/>}
            </Col>
        </Row> 
        </div>
        <div  ref={ref}>

        </div>
      </Content>
    </Layout>
        
    </div>
  )
}

export default Explore