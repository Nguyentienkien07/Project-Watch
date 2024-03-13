import { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { getOrderListRequest } from "../../../redux/slicers/order.slice";

const OrderHistories = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderListRequest({ userId: userInfo.data.id }));
  }, []);

  const tableColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "orderDetails",
      key: "image",
      render: (orderDetails) => (
        <img
          src={orderDetails[0].image}
          alt={orderDetails[0].productName}
          style={{ width: "50px" }}
        />
      ),
    },

    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => `${orderDetails.length} sản phẩm`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "address",
      key: "address",
      render: (_, item) =>
        `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
    },
  ];
  console.log("🚀 ~ OrderHistories ~ tableColumns:", tableColumns);

  return (
    <Table
      columns={tableColumns}
      dataSource={orderList.data}
      rowKey="id"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <table border="0.9" style={{ color: "#130f0f" }}>
            <tr style={{ textAlign: "left" }}>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
            {record.orderDetails.map((item) => (
              <tr>
                <td>{`${item.productName}`}</td>
                <td>{`${item.price.toLocaleString()} VND`}</td>
                <td>{`${item.quantity}`}</td>
                <td>{`${(
                  item.price * item.quantity
                ).toLocaleString()} VND`}</td>
              </tr>
            ))}
          </table>
        ),
      }}
    />
  );
};

export default OrderHistories;
