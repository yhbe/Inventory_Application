import React, { useState } from 'react';
import Aside from "../components/Aside";

function AllItemsPage(props) {
  const [allItemJsx, setAllItemJsx] = useState(null)
  
  React.useEffect(() => {
    if (props.backendData){
      let itemJsx
      itemJsx = props.backendData.map(item => {
        return (
            <li key={item._id}>
              <a href={`./item/${item._id}`} > {item.name}</a>
            </li>
        );
      })
      setAllItemJsx(itemJsx)
    }
  }, [props.backendData])

  return (
    <div className='main--container'>
      <Aside />
      <ul className='all-items'>
        {allItemJsx && allItemJsx}
      </ul>
    </div>
  )
}

export default AllItemsPage