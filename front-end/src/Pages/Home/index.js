import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { List, Layout, Spin, Pagination, Row, Divider } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import {
  getItems,
  toggleModal,
  deleteItem,
  addItem,
  updateItem,
} from "../../redux/actions/items";
import {
  GET_ITEMS_PREFIX,
  DELETE_ITEM_PREFIX,
  ADD_ITEM_PREFIX,
  UPDATE_ITEM_PREFIX,
} from "../../redux/constants/items";
import ListItem from "./ListItem";
import Header from "./Header";
import "./styles/items.css";
import AddEditItemModal from "../../Components/AddEditItemModal";

const pageSize = 10;

export default memo(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  const [item, setItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const items = useSelector((state) => state.items);
  const login = useSelector((state) => state.login);
  const loader = useSelector((state) => state.loader);
  const isLoading = !!(
    loader[GET_ITEMS_PREFIX] ||
    loader[DELETE_ITEM_PREFIX] ||
    loader[ADD_ITEM_PREFIX] ||
    loader[UPDATE_ITEM_PREFIX]
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems({ limit: pageSize, offset: 0 }));
  }, [dispatch, login.user]);

  const showAddEditUserModal = (item, isEditMode) => {
    setItem(item);
    setIsEditMode(isEditMode);
    dispatch(toggleModal({ visible: true }));
  };

  const handleAddOrEdit = (item, id) => {
    if (id) {
      dispatch(updateItem(item, id));
    } else {
      dispatch(addItem({ ...item }));
    }
  };

  const onBidNowClick = (itemId) => {
    history.push(`/itemDetails/${itemId}`);
  };

  const onRemoveConfirm = (id) => {
    dispatch(deleteItem(id));
  };

  const onCancel = () => {
    setItem(null);
    dispatch(toggleModal({ visible: false }));
  };

  const onSearchPress = () => {
    const params = {
      searchedText: searchedText,
      sortOrder,
      from,
      to,
      limit: pageSize,
      offset: 0,
    };
    dispatch(getItems(params));
  };

  const handleSearchTextChange = (e) => {
    setSearchedText(e.target.value);
  };

  const onPaginationChange = (el) => {
    setCurrentPage(el);
    const params = {
      searchedText,
      from,
      to,
      offset: pageSize * (el - 1),
      limit: pageSize,
    };
    dispatch(getItems(params));
  };
  return (
    <Layout className="item-container">
      <Spin tip="Loading..." spinning={isLoading}>
        <Row>
          <Header
            onSearchPress={onSearchPress}
            searchedText={searchedText}
            handleSearchTextChange={handleSearchTextChange}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
          />
        </Row>
        <Divider orientation="right">
          {login.isLoggedIn &&
            `User: ${login.user.firstName} ${login.user.lastName}`}
        </Divider>
        <Row>
          {["admin"].includes(login.user.role) && (
            <PlusCircleTwoTone
              style={{ fontSize: "30px" }}
              onClick={() => showAddEditUserModal(null, false)}
            />
          )}
        </Row>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <div className="items-list-cont">
            <List
              className="items-list"
              grid={{
                gutter: 8,
                column: Math.min(items.items.length, 5) >= 5 ? 5 : "auto-fill",
              }}
              dataSource={items.items}
              renderItem={(item) => {
                return (
                  <ListItem
                    item={item}
                    showAddEditUserModal={showAddEditUserModal}
                    role={login.user.role}
                    onRemoveConfirm={onRemoveConfirm}
                    onBidNowClick={onBidNowClick}
                  />
                );
              }}
            />
            <Pagination
              style={{ display: "flex", justifyContent: "center" }}
              defaultCurrent={1}
              current={currentPage}
              total={items.count}
              onChange={onPaginationChange}
            />
          </div>
          <AddEditItemModal
            loader={isLoading}
            role={login.user.role}
            isEditMode={isEditMode}
            visible={items.visible}
            confirmLoading={items.confirmLoading}
            item={item}
            onCancel={onCancel}
            handleAddOrEdit={handleAddOrEdit}
          />
        </Row>
      </Spin>
    </Layout>
  );
});
