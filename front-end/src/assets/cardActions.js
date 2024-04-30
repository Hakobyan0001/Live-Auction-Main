import React from "react";
import {
  EditTwoTone,
  DeleteTwoTone,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
const cardActions = (
  role,
  onBidNowClick,
  showAddEditUserModal,
  onRemoveConfirm,
  item
) => {
  const actions = [];
  // if (["admin"].includes(role)) {
  actions.push(
    <EditTwoTone key="edit" onClick={() => showAddEditUserModal(item, true)} />,
    <Popconfirm
      title="Are you sure delete this item?"
      onConfirm={() => onRemoveConfirm(item?.id)}
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
    >
      <DeleteTwoTone />
    </Popconfirm>
  );
  // } else {
  actions.push(
    <Button type="primary" size="small" onClick={() => onBidNowClick(item?.id)}>
      Bid Now
    </Button>
  );
  // }
  return actions;
};
export default cardActions;
