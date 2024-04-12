import React from "react";
import { Breadcrumb, theme } from "antd";

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
        <Breadcrumb.Item key={2}>Welcoom</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <h1>3D Model home </h1>{" "}
      </div>
    </>
  );
}

export default Home;
