import React, { Suspense } from 'react';
//import { Uploader } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import manejadorPODs from '../../persistanceManagement'
import RouteList from './components/RouteList'
import FormRoute from './components/FormRoute/FormRoute'
import {
  HomeWrapper,
  HomeCard,
  HomeSidenav,
  HomeBody,
  RouteMap,
  RouteInfo,
  CenteredDiv
} from './home.style';
import Slider from './components/Slider'

const Map = React.lazy(() => import('../../Map'));

function loadMap(props, t) {

  return (
    <HomeCard className="card">
      <RouteMap id="map">
        <Suspense fallback={<div>{t('home.loading_routes')}</div>}>
          <Map gpx={props.routeGPX}></Map>
        </Suspense>
      </RouteMap>
      <RouteInfo>
        <h2> {t('home.information')} </h2>
        <p>
          {props.routeDescription}
        </p>
        <Slider imgs={props.routeImages}></Slider>
      </RouteInfo>
    </HomeCard>
  );

}

function loadForm() {
  return (
    <HomeCard className="card">
      <FormRoute></FormRoute>
    </HomeCard>
  );

}

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
        <h2>{t("home.routes")}</h2>
        <RouteList loadingText={t("home.loading_routes")} setRoute={props.setRoute} ></RouteList>

        <CenteredDiv >
          <button id= "btn_add" onClick={() => props.changeForm()}>
            {t("home.add_route")}
            </button>
            <span>   </span>
            <button onClick={async () => {
              await manejadorPODs.deleteRoutes();
              window.location.reload();
            }}>
              {t("home.delete_route")}
          </button>
        </CenteredDiv>
        <div id="Manage buttons">
         
        </div>
      </HomeSidenav>

      <HomeBody className="home-body">
        {props.needForm ? loadForm() : loadMap(props, t)}

      </HomeBody>
    </HomeWrapper>
  );
};
