import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Spin, Switch } from "antd";
import "react-quill/dist/quill.snow.css";
import {
  postrestaurantTypesData,
  putrestaurantTypes,
} from "./RestaurantTypesService";
import {
  failedNotification,
  successNotification,
} from "../../ReusableComp/Notifications";
import TextArea from "antd/es/input/TextArea";

const RestaurantTypesForm = (props) => {
  const [isEdit] = useState(props.isEdit);
  const [loading, setLoading] = useState(false);

  const onFinish = (value) => {
    setLoading(true);

    if (isEdit) {
      let payLoad = {
        createdBy: "jaya krishna ",
        createdAt: "2014-12-24 23:12:00",
        updatedBy: "jashwant ",
        updatedAt: "2014-12-24 23:12:00",
      };

      putrestaurantTypes(props.formData._id, {
        ...value,
        ...payLoad,
        _id: props.formData._id,
      })
        .then((data) => {
          setLoading(false);
          successNotification("Data updated for " + value.title);
          props.closeDrawer();
        })
        .catch((error) => {
          // alert("sometihing went wrong..!");
          failedNotification(error);
          setLoading(false);
        });
    } else {
      let payLoad = {
        createdBy: "jaya krishna ",
        createdAt: "2014-12-24 23:12:00",
        updatedBy: "",
        updatedAt: "",
      };

      postrestaurantTypesData({
        ...value,
        ...payLoad,
      })
        .then((data) => {
          setLoading(false);
          successNotification("Form submitted for " + value.title);
          props.closeDrawer();
        })
        .catch((error) => {
          // alert("sometihing went wrong..!");
          failedNotification(error);
          setLoading(false);
        });
    }
  };
  const onFinishFailed = () => {
    failedNotification("Fill all required fileds ");
  };

  return (
    <>
      <Spin spinning={loading} delay={500}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            title: props.formData.title || "",
            isActive: props.formData.isActive || false,
            desc: props.formData.desc || "",
            logo: props.formData.logo || "",
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
                <Input placeholder="Please enter Title" />
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
          </Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Spin>
    </>
  );
};
export default RestaurantTypesForm;
