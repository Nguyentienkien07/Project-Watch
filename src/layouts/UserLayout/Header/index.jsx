import { Dropdown } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <div className="logo">
          <img
            className="image"
            src="https://img.freepik.com/premium-vector/luxury-watch-brand-logo_628554-9.jpg"
            alt=""
          />
          <h3>KWATCH</h3>
        </div>
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: <Link to={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>,
              },
              {
                key: "2",
                label: "My profile",
              },
              {
                key: "3",
                label: "Logout",
              },
            ],
          }}
        >
          <div>Avatar</div>
        </Dropdown>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default Header;
