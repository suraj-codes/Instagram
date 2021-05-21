import React from "react";
import styled from "styled-components";
import { LoaderIcon } from "./Icons";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    height: 50px;
    width: 50px;
    fill: ${(props) => props.theme.secondaryColor};
  }

  @media screen and (max-width: 500px) {
    svg {
      height: 40px;
      width: 40px;
    }
  }
`;

const Loader = () => {
  return (
    <Wrapper>
      <LoaderIcon />
    </Wrapper>
  );
};

export default Loader;
