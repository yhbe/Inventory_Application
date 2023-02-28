import React from 'react'
import Aside from '../components/Aside'
import "./Homepage.css"

function Homepage(props) {
  // props.inventory
  return (
    <div className='main--container'>
    <Aside />
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