import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Aside from '../components/Aside';

function ItemInstanceCreate(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [itemCollection, setItemCollection] = useState(null)
  const navigate = useNavigate();

  React.useEffect(() => {
    let itemList = []
    if (props.backendData){
      props.backendData?.map(item => {
        itemList.push(item)
      })
      setIsLoading(false)
      setItemCollection(itemList)
    }
  }, []);

  const createItemOptions = (item) => {
    return (
        <option key={item._id} value={item.name}>{item.name}</option>
    );
  }

  const handlePost = async (event) => {
    event.preventDefault();
    const formItemChoice = document.querySelector("#itemChoice").value;
    const formConditionChoice = document.querySelector("#itemCondition").value;
    const formPriceChoice = document.querySelector("#price").value;
    const selectedItem = props.backendData.find(
      (item) => item.name === formItemChoice
    );

    const formData = new URLSearchParams();
    formData.append("itemName", selectedItem.name);
    formData.append("itemDescription", selectedItem.description);
    formData.append("itemCondition", formConditionChoice);
    formData.append("itemPrice", formPriceChoice);
    formData.append("releaseDate", selectedItem.releaseDate);
    formData.append("itemCategory", selectedItem.category);

    try {
      const response = await fetch(
        "https://inventory-backend-l9qt.onrender.com/Inventory_Application/addItem/post",
        {
          method: "POST",
          body: formData.toString(),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.redirected) {
        window.location.replace(response.url);
      }
    } catch (err) {
      console.error(err);
    }
  };



  if (isLoading){
    return (<> <h1>...Loading</h1> </>)
  }

  if (itemCollection){
    const item = itemCollection.map((item) => createItemOptions(item))
    return (
      <div className="main--container">
        <Aside />
        <form
          className="slight_padding"
        >
          <h1>Create Item Instance</h1>
          <br />
          <select
            name="itemChoice"
            id="itemChoice"
            aria-labelledby="itemChoiceLabel"
            required
          >
            <option value="">Select an item</option>
            {item}
          </select>
          <br />
          <br />
          <select
            name="itemCondition"
            id="itemCondition"
            aria-labelledby="itemConditionLabel"
            required
          >
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Refurbished">Refurbished</option>
          </select>
          <br />
          <br />
          <label htmlFor="price">Price: $</label>
          <input type="number" name="price" id="price" step="1" />
          <br />
          <br />
          <button onClick={(event) => handlePost(event)}>Submit</button>
        </form>
      </div>
    );
  } else return (
    <>
    <h1>Item not found</h1>
    </>
  )

}

export default ItemInstanceCreate