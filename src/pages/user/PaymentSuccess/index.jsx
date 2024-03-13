import { Result, Button, Card } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "constants/routes";

const PaymentSuccessPage = () => {
  return (
    <Result
      style={{ backgroundColor: "white" }}
      status="success"
      title="Thanh toán thành công!"
      subTitle="Chúng tôi đã nhận được thanh toán của bạn."
      extra={[
        <Button type="primary" key="continue-shopping">
          <Link to={ROUTES.USER.PRODUCT_LIST}>Tiếp tục mua sắm</Link>
        </Button>,
        <Button key="view-order">
          <Link to={ROUTES.USER.ORDER_HISTORY}>Xem đơn hàng của bạn</Link>
        </Button>,
      ]}
    />
  );
};

export default PaymentSuccessPage;
