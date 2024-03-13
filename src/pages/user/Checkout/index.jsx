import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Input,
  Select,
  Radio,
  Row,
  Col,
  Card,
  Space,
  Table,
  Flex,
  Breadcrumb,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";

import { ROUTES } from "constants/routes";
import { GUEST_ID } from "constants/guest";
import {
  getCityListRequest,
  getDistrictListRequest,
  getWardListRequest,
} from "../../../redux/slicers/location.slice";
import { orderProductRequest } from "../../../redux/slicers/order.slice";

import * as S from "./styles";

function CheckoutPage() {
  const [checkoutForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartList } = useSelector((state) => state.cart);
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  const { userInfo } = useSelector((state) => state.auth);

  const totalPrice = useMemo(
    () =>
      cartList.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartList]
  );

  useEffect(() => {
    dispatch(getCityListRequest());
  }, []);

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.setFieldsValue({
        fullName: userInfo.data.fullName,
        email: userInfo.data.email,
      });
    }
  }, [userInfo.data]);

  const tableColumn = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (_, item) =>
        `${(item.price * item.quantity).toLocaleString()} VND`,
    },
  ];

  const handleSubmitCheckoutForm = (values) => {
    const cityData = cityList.data.find(
      (city) => city.code === values.cityCode
    );
    const districtData = districtList.data.find(
      (district) => district.code === values.districtCode
    );
    const wardData = wardList.data.find(
      (ward) => ward.code === values.wardCode
    );
    dispatch(
      orderProductRequest({
        data: {
          ...values,
          userId: userInfo.data.id || GUEST_ID,
          status: "pending",
          totalPrice: totalPrice,
          cityName: cityData.name,
          districtName: districtData.name,
          wardName: wardData.name,
          cartList: cartList,
        },
        callback: () => navigate(ROUTES.USER.PAYMENT_SUCCESS),
      })
    );
  };

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((city) => (
      <Select.Option key={city.code} value={city.code}>
        {city.name}
      </Select.Option>
    ));
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((district) => (
      <Select.Option key={district.code} value={district.code}>
        {district.name}
      </Select.Option>
    ));
  }, [districtList.data]);

  const renderWardOptions = useMemo(() => {
    return wardList.data.map((ward) => (
      <Select.Option key={ward.code} value={ward.code}>
        {ward.name}
      </Select.Option>
    ));
  }, [wardList.data]);

  return (
    <S.CheckoutWrapper>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.USER.HOME}>
                <Space>
                  <HomeOutlined />
                  <span>Trang chủ</span>
                </Space>
              </Link>
            ),
          },
          {
            title: "Thủ tục thanh toán",
          },
        ]}
      />
      <h2 style={{ marginBottom: 16, textAlign: "center" }}>
        Thủ tục thanh toán
      </h2>
      <Form
        name="checkoutForm"
        form={checkoutForm}
        layout="vertical"
        onFinish={(values) => handleSubmitCheckoutForm(values)}
      >
        <Row gutter={[16, 16]}>
          <Col span={14}>
            <Card
              size="small"
              title="Thông tin thanh toán"
              style={{ marginBottom: 24 }}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: "Required!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Required!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[{ required: true, message: "Required!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Tỉnh/Thành"
                    name="cityCode"
                    rules={[{ required: true, message: "Required!" }]}
                  >
                    <Select
                      onChange={(value) => {
                        dispatch(getDistrictListRequest({ cityCode: value }));
                        checkoutForm.setFieldsValue({
                          districtCode: undefined,
                          wardCode: undefined,
                        });
                      }}
                      allowClear
                    >
                      {renderCityOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Quận/Huyện"
                    name="districtCode"
                    rules={[{ required: true, message: "Required!" }]}
                  >
                    <Select
                      onChange={(value) => {
                        dispatch(getWardListRequest({ districtCode: value }));
                        checkoutForm.setFieldsValue({
                          wardCode: undefined,
                        });
                      }}
                      disabled={!checkoutForm.getFieldValue("cityCode")}
                      allowClear
                    >
                      {renderDistrictOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Phường/Xã"
                    name="wardCode"
                    rules={[{ required: true, message: "Required!" }]}
                  >
                    <Select
                      disabled={!checkoutForm.getFieldValue("districtCode")}
                      allowClear
                    >
                      {renderWardOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: "Required!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            {/* <Card
              size="small"
              title="Thông tin thanh toán"
              style={{ marginBottom: 24 }}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Phương thức thanh toán"
                    name="paymentMethod"
                    rules={[{ required: true, message: "Required!" }]}
                  >
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value="cod">COD</Radio>
                        <Radio value="atm">ATM</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Card> */}

            <Row justify="space-between">
              <Button onClick={() => navigate(ROUTES.USER.CART)}>
                Trở lại
              </Button>
            </Row>
          </Col>
          <Col span={10}>
            <Card
              size="small"
              title="Đơn hàng của bạn"
              style={{ marginBottom: 24 }}
            >
              <Table
                size="small"
                columns={tableColumn}
                dataSource={cartList}
                rowKey="id"
                pagination={false}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Tổng tiền</h4>
                <h4> {totalPrice.toLocaleString()} VND</h4>
              </div>
              <div
                style={{ borderTop: "1px solid #ccc", margin: "20px 0" }}
              ></div>

              <Row gutter={[16, 16]}>
                <Col span={16}>
                  <Form.Item
                    label="Phương thức thanh toán"
                    name="paymentMethod"
                    rules={[{ required: true, message: "Required!" }]}
                  >
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value="cod">Trả tiền mặt khi nhận hàng</Radio>
                        <Radio svalue="atm">Chuyển khoản ngân hàng</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Flex justify="right">
                <Button
                  style={{ backgroundColor: "#ffc069" }}
                  type="primary"
                  htmlType="submit"
                >
                  Thanh toán
                </Button>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Form>
    </S.CheckoutWrapper>
  );
}

export default CheckoutPage;
