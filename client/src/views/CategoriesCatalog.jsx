import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import Aside from '../components/Aside';

function CategoriesCatalog(props) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [catagories, setCatagories] = useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    let allCategories = []
    if (props.backendCategories){
      setCatagories(props.backendCategories)
      setIsLoading(false)
    }
  }, [])

  const createCatagoriesJSX = (item) => {
    return (
      <div key={v4()}>
        <button onClick={() => handleCategoryClick(item.category)} className="button_link larger">{item.category}</button>
        <br />
        <br />
      </div>
    );
  }

  const handleCategoryClick = (id) => {
    navigate(`../Inventory_Application/catalog/category/${id}`)
  }

  if (isLoading) {
    return (<h1>...Loading</h1>)
  }

  if (catagories){
    let item = catagories.map((item => createCatagoriesJSX(item)))
    return (
      <div className="main--container">
        <Aside />
        <div className="slight_padding">
          <h1>Category List</h1>
          <br />
          {item}
        </div>
      </div>
    );
  }
}

export default CategoriesCatalog