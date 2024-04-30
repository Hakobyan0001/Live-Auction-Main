import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Select, Layout, Row, Col, Spin } from "antd";
import { register } from "../../redux/actions/register";
import { REGISTER_PREFIX } from "../../redux/constants/register";
import { VALIDATION_MESSAGES } from "../../assets/texts";
import "./styles/register.css";

const { Option } = Select;

export default memo(() => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const loader = useSelector((state) => state.loader);
  const isLoading = !!loader[REGISTER_PREFIX];
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(register(values)).then((el) => {
      form.resetFields();
    });
    history.push("/login");
  };

  const confirmPasswordValidator = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(VALIDATION_MESSAGES.CONFIRM_PASSWORD_ERROR);
    },
  });

  return (
    <Layout className="register-container">
      <Spin tip="Loading..." spinning={isLoading}>
        <Row>
          <Col span={8} offset={8}>
            <p className="title">Register</p>
            <Form name="register" form={form} onFinish={onFinish}>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
                hasFeedback
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
                hasFeedback
              >
                <Input placeholder="Second Name" />
              </Form.Item>
              <Form.Item
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
                name="role"
                rules={[
                  { required: true, message: "Please select your role!" },
                ]}
                hasFeedback
              >
                <Select placeholder="Select a role">
                  <Option value="customer">Customer</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  confirmPasswordValidator,
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </Layout>
  );
});
