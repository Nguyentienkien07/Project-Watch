import { useState, useEffect, useMemo } from "react";
import { Dropdown, Space, Button, Badge, Popover, Avatar, Menu } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { getCategoryListRequest } from "../../../redux/slicers/category.slice";

import * as S from "./styles";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const { categoryList } = useSelector((state) => state.category);
  const { cartList } = useSelector((state) => state.cart);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListRequest());
  }, []);

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

  const renderDropDowLink = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <S.DropDow>
          <Menu.Item key={item.id}>
            <Link
              to={{
                pathname: ROUTES.USER.PRODUCT_LIST,
                search: qs.stringify({
                  categoryId: [item.id],
                }),
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item.name}
            </Link>
          </Menu.Item>
        </S.DropDow>
      );
    });
  }, [categoryList.data]);

  const dropdownMenu = <Menu>{renderDropDowLink}</Menu>;

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

        <Dropdown overlay={dropdownMenu} trigger={["hover"]}>
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

              {/* <Dropdown
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
              </Dropdown> */}
              <Dropdown
                overlay={
                  <Menu>
                    <S.DropDow>
                      <Menu.Item
                        key="1"
                        icon={<DashboardOutlined />}
                        onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}
                        style={{
                          display:
                            userInfo.data.role === "admin" ? "block" : "none",
                        }}
                      >
                        Dashboard
                      </Menu.Item>
                    </S.DropDow>
                    <S.DropDow>
                      <Menu.Item
                        key="2"
                        icon={<UserOutlined />}
                        onClick={() => navigate(ROUTES.USER.PROFILE)}
                      >
                        Thông tin cá nhân
                      </Menu.Item>
                    </S.DropDow>
                    <S.DropDow>
                      <Menu.Item
                        key="3"
                        icon={<LogoutOutlined />}
                        onClick={() => dispatch(logoutRequest())}
                      >
                        Đăng xuất
                      </Menu.Item>
                    </S.DropDow>
                  </Menu>
                }
              >
                <h3
                  className="fullName"
                  style={{ color: "#e7e8f4", cursor: "pointer" }}
                >
                  {userInfo.data.fullName}
                </h3>
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
