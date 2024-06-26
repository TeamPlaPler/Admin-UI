import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Divider,
  Drawer,
  Flex,
  Skeleton,
  Space,
  theme,
} from "antd";
import AntTable from "../../ReusableComp/AntTable";
import restaurantsTableConfig from "./RestaurantsTableConfig";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import {
  failedNotification,
  infoNotification,
  successNotification,
} from "../../ReusableComp/Notifications";
import { deleterestaurants, getAllrestaurantsinfo } from "./RestaurantsService";
import ViewRestaurants from "./ViewRestaurants";
import RestaurantsForm from "./RestaurantsForm";
import {
  getActiveOrderTypes,
  getActivePlansTypes,
  getActiveRestaurantTypes,
} from "./CommonService";

function Managerestaurants() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const tableConfig = restaurantsTableConfig;
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [addEditView, setAddEditView] = useState(false);

  const [restaurantsdata, setrestaurantsData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");

  const [restaurantTyes, setRestaurantTyes] = useState([]);
  const [orderTypes, setorderTypes] = useState([]);
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTypesData();
  }, []);

  useEffect(() => {
    if (
      restaurantTyes.length > 0 &&
      orderTypes.length > 0 &&
      plans.length > 0
    ) {
      getDataFromAPI();
    }
  }, [restaurantTyes, orderTypes, plans]);

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

  const getDataFromAPI = () => {
    getAllrestaurantsinfo()
      .then((data) => {
        infoNotification("API Health is good ");
        if (Object.keys(data.data).length > 0) {
          let tableData = data.data;

          tableData = tableData.map((row) => {
            let restaurantTypeValue = getRestaurantType(row.restaurantType);
            let orderTypeValue = getOrderType(row.orderType);
            let planValue = getSelectedPlan(row.plan);

            return {
              ...row,
              restaurantTypeValue: restaurantTypeValue,
              orderTypeValue: orderTypeValue,
              planValue: planValue,
            };
          });

          setrestaurantsData(tableData);
          setIsDataLoaded(false);
        }
      })
      .catch((error) => {
        // alert("sometihing went wrong..!");
        failedNotification("something went wrong..! MR-05");
      });
  };

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

  useEffect(() => {
    setIsDataLoaded(true);
  }, [isDataLoaded]);

  const newItem = () => {
    setDrawerTitle("Add Restaurant  info");
    setFormData({});
    setOpen(true);
    setAddEditView(true);
    setIsEdit(false);
  };
  const onClose = () => {
    setOpen(false);
    setIsDataLoaded(true);
    getDataFromAPI();
    setIsDataLoaded(false);
    setAddEditView(false);
    setOpenView(false);
  };

  const editrestaurants = (record) => {
    setDrawerTitle("Edit Restaurant  info");
    setFormData(record);
    setIsEdit(true);
    setOpen(true);
    setAddEditView(true);
  };
  const deleteThisRecord = (record) => {
    deleterestaurants(record._id)
      .then(() => {
        successNotification("restaurants deleted : " + record.title);
        setIsDataLoaded(true);
        getDataFromAPI();
        setIsDataLoaded(false);
      })
      .catch((error) => {
        // alert("sometihing went wrong..!");
        failedNotification(error);
      });
  };

  const viewRecord = (record) => {
    setDrawerTitle("View Restaurant  info  of " + record.title);

    navigate(`/dashboard/Managerestaurants/viewRestorent/${record._id}`);

    setFormData(record);
    setOpen(true);
    setOpenView(true);
  };
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[{ title: "Home" }, { title: "Manage restaurants page" }]}
      />
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Divider orientation="left">
          <Flex gap="small" style={{ display: "flex", alignItems: "center" }}>
            <h2>Manage Restaurant Page </h2>
            <Divider type="vertical" />
            <Button
              type="primary"
              onClick={newItem}
              icon={<PlusCircleOutlined />}
              size="large"
            >
              Add new
            </Button>
          </Flex>
        </Divider>

        {isDataLoaded ? (
          <AntTable
            tableData={restaurantsdata}
            columnConfig={tableConfig}
            editThisRecord={editrestaurants}
            viewRecord={viewRecord}
            deleteThisRecord={deleteThisRecord}
          />
        ) : (
          <Skeleton active={true} />
        )}

        <Drawer
          key={"addrestaurants"}
          title={drawerTitle}
          placement="right"
          // size={"large"}
          width={1200}
          onClose={onClose}
          open={open}
          maskClosable={false}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          {addEditView && (
            <RestaurantsForm
              closeDrawer={onClose}
              formData={formData}
              isEdit={isEdit}
              key="form"
            />
          )}
          {openView && <ViewRestaurants props={formData} />}
        </Drawer>
      </div>
    </>
  );
}

export default Managerestaurants;
