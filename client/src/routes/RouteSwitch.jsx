import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AddItemPage from "../views/AddItemPage"
import AllAvailableItems from "../views/AllAvailableItems"
import AllItemsPage from "../views/AllItemsPage"
import CategoriesCatalog from "../views/CategoriesCatalog"
import CategoryPage from "../views/CategoryPage"
import CreateCategory from "../views/CreateCategory"
import Homepage from "../views/Homepage"
import ItemInstanceCreate from "../views/ItemInstanceCreate"
import ItemPage from "../views/ItemPage"
import ItemPageCatalog from "../views/ItemPageCatalog"

const RouteSwitch = () => {
  const [backendData, setBackendData] = React.useState(undefined)
  const [backendCategories, setBackendCategories] = React.useState(undefined)
  const [inventory, setInventoryList] = React.useState([])

  React.useEffect(() => {
    fetch("https://inventory-backend-l9qt.onrender.com/api")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
        setInventoryList(createInventoryList(data));
      })
      .catch((err) => console.log(err));

    fetch("https://inventory-backend-l9qt.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        // Remove duplicates using a Set
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setBackendCategories(
          uniqueCategories.map((category) => ({ category }))
        );
      })
      .catch((err) => console.log(err));
  },[])
  
  const refreshBackendData = () => {
    fetch("https://inventory-backend-l9qt.onrender.com/api")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
        setInventoryList(createInventoryList(data));
      })
      .catch((err) => console.log(err));
  }

  const refreshBackendCategories = () => {
    fetch("https://inventory-backend-l9qt.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        // Remove duplicates using a Set
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setBackendCategories(
          uniqueCategories.map((category) => ({ category }))
        );
      })
      .catch((err) => console.log(err));
  }

  const createInventoryList = (inventory) => {
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
            element={
              <Homepage
                backendData={backendData}
                backendCategories={backendCategories}
              />
            }
          />
          <Route
            path="/Inventory_Application/addItem"
            element={
              <AddItemPage
                setInventoryList={setInventoryList}
                backendCategories={backendCategories}
              />
            }
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
            element={
              <ItemPage
                backendData={backendData}
                backendCategories={backendCategories}
                refreshBackendData={refreshBackendData}
              />
            }
          />
          <Route
            path="/Inventory_Application/catalog/categories"
            element={
              <CategoriesCatalog
                backendData={backendData}
                backendCategories={backendCategories}
              />
            }
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
            element={<CreateCategory  refreshBackendCategories={refreshBackendCategories}/>}
          />
          <Route
            path="/Inventory_Application/catalog/itemInstance/create"
            element={<ItemInstanceCreate backendData={backendData} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouteSwitch