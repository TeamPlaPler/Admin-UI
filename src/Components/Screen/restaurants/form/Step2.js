import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select, Button } from "antd";
import "react-quill/dist/quill.snow.css";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import {
  getActiveOrderTypes,
  getActiveRestaurantTypes,
} from "../CommonService";
import { failedNotification } from "../../../ReusableComp/Notifications";
import TextArea from "antd/es/input/TextArea";

const Step2 = ({ onDataUpdate, formData, goNext }) => {
  const [localFormData, setLocalFormData] = useState({
    pointOfContact: formData.pointOfContact || "",
    phoneNumber: formData.phoneNumber || "",
    timings: formData.timings || "",
    restaurantType: formData.restaurantType || [],
    orderType: formData.orderType || [],
  });

  useEffect(() => {
    onDataUpdate(localFormData);
  }, [localFormData]);

  const [restaurantTyes, setRestaurantTyes] = useState([]);
  const [orderTyes, setOrderTyes] = useState([]);

  const inputChanged = (e, inputField) => {
    setLocalFormData({
      ...localFormData,
      [inputField]: e.target.value,
    });
  };
  const onFinish = () => {
    goNext();
  };

  const handleChange = (value, inputField) => {
    console.log(`selected ${value}`);
    setLocalFormData({
      ...localFormData,
      [inputField]: value,
    });
  };

  useEffect(() => {
    getActiveRestaurantTypes()
      .then((data) => {
        if (Object.keys(data.data).length > 0) {
          let options = data.data.map((type) => {
            return {
              label: type.title,
              value: type._id,
            };
          });
          setRestaurantTyes(options);
        }
      })
      .catch((error) => {
        failedNotification(
          "something went wrong..! [getActiveRestaurantTypes] "
        );
      });
    getActiveOrderTypes()
      .then((data) => {
        if (Object.keys(data.data).length > 0) {
          let options = data.data.map((type) => {
            return {
              label: type.title,
              value: type._id,
            };
          });
          setOrderTyes(options);
        }
      })
      .catch((error) => {
        failedNotification("something went wrong..! [getActiveOrderTypes] ");
      });
  }, []);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          initialValues={{
            pointOfContact: formData.pointOfContact || "",
            phoneNumber: formData.phoneNumber || "",
            timings: formData.timings || "",
            restaurantType: formData.restaurantType || [],
            orderType: formData.orderType || [],
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="pointOfContact"
                label="Point of contact"
                rules={[
                  {
                    required: true,
                    message: "Please enter POC",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter Point Of Contact"
                  prefix={<UserOutlined />}
                  onChange={(e) => {
                    inputChanged(e, "pointOfContact");
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone number"
                rules={[
                  {
                    required: true,
                    message: "Please enter Phone number",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter phone number"
                  prefix={<PhoneOutlined />}
                  onChange={(e) => {
                    inputChanged(e, "phoneNumber");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="restaurantType"
                label="Restaurant Type"
                rules={[
                  {
                    required: true,
                    message: "Please enter Restaurant Type",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select Restaurant Types"
                  // defaultValue={formData.restaurantType || []}
                  onChange={(value) => {
                    handleChange(value, "restaurantType");
                  }}
                  options={restaurantTyes}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="orderType"
                label="Order Type"
                rules={[
                  {
                    required: true,
                    message: "Please enter Order Types",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select Order Typs"
                  // defaultValue={formData.orderType || []}
                  onChange={(value) => {
                    handleChange(value, "orderType");
                  }}
                  options={orderTyes}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="timings"
                label="Restaurant Timings"
                rules={[
                  {
                    required: true,
                    message: "Please enter Restaurant timings",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Please enter Restaurant Timings"
                  onChange={(e) => {
                    inputChanged(e, "timings");
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="restaurantImages"
                label="upload Restaurant Images"
                rules={[
                  {
                    required: false,
                    message: "Please upload restorent images",
                  },
                ]}
              >
                <input type="file" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Next
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
export default Step2;
