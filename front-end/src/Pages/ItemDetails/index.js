import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Spin, message } from "antd";
import "./itemDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getItem,
  updateItem,
  deleteItem,
  toggleModal,
} from "../../redux/actions/items";
import { addBid, updateBid } from "../../redux/actions/bid";
import {
  DELETE_ITEM_PREFIX,
  GET_ITEM_DETAILS_PREFIX,
  UPDATE_ITEM_PREFIX,
} from "../../redux/constants/items";
import AddEditItemModal from "../../Components/AddEditItemModal";
import ItemCardDetails from "./ItemCardDetails";

const ItemCard = () => {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [autoBidEnabled, setAutoBidEnabled] = useState(false);
  const [error, setError] = useState(false);
  const [isWin, setIsWin] = useState(true);
  const [bidAmount, setBidAmount] = useState(null);
  const items = useSelector((state) => state.items);
  const login = useSelector((state) => state.login);
  const loader = useSelector((state) => state.loader);
  const isLoading = !!(
    loader[GET_ITEM_DETAILS_PREFIX] ||
    loader[DELETE_ITEM_PREFIX] ||
    loader[UPDATE_ITEM_PREFIX]
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItem(Number(id)));
  }, [dispatch, id]);

  const handleBidAmountChange = (value) => {
    setBidAmount(value);
    if (value <= parseInt(items?.selectedItem.currentBid)) {
      setError("Bid amount must be greater than the current amount.");
    } else {
      setError("");
    }
  };
  const handleEdit = (item, id) => {
    dispatch(updateItem(item, id));
  };
  const onCancel = () => {
    dispatch(toggleModal({ visible: false }));
  };
  const onRemoveConfirm = () => {
    dispatch(deleteItem(Number(id)));
    history.push("/");
  };
  const showAddEditUserModal = (_, isEditMode) => {
    setIsEditMode(isEditMode);
    dispatch(toggleModal({ visible: true }));
  };
  const onBidNowClick = () => {
    const currentDate = new Date();
    const itemEndDate = new Date(items?.selectedItem.endDate);
    if (currentDate >= itemEndDate) {
      message.error("Item's auction is over.");
    } else {
      dispatch(addBid({ bidAmount, itemId: Number(id) }));
    }
  };

  return (
    <div className="item-card-container">
      <Spin tip="Loading..." spinning={isLoading}>
        <ItemCardDetails
          item={items?.selectedItem}
          role={login.user.role}
          onBidNowClick={onBidNowClick}
          showAddEditUserModal={showAddEditUserModal}
          onRemoveConfirm={onRemoveConfirm}
          handleBidAmountChange={handleBidAmountChange}
          setAutoBidEnabled={setAutoBidEnabled}
          autoBidEnabled={autoBidEnabled}
          bidAmount={bidAmount}
          error={error}
          isWin={isWin}
        />
        <AddEditItemModal
          loader={isLoading}
          role={login.user.role}
          isEditMode={isEditMode}
          visible={items.visible}
          confirmLoading={items.confirmLoading}
          item={items.selectedItem}
          onCancel={onCancel}
          handleAddOrEdit={handleEdit}
        />
      </Spin>
    </div>
  );
};

export default ItemCard;
