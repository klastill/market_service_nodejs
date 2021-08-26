import React, {useState} from 'react'
import {Typography, Button, Form, Input, Descriptions} from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;
const Categories = [
  {key: 1, value: 'a'},
  {key: 2, value: 'b'},
  {key: 3, value: 'c'},
  {key: 4, value: 'd'},
  {key: 5, value: 'e'}
];

function UploadProductPage(props) {
  const [ProductName, setProductName] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Category, setCategory] = useState(1);
  const [Images, setImages] = useState([]);

  const onChangeHandler = (event) => {
    const targetName = event.target.name;
    switch (targetName) {
      case 'ProductName':
        setProductName(event.target.value);
        break;
      case 'Description':
        setDescription(event.target.value);
        break;
      case 'Price':
        setPrice(event.target.value);
        break;
      case 'Category':
        setCategory(event.target.value);
        break;
    }
  }
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!ProductName || !Description || !Price || !Category || !Images) {
      return alert('You should fill out all the blank field');
    }
    const body = {
      writer: props.user.userData._id,
      productName: ProductName,
      description: Description,
      price: Price,
      images: Images,
      category: Category
    };

    axios.post('/api/product', body)
      .then(res => {
        if (res.data.success) {
          alert('Succeeded to upload');
          props.history.push('/');
        } else {
          alert('failed to upload');
        }
      });
  };

  return (
    <div style={{maxWidth: '50%', margin: '2em auto'}}>
      <div style={{textAlign: 'center'}}>
        <Title level={2}>Upload</Title>
      </div>
      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br/>
        <label>Name</label>
        <Input name='ProductName' onChange={onChangeHandler} value={ProductName} />
        <br />
        <br />
        <label>Description</label>
        <TextArea name='Description' onChange={onChangeHandler} value={Description} />
        <br />
        <br />
        <label>Price</label>
        <Input name='Price' onChange={onChangeHandler} value={Price} />
        <br />
        <br />
        <select name='Category' onChange={onChangeHandler} value={Category}>
          {Categories.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit">Confirm</button>
      </Form>
    </div>
  )
}

export default UploadProductPage
