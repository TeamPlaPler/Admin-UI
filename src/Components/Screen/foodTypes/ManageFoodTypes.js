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
import foodTypesTableConfig from "./FoodTypesTableConfig";
import { PlusCircleOutlined } from "@ant-design/icons";

import {
  failedNotification,
  infoNotification,
  successNotification,
} from "../../ReusableComp/Notifications";
import { deletefoodTypes, getAllfoodTypesinfo } from "./FoodTypesService";
import ViewFoodTypes from "./ViewFoodTypes";
import FoodTypesForm from "./FoodTypesForm";

function ManageFoodTypes() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const tableConfig = foodTypesTableConfig;
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [addEditView, setAddEditView] = useState(false);

  const [foodTypesdata, setfoodTypesData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = () => {
    getAllfoodTypesinfo()
      .then((data) => {
        infoNotification("API Health is good ");
        if (Object.keys(data.data).length > 0) {
          let tableData = data.data;
          setfoodTypesData(tableData);
          setIsDataLoaded(false);
        }
      })
      .catch((error) => {
        // alert("sometihing went wrong..!");
        failedNotification("something went wrong..!");
      });
  };

  useEffect(() => {
    setIsDataLoaded(true);
  }, [isDataLoaded]);

  const newItem = () => {
    setDrawerTitle("Add Order Types info");
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

  const editfoodTypes = (record) => {
    setDrawerTitle("Edit Order Types info");
    setFormData(record);
    setIsEdit(true);
    setOpen(true);
    setAddEditView(true);
  };
  const deleteThisRecord = (record) => {
    deletefoodTypes(record._id)
      .then(() => {
        successNotification("foodTypes deleted : " + record.title);
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
    setDrawerTitle("View Order Types info  of " + record.title);
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
        items={[{ title: "Home" }, { title: "Manage foodTypes page" }]}
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
            <h2>Manage Order Types </h2>
            <Divider type="vertical" />
            <Button
              type="primary"
              onClick={newItem}
              icon={<PlusCircleOutlined />}
              size="large"
            >
              Add new Types
            </Button>
          </Flex>
        </Divider>

        {isDataLoaded ? (
          <AntTable
            tableData={foodTypesdata}
            columnConfig={tableConfig}
            editThisRecord={editfoodTypes}
            viewRecord={viewRecord}
            deleteThisRecord={deleteThisRecord}
          />
        ) : (
          <Skeleton active={true} />
        )}

        <Drawer
          key={"addfoodTypes"}
          title={drawerTitle}
          placement="right"
          // size={"large"}
          width={900}
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
            <FoodTypesForm
              closeDrawer={onClose}
              formData={formData}
              isEdit={isEdit}
              key="form"
            />
          )}
          {openView && <ViewFoodTypes props={formData} />}
        </Drawer>
      </div>
    </>
  );
}

export default ManageFoodTypes;
