import React from "react";
import { Breadcrumb, Divider, theme } from "antd";

function Home() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item key={1}>Home</Breadcrumb.Item>
        <Breadcrumb.Item key={2}>Welcome</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <h1>
          {" "}
          Welcome to{" "}
          <a href="https://www.plaper.ca" target="_blank">
            plaper.ca{" "}
          </a>{" "}
          admin app
        </h1>

        <Divider dashed />

        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/fast-food-5727930-4800414.png"
          height="500px"
          width="500px"
        />
      </div>
    </>
  );
}

export default Home;
