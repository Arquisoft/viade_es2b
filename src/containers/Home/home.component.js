import React, { Suspense } from "react";
import { Button } from "@material-ui/core";
//import { Uploader } from "@inrupt/solid-react-components";
import { useTranslation } from "react-i18next";
import manejadorPODs from "../../services/persistanceManagement";
import RouteList from "./components/RouteList";
import FormRoute from "./components/FormRoute/FormRoute";
import FormEditRoute from "./components/FormEditRoute/FormEditRoute";
import {
  HomeWrapper,
  HomeCard,
  HomeSidenav,
  HomeBody,
  RouteMap,
  RouteInfo,
  RouteHead
} from './home.style';
import Slider from './components/Slider'
import ShareComponent from './components/ShareComponent/ShareComponent'

const Map = React.lazy(() => import('../../Map'));



function loadMap(props, t) {
  return (
    <HomeCard className="card">
      <RouteMap id="map">
        <Suspense fallback={<div>{t("home.loading_routes")}</div>}>
          <Map gpx={props.routeGPX}></Map>
        </Suspense>
      </RouteMap>
      <RouteInfo>
        <RouteHead>
          <h2> {props.route !== undefined ? props.route.name : t("home.information")} </h2>
          {props.route !== undefined && !props.route.shared ? <ShareComponent route = {props.route}></ShareComponent> : <div></div>}
        </RouteHead>
        <p id={props.routeDescription}>
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

function loadEditForm(route) {
  return (
    <HomeCard className="card">
      <FormEditRoute route={route}></FormEditRoute>
    </HomeCard>
  );

} 

/**
 * Hom Page UI component, containing the styled components for the Hom Page
 * Image component will get theimage context and resolve the value to render.
 * @param props 
 */


export const HomePageContent = (props) => {
  const { t } = useTranslation(); /* se puede pasar un mensaje prefefinido a Trans o usar t */
  return (
    <HomeWrapper data-testid="home-wrapper">
      <HomeSidenav className="home-sidebar">
        <h2>{t("home.routes")}</h2>
        <RouteList privateRoutesText={t("home.private_routes")} publicRoutesText={t("home.public_routes")} sharedRoutesText={t("home.shared_routes")}
         setRoute={props.setRoute} changeEditForm={props.changeEditForm}></RouteList>
        <div id="Manage buttons">
          <Button name="add_route" variant="contained" color="primary" onClick={() => props.changeForm()}>
          {t("home.add_route")}
          </Button>
          <span>   </span>
          <Button name="delete_all_routes" variant="contained" color="secondary" onClick={async () => {
            await manejadorPODs.deleteRoutes(false, true);
            await manejadorPODs.deleteRoutes(true);
            window.location.reload();
          }}>
            {t("home.delete_route")}
        </Button>
        </div>
      </HomeSidenav>

      <HomeBody className="home-body">
         {(props.needEditForm ? loadEditForm(props.route) : props.needForm ? loadForm() : loadMap(props, t))}
      </HomeBody>
    </HomeWrapper>
  );
};
