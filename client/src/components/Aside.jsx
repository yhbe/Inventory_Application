import React from 'react';
import { useNavigate } from "react-router-dom";

function Aside() {
  let navigate = useNavigate()
  return (
    <aside className="aside--button-container">
      <button onClick={() => navigate("../Inventory_Application/")}>
        Home
      </button>
      <button onClick={() => navigate("../Inventory_Application/allItems")}>All Items</button>
      <button onClick={() => navigate("../Inventory_Application/catalog/categories")}>All Categories</button>
      <button onClick={() => navigate("../Inventory_Application/availableItems")}>All Available Items</button>
      <br />
      <button onClick={() => navigate("../Inventory_Application/addItem")}>
        Create New Item
      </button>
      <button onClick={() => navigate("../Inventory_Application/category/create")}>Create New Category</button>
      <button>Create New Item Instance (Copy)</button>
    </aside>
  );
}

export default Aside