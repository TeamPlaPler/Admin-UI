import { Col, Divider, Flex, Row, Tag, Tooltip } from "antd";
import React from "react";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const ViewBlog = ({ props }) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={24} style={{ display: "flex", gap: "20px" }}>
          {props.isActive ? (
            <Tooltip title="This blog is active ">
              <CheckCircleFilled style={{ fontSize: "30px", color: "green" }} />
            </Tooltip>
          ) : (
            <Tooltip title="This blog is inactive ">
              <CloseCircleFilled style={{ fontSize: "30px", color: "red" }} />
            </Tooltip>
          )}{" "}
          <h1>{props.title} </h1>
        </Col>
      </Row>
      <Row gutter={16}>
        {/* <Col span={10}>images</Col> */}
        <Col span={24}>
          <Flex gap="4px 0" wrap="wrap">
            {props.tags.map((tag, i) => {
              let colors = ["volcano", "geekblue"];
              return (
                <Tag color={colors[i % 2]} key={i}>
                  {tag}
                </Tag>
              );
            })}
          </Flex>
        </Col>
      </Row>

      <Divider orientation="left" plain>
        HTML content
      </Divider>

      <Row gutter={16}>
        <Col span={24}>
          <div style={{ border: "2px solid #8b8282" }}>
            <div dangerouslySetInnerHTML={{ __html: props.blogContent }} />
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}> Display auther : {props.auther}</Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <div>Added by : {props.createdBy}</div>
        </Col>
        <Col span={12}>
          <div>Added at : {props.createdAt}</div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <div>Updated by : {props.updatedBy}</div>
        </Col>
        <Col span={12}>
          <div>Added at : {props.updatedAt}</div>
        </Col>
      </Row>
    </>
  );
};
export default ViewBlog;
