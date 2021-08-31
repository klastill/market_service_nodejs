import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import {Row, Col} from 'antd';

function DetailProductPage(props) {

  const productId = props.match.params.productId;

  const [Product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then(res => {
        if (res.data.success) {
          setProduct(res.data.product[0]);
        } else {
          alert('failed to get product');
        }
      });
  }, []);

  return (
    <div style={{width: '100%', padding: '3em 4em'}}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h1>{Product.productName}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]} >
        <Col lg={12} sm={24} >
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} sm={24} >
          <ProductInfo detail={Product} />
        </Col>
      </Row>
      
    </div>
  );
}

export default DetailProductPage;
