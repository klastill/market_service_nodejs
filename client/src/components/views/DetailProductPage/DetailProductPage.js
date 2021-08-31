import React, {useEffect} from 'react';
import axios from 'axios';


function DetailProductPage(props) {

  const productId = props.match.params.productId

  useEffect(() => {
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.product);
        } else {
          alert('failed to get product');
        }
      });
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default DetailProductPage;
