import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import React, { useEffect, useState } from "react";
import {
  UsergroupAddOutlined,
  PieChartOutlined,
  UserOutlined,
  ShopOutlined,
  SendOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Home from "./Home";
import Users from "./Users";
import ManageBlogPost from "./Screen/Blog/ManageBlogPost";
import ManageFAQ from "./Screen/FAQ/ManageFAQ";
import ManagerestaurantTypes from "./Screen/restaurantTypes/ManageRestaurantTypes";
import ManageorderTypes from "./Screen/orderTypes/ManageOrderTypes";
import Manageplans from "./Screen/plans/ManagePlans";
import ManageFoodTypes from "./Screen/foodTypes/ManageFoodTypes";
import Managerestaurants from "./Screen/restaurants/ManageRestaurants";
import ViewRestaurants from "./Screen/restaurants/ViewRestaurants";

const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Welcome", "1", <PieChartOutlined />),
  getItem("Restaurants", "2", <ShopOutlined />),
  // getItem("3D models", "4", <CodeSandboxOutlined />),
  getItem("Manage blog", "3", <FileDoneOutlined />),
  // getItem("feedback", "6", <SendOutlined />),
  getItem("faq", "4", <SendOutlined />),
  getItem("Categories", "sub1", <AppstoreOutlined />, [
    getItem("Restaurant Types", "5"),
    getItem("Order Types", "6"),
    getItem("Plans", "7"),
    getItem("Food Types", "8"),
  ]),
  getItem("Users", "18", <UsergroupAddOutlined />),
  getItem("my profile", "19", <UserOutlined />),
];

const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [redirectLink, setRedirectLink] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(["1"]);

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const onClick = (e) => {
    console.log("click", e);
    setRedirect(false);

    if (e.key === "1") {
      setRedirectLink("/");
    }
    if (e.key === "2") {
      setRedirectLink("/Managerestaurants");
    }
    if (e.key === "8") {
      setRedirectLink("/users");
    }
    if (e.key === "3") {
      setRedirectLink("/manageBlogPost");
    }
    if (e.key === "4") {
      setRedirectLink("/manageFaq");
    }
    if (e.key === "5") {
      setRedirectLink("/ManagerestaurantTypes");
    }
    if (e.key === "6") {
      setRedirectLink("/ManageorderTypes");
    }
    if (e.key === "7") {
      setRedirectLink("/Manageplans");
    }
    if (e.key === "8") {
      setRedirectLink("/ManageFoodTypes");
    }
  };

  useEffect(() => {
    console.log("Current route name:", window.location.href);

    if (window.location.href.includes("/users")) {
      setSelectedMenu(["2"]);
    } else {
      setSelectedMenu(["1"]);
    }
  }, []);

  useEffect(() => {
    if (redirectLink.length > 0) {
      setRedirect(true);
    }
  }, [redirectLink]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {!collapsed ? (
          <div className="demo-logo-vertical">
            <img
              alt="logo"
              style={{
                width: "180px",
                height: "100px",
                direction: "flex",
                margin: "auto",
              }}
              src="/logo.png"
            />
          </div>
        ) : (
          <div className="demo-logo-vertical">
            <img
              alt="logo"
              style={{
                width: "80px",
                height: "100px",
                direction: "flex",
                margin: "auto",
              }}
              src="/logo.png"
            />
          </div>
        )}
        <Menu
          theme="dark"
          defaultSelectedKeys={selectedMenu}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Router>
            {redirect && <Navigate to={redirectLink} />}
            <Routes>
              <Route exact path="/" element={<Home key={"home"} />} />
              <Route exact path="/users" element={<Users key={"users"} />} />
              <Route
                exact
                path="/manageBlogPost"
                element={<ManageBlogPost key={"manageBlogPost"} />}
              />
              <Route
                exact
                path="/Managerestaurants"
                element={<Managerestaurants key={"Managerestaurants"} />}
              />
              <Route
                exact
                path="/manageFaq"
                element={<ManageFAQ key={"manageFAQ"} />}
              />
              <Route
                exact
                path="/ManagerestaurantTypes"
                element={
                  <ManagerestaurantTypes key={"ManagerestaurantTypes"} />
                }
              />
              <Route
                exact
                path="/ManageorderTypes"
                element={<ManageorderTypes key={"ManageorderTypes"} />}
              />
              <Route
                exact
                path="/Manageplans"
                element={<Manageplans key={"Manageplans"} />}
              />
              <Route
                exact
                path="/ManageFoodTypes"
                element={<ManageFoodTypes key={"ManageFoodTypes"} />}
              />

              <Route
                path="ManagerestaurantTypes/viewRestorent/:id"
                element={<ViewRestaurants key={"viewRestorent"} />}
              />
            </Routes>
          </Router>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          PlaPer @{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Navigation;
