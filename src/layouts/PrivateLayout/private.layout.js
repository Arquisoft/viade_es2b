import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { withAuthorization } from "@inrupt/solid-react-components";
import { AuthNavBar, Footer } from "@components";
import { permissionHelper } from "@utils";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-top: 60px;
  flex: 1 0 auto;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
`;

const FooterContainer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;

  a {
    color: #074166; 
  } 
  `;

const PrivateLayout = ({ routes, webId, location, history, ...rest }) => {
  const { t } = useTranslation();
  const errorMessages = {
    message: t("appPermission.message"),
    title: t("notifications.error"),
    label: t("appPermission.link.label"),
    href: t("appPermission.link.href")
  };

  useEffect(() => {
    if (webId) {
      permissionHelper.checkPermissions(webId, errorMessages);
    }
  }, [webId]);

  return (
    <React.Fragment>
      <Container>
        <Route
          {...rest}
          component={({ history }) => (
            <Content className="contentApp">
              <AuthNavBar {...{ location, webId, history }} />
              <Switch>
                {routes.map( (route) => {
                  const { component: RouteComponent } = route;
                  return (
                    <Route
                      key={route.id}
                      path={route.path}
                      render={(routerProps) => <RouteComponent {...routerProps} webId={webId} />}
                      webId={webId}
                      exact
                    />
                  );
                })}
                <Redirect to="/404" />
              </Switch>
            </Content>
          )}
        />
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </Container>
    </React.Fragment>
  );
};
/*redirect to private if its authenticated, to login otherwise */
export default withAuthorization(PrivateLayout);
