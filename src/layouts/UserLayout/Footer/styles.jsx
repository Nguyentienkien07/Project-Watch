import styled from "styled-components";

export const FooterWrapper = styled.div`
  background-color: #131414;
  padding: 16px;

  color: white;
`;
export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1232px;

  padding: 16px;

  .container {
    padding: 0 30px 20px;
  }
  .container .title-content {
    font-size: 28px;
  }
  .container .title-shop {
    font-size: 35px;
    color: #a4afe3;
  }
  .container .content {
    padding-top: 15px;
  }
`;
