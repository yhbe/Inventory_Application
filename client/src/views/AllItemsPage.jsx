import React, { useState } from 'react';
import Aside from "../components/Aside";

function AllItemsPage(props) {
  const [allItemJsx, setAllItemJsx] = useState(null)
  
  React.useEffect(() => {
    if (props.backendData) {

      const uniqueItems = new Set(props.backendData.map((item) => item.name));
      
      const itemJsx = Array.from(uniqueItems).map((name) => {
        const item = props.backendData.find((item) => item.name === name);
        return (
          <li key={item._id}>
            <a href={`./item/${item._id}`}>{item.name}</a>
          </li>
        );
      });
      setAllItemJsx(itemJsx);
    }
  }, [props.backendData]);
  
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