import { useEffect, useMemo, useState } from "react";

import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Space,
  Breadcrumb,
  Card,
  Button,
  InputNumber,
  Form,
  Input,
  Rate,
  notification,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import qs from "qs";

import { ROUTES } from "constants/routes";

import { getProductDetailRequest } from "../../../redux/slicers/product.slice";
import { addToCartRequest } from "../../../redux/slicers/cart.slice";
import {
  getReviewListRequest,
  reviewProductRequest,
} from "../../../redux/slicers/review.slice";
import {
  favoriteProductRequest,
  unFavoriteProductRequest,
} from "../../../redux/slicers/favorite.slice";

import * as S from "./styles";

const ProductDetailPage = () => {
  const [reviewForm] = Form.useForm();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { productDetail } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);

  const isFavorite = useMemo(() => {
    return productDetail.data.favorites?.some(
      (item) => item.userId === userInfo.data.id
    );
  }, [productDetail.data, userInfo.data.id]);

  const productRate = useMemo(() => {
    const totalRate = reviewList.data.reduce(
      (total, item) => total + item.rate,
      0
    );
    return reviewList.data.length ? totalRate / reviewList.data.length : 0;
  }, [reviewList.data]);

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
    dispatch(getReviewListRequest({ productId: parseInt(id) }));
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addToCartRequest({
        productId: productDetail.data.id,
        image: productDetail.data.image,
        name: productDetail.data.name,
        price: productDetail.data.price,
        quantity: quantity,
      })
    );
    notification.success({ message: "Thêm vào giỏ thành công" });
  };

  const handleToggleFavorite = () => {
    if (!userInfo.data.id)
      return notification.error({
        message: "Bạn cần đăng nhập để thực hiện tính năng này",
      });
    if (isFavorite) {
      const favoriteData = productDetail.data.favorites.find(
        (item) => item.userId === userInfo.data.id
      );
      if (favoriteData) {
        dispatch(unFavoriteProductRequest({ id: favoriteData.id }));
      }
    } else {
      dispatch(
        favoriteProductRequest({
          data: {
            userId: userInfo.data.id,
            productId: productDetail.data.id,
          },
        })
      );
    }
  };

  const handleReviewProduct = (values) => {
    dispatch(
      reviewProductRequest({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: productDetail.data.id,
        },
      })
    );
  };

  const renderReviewForm = useMemo(() => {
    if (userInfo.data.id) {
      const isReviewed = reviewList.data.some(
        (item) => item.userId === userInfo.data.id
      );
      if (isReviewed) {
        return (
          <S.ReviewFormWrapper>
            Bạn đã đánh giá sản phẩm này
          </S.ReviewFormWrapper>
        );
      }
      return (
        <S.ReviewFormWrapper>
          <Form
            form={reviewForm}
            name="loginForm"
            layout="vertical"
            initialValues={{
              rate: 0,
              comment: "",
            }}
            onFinish={(values) => handleReviewProduct(values)}
          >
            <Form.Item
              label="Đánh giá sao"
              name="rate"
              rules={[
                { required: true, message: "Nhận xét là bắt buộc" },
                {
                  min: 1,
                  type: "number",
                  message: "Đánh giá sao là bắt buộc",
                },
              ]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              label="Nhận xét"
              name="comment"
              rules={[{ required: true, message: "Nhận xét là bắt buộc" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Button
              style={{ backgroundColor: "#ffc069" }}
              type="primary"
              htmlType="submit"
              block
            >
              Gửi
            </Button>
          </Form>
        </S.ReviewFormWrapper>
      );
    }
    return <S.ReviewFormWrapper>Bạn chưa đăng nhập</S.ReviewFormWrapper>;
  }, [reviewList.data, userInfo.data]);

  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => {
      return (
        <S.ReviewItemWrapper key={item.id}>
          <Space>
            <h3>{item.user.fullName}</h3>
            <p>{dayjs(item.createdAt).fromNow()}</p>
          </Space>
          <Rate
            value={item.rate}
            disabled
            style={{ display: "block", fontSize: 12 }}
          />
          <p>{item.comment}</p>
        </S.ReviewItemWrapper>
      );
    });
  }, [reviewList.data]);

  return (
    <S.ProductDetailWrapper>
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
            title: (
              <Link to={ROUTES.USER.PRODUCT_LIST}>Danh sách sản phẩm</Link>
            ),
          },
          {
            title: (
              <Link
                to={`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({
                  categoryId: [productDetail.data.categoryId],
                })}`}
              >
                {productDetail.data.category?.name}
              </Link>
            ),
          },
          {
            title: productDetail.data.name,
          },
        ]}
        style={{ marginBottom: 8 }}
      />
      <Card size="small" bordered={false}>
        <Row gutter={[16, 16]}>
          <Col md={8} sm={24}>
            <img
              src={productDetail.data.image}
              alt=""
              width="100%"
              height="auto"
            />
          </Col>
          <Col md={14} sm={24}>
            <p size="sm">{productDetail.data.category?.name}</p>
            <Space style={{ display: "flex" }}>
              <h1>{productDetail.data.name}</h1>
              <Button
                size="large"
                type="text"
                danger={isFavorite}
                icon={
                  isFavorite ? (
                    <HeartFilled style={{ fontSize: 24 }} />
                  ) : (
                    <HeartOutlined style={{ fontSize: 24, color: "#414141" }} />
                  )
                }
                onClick={() => handleToggleFavorite()}
              ></Button>
              <p>{productDetail.data?.favorites?.length || 0} Lượt thích</p>
            </Space>
            <Space>
              <Rate value={productRate} allowHalf disabled />
              <span>{`(${
                productRate ? `${productRate} sao` : "Chưa có đánh giá"
              })`}</span>
            </Space>
            <div style={{ display: "flex" }}>
              <h4 style={{ paddingRight: "10px" }}>Giá: </h4>
              <h4 style={{ color: "#f5222d" }}>
                {productDetail.data.price?.toLocaleString()} ₫
              </h4>
            </div>
            <div style={{ margin: "8px 0", display: "flex" }}>
              <h4 style={{ paddingRight: "10px" }}>Số lượng:</h4>
              <InputNumber
                value={quantity}
                min={1}
                onChange={(value) => setQuantity(value)}
              />
            </div>
            <div style={{ display: "flex" }}>
              <h4 style={{ paddingRight: "10px" }}>Tình trạng: </h4>
              <h4 style={{ color: "#f5222d" }}>Còn hàng</h4>
            </div>
            <div style={{ margin: "10px 0" }}>
              <h3>Thông tin thêm:</h3>
              <div style={{ borderTop: "1px solid #ccc" }}></div>
              <h3 style={{ color: "#ffc069" }}>
                Cam kết tất cả sản phẩm bán ra là chính Hãng 100%. Bảo hành từ 2
                đến 5 năm theo đúng tiêu chuẩn của hãng. Tặng gói Spa miễn phí 2
                năm trị giá 3.000.000 đồng. Giao hàng toàn quốc, hỗ trợ 24/7 về
                chất lượng sản phẩm. Với K-WATCH chữ tín luôn đặt lên hàng đầu
              </h3>
            </div>
            <Space>
              <Button
                style={{ backgroundColor: "#b80a0a" }}
                size="large"
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => handleAddToCart()}
              >
                Thêm vảo giỏ
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={16}>
          <Card
            size="small"
            title={<h3 style={{ color: "Black" }}>Thông tin sản phẩm</h3>}
            bordered={false}
          >
            <div
              dangerouslySetInnerHTML={{ __html: productDetail.data.content }}
            ></div>
          </Card>
          <Card
            size="small"
            title="Đánh giá"
            bordered={false}
            style={{ marginTop: 16 }}
          >
            {renderReviewForm}
            {renderReviewList}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            size="small"
            title={<h3 style={{ color: "Black" }}>Thông số kỹ thuật</h3>}
            bordered={false}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: productDetail.data.configuration,
              }}
            ></div>
          </Card>
        </Col>
      </Row>
    </S.ProductDetailWrapper>
  );
};

export default ProductDetailPage;
