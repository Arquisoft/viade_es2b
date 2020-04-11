import React, { Suspense } from 'react';
//import { Uploader } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import manejadorPODs from '../../persistanceManagement'
import { Link } from 'react-router-dom';
import {
  HomeWrapper,
  HomeCard,
  HomeSidenav,
  HomeBody,
  RouteMap,
  RouteInfo
} from './home.style';
import RouteList from './components/RouteList';
import 'leaflet/dist/leaflet.css';
const Map = React.lazy(() => import('../../Map'));

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
        <h2> {t('home.routes')}</h2>
        <Link className="add_route" to="/route-form">
              {t('home.add_route')}
        </Link>
        <Suspense fallback={<div>{t('home.loading_routes')}</div>}>
          <RouteList setRoute = {props.setRoute} ></RouteList>
        </Suspense>
        <button onClick={() => manejadorPODs.deleteRoutes()}>
          {t('home.delete_routes')}
        </button>
      </HomeSidenav>
      <HomeBody className="home-body">
        <HomeCard className="card">
          <RouteMap id="map">
            <Suspense fallback={<div>{t('home.loading_routes')}</div>}>
              <Map gpx = { props.routeGPX }></Map>
            </Suspense>
          </RouteMap>
          <RouteInfo>
            <h2> {t('home.information')} </h2>
            <p>
              {props.routeDescription}
            </p>
          </RouteInfo>
        </HomeCard>
      </HomeBody>
    </HomeWrapper>
  );
};
