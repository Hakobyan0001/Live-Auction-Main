import React, { memo, useEffect, useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { useHistory } from "react-router-dom";
import pathNames from "../../assets/pathNames";
import "./styles/layout.css";
const { Title } = Typography;

const { Header } = Layout;

export default memo(({ isLoggedIn, user, logout }) => {
  const [selectedKey, setSelectedKey] = useState("0");
  const history = useHistory();

  useEffect(() => {
    const index = pathNames.indexOf(window.location.pathname);
    const str = (index + 1).toString();
    setSelectedKey(str);
  }, [user.role]);

  function handleMenuSelect(index, path) {
    setSelectedKey(index);
    history.push(path);
  }

  return (
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        className="menu"
        selectedKeys={[selectedKey]}
      >
        <Menu.Item
          className="left-item"
          key="1"
          onClick={() => handleMenuSelect("1", "/")}
        >
          Home
        </Menu.Item>
        <Title className="center-item" level={1}>
          Live Auction
        </Title>
        {isLoggedIn ? (
          <Menu.Item className="right-item" key="2" onClick={logout}>
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item
            className="right"
            key="4"
            onClick={() => history.push("/login")}
          >
            Login
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
});
