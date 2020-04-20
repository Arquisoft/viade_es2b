import styled from "styled-components";
import { Panel, ImageBackground } from "@util-components";

export const LoginWrapper = styled(ImageBackground)`
  height: 100%;


  position: relative;
  padding-top: 4%;

  h1 {
    color: #ffffff;
    font-size:250%;
  }

`;

export const LoginPanel = styled(Panel)`
  width: 45%;
  float: left;
  margin-left: 20%;
  margin-bottom:10%;
`;

export const PanelBody = styled.div`
  display: grid;
  flex-direction: column;

  .ids-button-filled--primary, .ids-link-filled--primary {
    background:#074166;
    color: #fff;
  }
  .ids-button-filled--primary:hover, .ids-link-filled--primary:hover {
    background:#fff;
    border: 2px solid #074166;
    color:#074166;
  }
  .provider-login-component {
    div[role="option"] {
      text-align: left;
      padding-left: 20px;
    }
  }
`;

export const LoginTitle = styled.span`
  color:#074166;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.2px;
  line-height: 19px;
  text-align: center;
  position: relative;
  margin: 30px 0;
  display: inline-block;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    width: 32%;
    content: "";
    background: #074166;
    height: 1px;
    box-sizing: border-box;
    top: 50%;
  }

  span {
    padding: 0 5px;
  }

  &::before {
    right: 0;
  }

  &::after {
    left: 0;
  }
`;

export const AboutWrapper = styled.div`
  width: 100%;
  background-image: url("./img/concentric-hex-pattern_2x.png");
  background-repeat: repeat;
  display: flex;
`;

export const AboutPanel = styled(Panel)`
  width: 90%;
  margin-top:5%;
  margin-bottom:5%;
  display: flex;
  position:relative;
`;

export const TeamCard = styled.div`
  display: grid;
  flex-direction: column;
  padding: 5%,
  margin-bottom: 5%;
  text-align:center;
`;
