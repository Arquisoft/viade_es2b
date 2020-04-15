import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withTranslation, useTranslation } from 'react-i18next';
import { NavBar, Footer } from '@components';
import { withWebId } from '@inrupt/solid-react-components';
import { GradientBackground, LanguageDropdown } from '@util-components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled(GradientBackground)`

height: 100%;
height: -webkit-fill-available;

  position: relative;
  padding-top: 4%;
`;

const FooterContainer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;

  a {
    color: #074166; 
  }
  
`;

const BodyContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const NotLoggedInLayout = props => {
  const { component: Component, webId, ...rest } = props;
  const { t } = useTranslation();
  return !webId ? (
    <Route
      {...rest}
      component={matchProps => (
        <BodyContainer>
            <NavBar 
              {...matchProps}
              toolbar={[             {
                component: () => 
                <a href="https://arquisoft.github.io/viade_es2b/docs">
                    {t('navBar.documentation')}
                </a>
                },
                {
                  component: () => 
                  <Link to="/about" className="about-us">
                      {t('navBar.about')}
                  </Link>
                },
                {
                  component: () => <LanguageDropdown {...{ t, ...props }} />,
                  id: 'language'
                }
              ]}
            />
            <Container>
              <Component {...matchProps} />
            </Container>
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
