import styled from "styled-components";
import { ImageBackground, Panel } from "@util-components";

export const RegisterWrapper =  styled(ImageBackground)`
  padding-top: 4%;
  padding-bottom: 4%;
`;

export const RegisterPanel = styled(Panel)`
  justify-content: space-between;
  margin-top: 30px;
`;

export const PanelHeader = styled.div`
  position: relative;

  h2 {
    position: relative;
    padding: 0;
    color: #074166;
    font-family: Raleway;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.75px;
    line-height: 24px;
    text-align: center;
    margin: 0;
    animation: fadeIn 0.5s ease-in;
  }

  .progress-bar {
    position: absolute;
    height: 1px;
    width: 100%;
    background: #074166;
    top: 30px;
  }
`;

export const PanelBody = styled.div`
  height: 100%;
  animation: fadeIn 0.2s ease-in;

  a {
    display: block;
    color: #074166;
    font-family: Raleway;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.75px;
    line-height: 14px;
    text-align: center;
    text-decoration: none;

    &:hover {
      font-weight: 700;
    }
  }

  .a-with-spacing {
    margin: 24px 0;
  }

  ul {
    padding: 0;
    margin: 0;
  }
`;

export const Actions = styled.div`
  height: 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  button {
    height: 32px;
    width: 150px;
    border-radius: 4px;
    font-family: Raleway;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0.89px;
    line-height: 11px;
    text-align: center;
    text-transform: uppercase;
    border: solid 2px #074166;
    box-sizing: border-box;
  }

  .btn-solid {
    background-color: #074166;
    color: #ffffff;
  }

  .btn-outlined {
    background-color: #ffffff;
    color: #074166;
    filter: opacity(40%);
  }
`;
