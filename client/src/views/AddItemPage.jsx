import React from 'react';
import Aside from "../components/Aside";
import "./AddItemPage.css";

function AddItemPage(props) {
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
              <input type="number" name="itemPrice" id="itemPrice" required />
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
                <option value="processors">Processors</option>
                <option value="videoCards">Video Cards</option>
                <option value="cases">Cases</option>
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