import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select, Upload, Image } from "antd";
import "react-quill/dist/quill.snow.css";
import TextArea from "antd/es/input/TextArea";
import { ShopOutlined, PlusOutlined } from "@ant-design/icons";
import { getActivePlansTypes } from "../CommonService";
import { failedNotification } from "../../../ReusableComp/Notifications";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Step3 = (props) => {
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
    // {
    //   uid: "-2",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-3",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-4",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-xxx",
    //   percent: 50,
    //   name: "image.png",
    //   status: "uploading",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-5",
    //   name: "image.png",
    //   status: "error",
    // },
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
                  // defaultValue={['a10', 'c12']}
                  onChange={handleChange}
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
                <TextArea rows={3} placeholder="Please enter Payment Info" />
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
                <TextArea rows={3} placeholder="Please enter Additional Info" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="additionalDocs"
                label="Additional Docs"
                rules={[
                  {
                    required: true,
                    message: "Please provide Additional Docs",
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
export default Step3;
