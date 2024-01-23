import { useState, useEffect, useMemo } from "react";
import { Row, Col, Card, Checkbox, Flex, Button, Input, Select } from "antd";
import { Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProductListRequest } from "../../../redux/slicers/product.slice";
import { getCategoryListRequest } from "../../../redux/slicers/category.slice";
import { ROUTES } from "constants/routes";

import * as S from "./styles";
import { PRODUCT_LIMIT } from "constants/paging";

function HomePage() {
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    priceOrder: undefined,
    keyword: "",
  });

  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
    dispatch(getCategoryListRequest());
  }, []);

  const handleFilter = (key, value) => {
    setFilterParams({ ...filterParams, [key]: value });
    dispatch(
      getProductListRequest({
        ...filterParams,
        [key]: value,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  };

  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderCategoryItems = useMemo(() => {
    return categoryList.data.map((item, index) => {
      return (
        <Checkbox key={item.id} value={item.id}>
          {item.name}
        </Checkbox>
      );
    });
  }, [categoryList.data]);

  const renderProductItems = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <Col lg={6} md={8} sm={12} key={index}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card
              size="small"
              cover={
                <img
                  style={{ height: 200, width: 200 }}
                  alt="example"
                  src={item.image}
                />
              }
            >
              <h2 style={{ textAlign: "center" }}>{item.name}</h2>
              <h3 style={{ textAlign: "center" }}>
                {item.price.toLocaleString()} VND
              </h3>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.HomeWrapper>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Danh Mục Sản Phẩm" size="small">
            <Checkbox.Group
              onChange={(values) => handleFilter("categoryId", values)}
            >
              {renderCategoryItems}
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={16}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={16}>
              <Input
                onChange={(e) => handleFilter("keyword", e.target.value)}
                placeholder="Tìm kiếm "
              />
            </Col>
            <Col span={8}>
              <Select
                onChange={(value) => handleFilter("priceOrder", value)}
                placeholder="Sắp xếp theo"
                allowClear
                style={{ width: "100%" }}
              >
                <Select.Option value="asc">Giá tăng dần</Select.Option>
                <Select.Option value="desc">Giá giảm dần</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>{renderProductItems}</Row>
          {productList.data.length < productList.meta.total && (
            <Flex justify="center" style={{ marginTop: 16 }}>
              <Button onClick={() => handleShowMore()}>Show more</Button>
            </Flex>
          )}
        </Col>
      </Row>
    </S.HomeWrapper>
  );
}

export default HomePage;
