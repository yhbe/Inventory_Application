import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddItemPage from "../views/AddItemPage";
import AllItemsPage from "../views/AllItemsPage";
import Homepage from "../views/Homepage";

const RouteSwitch = () => {
  const [backendData, setBackendData] = React.useState(undefined)
  const [inventory, setInventoryList] = React.useState([])

  React.useEffect(() => {
    fetch("/api")
    .then(res => res.json())
    .then(data => {
      setBackendData(data)
      setInventoryList(createInventoryList(data))
    })
    .catch((err) => console.log(err))
  },[])

  const createInventoryList = (inventory) => {
    console.log(inventory)
    return inventory.map((item) => (
      <li key={item._id}>
        <h2>{item.name}</h2>
        <p>Price: ${item.price}</p>
        <p>{item.description}</p>
      </li>
    ));
  };
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"./Inventory_Application"}/>}/>
          <Route path="/Inventory_Application" element={<Homepage backendData={backendData} />} />
          <Route path="/Inventory_Application/addItem" element={<AddItemPage setInventoryList={setInventoryList}/>} />
          <Route path="/Inventory_Application/allItems" element={<AllItemsPage backendData={backendData} />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouteSwitch