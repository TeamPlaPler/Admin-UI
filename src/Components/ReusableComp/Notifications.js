import { notification } from "antd";
import {
  CheckOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export const successNotification = (msg) => {
  notification.open({
    message: "Saved successfully",
    description: "Status :" + msg,
    icon: (
      <CheckOutlined
        style={{
          color: "#00ff00",
        }}
      />
    ),
  });
};

export const failedNotification = (msg) => {
  notification.open({
    message: "Failed ",
    description: "Error : " + msg,
    icon: (
      <ExclamationCircleOutlined
        style={{
          color: "#ff0000",
        }}
      />
    ),
  });
};
export const infoNotification = (msg) => {
  notification.open({
    message: msg,
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#0000ff",
        }}
      />
    ),
  });
};
