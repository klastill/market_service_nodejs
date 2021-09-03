import React from 'react';
import { Button, Descriptions } from 'antd';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../../../_actions/user_actions';

function ProductInfo(props) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(addToCart(props.detail._id));
    alert('succeeded to add product');
  };

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
