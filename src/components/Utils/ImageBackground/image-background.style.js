import styled from "styled-components";

export const Image = styled.div`
  background-image: url("./img/login_background.gif");
  background-size:     cover;     /* to adjust screen size*/
  background-repeat:   no-repeat;


  &::before {
    content: "";
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

