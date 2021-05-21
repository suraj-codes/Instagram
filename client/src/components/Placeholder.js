import React from "react";
import styled from "styled-components";
import { BookmarkIcon, PostIcon } from "./Icons";

const Wrapper = styled.div`
  margin: auto;
  margin-top: 4rem;
  width: 450px;
  text-align: center;

  p {
    padding-top: 0.3rem;
  }

  svg{
    height: 50px;
    width: 50px;
    margin-bottom: 1rem;
  }
  .camera{
    
    height: 70px;
    width: 70px;
    margin-bottom: 1rem;
    border-radius: 50%;
    border: 1px solid #000;
    padding: 10px; 
  }
  @media screen and (max-width: 500px) {
    svg {
      height: 35px;
      width: 35px;
    }

    width: 350px;
  }
`;

const Placeholder = ({ icon, title, text }) => {
  return (
    <Wrapper>
      {icon === "bookmark" && <BookmarkIcon />}
      {icon === "post" && <PostIcon />}
      {icon === "camera" && <img src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/6-512.png" alt="..." className="camera"/>}
      {icon === "tagged" && <img className="camera" alt="..." src="https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_tagged-512.png"/>}
            <h2>{title}</h2>
      <p>{text}</p>
    </Wrapper>
  );
};

export default Placeholder;
