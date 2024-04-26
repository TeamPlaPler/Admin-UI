import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select, Upload, Image } from "antd";
import "react-quill/dist/quill.snow.css";
import TextArea from "antd/es/input/TextArea";
import { UserOutlined, PhoneOutlined, PlusOutlined } from "@ant-design/icons";
import {
  getActiveOrderTypes,
  getActiveRestaurantTypes,
} from "../CommonService";
import { failedNotification } from "../../../ReusableComp/Notifications";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Step2 = (props) => {
  const [restaurantTyes, setRestaurantTyes] = useState([]);
  const [orderTyes, setOrderTyes] = useState([]);

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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  // ------------------

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },

    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

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
                  // defaultValue={['a10', 'c12']}
                  onChange={handleChange}
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
                  // defaultValue={['a10', 'c12']}
                  onChange={handleChange}
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
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
export default Step2;
