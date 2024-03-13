import styled from "styled-components";

export const ProductListWrapper = styled.div`
  margin: 0 auto;
  padding-bottom: 16px;
  max-width: 1232px;
`;
export const ProductTitle = styled.h2`
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.truncateMultiLine || 1};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 48px;
  font-size: 20px;
  text-align: center;
`;

export const ProductPrice = styled.h4`
  font-size: 16px;
  color: #ffc069;
  text-align: center;
`;
