import React from 'react';
import { Uploader } from '@inrupt/solid-react-components';
import { Trans, useTranslation } from 'react-i18next';
import {
  HomeWrapper,
  HomeCard,
  HomeLogo,
  HomeProfile,
  HomeDetail,
  HomeName,
  ImageWrapper
} from './home.style';
import { ImageProfile } from '@components';
import { errorToaster } from '@utils';

/**
 * Hom Page UI component, containing the styled components for the Hom Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const HomePageContent = props => {
  const { webId, image, updatePhoto, name } = props;
  const { t } = useTranslation();
  const limit = 2100000;
  return (
    <HomeWrapper data-testid="home-wrapper">
      <HomeCard className="card">
        <HomeLogo data-testid="home-logo">
          <img src="/img/logo.svg" alt="Inrupt" />
        </HomeLogo>
        <HomeProfile data-testid="home-profile">
          <h3>
            {t('home.home')}, <HomeName>{name}</HomeName>
          </h3>
          <ImageWrapper>
            <Uploader
              {...{
                fileBase: webId && webId.split('/card')[0],
                limitFiles: 1,
                limitSize: limit,
                accept: 'jpg,jpeg,png',
                errorsText: {
                  sizeLimit: t('home.errors.sizeLimit', {
                    limit: `${limit / 1000000}Mbs`
                  }),
                  unsupported: t('home.errors.unsupported'),
                  maximumFiles: t('home.errors.maximumFiles')
                },
                onError: error => {
                  if (error && error.statusText) {
                    errorToaster(error.statusText, t('home.errorTitle'));
                  }
                },
                onComplete: uploadedFiles => {
                  updatePhoto(
                    uploadedFiles[uploadedFiles.length - 1].uri,
                    t('Hom.uploadSuccess'),
                    t('Hom.successTitle')
                  );
                },
                render: props => (
                  <ImageProfile
                    {...{
                      ...props,
                      webId,
                      photo: image,
                      text: t('home.upload'),
                      uploadingText: t('home.uploadingText')
                    }}
                  />
                )
              }}
            />
          </ImageWrapper>
        </HomeProfile>
      </HomeCard>
      <HomeCard className="card">
        <HomeDetail data-testid="home-detail">
          <Trans i18nKey="home.title">
            <h3>
              title
              <a
                href="https://github.com/inrupt/solid-react-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
            </h3>
          </Trans>
          <Trans i18nKey="home.description">
            <p>
              text
              <a
                href="https://github.com/inrupt/solid-react-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                link{' '}
              </a>{' '}
              text
            </p>
          </Trans>
          <Trans i18nKey="home.libraryList">
            <ul>
              <li>
                <a
                  href="https://github.com/inrupt/solid-react-components"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reusable Components
                </a>
                that you can use on your own in the applications that you build.
              </li>
              <li>
                <a
                  href="https://github.com/inrupt/generator-solid-react"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Application Generator
                </a>
                that incorporates all of the components and best practices together for you,
                standing up THIS fully functional Solid React application. Note: The Solid React
                application illustrates the use of the components installed by the Generator. It
                should not be considered as a service provided by inrupt, and is subject to change.
              </li>
              <li>
                Best practice patterns that you can reference as examples of how to accomplish
                particular things.
              </li>
            </ul>
          </Trans>

          <Trans i18nKey="home.evolvingMessage">
            <p>
              The SDK is continually evolving. Take a look at the
              <a
                href="https://github.com/inrupt/solid-react-sdk/tree/master#release-timeline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Release Timeline
              </a>
              for what’s been implemented as part of the previous releases, and what's currently
              planned.
            </p>
          </Trans>
          <p>{t('home.version050')}</p>
          <h3>{t('home.fairUsageTitle')}</h3>
          <p>{t('home.fairUsageText')}</p>
          <Trans i18nKey="Hom.fairUsageExamples">
            <ul>
              <li>
                If your application is Solid compatible, you can use the Solid logo to indicate
                that. If not, please don’t misrepresent yourself by using the Solid logo.
              </li>
              <li>
                Please don't use the inrupt name as a part of your company name, website name,
                domain name, service name, or app name. Don't use our logo as your own or modify it
                to fit into your own logo.
              </li>
              <li>
                If you’d like, you may use the inrupt logo to indicate that your application is
                powered by inrupt’s SDK, but please make sure the context is clear to the user. Your
                own logo should always be larger than inrupt’s logo, for example.
              </li>
            </ul>
          </Trans>
          <p>{t('home.fairUsageSummary')}</p>
          <h3>{t('home.contactUsTitle')}</h3>
          <Trans i18nKey="home.contactUsText">
            <p>
              If you have additional questions about the use of the React SDK for Solid, the
              Application Generator, or inrupt’s brand, please contact
              <a href="mailto:support@inrupt.com">support@inrupt.com</a>.
            </p>
          </Trans>
        </HomeDetail>
      </HomeCard>
    </HomeWrapper>
  );
};
