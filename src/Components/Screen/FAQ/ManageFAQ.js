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
import FAQTableConfig from "./FAQTableConfig";
import { PlusCircleOutlined } from "@ant-design/icons";
import FAQForm from "./FAQForm";
import { deleteFAQ, getAllfaqinfo } from "./FAQService";
import {
  failedNotification,
  infoNotification,
  successNotification,
} from "../../ReusableComp/Notifications";
import ViewFAQ from "./ViewFAQ";

function ManageFAQ() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const tableConfig = FAQTableConfig;
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [addEditView, setAddEditView] = useState(false);

  const [FAQdata, setFAQData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = () => {
    getAllfaqinfo()
      .then((data) => {
        infoNotification("API Health is good ");
        if (Object.keys(data.data).length > 0) {
          let tableData = data.data;
          setFAQData(tableData);
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
    setDrawerTitle("Add FAQ info");
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

  const editFAQ = (record) => {
    setDrawerTitle("Edit FAQ info");
    setFormData(record);
    setIsEdit(true);
    setOpen(true);
    setAddEditView(true);
  };
  const deleteThisRecord = (record) => {
    deleteFAQ(record._id)
      .then(() => {
        successNotification("FAQ deleted : " + record.title);
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
    setDrawerTitle("View FAQ info  of " + record.title);
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
        items={[{ title: "Home" }, { title: "Manage FAQ page" }]}
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
            <h2>Manage FAQ Page </h2>
            <Divider type="vertical" />
            <Button
              type="primary"
              onClick={newItem}
              icon={<PlusCircleOutlined />}
              size="large"
            >
              Add new FAQ
            </Button>
          </Flex>
        </Divider>

        {isDataLoaded ? (
          <AntTable
            tableData={FAQdata}
            columnConfig={tableConfig}
            editThisRecord={editFAQ}
            viewRecord={viewRecord}
            deleteThisRecord={deleteThisRecord}
          />
        ) : (
          <Skeleton active={true} />
        )}

        <Drawer
          key={"addFAQ"}
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
            <FAQForm
              closeDrawer={onClose}
              formData={formData}
              isEdit={isEdit}
              key="form"
            />
          )}
          {openView && <ViewFAQ props={formData} />}
        </Drawer>
      </div>
    </>
  );
}

export default ManageFAQ;
