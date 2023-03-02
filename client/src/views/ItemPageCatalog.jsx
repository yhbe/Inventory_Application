import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Aside from "../components/Aside";
import styles from "./ItemPageCatalog.module.css";

function ItemPageCatalog(props) {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  
  React.useEffect(() => {
    let item = props.backendData?.find((item) => item._id === id);
    setSelectedItem(item);
    setIsLoading(false);
  }, [props.backendData, id]);

  const handleCategoryClick = (category) => {
    navigate(`../Inventory_Application/category/${category}`);
  };

  const handleItemIdClick = (id) => {
  navigate(`../Inventory_Application/catalog/${id}`);
};

  const createItemJSX = (item) => {
    return (
      <div className={styles.create_item_jsx_container}>
        <h1>{item.name}</h1>
        <p>
          Category:
          <button onClick={() => handleCategoryClick(item.category)}>
            {item.category}
          </button>
        </p>
        <p>{item.description}</p>
        <p>{item.releaseDate}</p>
        <h2>Available SKUs</h2>
        <hr />
        <p>
          ID: <button onClick={() => handleItemIdClick(item._id)} >{item._id}</button> {item.condition} ${item.price}
        </p>
        <hr />
        <button>Update Item</button>
        <button>Delete Item</button>
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
      {item}
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
