import React from "react";
import { Card, List, Typography, Image, Divider } from "antd";
import "./styles/items.css";
import Timer from "../../Components/Timer";
import cardActions from "../../assets/cardActions";
const { Title } = Typography;
const { Meta } = Card;

const ListItem = ({
  item,
  showAddEditUserModal,
  onBidNowClick,
  onRemoveConfirm,
  role,
}) => {
  return (
    <List.Item className="list">
      <Card
        className="card"
        title={
          <Title style={{ margin: "0px" }} level={2}>
            {item.name}
          </Title>
        }
        cover={
          <Image
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={cardActions(
          role,
          onBidNowClick,
          showAddEditUserModal,
          onRemoveConfirm,
          item
        )}
      >
        <Meta
          style={{ padding: "0px" }}
          title={
            <Title style={{ margin: "0px" }} level={4}>
              ${item.currentBid}
            </Title>
          }
          description={item.description}
        />
        <Divider />
        <Timer endDate={item.endDate} />
      </Card>
    </List.Item>
  );
};

export default ListItem;
