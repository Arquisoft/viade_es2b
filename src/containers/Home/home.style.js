import styled from "styled-components";

export const HomeWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-image: url("./img/concentric-hex-pattern_2x.png");
  background-repeat: repeat;
  display: flex;
`;

export const HomeSidenav = styled.div`
  background-color: #fff;
  min-width:20%;
  max-width:20%;
  padding: 2%;

  justify-content: space-between;
  flex-direction: column;
  display: flex;

  a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
  }
  p {
    color: #000;
  }
`;

export const HomeBody = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width:100%;
`;

export const HomeCard = styled.div`
  justify-content: center;
  align-items: center;
  background-color: #fff;
  max-width: 95%;
  margin: 2% auto;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const RouteMap = styled.div`
  height: 300px;
  margin: 2%;
  line-height: 300px;
  text-align: center;
  width:95%;
  .leaflet-container {
    height: 300px;
    width: 100%;
  }
`;

export const RouteInfo = styled.div`
  margin: 2%;
  width:95%;
`;

export const CenteredDiv = styled.div`
  padding: 5%;
  bottom: 0;
  display:inline-block;
  text-align: center;
`;