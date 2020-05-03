import styled from "styled-components";
import {Image} from "@solid/react";

export const ProfileWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-image: url("./img/concentric-hex-pattern_2x.png");
  background-repeat: repeat;
  padding: 60px 0;
`;
export const ProfileContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  margin: 0 20px;
  width: 100%;
  flex: 1 0 auto;
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: rgba(7, 65, 102, 0.7);
  padding: 30px 20px;
`;

export const ImageRounded = styled(Image)`
  border-radius: 50%;
`;

export const FormRenderContainer = styled.div`
  border: 1px solid #dae0e6;
  min-height: 40px;
  padding: 20px 40px 0px 40px;

`;
