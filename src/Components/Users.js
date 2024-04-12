import React from "react";
import { Breadcrumb, theme } from 'antd';

function Users() {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

  return (

    <><Breadcrumb
          style={{
              margin: '16px 0',
          }}
      >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb><div
          style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
          }}
      >
            <h1>3D Model Users </h1>          </div>
    </>
    
  );
}

export default Users;
