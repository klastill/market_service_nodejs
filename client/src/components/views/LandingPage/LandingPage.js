import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { categories } from './Sections/Datas';

function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(4);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        categories: [],
        price: []
    });
    
    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(res => {
                if (res.data.success) {
                    if (body.viewMore) {
                        setProducts([...Products, ...res.data.productInfo])
                    } else {
                        setProducts(res.data.productInfo);
                    }
                    setPostSize(res.data.postSize);
                } else {
                    alert('failed to get products');
                }
            });
    }

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        };
        getProducts(body);
    }, []);

    const viewMoreHandler = () => {
        let newSkip = Skip + Limit;
        let body = {
            skip: newSkip,
            limit: Limit,
            viewMore: true
        };
        getProducts(body);
        setSkip(newSkip);
    };

    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card cover={<ImageSlider images={product.images}/>}>
                <Meta
                    title={product.productName}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    });

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        };

        getProducts(body);
        setSkip(0);
    };

    const handelFilters = (filters, type) => {
        const newFilters = {...Filters};

        newFilters[type] = filters;
        showFilteredResults(newFilters);
    };

    return (
        <div style={{ width: '75%', margin: '3em auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Discover our products <Icon type='rocket' /></h2>
            </div>

            <CheckBox list={categories} handleFilters={filters => handelFilters(filters, "category")} />
             <br />


            <Row gutter={16, 16}>
                {renderCards}
            </Row>
            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={viewMoreHandler}>View More</button>
                </div>
            }

        </div>
    )
}

export default LandingPage
