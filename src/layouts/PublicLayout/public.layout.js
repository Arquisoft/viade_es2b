import React from "react";
import { Route, Link } from "react-router-dom";
import { useWebId } from "@inrupt/solid-react-components";
import styled from "styled-components";
import { NavBar, AuthNavBar, Footer } from "@components";
import { LanguageDropdown } from "@util-components";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  min-height: 100%;
  position: relative;
`;

const FooterContainer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;

  a {
    color: #074166; 
  } 
  `;

const PublicLayout = (props) => {
  const webId = useWebId();
  const { component: Component, ...rest } = props;
  const { t, i18n } = useTranslation();
  
  return (
    <Route
      {...rest}
      component={({ history, location, match }) => (
        <Container>
          {webId ? (
            <AuthNavBar {...{ history, location, match, webId }} />
          ) : (
            <NavBar
              {...{ history, location, match }}
              toolbar={[
                {
                  component: () => <LanguageDropdown {...{ t, i18n }} />,
                  id: "language"
                },
                {
                  component: () => <Link to="/login">Login</Link>,
                  label: "authComponent",
                  id: "authComponent"
                }
              ]}
            />
          )}
          <container {...{ history, location, match }} />
          <FooterContainer>
            <Footer />
          </FooterContainer>
        </Container>
      )}
    />
  );
};

export default PublicLayout;
