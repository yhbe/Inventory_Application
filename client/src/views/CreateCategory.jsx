import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Aside from '../components/Aside';

function CreateCategory(props) {
  return (
    <div className="main--container">
      <Aside />
      <form
        className="slight_padding center"
        action="/Inventory_Application/addCategory"
        method='POST'
      >
        <h1>Create Category</h1>
        <br />
        <p>Enter Category Name Below:</p>
        <label htmlFor="categoryName"></label>
        <input type="text" name="categoryName" id="categoryName" required/>
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateCategory