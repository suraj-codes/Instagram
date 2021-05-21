import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";
import { UserContext } from "../context/UserContext";
import navlogo from "../assets/navlogo.png";
import { HomeIcon, MessageIcon, HeartIcon, ExploreIcon } from "./Icons";

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${(props) => props.theme.white};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 0.3rem 0;
  z-index: 10;
  .nav-logo {
    position: relative;
    top: 6px;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 930px;
  }

  ul {
    display: flex;
    position: relative;
    top: 3px;
    list-style-type: none;
  }

  li {
    margin-left: 1.5rem;
  }

  @media screen and (max-width: 970px) {
    nav {
      width: 90%;
    }
  }

  @media screen and (max-width: 670px) {
    input {
      display: none;
    }
  }
`;

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <NavWrapper>
      <nav>
        <NavLink activeClassName="active" to="/">
          <img className="nav-logo" src={navlogo} alt="logo" />
        </NavLink>
        <Search />
        <ul>
          <li>
            <NavLink activeClassName="active" to="/">
              <HomeIcon />
            </NavLink>
          </li>
          <li>
            <MessageIcon />
          </li>
          <li>
            <NavLink activeClassName="active" to="/explore">
              <ExploreIcon />
            </NavLink>
          </li>
          <li>
            <HeartIcon />
          </li>
          <li>
            <NavLink activeClassName="active" to={`/${user.username}`}>
              <img
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
                src={user.avatar}
                alt="avatar"
              />
            </NavLink>
          </li>
        </ul>
      </nav>
    </NavWrapper>
  );
};

export default Nav;
