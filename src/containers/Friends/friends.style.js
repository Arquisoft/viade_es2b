import styled from "styled-components";
import Panel from "/components/Utils/Panel";

/**
 * A styled-component for the Friends Page layout
 */
export const FriendsWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-image: url("./img/concentric-hex-pattern_2x.png");
  background-repeat: repeat;
  display: flex;
  overflow-x:hidden;
  overflow-y:hidden;
  h3{
    text-align: center;
  }
`;

/**
 * A styled-component for the Friends Page content section
 */
export const FriendsCard = styled(Panel)`
  width:90%;
  margin: 5%;
`;
