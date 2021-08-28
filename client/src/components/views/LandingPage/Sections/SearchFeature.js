import React, {useState} from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState('');

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
    props.refreshFunction(event.target.value);
  };

  return (
    <div>
      <Search placeholder="input search text" onChange={searchHandler} style={{ width: 200 }} />
    </div>
  )
}

export default SearchFeature
