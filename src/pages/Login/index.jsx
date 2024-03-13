import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { Link, useNavigate, Navigate } from "react-router-dom";

import { ROUTES } from "constants/routes";
import { loginRequest } from "../../redux/slicers/auth.slice";

import * as S from "./styles";

const LoginPage = () => {
  const [loginForm] = Form.useForm();

  const { loginData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);

  const handleSubmit = (values) => {
    dispatch(
      loginRequest({
        data: values,
        callback: (role) =>
          navigate(
            role === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.HOME
          ),
      })
    );
  };

  return (
    <S.LoginContainer>
      <S.LoginForm>
        <h3 style={{ textAlign: "center", color: "#d09010" }}>LOGIN</h3>
        <Form
          style={{ color: "white" }}
          form={loginForm}
          name="loginForm"
          layout="vertical"
          s
          onFinish={(values) => handleSubmit(values)}
        >
          <Form.Item
            label={<h5 style={{ color: "white" }}>Email</h5>}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<h5 style={{ color: "white" }}>Mật khẩu</h5>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <div style={{ marginBottom: 16 }}>
            Bạn chưa có tài khoản?{" "}
            <Link to={ROUTES.REGISTER} style={{ color: "#d09010" }}>
              Đăng ký
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ backgroundColor: "#d09010" }}
          >
            Đăng nhập
          </Button>
        </Form>
      </S.LoginForm>
    </S.LoginContainer>
  );
};

export default LoginPage;
