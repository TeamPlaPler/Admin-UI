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
import { postrestaurantsData, putrestaurants } from "./RestaurantsService";
import {
  failedNotification,
  successNotification,
} from "../../ReusableComp/Notifications";
import TextArea from "antd/es/input/TextArea";
import Step1 from "./form/Step1";
import Step2 from "./form/Step2";
import Step3 from "./form/Step3";

const RestaurantsForm = (props) => {
  const [isEdit] = useState(props.isEdit);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      title: "First",
      content: <Step1 />,
    },
    {
      title: "Second",
      content: <Step2 />,
    },
    {
      title: "Last",
      content: <Step3 />,
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const onFinish = (value) => {
    setLoading(true);

    if (isEdit) {
      let payLoad = {
        createdBy: "jaya krishna ",
        createdAt: "2014-12-24 23:12:00",
        updatedBy: "jashwant ",
        updatedAt: "2014-12-24 23:12:00",
      };

      putrestaurants(props.formData._id, {
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

      postrestaurantsData({
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
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>

      {/* <Spin spinning={loading} delay={500}>
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
      </Spin> */}
    </>
  );
};
export default RestaurantsForm;
