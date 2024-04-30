import React from "react";
import { Card, Checkbox, InputNumber, Typography, Divider, Image } from "antd";
import Timer from "../../Components/Timer";
import cardActions from "../../assets/cardActions";

const { Title, Text } = Typography;
const { Meta } = Card;

const ItemCardDetails = ({
  item,
  role,
  onBidNowClick,
  showAddEditUserModal,
  onRemoveConfirm,
  handleBidAmountChange,
  setAutoBidEnabled,
  autoBidEnabled,
  bidAmount,
  error,
  isWin,
}) => {
  return (
    <Card
      className="item-card"
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
        onRemoveConfirm
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
      <div>
        {["customer"].includes(role) && (
          <div className="bid-input-container">
            <InputNumber
              addonBefore="$"
              value={bidAmount}
              onChange={(value) => handleBidAmountChange(value)}
              placeholder="Bid amount"
              formatter={(value) => `${value}`.replace(/\D/g, "")}
              parser={(value) => value.replace(/\D/g, "")}
              autoFocus
              status={error && "error"}
            />
            <Checkbox
              checked={autoBidEnabled}
              onChange={(e) => setAutoBidEnabled(e.target.checked)}
            >
              Auto Bid
            </Checkbox>
          </div>
        )}
        <div className="messages">
          {error && <Text style={{ color: "red" }}>{error}</Text>}

          {bidAmount > item.currentBid && (
            <Text>
              You are currently{" "}
              {isWin ? (
                <Text type="success">wining</Text>
              ) : (
                <Text type="danger">losing</Text>
              )}
            </Text>
          )}
        </div>
      </div>
      <Divider style={{ marginTop: "0px" }} />
      {item && <Timer endDate={item.endDate} />}
    </Card>
  );
};

export default ItemCardDetails;
