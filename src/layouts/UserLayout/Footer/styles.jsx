import styled from "styled-components";

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #353535;
  padding: 16px;
  color: white;
`;
export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;

  .container {
    padding: 0 30px 20px;
  }
  .container .title-content {
    font-size: 28px;
  }
  .container .title-shop {
    font-size: 35px;
    color: red;
  }
  .container .content {
    padding-top: 15px;
  }
`;
