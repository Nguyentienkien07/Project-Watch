import { useEffect } from "react";
import { Table, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { getFavoriteListRequest } from "../../../redux/slicers/favorite.slice";

const FavoriteProduct = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { favoriteList } = useSelector((state) => state.favorite);
  console.log("🚀 ~ FavoriteProduct ~ favoriteList:", favoriteList);

  useEffect(() => {
    dispatch(getFavoriteListRequest({ userId: userInfo.data.id }));
  }, []);

  const tableColumns = [
    {
      title: "Hình ảnh sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <img
          src={product.image}
          alt=""
          style={{ width: "150px", height: "100px" }}
        />
      ),
    },
    {
      title: "Tên sản phẩm được yêu thích",
      dataIndex: "product",
      key: "product",
      render: (_, item) => <h4>{item.product.name}</h4>,
    },
    {
      title: "Giá bán",
      dataIndex: "product",
      key: "product",
      render: (_, item) => {
        return `${item.product.price.toLocaleString()} VNĐ`;
      },
    },
  ];

  return (
    <Table
      columns={tableColumns}
      dataSource={favoriteList.data}
      rowKey="id"
      pagination={false}
    />
  );
};

export default FavoriteProduct;
