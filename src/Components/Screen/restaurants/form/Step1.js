import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Steps,
  Switch,
  theme,
  message,
} from "antd";
import "react-quill/dist/quill.snow.css";
import TextArea from "antd/es/input/TextArea";
import {
  LinkOutlined,
  CrownOutlined,
  GlobalOutlined,
  MailOutlined,
  StarOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const Step1 = (props) => {
  return (
    <>
      <div style={{ padding: "20px" }}>
        <Form
          layout="vertical"
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          // initialValues={{
          //   title: props.formData.title || "",
          //   isActive: props.formData.isActive || false,
          //   desc: props.formData.desc || "",
          //   logo: props.formData.logo || "",
          // }}
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
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
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
                <Input placeholder="Please enter Sub title" />
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
                <Input placeholder="Established" prefix={<StarOutlined />} />
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
                />
              </Form.Item>
            </Col>
          </Row>

          {/* <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="desc"
              label="desc"
              rules={[
                {
                  required: true,
                  message: "Please enter desc",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Please enter description" />
            </Form.Item>
          </Col>
        </Row> */}
          {/* <Button type="primary" htmlType="submit">
            Submit
          </Button> */}
        </Form>
      </div>
    </>
  );
};
export default Step1;
