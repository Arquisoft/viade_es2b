import styled from 'styled-components';

/**
 * A styled-component for the add route form
 */
export const RouteFormWrapper = styled.section`
width: 100%;
background-image: url('./img/concentric-hex-pattern_2x.png');
background-repeat: repeat;
display: flex;
`;

/**
 * A styled-component for the 404 Page content section
 */
export const RouteFormContent = styled.div`
  max-width: 54%;
  margin: 100px 40px 0 50px;

  @media only screen and (max-width: 900px) {
    max-width: 100%;
    margin: 20px 40px;
    text-align: center;
  }

  @media only screen and (max-width: 600px) {
    img {
      width: 100%;
    }
  }
`;
