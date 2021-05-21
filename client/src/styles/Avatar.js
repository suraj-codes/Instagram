import styled, { css } from "styled-components";

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1rem;

  ${(props) =>
    props.lg &&
    css`
      width: 56px;
      height: 56px;
      border-radius: 28px;
    `}
`;

export default Avatar;
