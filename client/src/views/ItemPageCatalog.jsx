import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Aside from "../components/Aside";
import styles from "./ItemPageCatalog.module.css";

function ItemPageCatalog(props) {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [otherSKUs, setOtherSKUs] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  
  React.useEffect(() => {
    let otherItemArr = []
    let item = props.backendData?.find((item) => item._id === id);
    //looking for other SKUs
    props.backendData?.forEach(i => {
      if (i.name === item.name && i._id !== item._id){ 
        otherItemArr.push(i)
      }
    })
    setOtherSKUs(otherItemArr.map(item => createOtherSKUSJSX(item)));
    setSelectedItem(item);
    setIsLoading(false);
  }, [props.backendData, id]);

  const handleCategoryClick = (category) => {
    navigate(`../Inventory_Application/catalog/category/${category}`);
  };
  
  const handleItemIdClick = (id) => {
  navigate(`../Inventory_Application/catalog/${id}`);
};

  const createOtherSKUSJSX = (item) => {
    return (
        <p key={item._id}>
          ID:
          <button
            className="button_link"
            onClick={() => handleItemIdClick(item._id)}
          >
            {item._id}
          </button>
          {item.condition} ${item.price}
        </p>
    );
  }

  const createItemJSX = (item) => {
    return (
      <div key={item._id} className={styles.create_item_jsx_container}>
        <h1>{item.name}</h1>
        <p>
          Category:
          <button
            className="button_link"
            onClick={() => handleCategoryClick(item.category)}
          >
            {item.category}
          </button>
        </p>
        <p>{item.description}</p>
        <p>{item.releaseDate}</p>
        <h2>Available SKUs</h2>
        <hr />
        <p>
          ID:{" "}
          <button
            className="button_link"
            onClick={() => handleItemIdClick(item._id)}
          >
            {item._id}
          </button>{" "}
          {item.condition} ${item.price}
        </p>
        {otherSKUs ?? null}
        <hr />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (selectedItem) {
    const item = createItemJSX(selectedItem);
    return (
    <div className="main--container">
      <Aside />
      <div className="slight_padding">
      {item}
      </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Item not found</h1>
      </div>
    );
  }
}

export default ItemPageCatalog;
