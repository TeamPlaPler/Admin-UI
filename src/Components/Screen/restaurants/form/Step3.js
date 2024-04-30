import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select, Button } from "antd";
import "react-quill/dist/quill.snow.css";
import TextArea from "antd/es/input/TextArea";
import { ShopOutlined } from "@ant-design/icons";
import { getActivePlansTypes } from "../CommonService";
import { failedNotification } from "../../../ReusableComp/Notifications";

const Step3 = ({ onDataUpdate, formData, goNext }) => {
  const [localFormData, setLocalFormData] = useState({
    paymentInfo: formData.paymentInfo || "",
    address: formData.address || "",
    postalCode: formData.postalCode || "",
    additionalInfo: formData.additionalInfo || "",
    plan: formData.plan || "",
    additionalDocs: [],
  });

  useEffect(() => {
    onDataUpdate(localFormData);
  }, [localFormData]);

  const onFinish = () => {
    goNext();
  };
  const inputChanged = (e, inputField) => {
    setLocalFormData({
      ...localFormData,
      [inputField]: e.target.value,
    });
  };
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getActivePlansTypes()
      .then((data) => {
        if (Object.keys(data.data).length > 0) {
          let options = data.data.map((type) => {
            return {
              label: type.title,
              value: type._id,
            };
          });
          setPlans(options);
        }
      })
      .catch((error) => {
        failedNotification("something went wrong..! [getActivePlansTypes] ");
      });
  }, []);

  const handleChange = (value, inputField) => {
    console.log(`selected ${value}`);
    setLocalFormData({
      ...localFormData,
      [inputField]: value,
    });
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          initialValues={{
            paymentInfo: formData.paymentInfo || "",
            address: formData.address || "",
            postalCode: formData.postalCode || "",
            additionalInfo: formData.additionalInfo || "",
            plan: formData.plan || "",
            additionalDocs: [],
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="plan"
                label="plan"
                rules={[
                  {
                    required: true,
                    message: "Please enter Plan",
                  },
                ]}
              >
                <Select
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select Plan"
                  onChange={(value) => {
                    handleChange(value, "plan");
                  }}
                  options={plans}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentInfo"
                label="Payment Info"
                rules={[
                  {
                    required: true,
                    message: "Please enter Payment Info",
                  },
                ]}
              >
                <TextArea
                  rows={3}
                  placeholder="Please enter Payment Info"
                  onChange={(e) => {
                    inputChanged(e, "paymentInfo");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter address",
                  },
                ]}
              >
                <TextArea
                  rows={3}
                  placeholder="Please enter Restorent Address"
                  onChange={(e) => {
                    inputChanged(e, "address");
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="postalCode"
                label="Restaurant Postal Code"
                rules={[
                  {
                    required: true,
                    message: "Please enter Restaurant Postal Code",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter Restaurant Postal Code"
                  prefix={<ShopOutlined />}
                  onChange={(e) => {
                    inputChanged(e, "postalCode");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="additionalInfo"
                label="Additional Info"
                rules={[
                  {
                    required: true,
                    message: "Please enter Additional Info",
                  },
                ]}
              >
                <TextArea
                  rows={3}
                  placeholder="Please enter Additional Info"
                  onChange={(e) => {
                    inputChanged(e, "additionalInfo");
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="additionalDocs"
                label="Additional Docs"
                rules={[
                  {
                    required: false,
                    message: "Please provide Additional Docs",
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
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
export default Step3;
