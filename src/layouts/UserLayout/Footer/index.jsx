import * as S from "./styles";

import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

function Footer() {
  return (
    <S.FooterWrapper>
      <S.FooterContainer>
        <div className="container">
          <div className="title-shop">K-Watch</div>
          <div className="content">Khuyến mãi và ưu đãi</div>
          <div className="content">
            <input placeholder="nhập email" type="text" />
            <button>Đăng ký</button>
          </div>
          <div className="content">
            <TwitterOutlined />
            <FacebookOutlined />
            <InstagramOutlined />
            <LinkedinOutlined />
          </div>
        </div>
        <div className="container">
          <div className="title-content">Thông tin liên hệ</div>
          <div className="content">712 Lý Tự Trọng Phường 15 Quận 1 TP.HCM</div>
          <div className="content">0906484538</div>
          <div className="content">kwatch777@gmail.com</div>
          <div className="content">kwatch.media.com</div>
          <div className="content">linkedin.com/kwatch</div>
        </div>
        <div className="container">
          <div className="title-content">Liên Kết</div>
          <div className="content">Giới thiệu</div>
          <div className="content">Đồng hồ nam</div>
          <div className="content">Đồng hồ nữ</div>
          <div className="content">Blogs</div>
          <div className="content">Liên hệ</div>
        </div>
        <div className="container">
          <div className="title-content">Hỗ Trợ</div>
          <div className="content">Hướng dẫn mua hàng</div>
          <div className="content">Hướng dẫn thanh toán</div>
          <div className="content">Chính sách bảo hành</div>
          <div className="content">Chính sách đổi trả</div>
          <div className="content">Tư vấn khách hàng</div>
        </div>
      </S.FooterContainer>
    </S.FooterWrapper>
  );
}

export default Footer;
