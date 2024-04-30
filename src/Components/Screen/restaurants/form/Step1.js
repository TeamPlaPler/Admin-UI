import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Switch } from "antd";
import "react-quill/dist/quill.snow.css";
import {
  LinkOutlined,
  CrownOutlined,
  GlobalOutlined,
  MailOutlined,
  StarOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const Step1 = ({ onDataUpdate, formData, goNext }) => {
  const [localFormData, setLocalFormData] = useState({
    title: formData.title || "",
    subTitle: formData.subTitle || "",
    isActive: formData.isActive || false,
    websiteLink: formData.websiteLink || "",
    subDomain: formData.subDomain || "",
    email: formData.email || "",
    established: formData.established || "",
    restaurantLogo: formData.restaurantLogo || "",
  });

  useEffect(() => {
    onDataUpdate(localFormData);
  }, [localFormData]);

  const inputChanged = (e, inputField) => {
    if (inputField !== "isActive") {
      setLocalFormData({
        ...localFormData,
        [inputField]: e.target.value,
      });
    } else {
      setLocalFormData({
        ...localFormData,
        [inputField]: e,
      });
    }
  };
  const onFinish = () => {
    goNext();
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          initialValues={{
            title: formData.title || "",
            subTitle: formData.subTitle || "",
            isActive: formData.isActive || false,
            websiteLink: formData.websiteLink || "",
            subDomain: formData.subDomain || "",
            email: formData.email || "",
            established: formData.established || "",
            restaurantLogo: formData.restaurantLogo || "",
          }}
        >
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter Title",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter Title"
                  onChange={(e) => {
                    inputChanged(e, "title");
                  }}
                  prefix={<CrownOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="isActive"
                valuePropName="checked"
                label="isActive"
              >
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  onChange={(e) => {
                    inputChanged(e, "isActive");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="subTitle"
                label="Sub Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter Sub title",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter Sub title"
                  onChange={(e) => {
                    inputChanged(e, "subTitle");
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="websiteLink"
                label="Web Site Link"
                rules={[
                  {
                    required: true,
                    message: "Please enter websiteLink",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter Web Site Link"
                  prefix={<LinkOutlined />}
                  onChange={(e) => {
                    inputChanged(e, "websiteLink");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="subDomain"
                label="Sub Domain"
                rules={[
                  {
                    required: true,
                    message: "Please enter Sub Domain",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter Sub Domain"
                  prefix={<GlobalOutlined />}
                  onChange={(e) => {
                    inputChanged(e, "subDomain");
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter Email",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter Email"
                  prefix={<MailOutlined />}
                  onChange={(e) => {
                    inputChanged(e, "email");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="established"
                label="Established at"
                rules={[
                  {
                    required: true,
                    message: "Please enter Established",
                  },
                ]}
              >
                <Input
                  placeholder="Established"
                  prefix={<StarOutlined />}
                  onChange={(e) => {
                    inputChanged(e, "established");
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="restaurantLogo"
                label="Restaurant Logo"
                rules={[
                  {
                    required: true,
                    message: "Please enter Restaurant Logo",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter Restaurant Logo"
                  prefix={<DatabaseOutlined />}
                  onChange={(e) => {
                    inputChanged(e, "restaurantLogo");
                  }}
                />
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
export default Step1;
