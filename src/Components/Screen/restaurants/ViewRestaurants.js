import { Col, Row, Tooltip } from "antd";
import React from "react";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const ViewRestaurants = ({ props }) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={24} style={{ display: "flex", gap: "20px" }}>
          {props.isActive ? (
            <Tooltip title="This restaurants is active ">
              <CheckCircleFilled style={{ fontSize: "30px", color: "green" }} />
            </Tooltip>
          ) : (
            <Tooltip title="This restaurants is inactive ">
              <CloseCircleFilled style={{ fontSize: "30px", color: "red" }} />
            </Tooltip>
          )}{" "}
          <h1>{props.title} </h1>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <div className="restaurant-details-item">
            <strong>Title:</strong> {props.title}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className="restaurant-details-item">
            <strong>Sub Title:</strong> {props.subTitle}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className="restaurant-details-item">
            <strong>Phone Number:</strong> {props.phoneNumber}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className="restaurant-details-item">
            <strong>Email:</strong> {props.email}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Restaurant Type:</strong>{" "}
            {props.restaurantTypeValue.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Order Type:</strong>{" "}
            {props.orderTypeValue.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className="restaurant-details-item">
            <strong>Restaurant Logo:</strong> {props.restaurantLogo}
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className="restaurant-details-item">
            <strong>Plan:</strong> {props.plan}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Payment Info:</strong> {props.paymentInfo}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Website Link:</strong> {props.websiteLink}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Additional Docs:</strong>{" "}
            {props.additionalDocs.map((doc) => (
              <span key={doc}>{doc}</span>
            ))}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Address:</strong> {props.address}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Postal Code:</strong> {props.postalCode}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Active:</strong> {props.isActive ? "Yes" : "No"}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Point of Contact:</strong> {props.pointOfContact}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Timings:</strong> {props.timings}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Established:</strong> {props.established}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Additional Info:</strong> {props.additionalInfo}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Sub Domain:</strong> {props.subDomain}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Created By:</strong> {props.createdBy}
          </div>
        </Col>
        <Col xs={24}>
          <div className="restaurant-details-item">
            <strong>Created At:</strong> {props.createdAt}
          </div>
        </Col>
      </Row>

      {/* 
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
      </Row> */}
    </>
  );
};
export default ViewRestaurants;
