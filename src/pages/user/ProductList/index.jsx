import { useState, useEffect, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Checkbox,
  Flex,
  Button,
  Input,
  Select,
  Breadcrumb,
  Space,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link, generatePath, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import { getProductListRequest } from "../../../redux/slicers/product.slice";
import { getCategoryListRequest } from "../../../redux/slicers/category.slice";
import { getTypeListRequest } from "../../../redux/slicers/type.slice";
import { ROUTES } from "constants/routes";
import { PRODUCT_LIMIT } from "constants/paging";

import * as S from "./styles";

function ProductListPage() {
  const { search } = useLocation();
  const searchParams = useMemo(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true });
    return {
      categoryId: params.categoryId
        ? params.categoryId.map((item) => parseInt(item))
        : [],
      typeId: params.typeId ? params.typeId.map((item) => parseInt(item)) : [],
      priceOrder: params.priceOrder,
      keyword: params.keyword || "",
    };
  }, [search]);

  const navigate = useNavigate();

  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  const { typeList } = useSelector((state) => state.type);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListRequest());
    dispatch(getTypeListRequest());
  }, []);

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  }, [searchParams]);

  const handleFilter = (key, value) => {
    const newFilterParams = { ...searchParams, [key]: value };
    navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify(newFilterParams)}`);
  };

  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderCategoryItems = useMemo(() => {
    return categoryList.data.map((item, index) => {
      return (
        <div style={{ display: "block", marginBottom: 8 }}>
          <Checkbox key={item.id} value={item.id}>
            {item.name}
          </Checkbox>
        </div>
      );
    });
  }, [categoryList.data]);

  const renderTypeItems = useMemo(() => {
    return typeList.data.map((item, index) => {
      return (
        <div style={{ display: "block", marginBottom: 8 }}>
          <Checkbox key={item.id} value={item.id}>
            {item.name}
          </Checkbox>
        </div>
      );
    });
  }, [typeList.data]);

  const renderProductItems = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <Col lg={6} md={8} sm={12} key={index}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card
              hoverable
              size="small"
              bordered={false}
              cover={
                <img
                  style={{
                    alignItems: "center",
                  }}
                  alt="example"
                  src={item.image}
                />
              }
            >
              {/* <h2 style={{ textAlign: "center" }}>{item.name}</h2>
              <h3 style={{ textAlign: "center" }}>
                {item.price.toLocaleString()} ₫
              </h3> */}
              <h3 style={{ textAlign: "center" }}>Đồng Hồ</h3>
              <S.ProductTitle truncateMultiLine={1}>{item.name}</S.ProductTitle>
              <S.ProductPrice>{item.price.toLocaleString()} ₫</S.ProductPrice>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.ProductListWrapper>
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
            title: "Danh sách sản phẩm",
          },
        ]}
        style={{ margin: " 8px 16px" }}
      />
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card
            title={<h3 style={{ color: "Black" }}>Thương hiệu</h3>}
            size="small"
            style={{
              // borderColor: "black",
              backgroundColor: "#f2f2f2",
            }}
          >
            <Checkbox.Group
              style={{ display: "block" }}
              onChange={(values) => handleFilter("categoryId", values)}
              value={searchParams.categoryId}
            >
              {renderCategoryItems}
            </Checkbox.Group>
          </Card>
          <Card
            title={<h3 style={{ color: "Black" }}>Chất liệu dây</h3>}
            size="small"
            style={{
              // color: "#f2f2f2",
              marginTop: 20,
              // borderColor: "black",
              backgroundColor: "#f2f2f2",
            }}
          >
            <Checkbox.Group
              style={{ display: "block" }}
              onChange={(values) => handleFilter("typeId", values)}
              value={searchParams.typeId}
            >
              {renderTypeItems}
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={16}>
              <Input
                onChange={(e) => handleFilter("keyword", e.target.value)}
                value={searchParams.keyword}
                placeholder="Tìm kiếm "
              />
            </Col>
            <Col span={8}>
              <Select
                onChange={(value) => handleFilter("priceOrder", value)}
                value={searchParams.priceOrder}
                placeholder="Thứ tự mặc định"
                allowClear
                style={{ width: "100%" }}
              >
                <Select.Option value="asc">
                  Thứ tự theo giá tăng dần
                </Select.Option>
                <Select.Option value="desc">
                  Thứ tự theo giá giảm dần
                </Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>{renderProductItems}</Row>
          {productList.data.length < productList.meta.total && (
            <Flex justify="center" style={{ marginTop: 16 }}>
              <Button onClick={() => handleShowMore()}>Xem thêm</Button>
            </Flex>
          )}
        </Col>
      </Row>
    </S.ProductListWrapper>
  );
}

export default ProductListPage;
