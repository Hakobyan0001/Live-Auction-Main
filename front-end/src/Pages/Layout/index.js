import React, {memo, useEffect} from 'react';
import { Layout, Spin } from 'antd';
import Header from './Header';
import './styles/layout.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthData, logout } from './../../redux/actions/login';

const { Content } = Layout;

export default memo((props) => {
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(updateAuthData());
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <Layout className="layout">
      <Header isLoggedIn={login.isLoggedIn} user={login.user} logout={handleLogOut}/>
      <Spin size="large" tip="Loading..." spinning={!login.authChecked}>
        {!!login.authChecked && (
          <Content>
            {props.children}
          </Content>
        )}
      </Spin>
  </Layout>
);
})
