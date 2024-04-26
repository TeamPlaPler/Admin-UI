import { Tag, Tooltip } from "antd";

const orderTypesTableConfig = [
  {
    title: "isActive",
    dataIndex: "isActive",
    key: "isActive",
    width: "20%",
    sorter: (a, b) => a.isActive - b.isActive,

    filters: [
      {
        text: "Active",
        value: "active",
      },
      {
        text: "Inactive",
        value: "inactive",
      },
    ],
    onFilter: (value, record) => record.isActive.indexOf(value) === 0,

    sortDirections: ["descend", "ascend"],
    render: (_, { isActive }) => (
      <Tag color={isActive === true ? "green" : "volcano"} key={"isActive"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
  },

  {
    title: "Created by",
    dataIndex: "createdBy",
    key: "createdBy",
    width: "25%",
    render: (_, record) => (
      <Tooltip title={record.createdAt}>
        <span key={"createdBY"}>{record.createdBy}</span>
      </Tooltip>
    ),
  },
  {
    title: "Updated by",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: "25%",
    render: (_, record) => (
      <Tooltip title={record.updatedAt}>
        <span key={"updatedby"}>{record.updatedBy}</span>
      </Tooltip>
    ),
  },
];

export default orderTypesTableConfig;
