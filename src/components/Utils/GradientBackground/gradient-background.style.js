import styled from 'styled-components';

export const Gradient = styled.div`
  background-image: url('./img/login_background.gif');
  background-size:     cover;                      /* <------ */
  background-repeat:   no-repeat;
  background-position: bottom;  

  &::before {
    content: '';
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
