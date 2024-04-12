import { Tag, Tooltip } from "antd";

const BlogTableConfig = [
  {
    title: "isActive",
    dataIndex: "isActive",
    key: "isActive",
    width: "10%",
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
    title: "Auther",
    dataIndex: "auther",
    key: "auther",
    width: "10%",
    // sorter: (a, b) => a.address.length - b.address.length,
    // sortDirections: ["descend", "ascend"],
  },
  {
    title: "tags",
    dataIndex: "tags",
    key: "tags",
    width: "20%",
    render: (_, { tags }) => (
      <>
        {tags.map((tag, i) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={i}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Created by",
    dataIndex: "createdBy",
    key: "createdBy",
    width: "10%",
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
    width: "10%",
    render: (_, record) => (
      <Tooltip title={record.updatedAt}>
        <span key={"updatedby"}>{record.updatedBy}</span>
      </Tooltip>
    ),
  },
];

export default BlogTableConfig;
