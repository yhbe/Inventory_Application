import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Aside from '../components/Aside';

function AllAvailableItems(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [availableItems, setAvailableItems] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();


  React.useEffect(() => {
    const availableList = []
    props.backendData?.filter(item => {
      if (new Date().toISOString().split("T")[0] >= item.releaseDate){
        availableList.push(item)
      }
    })
    setIsLoading(false)
    setAvailableItems(availableList)
  }, []);

  const handleItemClick = (id) => {
    navigate(`../Inventory_Application/item/${id}`);
  };

  const createItemJSX = (item) => {
    return (
      <div key={item._id}>
        <button
          onClick={() => handleItemClick(item._id)}
          className="button_link"
        >
          {item.name}
        </button>
        <br />
        <br />
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <h1>...Loading</h1>
      </>
    );
  }

  if (availableItems){
    const itemList = availableItems.map(item => createItemJSX(item))
    return (
      <div className='main--container'>
        <Aside />
        <div className='slight_padding'>
      {itemList}
        </div>
      </div>
    )
  } else return (
    <>
    <h1>No item founds</h1>
    </>
  )



}

export default AllAvailableItems