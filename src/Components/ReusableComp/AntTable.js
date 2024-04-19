import React, { useRef, useState } from "react";
import {
  SearchOutlined,
  ExclamationCircleFilled,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Modal } from "antd";
import Highlighter from "react-highlight-words";
const { confirm } = Modal;

const AntTable = (props) => {
  const { tableData, columnConfig } = props;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const titleConfig = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <span>{text}</span>,
    },
  ];
  const actionConfig = [
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_, record) => (
        <Space size="middle">
          <span
            style={{
              cursor: "pointer",
              color: "green",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              viewRecord(record);
            }}
          >
            <EyeOutlined />
            View
          </span>
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              handelEdit(record);
            }}
          >
            <EditOutlined /> Edit
          </span>
          <span
            style={{
              cursor: "pointer",
              color: "red",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              handelDelete(record);
            }}
          >
            <DeleteOutlined /> Delete
          </span>
        </Space>
      ),
    },
  ];

  const columnConfigWihtSearch = [
    ...titleConfig,
    ...columnConfig,
    ...actionConfig,
  ];

  const handelDelete = (record) => {
    confirm({
      title: "Are you sure delete this ? ",
      icon: <ExclamationCircleFilled />,
      content: `Title : ${record.title}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        props.deleteThisRecord(record);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const handelEdit = (record) => {
    console.log("edit", record);
    props.editThisRecord(record);
  };
  const viewRecord = (record) => {
    console.log("View ", record);
    props.viewRecord(record);
  };

  return (
    <Table
      columns={columnConfigWihtSearch}
      dataSource={tableData}
      pagination={{ pageSize: 5 }}
      scroll={{ y: 240 }}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
    />
  );
};
export default AntTable;
