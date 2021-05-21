import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { client } from "../utils";
import useInput from "../hooks/useInput";
import { UserContext } from "../context/UserContext";
import logo from "../assets/logo.png";
import FacebookLogin from 'react-facebook-login';
import { FacebookIcon } from "./Icons"
export const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.white};
  padding: 1rem;
  width: 350px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 6rem auto;
  text-align: center;
  padding: 2rem 0;

  img {
    margin-bottom: 1.5rem;
  }

  input {
    display: block;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 0.8rem 1rem;
    background: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.borderColor};
    font-family: "Fira Sans", sans-serif;
    font-size: 0.8rem;
    border-radius: 4px;
    width: 85%;
    background-color: #F5F5F5;
  }

  input[type="submit"] {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.blue};
    cursor: pointer;
    font-weight: 500;
  }

  p {
    margin-top: 2rem;
  }

  span {
    color: ${(props) => props.theme.blue};
    cursor: pointer;
  }
  .btnFacebook{
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: #4267B2;
    font-weight: 600;
    cursor: pointer;
    margin-left: 0.5rem;
  }
  .left{
    float:left;
     width: 30%;
    margin-left: 10%;
    margin-top: 3%;
  }
  .right{
    float:right; 
    margin-top: 3%;
    margin-right: 10%;
    width: 30%;
  }
  .or{
    color: gray;
  }
  .facebook__login{
    margin-top: 2rem;
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Login = ({ signup }) => {
  document.title = "Login • Instagram"
  const { setUser } = useContext(UserContext);
  const email = useInput("");
  const password = useInput("");
  const responseFacebook = async(res) => {
    const body = { email: res.email, type:"Facebook"}
    try {
      const { token } = await client("/auth/login", { body });
      localStorage.setItem("token", token);
    } catch (err) {
      return toast.error(err.message);
    }
    const user = await client("/auth/me");
    localStorage.setItem("user", JSON.stringify(user.data));
    setUser(user.data);
    toast.success("Login successful");

  }
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.value || !password.value) {
      return toast.error("Please fill in both the fields");
    }

    const body = { email: email.value, password: password.value, type:"Custom" };

    try {
      const { token } = await client("/auth/login", { body });
      localStorage.setItem("token", token);
    } catch (err) {
      return toast.error(err.message);
    }

    const user = await client("/auth/me");
    localStorage.setItem("user", JSON.stringify(user.data));
    setUser(user.data);
    toast.success("Login successful");

    email.setValue("");
    password.setValue("");
  };

  return (
    <FormWrapper onSubmit={handleLogin}>
      <img className="logo" src={logo} alt="logo" />
      <form>
        <input
          type="email"
          placeholder="Email address"
          value={email.value}
          onChange={email.onChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password.value}
          onChange={password.onChange}
        />
        <input type="submit" value="Log In" className="login-btn" />
        
      </form>
       <hr className="left"/> <span className="or">OR</span> <hr className="right"/>
       <div className="facebook__login">
       <FacebookIcon/>
        <FacebookLogin
        appId="478249153269572" 
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="btnFacebook"
        textButton = "Log In with Facebook"
        
      />
       </div>
      <div>
        <p>
          Don't have an account? <span onClick={signup}>Sign up</span>
        </p>
      </div>
    </FormWrapper>
  );
};

export default Login;
