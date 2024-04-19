import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Spin, Switch } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postFAQData, putFAQ } from "./FAQService";
import {
  failedNotification,
  successNotification,
} from "../../ReusableComp/Notifications";

const FAQForm = (props) => {
  const [isEdit] = useState(props.isEdit);
  const [loading, setLoading] = useState(false);

  const [FAQContent, setFAQContent] = useState(props.formData.answer || "");

  const RichTextUpdate = (data) => {
    setFAQContent(data);
  };

  const onFinish = (value) => {
    if (FAQContent.length > 0) {
      setLoading(true);

      if (isEdit) {
        let payLoad = {
          createdBy: "jaya krishna ",
          createdAt: "2014-12-24 23:12:00",
          updatedBy: "jashwant ",
          updatedAt: "2014-12-24 23:12:00",
        };

        putFAQ(props.formData._id, {
          ...value,
          ...payLoad,
          answer: FAQContent,
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
          });
      } else {
        let payLoad = {
          createdBy: "jaya krishna ",
          createdAt: "2014-12-24 23:12:00",
          updatedBy: "",
          updatedAt: "",
        };

        postFAQData({ ...value, ...payLoad, answer: FAQContent })
          .then((data) => {
            setLoading(false);
            successNotification("Form submitted for " + value.title);
            props.closeDrawer();
          })
          .catch((error) => {
            // alert("sometihing went wrong..!");
            failedNotification(error);
          });
      }
    } else {
      failedNotification("Fill all required fileds ");
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
                label="Answer "
                rules={[
                  {
                    required: true,
                    message: "Please enter Answer for question ",
                  },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  value={FAQContent}
                  onChange={RichTextUpdate}
                />
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
export default FAQForm;
