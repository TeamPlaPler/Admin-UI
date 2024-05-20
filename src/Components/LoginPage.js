import React from "react";
import { Card, Flex } from "antd";
import LoginForm from "./LoginForm";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const cardStyle = {
  width: 600,
};
const imgStyle = {
  display: "block",
  width: 300,
};
function Login() {
  return (
    <>
      <Fireworks autorun={{ speed: 0.5 }} />
      <Flex style={{ height: "100vh" }} justify={"center"} align={"center"}>
        <Card
          hoverable
          style={cardStyle}
          styles={{
            body: {
              padding: 0,
              overflow: "hidden",
            },
          }}
        >
          <Flex justify={"space-between"}>
            <img
              alt="avatar"
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              style={imgStyle}
            />
            <Flex
              vertical
              justify="center"
              style={{
                padding: 35,
              }}
            >
              <LoginForm />
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}

export default Login;
