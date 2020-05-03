/* eslint-disable constructor-super */
import React from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { ProviderLogin } from "@inrupt/solid-react-components";
import { LoginWrapper, LoginPanel, PanelBody, LoginTitle, AboutWrapper, AboutPanel, TeamCard } from "./login.style";
import { CenterContainer} from "@util-components";
import { Provider } from "@services";
import { Grid} from "@material-ui/core";


const LoginComponent = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
       {/*HERE STARTS THE LOGIN SUBCATEGORY OF THE LANDING PAGE */}
      <LoginWrapper data-testid="login-wrapper" id="login">
          <CenterContainer>
            <h1 data-testid="title">{t("login.title")}</h1>
            <LoginPanel className="login-panel">
              <PanelBody className="panel-body">
                <Link className="ids-link-filled ids-link-filled--primary" to="/register">
                  {t("login.register")}
                </Link>
                <a
                  href="https://solid.inrupt.com/get-a-solid-pod"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  {t("login.solidHelp")}
                </a>
                <LoginTitle data-testid="login-title">
                  <span>{t("login.loginTitle")}</span>
                </LoginTitle>
                <ProviderLogin
                  selectPlaceholder={t("login.selectPlaceholder")}
                  inputPlaholder={t("login.inputPlaholder")}
                  formButtonText={t("login.formButtonText")}
                  btnTxtWebId={t("login.btnTxtWebId")}
                  btnTxtProvider={t("login.btnTxtProvider")}
                  className="provider-login-component"
                  callbackUri={`${window.location.origin}/viade_es2b/#/home`}
                  errorsText={{
                    unknown: t("login.errors.unknown"),
                    webIdNotValid: t("login.errors.webIdNotValid"),
                    emptyProvider: t("login.errors.emptyProvider"),
                    emptyWebId: t("login.errors.emptyWebId")
                  }}
                  theme={{
                    buttonLogin: "ids-link",
                    inputLogin: "",
                    linkButton: ""
                  }}
                  providers={Provider.getIdentityProviders()}
                />
             </PanelBody>
            </LoginPanel>
        </CenterContainer>
      </LoginWrapper>
      {/*HERE STARTS THE ABOUT SUBCATEGORY OF THE LANDING PAGE */}
      <AboutWrapper id="about" data-testid="about-section">
        <AboutPanel>
          <h2> {t("navBar.about")}</h2>
          <Trans i18nKey="about.team">
              <p>
                We are a group of students who developed a decentralizedroute app as an asignment for 
                <a
                  href="https://arquisoft.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ASW course
                </a>
              at University of Oviedo.
              </p>
            </Trans>

           {/* As there are 5 members 2 rows are needed, with different width*/}
          <Grid container spacing={6}>
            {/*Dani"s card*/}
            <Grid item xs={12} md={6}>
              <TeamCard>
                <div className="img-container">
                  <img
                    src="./img/team/dani.png"
                    alt="Daniel Fernández Aller"
                  />
                </div>
                <a href="https://github.com/daniferna">Daniel Fernández Aller</a> 
                <p><strong>{t("about.dani.rol")}</strong> <br/>{t("about.dani.description")}</p>
                
              </TeamCard>
            </Grid>
            {/*Angela"s card*/}
            <Grid item xs={12} md={6}>
              <TeamCard>
                <div className="img-container">
                  <img
                    src="./img/team/angela.png"
                    alt="Ángela López López"
                  />
                </div>
                <a href="https://github.com/Ainiall">Ángela López López</a> 
                <p><strong>{t("about.angela.rol")}</strong> <br/>{t("about.angela.description")}</p>
              </TeamCard>
            </Grid>
          </Grid>
           {/*Second row*/}
          <Grid container spacing={5}>
            {/*Ivan"s card*/}
            <Grid item xs={12} md={4}>
              <TeamCard>
                <div className="img-container">
                  <img
                    src="./img/team/ivan.png"
                    alt="Iván Fernández López"
                  />
                </div>
                <a href="https://github.com/uo265349">Iván Fernández López</a> 
                <p><strong>{t("about.ivan.rol")}</strong> <br/>{t("about.ivan.description")}</p>
              </TeamCard>
            </Grid>
            {/*Diego"s card*/}
            <Grid item xs={12} md={4}>
              <TeamCard>
                <div className="img-container">
                  <img
                    src="./img/team/diego.png"
                    alt="Diego Fernández Suárez"
                  />
                </div>
                <a href="https://github.com/UO263662">Diego Fernández Suárez</a> 
                <p><strong>{t("about.diego.rol")}</strong> <br/>{t("about.diego.description")}</p>
              </TeamCard>
            </Grid>
            {/*Noe"s card*/}
            <Grid item xs={12} md={4}>
              <TeamCard>
                <div className="img-container">
                  <img
                    src="./img/team/noe.png"
                    alt="Noé Fernández Moro"
                  /> 
                </div>
                <a href="https://github.com/UO251683">Noé Fernández Moro</a> 
                <p><strong>{t("about.noe.rol")}</strong> <br/>{t("about.noe.description")}</p>
              </TeamCard>
            </Grid>
          </Grid>
        </AboutPanel>   
      </AboutWrapper>
  </React.Fragment>
  
  );
};

export default LoginComponent;
