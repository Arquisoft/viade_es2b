import React, { Suspense } from 'react';
//import { Uploader } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import {
  HomeWrapper,
  HomeCard,
  HomeSidenav,
  HomeBody,
  RouteMap,
  RouteInfo
} from './home.style';
import RouteList from './components/RouteList'

/**
 * Hom Page UI component, containing the styled components for the Hom Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */

export const HomePageContent = props => {
  const { t } = useTranslation(); /* se puede pasar un mensaje prefefinido a Trans o usar t */
  return (
    <HomeWrapper data-testid="home-wrapper">
      <HomeSidenav className="home-sidebar">
        <p> Menu donde se muestra la coleccion de rutas</p>
        <Suspense fallback={<div>{t('home.loading_routes')}</div>}>
          <RouteList></RouteList>
        </Suspense>
      </HomeSidenav>
      <HomeBody className="home-body">
        <HomeCard className="card">
          <RouteMap className="map">
            <div>Aqui se deberia carga el mapa con la ruta</div>
          </RouteMap>
          <RouteInfo>
            <h2> {t('home.information')} </h2>
            <p>
              { t('home.ej_information') }
              </p>
          </RouteInfo>
        </HomeCard>
      </HomeBody>
    </HomeWrapper>
  );
};
