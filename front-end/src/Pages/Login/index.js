import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Layout, Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/login";
import { LOGIN_PREFIX } from "../../redux/constants/login";
import "./styles/login.css";

export default memo(() => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader);
  const isLoading = !!loader[LOGIN_PREFIX];

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <Layout className="login-container">
      <Spin tip="Loading..." spinning={isLoading}>
        <Row>
          <Col span={8} offset={8}>
            <p className="title">Login</p>
            <Form name="login" onFinish={onFinish}>
              <Form.Item
                className="form-item"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                className="form-item"
                name="password"
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item className="form-item">
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
                <Link to={"/register"}>
                  <Button type="link">Create Account</Button>
                </Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </Layout>
  );
});
