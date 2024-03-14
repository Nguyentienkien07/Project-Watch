import styled from "styled-components";

export const HeaderWrapper = styled.div`
  background-color: #131414;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  z-index: 99;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1232px;
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
    color: #ffffff;
    font-size: 26px;
  }
  h4 {
    font-size: 16px;
    color: white;
    text-decoration: none;
  }
  h4:hover {
    color: #ffa940;
  }
`;
export const AvatarPreview = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
export const DropDow = styled.h4`
  &:hover {
    background-color: #ffa940;
  }
`;
