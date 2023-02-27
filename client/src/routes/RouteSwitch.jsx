import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../views/Homepage";

const RouteSwitch = () => {
  const [backendData, setBackendData] = React.useState(undefined)
  const [inventory, setInventoryList] = React.useState([])

  React.useEffect(() => {
    fetch("/api")
    .then(res => res.json())
    .then(data => {
      setBackendData(data)
      setInventoryList(createInventoryList(data.users))
    })
    .catch((err) => console.log(err))
  },[])

  const createInventoryList = (inventory) => {
    console.log(inventory)
    return inventory.map((item) => (
      <li key={item.id}>
        <h2>{item.title}</h2>
        <p>Price: ${item.price}</p>
        <p>{item.description}</p>
      </li>
    ));
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage inventory={inventory} />} />
          <Route path="/createItem" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouteSwitch