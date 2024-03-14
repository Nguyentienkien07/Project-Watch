import { useState, useEffect, useMemo } from "react";
import { Link, generatePath, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";

import React from "react";
import Slider from "react-slick";
import { Row, Col, Card, Checkbox, Flex, Button, Input, Select } from "antd";

import { getProductListRequest } from "../../../redux/slicers/product.slice";
import { ROUTES } from "constants/routes";
import { PRODUCT_LIMIT } from "constants/paging";

import * as S from "./styles";

function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  const navigate = useNavigate();

  const { productList } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductListRequest({
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  }, [dispatch]);

  const renderProductItems = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <Col key={index} style={{ textAlign: "center" }}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card
              hoverable
              style={{ width: "240px" }}
              size="small"
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
              <h2 style={{ textAlign: "center" }}>{item.name}</h2>
              <h3 style={{ textAlign: "center", color: "#ffa940" }}>
                {item.price.toLocaleString()} ₫
              </h3>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.HomeWrapper>
      <div className="slider-container">
        <Slider
          {...settings}
          style={{ width: "100%", margin: "0 auto", overflow: "hidden" }}
        >
          <div>
            <img
              src={
                "https://www.euluxury.vn/data/banner/BANNER_DONG_HO_CHUAN_PC.jpg"
              }
              alt=""
              width="100%"
              height="auto"
            />
          </div>
          <div>
            <img
              src={"https://www.euluxury.vn/data/banner/VERTU.jpg"}
              alt=""
              width="100%"
              height="auto"
            />
          </div>
          <div>
            <img
              src={"https://www.euluxury.vn/data/banner/XOR.jpg"}
              alt=""
              width="100%"
              height="auto"
            />
          </div>
        </Slider>
      </div>

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        TOP ĐỒNG HỒ BÁN CHẠY
      </h2>
      <div style={{ backgroundColor: "gray" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "50px",
            overflow: "hidden",
            marginTop: "20px",
            padding: "50px",
          }}
        >
          {renderProductItems}
        </div>
      </div>

      <div>
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          CÁC THƯƠNG HIỆU
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "space-between",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div style={{ backgroundColor: "gray" }}>
              <img
                src="https://www.euluxury.vn/data/banner/mld1586151892.png"
                alt=""
                width="50px"
                height="100px"
              />
            </div>
            <div style={{ backgroundColor: "gray" }}>
              <img
                src="https://www.euluxury.vn/data/banner/logo_hublot.png"
                alt=""
                width="100px"
                height="100px"
              />
            </div>
            <div style={{ backgroundColor: "gray" }}>
              <img
                src="https://www.euluxury.vn/data/banner/odp1586151858.png"
                alt=""
                width="100px"
                height="100px"
              />
            </div>
            <div style={{ backgroundColor: "gray" }}>
              <img
                src="https://www.euluxury.vn/data/banner/fkg1587452105.png"
                alt=""
                width="100px"
                height="100px"
              />
            </div>
          </div>
        </h2>
      </div>
      <div style={{ borderTop: "1px solid #ccc", margin: "30px 0" }}></div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>TIN TỨC</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          gap: "50px",
          marginTop: "20px",
        }}
      >
        <Card
          style={{ width: "240px" }}
          size="small"
          cover={
            <img
              style={{
                alignItems: "center",
              }}
              alt="example"
              src={"https://www.euluxury.vn/data/new/Dong_ho_Hublot_nu_.jpg"}
            />
          }
        >
          <h4 style={{ textAlign: "center" }}>
            Khám Phá Vẻ Đẹp Sang Trọng Của Đồng Hồ Hublot
          </h4>
          <div style={{ borderTop: "1px solid #ccc", margin: "10px 0" }}></div>
          <p style={{}}>
            Nhắc đến Hublot, người ta nghĩ ngay đến một thương hiệu đồng hồ cao
            cấp Thụy Sĩ với những thiết kế độc đáo, táo bạo và luôn đi đầu trong
            xu hướng. Không chỉ nổi tiếng với những mẫu đồng hồ nam mạnh mẽ,
            Hublot còn ...
          </p>
        </Card>
        <Card
          style={{ width: "240px" }}
          size="small"
          cover={
            <img
              style={{
                alignItems: "center",
              }}
              alt="example"
              src={
                "https://www.euluxury.vn/data/new/dong_ho_Patek_Philippe_nu_(8).jpg"
              }
            />
          }
        >
          <h4 style={{ textAlign: "center" }}>
            Khám Phá Vẻ Đẹp Sang Trọng Của Đồng Hồ Patek
          </h4>
          <div style={{ borderTop: "1px solid #ccc", margin: "10px 0" }}></div>
          <p style={{}}>
            Nhắc đến đồng hồ cao cấp, không thể không nhắc đến thương hiệu Patek
            Philippe. Nổi tiếng với sự tinh xảo, sang trọng và đẳng cấp, Patek
            Philippe luôn là niềm khao khát của giới thượng lưu. Trong đó, đồng
            hồ ...
          </p>
        </Card>
        <Card
          style={{ width: "240px" }}
          size="small"
          cover={
            <img
              style={{
                alignItems: "center",
              }}
              alt="example"
              src={
                "https://www.euluxury.vn/data/new/dong_ho_Franck_Muller_nam_chinh_hang__(2).jpg"
              }
            />
          }
        >
          <h4 style={{ textAlign: "center" }}>
            Franck Muller nam chính hãng - Niềm tự hào của phái mạnh
          </h4>
          <div style={{ borderTop: "1px solid #ccc", margin: "10px 0" }}></div>
          <p style={{ borderTop: 300 }}>
            Đồng hồ Franck Muller nam chính hãng từ lâu đã được biết đến như một
            biểu tượng đẳng cấp dành cho phái mạnh. Với thiết kế độc đáo, chất
            lượng tuyệt vời và giá trị trường tồn theo thời gian, ...
          </p>
        </Card>
        <Card
          style={{ width: "240px" }}
          size="small"
          cover={
            <img
              style={{
                alignItems: "center",
              }}
              alt="example"
              src={
                "https://www.euluxury.vn/data/new/dong_ho_Rolex_nam__(4).jpg"
              }
            />
          }
        >
          <h4 style={{ textAlign: "center" }}>
            Đồng hồ Rolex nam - Biểu tượng của sự sang trọng
          </h4>
          <div style={{ borderTop: "1px solid #ccc", margin: "10px 0" }}></div>
          <p style={{ borderTop: 300 }}>
            Không chỉ là một chiếc đồng hồ thời trang, Rolex còn là một tài sản
            có giá trị. Những chiếc đồng hồ Rolex nam có thể giữ được giá trị
            của mình trong nhiều năm, thậm chí tăng ...
          </p>
        </Card>
        <Card
          style={{ width: "240px" }}
          size="small"
          cover={
            <img
              style={{
                alignItems: "center",
              }}
              alt="example"
              src={
                "https://www.euluxury.vn/data/new/dong_ho_Franck_Muller_full_kim_cuong_nu_(5).jpg"
              }
            />
          }
        >
          <h4 style={{ textAlign: "center" }}>
            Khám phá BST đồng hồ Franck Muller full kim cương
          </h4>
          <div style={{ borderTop: "1px solid #ccc", margin: "10px 0" }}></div>
          <p style={{ borderTop: 300 }}>
            Từ lâu, đồng hồ Franck Muller đã được biết đến như một thương hiệu
            đồng hồ cao cấp dành cho giới thượng lưu. Đồng hồ Franck Muller full
            kim cương được chế tác tỉ mỉ mang đến vẻ đẹp rực rỡ và thu hút mọi
            ...
          </p>
        </Card>
      </div>
      <Flex justify="center" style={{ marginTop: 20 }}>
        <Button style={{ border: "#100e0e solid 2px" }}>
          Xem thêm tin tức
        </Button>
      </Flex>
      <div style={{ borderTop: "1px solid #ccc", margin: "30px 0" }}></div>
    </S.HomeWrapper>
  );
}

export default HomePage;
