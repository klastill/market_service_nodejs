import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios';

function FileUpload(props) {
  const [Images, setImages] = useState([]);
  
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }

    formData.append("file", files[0]);
    axios.post('/api/product/image', formData, config)
      .then(res => {
        if (res.data.success) {
          setImages([...Images, res.data.filePath]);
          props.refreshFunction([...Images, res.data.filePath]);
        } else {
          alert('failed to save files');
        }
      })
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
            <div style={{
              width: 300, height: 240, border: '1px solid #999',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
              }} {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type='plus' style={{fontSize: '3em'}} />
            </div>
        )}
      </Dropzone> 
      <div style={{
        width: 300, height: 240, border: '1px solid #999',
        display: 'flex', overflowX: 'scroll', overflowY: 'hidden'}}>
          {Images.map((image, index) => (
            <div onClick={() => deleteHandler(image)} key={index}>
              <img style={{width: '300px', height: '240px', objectFit: 'cover'}} src={`http://localhost:5050/${image}`} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default FileUpload
