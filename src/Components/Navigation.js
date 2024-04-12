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
  ScheduleOutlined,
  CodeSandboxOutlined,
  SendOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Home from "./Home";
import Users from "./Users";
import ManageBlogPost from "./Screen/Blog/ManageBlogPost";

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
  getItem("Users", "2", <UsergroupAddOutlined />),
  getItem("Restaurants", "3", <ScheduleOutlined />),
  getItem("3D models", "4", <CodeSandboxOutlined />),
  getItem("Manage blog", "5", <FileDoneOutlined />),
  {
    type: "divider",
  },
  getItem("feedback", "6", <SendOutlined />),
  getItem("my profile", "7", <UserOutlined />),
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
      setRedirectLink("/users");
    }
    if (e.key === "5") {
      setRedirectLink("/manageBlogPost");
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
              src="./logo.png"
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
              src="./logo.png"
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
              {/* <Route exact path="/abcd" element={<Home key={"home"} />  } />   */}
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
