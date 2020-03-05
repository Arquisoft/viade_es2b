import React from 'react';
import { Link } from 'react-router-dom';
import { ProviderLogin } from '@inrupt/solid-react-components';
import { LoginWrapper, LoginPanel, PanelBody, LoginTitle } from './login.style';
import { CenterContainer } from '@util-components';
import { Provider } from '@services';

const LoginComponent = () => {
    return (
        <LoginWrapper data-testid="login-wrapper">
          <CenterContainer>
            <h1 data-testid="title">{t('login.title')}</h1>
            <LoginPanel className="login-panel">
              <PanelBody className="panel-body">
                <Link className="ids-link-filled ids-link-filled--primary" to="/register">
                  {'login.register'}
                </Link>
                <a
                  href="https://solid.inrupt.com/get-a-solid-pod"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                >
                  {'login.solidHelp'}
                </a>
                <LoginTitle data-testid="login-title">
                  <span>{t('login.loginTitle')}</span>
                </LoginTitle>
                <ProviderLogin
                  selectPlaceholder={t('login.selectPlaceholder')}
                  inputPlaholder={t('login.inputPlaholder')}
                  formButtonText={t('login.formButtonText')}
                  btnTxtWebId={t('login.btnTxtWebId')}
                  btnTxtProvider={t('login.btnTxtProvider')}
                  className="provider-login-component"
                  callbackUri={`${window.location.origin}/welcome`}
                  errorsText={{
                    unknown: 'login.errors.unknown',
                    webIdNotValid: 'login.errors.webIdNotValid',
                    emptyProvider: 'login.errors.emptyProvider',
                    emptyWebId: 'login.errors.emptyWebId'
                  }}
                  theme={{
                    buttonLogin: 'ids-link',
                    inputLogin: '',
                    linkButton: ''
                  }}
                  providers={Provider.getIdentityProviders()}
                />
              </PanelBody>
            </LoginPanel>
          </CenterContainer>
        </LoginWrapper>
      );
    };
    
    export default LoginComponent;


