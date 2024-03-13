import { Dropdown, Space, Button, Badge, Popover, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LogoutOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import qs from "qs";

import { ROUTES } from "constants/routes";
import { logoutRequest } from "../../../redux/slicers/auth.slice";

import * as S from "./styles";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderCartContent = (
    <div>
      {cartList.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <p style={{ marginRight: 10 }}>{item.name}</p>
          <p>{item.price.toLocaleString()} ₫</p>
          <hr />
        </div>
      ))}
    </div>
  );
  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <Link to={ROUTES.USER.HOME}>
          <div className="logo">
            <img
              className="image"
              src="https://www.euluxury.vn/images/logo_EuLuxury_top.png"
              alt=""
            />

            <h3 style={{ color: "#fa8c16" }}>KWATCH</h3>
          </div>
        </Link>

        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "Hublot",
                onClick: () => navigate(ROUTES.USER.PRODUCT_LIST),
              },
              {
                key: "2",
                label: "Rolex",
                onClick: () => navigate(ROUTES.USER.PRODUCT_LIST),
              },
              {
                key: "4",
                label: "Franck Muller",
                onClick: () => navigate(ROUTES.USER.PRODUCT_LIST),
              },
              {
                key: "4",
                label: "Richard Mille",
                onClick: () => navigate(ROUTES.USER.PRODUCT_LIST),
              },
            ],
          }}
        >
          <h4 style={{ cursor: "pointer" }}>Thương hiệu</h4>
        </Dropdown>

        <Link to={ROUTES.USER.HOME} style={{ textDecoration: "none" }}>
          <h4>Phụ kiện</h4>
        </Link>
        <Link to={ROUTES.USER.HOME} style={{ textDecoration: "none" }}>
          <h4>Tin tức</h4>
        </Link>
        <Space size={24}>
          <Popover content={renderCartContent} title="Giỏ hàng">
            <Badge count={cartList.length}>
              <Link to={ROUTES.USER.CART}>
                <ShoppingCartOutlined
                  style={{ fontSize: 24, color: "white" }}
                />
              </Link>
            </Badge>
          </Popover>
          {userInfo.data.id ? (
            <Space>
              {userInfo.data.avatar ? (
                <S.AvatarPreview
                  src={userInfo.data.avatar}
                  alt="User profile picture"
                />
              ) : (
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              )}
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "1",
                      label: "Dashboard",
                      icon: <DashboardOutlined />,
                      onClick: () => navigate(ROUTES.ADMIN.DASHBOARD),
                      style: {
                        display:
                          userInfo.data.role === "admin" ? "block" : "none",
                      },
                    },
                    {
                      key: "2",
                      label: "Thông tin cá nhân",
                      icon: <UserOutlined />,
                      onClick: () => navigate(ROUTES.USER.PROFILE),
                    },
                    {
                      key: "3",
                      label: "Đăng xuất",
                      onClick: () => dispatch(logoutRequest()),
                      icon: <LogoutOutlined />,
                    },
                  ],
                }}
              >
                <h3 style={{ color: "#e7e8f4" }}>{userInfo.data.fullName}</h3>
              </Dropdown>
            </Space>
          ) : (
            <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
          )}
        </Space>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default Header;
