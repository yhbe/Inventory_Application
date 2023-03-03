import React from 'react';
import { v4 } from 'uuid';
import Aside from "../components/Aside";
import "./AddItemPage.css";

function AddItemPage(props) {
  const [options, setOptions] = React.useState(undefined)

  React.useEffect(() => {
    if (props.backendCategories){
      setOptions(props.backendCategories.map((item) => createOptionJSX(item)));
    }
  }, [])

  const createOptionJSX = (item) => {
    return (
        <option key={v4()} value={item.category}>{item.category}</option>
    );
  }

  return (
    <div className="main--container-addItemPage">
      <Aside />
      <form
        action="/Inventory_Application/addItem/post"
        method="POST"
        className="form--addItemPage"
      >
        <h1>Create Item</h1>
        <fieldset>
          <legend>Item Information</legend>
          <ul className="form-ul-addItemPage">
            <li>
              <label htmlFor="itemName">Name:</label>
              <input type="text" name="itemName" id="itemName" required />
            </li>
            <li>
              <label htmlFor="itemDescription">Description:</label>
              <input
                type="text"
                name="itemDescription"
                id="itemDescription"
                required
              />
            </li>
            <li>
              <label htmlFor="itemPrice">Price:</label>
              <input
                type="number"
                name="itemPrice"
                id="itemPrice"
                required
                step="1"
              />
            </li>
            <li>
              <label htmlFor="releaseDate">Launch Date:</label>
              <input type="date" name="releaseDate" id="releaseDate" required />
            </li>
            <li>
              <label htmlFor="itemCategory" id="itemCategoryLabel">
                Category:
              </label>
              <select
                name="itemCategory"
                id="itemCategory"
                aria-labelledby="itemCategoryLabel"
                required
              >
                <option value="">Select a category</option>
                {options && options}
              </select>
            </li>
            <li>
              <label htmlFor="itemCondition" id="itemConditionLabel">
                Condition:
              </label>
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
            </li>
          </ul>
          <button className="submit-button-form" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddItemPage