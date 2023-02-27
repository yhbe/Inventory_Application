import React from 'react'
import "./Homepage.css"

function Homepage(props) {
  // props.inventory
  return (
    <div className='main--container'>
    <aside className='aside--button-container'>
      <button>Home</button>
      <button>All Items</button>
      <button>All Categories</button>
      <button>All Available Items</button>
      <br />
      <button>Create New Item</button>
      <button>Create New Category</button>
      <button>Create New Item Instance (Copy)</button>
    </aside>

    <div className="content-page">
      <p>One Stop Computer Shop</p>
      <p>We currently have the following record counts:</p>
      <ul>
        <li><strong>Items:</strong> 5</li>
        <li><strong>Total Items In Stock:</strong> 10</li>
        <li><strong>Categories:</strong> 3</li>
      </ul>
    </div>
    </div>
  )
}

export default Homepage