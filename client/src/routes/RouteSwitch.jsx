import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddItemPage from "../views/AddItemPage";
import AllAvailableItems from "../views/AllAvailableItems";
import AllItemsPage from "../views/AllItemsPage";
import CategoriesCatalog from "../views/CategoriesCatalog";
import CategoryPage from "../views/CategoryPage";
import CreateCategory from "../views/CreateCategory";
import Homepage from "../views/Homepage";
import ItemPage from "../views/ItemPage";
import ItemPageCatalog from "../views/ItemPageCatalog";

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
          <Route
            path="/"
            element={<Navigate to={"./Inventory_Application"} />}
          />
          <Route
            path="/Inventory_Application"
            element={<Homepage backendData={backendData} />}
          />
          <Route
            path="/Inventory_Application/addItem"
            element={<AddItemPage setInventoryList={setInventoryList} />}
          />
          <Route
            path="/Inventory_Application/allItems"
            element={<AllItemsPage backendData={backendData} />}
          />
          <Route
            path="/Inventory_Application/item/:id"
            element={<ItemPageCatalog backendData={backendData} />}
          />
          <Route
            path="/Inventory_Application/catalog/:id"
            element={<ItemPage backendData={backendData} />}
          />
          <Route
            path="/Inventory_Application/catalog/categories"
            element={<CategoriesCatalog backendData={backendData} />}
          />
          <Route
            path="/Inventory_Application/catalog/category/:id"
            element={<CategoryPage backendData={backendData} />}
          />
          <Route
            path="/Inventory_Application/availableItems"
            element={<AllAvailableItems backendData={backendData} />}
          />
          <Route 
          path="/Inventory_Application/category/create"
          element={<CreateCategory/>} /
          >
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouteSwitch