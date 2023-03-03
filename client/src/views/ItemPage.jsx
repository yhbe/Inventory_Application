import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Aside from '../components/Aside'
import Form from '../components/Form'

function ItemPage(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()
  let {id} = useParams()
  
  React.useEffect(() => {
    let item = props.backendData?.find(item => item._id === id)
    setIsLoading(false)
    setSelectedItem(item)
  }, [])

const handleDelete = async (item) => {
  try {
    const response = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      window.location.replace("/");
    } else {
      console.error(response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
};

const handleSubmit = async (updatedItem) => {
  try {
    const formData = new URLSearchParams();
    formData.append("itemName", updatedItem.name);
    formData.append("itemDescription", updatedItem.description);
    formData.append("itemCondition", updatedItem.condition);
    formData.append("itemPrice", updatedItem.price);
    formData.append("releaseDate", updatedItem.releaseDate);
    formData.append("itemCategory", updatedItem.category);
    
    const response = await fetch(`/api/items/${updatedItem._id}`, {
      method: "PUT",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.ok) {
      props.refreshBackendData()
      setIsEditing(false);
      setSelectedItem(updatedItem);
    } else {
      console.error(response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
};


  const createSelectedItemJSX = (item) => {
    return (
      <>
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
          <button
            onClick={() => setIsEditing(true)}
            className="button_link smaller"
          >
            Update Item Instance
          </button>
          <br />
          <button
            onClick={(item) => handleDelete(item)}
            className="button_link smaller"
          >
            Delete Item Instance
          </button>
        </div>
      </>
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
      <div className='main--container'>
        <Aside />
        <div>
        {!isEditing ? item : <Form selectedItem={selectedItem} setIsEditing={setIsEditing} handleSubmit={handleSubmit} backendCategories={props.backendCategories}/>}
        </div>
      </div>
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