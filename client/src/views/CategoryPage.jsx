import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Aside from '../components/Aside';

function CategoryPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryCollection, setCategoryCollection] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();

  React.useEffect(() => {
    let categoryList = [];
    props.backendData?.forEach(item => {
      if (item.category === id){
        categoryList.push(item)
      }
    })
    setIsLoading(false);
    setCategoryCollection(categoryList);
  }, []);

  const handleItemIdClick = (id) => {
    navigate(`../Inventory_Application/item/${id}`);
  };

  const createItemJSX = (item) => {
    return (
      <div key={item._id}>
        <br />
        <button onClick={() => handleItemIdClick(item._id)} className="button_link">
          {item.name}
        </button>
        <p>{item.description}</p>
        <br />
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <h1>...Loading</h1>
      </>
    );
  }

  if (categoryCollection){
    const itemList = categoryCollection.map(item => createItemJSX(item))
    return (
      <div className='main--container'>
      <Aside />
      <div className='slight_padding'>
        <h1>Category: {id}</h1>
        <br />
        <h2>Associated Items</h2>
      {itemList}
      </div>
      </div>
    )
  }
}

export default CategoryPage