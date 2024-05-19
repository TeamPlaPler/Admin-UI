import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Flex,
  Row,
  Skeleton,
  Switch,
  Tag,
  Tooltip,
} from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  PhoneOutlined,
  MailOutlined,
  LikeOutlined,
  LinkOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { geteRestaurantByid } from "./RestaurantsService";
import {
  failedNotification,
  infoNotification,
} from "../../ReusableComp/Notifications";
import {
  getActiveOrderTypes,
  getActivePlansTypes,
  getActiveRestaurantTypes,
} from "./CommonService";

const ViewRestaurants = () => {
  const { id } = useParams();

  const [restorentInfo, setRestorentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [restaurantTyes, setRestaurantTyes] = useState([]);
  const [orderTypes, setorderTypes] = useState([]);
  const [plans, setPlans] = useState([]);

  const expandableItems = [
    {
      key: "1",
      label: "Restaurants addtional images ",
      children: <p>{"some comp "}</p>,
    },
    {
      key: "2",
      label: "Restaurants addtional Documents  ",
      children: <p>{"some docs comp "}</p>,
    },
  ];

  useEffect(() => {
    getAllTypesData();
  }, []);

  useEffect(() => {
    if (
      restaurantTyes.length > 0 &&
      orderTypes.length > 0 &&
      plans.length > 0
    ) {
      geteRestaurantByid(id)
        .then((data) => {
          infoNotification("API Health is good ");
          if (Object.keys(data.data).length > 0) {
            let info = data.data[2];

            let restaurantTypeValue = getRestaurantType(info.restaurantType);
            let orderTypeValue = getOrderType(info.orderType);
            let planValue = getSelectedPlan(info.plan);

            setRestorentInfo({
              ...info,
              restaurantTypeValue: restaurantTypeValue,
              orderTypeValue: orderTypeValue,
              planValue: planValue,
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          failedNotification("something went wrong..! MR-05");
        });
    }
  }, [restaurantTyes, orderTypes, plans]);

  const getRestaurantType = (types) => {
    let selectedRest = [];
    restaurantTyes.forEach((type) => {
      if (types.includes(type.value)) {
        selectedRest.push(type.label);
      }
    });

    return selectedRest;
  };
  const getOrderType = (types) => {
    let selectedOrder = [];
    orderTypes.forEach((type) => {
      if (types.includes(type.value)) {
        selectedOrder.push(type.label);
      }
    });

    return selectedOrder;
  };
  const getSelectedPlan = (planid) => {
    let selectedPlan = "";
    plans.forEach((plan) => {
      if (planid === plan.value) {
        selectedPlan = plan.label;
      }
    });

    return selectedPlan;
  };

  const getAllTypesData = () => {
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
        failedNotification("something went wrong..! MR-02");
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
          setorderTypes(options);
        }
      })
      .catch((error) => {
        failedNotification("something went wrong..!  MR-03 ");
      });

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
        failedNotification("something went wrong..! MR-04 ");
      });
  };

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[
          { title: "Home" },
          { title: "Manage restaurants page" },
          { title: "View restaurant" },
        ]}
      />
      {loading ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 10,
          }}
          active={true}
        />
      ) : (
        <>
          <Row gutter={16}>
            <Col
              span={5}
              style={{ display: "flex", gap: "20px", justifyContent: "left" }}
            >
              <Card
                style={{
                  width: 300,
                }}
                cover={
                  <img
                    alt="restaurantLogo"
                    height={"200px"}
                    src={restorentInfo.restaurantLogo}
                  />
                }
              >
                <div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <h3>{restorentInfo.title} </h3>{" "}
                    {restorentInfo.isActive ? (
                      <Tooltip title="This restaurants is active ">
                        <CheckCircleFilled
                          style={{ fontSize: "30px", color: "green" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="This restaurants is inactive ">
                        <CloseCircleFilled
                          style={{ fontSize: "30px", color: "red" }}
                        />
                      </Tooltip>
                    )}
                  </div>

                  <p> {restorentInfo.subTitle} </p>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <LinkOutlined />
                      <a
                        style={{ color: "blue" }}
                        href={restorentInfo.websiteLink}
                        target="_blank"
                      >
                        View
                      </a>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <LinkOutlined />
                      <a style={{ color: "blue" }} target="_blank">
                        {restorentInfo.subDomain}
                      </a>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    Established : {restorentInfo.established}
                  </div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    Addtional info : {restorentInfo.additionalInfo}
                  </div>

                  <Divider></Divider>
                </div>
              </Card>
            </Col>

            <Col span={19}>
              <Row>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <div
                    style={{
                      borderRadius: "0 0 8px 8px",
                      background: "white",
                      padding: "10px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "5px" }}>
                      <MailOutlined />
                      <p style={{ fontWeight: "bold" }}>
                        {restorentInfo.email}{" "}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: "0 0 8px 8px",
                      background: "white",
                      padding: "10px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "5px" }}>
                      <LikeOutlined />
                      <p style={{ fontWeight: "bold" }}>
                        {restorentInfo.planValue}
                        {" Plan "}
                      </p>
                    </div>
                  </div>
                  {restorentInfo.isActive ? (
                    <div
                      style={{
                        borderRadius: "0 0 8px 8px",
                        background: "white",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          marginTop: "20%",
                        }}
                      >
                        <Switch
                          checkedChildren="Active"
                          disabled={true}
                          defaultChecked
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        borderRadius: "0 0 8px 8px",
                        background: "white",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          marginTop: "20%",
                        }}
                      >
                        <Switch unCheckedChildren="Inactive" disabled={true} />
                      </div>
                    </div>
                  )}
                </div>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <div
                    style={{
                      borderRadius: "0 0 8px 8px",
                      background: "white",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        flexDirection: "column",
                      }}
                    >
                      <p style={{ fontWeight: "bold", textAlign: "center" }}>
                        Restaurant Type
                      </p>
                      {restorentInfo &&
                        restorentInfo.restaurantTypeValue &&
                        restorentInfo.restaurantTypeValue.map((type) => (
                          <span key={type}>
                            <Tag color="blue">{type}</Tag>
                          </span>
                        ))}
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: "0 0 8px 8px",
                      background: "white",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        flexDirection: "column",
                      }}
                    >
                      <p style={{ fontWeight: "bold", textAlign: "center" }}>
                        Order Type
                      </p>
                      {restorentInfo &&
                        restorentInfo.orderTypeValue &&
                        restorentInfo.orderTypeValue.map((type) => (
                          <span key={type}>
                            <Tag color="green">{type}</Tag>
                          </span>
                        ))}
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: "0 0 8px 8px",
                      background: "white",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        flexDirection: "column",
                      }}
                    >
                      <p style={{ fontWeight: "bold", textAlign: "center" }}>
                        Address
                      </p>
                      {restorentInfo && restorentInfo.address && (
                        <> {restorentInfo.address} </>
                      )}
                      <br />
                      Postal code :
                      {restorentInfo && restorentInfo.postalCode && (
                        <> {restorentInfo.postalCode} </>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: "0 0 8px 8px",
                      background: "white",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        flexDirection: "column",
                      }}
                    >
                      <p style={{ fontWeight: "bold", textAlign: "center" }}>
                        POC
                      </p>
                      <span>
                        {" "}
                        {restorentInfo && restorentInfo.pointOfContact && (
                          <> {restorentInfo.pointOfContact} </>
                        )}{" "}
                      </span>
                      <span>
                        {" "}
                        <PhoneOutlined /> :
                        {restorentInfo && restorentInfo.pointOfContact && (
                          <> {restorentInfo.phoneNumber} </>
                        )}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </Row>

              <Divider></Divider>

              <Row>
                <Col span={5}>
                  <div>
                    {" "}
                    <Flex horizontal gap={10}>
                      <p style={{ fontWeight: "bold" }}> Timings:</p>{" "}
                      <p>{restorentInfo.timings} </p>
                    </Flex>
                  </div>
                </Col>
                <Col span={5}>
                  <div>
                    {" "}
                    <Flex horizontal gap={10}>
                      <p style={{ fontWeight: "bold" }}> Payment info: </p>
                      <p> {restorentInfo.paymentInfo}</p>
                    </Flex>
                  </div>
                </Col>
                <Col span={14}>
                  <div>
                    <Collapse accordion items={expandableItems} />
                  </div>
                </Col>
              </Row>

              <Divider></Divider>

              <Row gutter={16}>
                <Col span={6}>
                  <div>Added by : {restorentInfo.createdBy}</div>
                </Col>
                <Col span={6}>
                  <div>Added : {restorentInfo.createdAt}</div>
                </Col>

                <Col span={6}>
                  <div>Updated : {restorentInfo.updatedBy}</div>
                </Col>
                <Col span={6}>
                  <div>updated at : {restorentInfo.updatedAt}</div>
                </Col>
              </Row>

              <Divider></Divider>

              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => {}}
                icon={<HeartOutlined />}
                size="large"
              >
                View/Add menu
              </Button>
            </Col>
          </Row>

          <Divider></Divider>
        </>
      )}
    </>
  );
};
export default ViewRestaurants;
