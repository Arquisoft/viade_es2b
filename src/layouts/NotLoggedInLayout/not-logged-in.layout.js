import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import { NavBar, Footer } from "@components";
import { withWebId } from "@inrupt/solid-react-components";
import {LanguageDropdown } from "@util-components";
import styled from "styled-components";
import { HashLink as Link } from "react-router-hash-link";

const FooterContainer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;

  a {
    color: #074166; 
  }
  
`;

const BodyContainer = styled.div`
  position: relatives;
  width: 100%;
`;

const NotLoggedInLayout = (props) => {
  const { component: Component, webId, ...rest } = props;
  const { t } = useTranslation();
  // If user has webId redirects to /home, otherwise 
  return !webId ? (
    <Route
      {...rest}
      component={(matchProps) => (
        <BodyContainer>
            <NavBar 
              {...matchProps}
              toolbar={[             {
                component: () => 
                <a href="https://arquisoft.github.io/viade_es2b/docs"> 
                    {t("navBar.documentation")}
                </a> 
                },
                {
                  component: () => 
                  <Link to="#about" className="about-us">
                      {t("navBar.about")}
                  </Link>
                },
                {
                  component: () => <LanguageDropdown {...{ t, ...props }} />,
                  id: "language"
                }
              ]}
            />
            <div>
              <Component {...matchProps} />
            </div>
            <FooterContainer>
              <Footer />
            </FooterContainer>
        </BodyContainer>
      )}
    />
  ) : (
    <Redirect to="/home" />
  );
};

export default withTranslation()(withWebId(NotLoggedInLayout));
