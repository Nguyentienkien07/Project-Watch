import styled from "styled-components";

export const HeaderWrapper = styled.div`
  background-color: #353535;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
  padding: 8px 16px;

  .logo {
    display: inline-flex;
  }
  .image {
    width: 70px;
    height: 70px;
  }
  .logo h3 {
    margin: auto 15px;
    color: white;
  }
`;
