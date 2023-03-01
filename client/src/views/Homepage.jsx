import React, { useState } from 'react'
import Aside from '../components/Aside'
import "./Homepage.css"

function Homepage(props) {
  const [itemCount, setItemCount] = useState(0)
  const [totalStock, setTotalStock] = useState(0)
  const [categoryCount, setCategoryCount] = useState(0)

  React.useEffect(() => {
    let categoryList = [];
    let newState = {
      itemCount: 0,
      totalStock: 0,
      categoryCount: 0,
    }
    if (props.backendData) {
      props.backendData.forEach((item) => {
        newState.itemCount += 1;
        if (new Date().toISOString().split("T")[0] >= item.releaseDate) {
          newState.totalStock += 1;
        }
        if (!categoryList.includes(item.category)) {
          categoryList.push(item.category);
          newState.categoryCount += 1;
        }
      });
      setItemCount(newState.itemCount);
      setTotalStock(newState.totalStock);
      setCategoryCount(newState.categoryCount);
    }
  }, [props.backendData]);

  return (
    <div className='main--container'>
    <Aside />
    <div className="content-page">
      <p>One Stop Computer Shop</p>
      <p>We currently have the following record counts:</p>
      <ul>
        <li><strong>Items:</strong> {itemCount}</li>
        <li><strong>Total Items In Stock:</strong> {totalStock}</li>
        <li><strong>Categories:</strong> {categoryCount}</li>
      </ul>
    </div>
    </div>
  )
}

export default Homepage