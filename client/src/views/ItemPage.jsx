import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Aside from '../components/Aside'

function ItemPage(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const navigate = useNavigate()
  let {id} = useParams()
  
  React.useEffect(() => {
    let item = props.backendData?.find(item => item._id === id)
    setIsLoading(false)
    setSelectedItem(item)
  }, [])

  const createSelectedItemJSX = (item) => {
    return (
      <div className="main--container">
        <Aside />
        <div className="item_page_info_container">
        <p>ID: {item._id}</p>
          <p>
            Name:{" "}
            <button
              className="button_link"
              onClick={() => handleItemClick(item._id)}
            >
              {item.name}
            </button>{" "}
            ${item.price}
          </p>
          <p>Condition: {item.condition}</p>
          <hr />
          <button className='button_link smaller'>Update Item Instance</button>
          <br />
          <button className='button_link smaller'>Delete Item Instance</button>
        </div>
      </div>
    );
  }

  const handleItemClick = (id) => {
    navigate(`../Inventory_Application/item/${id}`);
  };

  if (isLoading){
    return (
      <>
      <h1>...Loading</h1>
      </>
    )
  }

  if (selectedItem){
    const item = createSelectedItemJSX(selectedItem)
    return (
      <>
      {item}
      </>
    )
  } else {
    return (
      <>
      <h1>Item not found</h1>
      </>
    )
  }
}

export default ItemPage