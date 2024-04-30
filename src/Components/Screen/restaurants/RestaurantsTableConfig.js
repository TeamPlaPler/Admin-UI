import { Tag, Tooltip } from "antd";

const restaurantsTableConfig = [
  {
    title: "Sub Title",
    dataIndex: "subTitle",
    key: "subTitle",
    width: "10%",
    ellipsis: true,
    render: (_, record) => (
      <Tooltip title={record.subTitle}>
        <span key={"subTitle"}>{record.subTitle}</span>
      </Tooltip>
    ),
  },
  {
    title: "Plan",
    dataIndex: "planValue",
    key: "planValue",
    width: "10%",
    render: (_, record) => <span key={"planValue"}>{record.planValue}</span>,
  },
  {
    title: "restaurantType",
    dataIndex: "restaurantTypeValue",
    key: "restaurantTypeValue",
    width: "10%",
    ellipsis: true,
    render: (_, { restaurantTypeValue }) => (
      <>
        {restaurantTypeValue.map((tag, i) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tooltip title={restaurantTypeValue.join(", ")}>
              <Tag color={color} key={i}>
                {tag}
              </Tag>
            </Tooltip>
          );
        })}
      </>
    ),
  },
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
    title: "Sub Domain",
    dataIndex: "subDomain",
    key: "subDomain",
    width: "10%",
    ellipsis: true,
    render: (_, record) => (
      <Tooltip title={record.subDomain}>
        <span key={"subDomain"}>{record.subDomain}</span>
      </Tooltip>
    ),
  },

  // {
  //   title: "Created by",
  //   dataIndex: "createdBy",
  //   key: "createdBy",
  //   width: "25%",
  //   render: (_, record) => (
  //     <Tooltip title={record.createdAt}>
  //       <span key={"createdBY"}>{record.createdBy}</span>
  //     </Tooltip>
  //   ),
  // },
  // {
  //   title: "Updated by",
  //   dataIndex: "updatedBy",
  //   key: "updatedBy",
  //   width: "25%",
  //   render: (_, record) => (
  //     <Tooltip title={record.updatedAt}>
  //       <span key={"updatedby"}>{record.updatedBy}</span>
  //     </Tooltip>
  //   ),
  // },
];

export default restaurantsTableConfig;
