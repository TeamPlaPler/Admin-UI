import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UsergroupAddOutlined,
  PieChartOutlined,
  UserOutlined,
  ShopOutlined,
  SendOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

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
  getItem("Logout", "20", <PoweroffOutlined />),
];

const Navigation = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(["1"]);

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const onClick = (e) => {
    console.log("click", e);
    setRedirect(false);

    if (e.key === "1") {
      navigate("/dashboard/home");
    }
    if (e.key === "2") {
      navigate("/dashboard/Managerestaurants");
    }
    if (e.key === "8") {
      navigate("/dashboard/users");
    }
    if (e.key === "3") {
      navigate("/dashboard/manageBlogPost");
    }
    if (e.key === "4") {
      navigate("/dashboard/manageFaq");
    }
    if (e.key === "5") {
      navigate("/dashboard/ManagerestaurantTypes");
    }
    if (e.key === "6") {
      navigate("/dashboard/ManageorderTypes");
    }
    if (e.key === "7") {
      navigate("/dashboard/Manageplans");
    }
    if (e.key === "8") {
      navigate("/dashboard/ManageFoodTypes");
    }
    if (e.key === "20") {
      navigate("/");
    }
  };

  useEffect(() => {
    // console.log("Current route name:", window.location.href);

    if (window.location.href.includes("/users")) {
      //   setSelectedMenu(["2"]);
      // } else {
      setSelectedMenu(["1"]);
    }
  }, []);

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
          <Outlet />
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
