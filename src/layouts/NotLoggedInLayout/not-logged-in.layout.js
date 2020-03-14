import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withTranslation, useTranslation } from 'react-i18next';
import { NavBar, Footer } from '@components';
import { withWebId } from '@inrupt/solid-react-components';
import { LanguageDropdown } from '@util-components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
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

const NotLoggedInLayout = props => {
  const { component: Component, webId, ...rest } = props;
  const { t } = useTranslation();
  return !webId ? (
    <Route
      {...rest}
      component={matchProps => (
        <body>
            <NavBar 
              {...matchProps}
              toolbar={[             {
                component: () => 
                <Link to="/viade_es2b/docs/">
                    {t('navBar.documentation')}
                </Link>
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
        </body>
      )}
    />
  ) : (
    <Redirect to="/home" />
  );
};

export default withTranslation()(withWebId(NotLoggedInLayout));
