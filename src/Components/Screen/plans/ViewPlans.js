import { Col, Divider, Flex, Row, Tag, Tooltip } from "antd";
import React from "react";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const ViewPlans = ({ props }) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={24} style={{ display: "flex", gap: "20px" }}>
          {props.isActive ? (
            <Tooltip title="This plans is active ">
              <CheckCircleFilled style={{ fontSize: "30px", color: "green" }} />
            </Tooltip>
          ) : (
            <Tooltip title="This plans is inactive ">
              <CloseCircleFilled style={{ fontSize: "30px", color: "red" }} />
            </Tooltip>
          )}{" "}
          <h1>{props.title} </h1>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>Descrition : {props.desc}</Col>
      </Row>
      <hr />
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
export default ViewPlans;
