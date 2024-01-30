import { Link } from "react-router-dom";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function HomePage() {
  return (
    <S.HomeWrapper>
      <div>
        <Link to={ROUTES.USER.PRODUCT_LIST}> danh sach san pham hublot</Link>
      </div>
      <div>
        <Link to={ROUTES.USER.PRODUCT_LIST}> danh sach san pham rolex</Link>
      </div>
    </S.HomeWrapper>
  );
}

export default HomePage;
