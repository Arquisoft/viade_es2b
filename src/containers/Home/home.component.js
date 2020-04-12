import React, { Suspense } from 'react';
//import { Uploader } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import manejadorPODs from '../../persistanceManagement'
import {
  HomeWrapper,
  HomeCard,
  HomeSidenav,
  HomeBody,
  RouteMap,
  RouteInfo,
  CenteredDiv
} from './home.style';

const Map = React.lazy(() => import('../../Map'));
const RouteList = React.lazy(() => import('./components/RouteList'))
const RouteComponent = React.lazy(()=> import('./components/RouteComponent'))

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
        <h2>{t('home.routes')}</h2>
        <RouteList loadingText={t("home.loading_routes")} setRoute={props.setRoute} ></RouteList>
        <CenteredDiv>
          <button onClick={() => ""}>
            {t('home.add_route')}
          </button>
          <span>   </span>
          <button onClick={() => manejadorPODs.deleteRoutes()}>
            {t('home.delete_routes')}
          </button>
        </CenteredDiv>
      </HomeSidenav>

      <HomeBody className="home-body">
      {/* content shoud change according to state*/}

      <HomeCard className="card">
          <RouteMap id="map">
            <Suspense fallback={<div>{t('home.loading_routes')}</div>}>
              <Map gpx={props.routeGPX}></Map>
            </Suspense>
          </RouteMap>
          <RouteInfo>
            <h2> {t('home.information')} </h2>
             
             <p>{props.routeDescription}</p>
            
          </RouteInfo>
        </HomeCard>
      </HomeBody>
    </HomeWrapper>
  );
};
