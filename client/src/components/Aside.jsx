import React from 'react';
import { useNavigate } from "react-router-dom";

function Aside() {
  let navigate = useNavigate()
  return (
    <aside className="aside--button-container">
      <button onClick={() => navigate("../Inventory_Application/")}>
        Home
      </button>
      <button>All Items</button>
      <button>All Categories</button>
      <button>All Available Items</button>
      <br />
      <button onClick={() => navigate("../Inventory_Application/addItem")}>
        Create New Item
      </button>
      <button>Create New Category</button>
      <button>Create New Item Instance (Copy)</button>
    </aside>
  );
}

export default Aside