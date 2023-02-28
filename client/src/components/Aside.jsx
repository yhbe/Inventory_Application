import React from 'react';

function Aside() {
  return (
    <aside className="aside--button-container">
      <button>Home</button>
      <button>All Items</button>
      <button>All Categories</button>
      <button>All Available Items</button>
      <br />
      <button>Create New Item</button>
      <button>Create New Category</button>
      <button>Create New Item Instance (Copy)</button>
    </aside>
  );
}

export default Aside