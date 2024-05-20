import "./App.css";
import Navigation from "./Components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Users from "./Components/Users";
import ManageBlogPost from "./Components/Screen/Blog/ManageBlogPost";
import ManageFAQ from "./Components/Screen/FAQ/ManageFAQ";
import ManagerestaurantTypes from "./Components/Screen/restaurantTypes/ManageRestaurantTypes";
import ManageorderTypes from "./Components/Screen/orderTypes/ManageOrderTypes";
import Manageplans from "./Components/Screen/plans/ManagePlans";
import ManageFoodTypes from "./Components/Screen/foodTypes/ManageFoodTypes";
import Managerestaurants from "./Components/Screen/restaurants/ManageRestaurants";
import ViewRestaurants from "./Components/Screen/restaurants/ViewRestaurants";
import Login from "./Components/LoginPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login key={"login"} />} />

          <Route
            exact
            path="dashboard"
            element={<Navigation key={"Navigation"} />}
          >
            <Route path="home" element={<Home key={"home"} />} />
            <Route exact path="users" element={<Users key={"users"} />} />
            <Route
              exact
              path="manageBlogPost"
              element={<ManageBlogPost key={"manageBlogPost"} />}
            />
            <Route
              exact
              path="Managerestaurants"
              element={<Managerestaurants key={"Managerestaurants"} />}
            />
            <Route
              exact
              path="manageFaq"
              element={<ManageFAQ key={"manageFAQ"} />}
            />
            <Route
              exact
              path="ManagerestaurantTypes"
              element={<ManagerestaurantTypes key={"ManagerestaurantTypes"} />}
            />
            <Route
              exact
              path="ManageorderTypes"
              element={<ManageorderTypes key={"ManageorderTypes"} />}
            />
            <Route
              exact
              path="Manageplans"
              element={<Manageplans key={"Manageplans"} />}
            />
            <Route
              exact
              path="ManageFoodTypes"
              element={<ManageFoodTypes key={"ManageFoodTypes"} />}
            />

            <Route
              path="Managerestaurants/viewRestorent/:id"
              element={<ViewRestaurants key={"viewRestorent"} />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

{
  /* <Router>
  {redirect && <Navigate to={redirectLink} />}
  <Routes></Routes>
</Router>; */
}
