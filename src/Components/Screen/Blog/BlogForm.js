import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Space,
  Spin,
  Switch,
  Tag,
  Upload,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postBlogData, putBlogPost } from "./BlogService";
import {
  failedNotification,
  successNotification,
} from "../../ReusableComp/Notifications";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const BlogForm = (props) => {
  const [isEdit] = useState(props.isEdit);
  const [loading, setLoading] = useState(false);

  const [blogContent, setBlogContent] = useState(
    props.formData.blogContent || ""
  );

  const [newTagName, setNewTagName] = useState("");
  const [tags, setTags] = useState(props.formData.tags || []);

  const [image] = useState(
    props.formData.image || [
      "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg",
    ]
  );

  const RichTextUpdate = (data) => {
    setBlogContent(data);
  };

  const addNewTag = () => {
    let tagslist = tags;
    tagslist.push(newTagName);

    setTags(tagslist);
    setNewTagName("");
  };
  const onFinish = (value) => {
    if (blogContent.length > 0 && image.length > 0) {
      setLoading(true);

      if (isEdit) {
        let payLoad = {
          createdBy: "jaya krishna ",
          createdAt: "2014-12-24 23:12:00",
          updatedBy: "jashwant ",
          updatedAt: "2014-12-24 23:12:00",
        };

        putBlogPost(props.formData._id, {
          ...value,
          ...payLoad,
          tags,
          blogContent,
          image,
          id: props.formData._id,
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

        postBlogData({ ...value, ...payLoad, tags, blogContent, image })
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
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
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
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <>
      <Spin spinning={loading} delay={500}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            title: props.formData.title || "",
            auther: props.formData.auther || "",
            isActive: props.formData.isActive || false,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item
                name="auther"
                label="Auther"
                rules={[
                  {
                    required: true,
                    message: "Please select an auther",
                  },
                ]}
              >
                <Input placeholder="Please enter auther" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item
                name="isActive"
                valuePropName="checked"
                label="isActive"
              >
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  // checkedChildren={<CheckOutlined />}
                  // unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Image">
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
            <Col span={10}>
              <Form.Item label="Tags">
                <Flex gap="4px 0" wrap="wrap">
                  {tags.map((tag, i) => {
                    let colors = ["volcano", "geekblue"];
                    return (
                      <Tag
                        closable
                        onClose={(e) => {
                          e.preventDefault();
                          let newTags = tags;
                          newTags.splice(i, 1);
                          setTags(newTags);
                        }}
                        color={colors[i % 2]}
                        key={i}
                      >
                        {tag}
                      </Tag>
                    );
                  })}
                </Flex>
                <Divider orientation="left">Add Tags </Divider>

                <Space.Compact
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    value={newTagName}
                    onChange={(e) => {
                      setNewTagName(e.target.value);
                    }}
                    placeholder="Please enter Tag"
                  />
                  <Button onClick={addNewTag} type="primary">
                    Add
                  </Button>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Web page content "
                rules={[
                  {
                    required: true,
                    message: "please enter Web page content ",
                  },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  value={blogContent}
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
export default BlogForm;
