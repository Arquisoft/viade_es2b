import React, { Suspense } from "react";
import { Button, ButtonGroup, Paper } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@material-ui/core/styles';
import manejadorPODs from "../../services/persistanceManagement";
import RouteList from "./components/RouteList";
import FormRoute from "./components/FormRoute/FormRoute";
import FormEditRoute from "./components/FormEditRoute/FormEditRoute";
import {
  HomeWrapper,
  HomeCard,
  HomeBody,
  RouteMap,
  RouteInfo,
  RouteHead
} from "./home.style";
import Slider from "./components/Slider";
import ShareComponent from "./components/ShareComponent/ShareComponent";

const Map = React.lazy(() => import("../../Map"));





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
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <HomeWrapper data-testid="home-wrapper">
      <Paper style={{width:"30%", minWidth:"fit-content", maxHeight:"100%", overflow: "auto"}}>
        <h2 style={{paddingLeft: "14px", marginBlockEnd: "0.4em"}}>{t("home.routes")}</h2>
        <RouteList privateRoutesText={t("home.private_routes")} publicRoutesText={t("home.public_routes")} 
          sharedRoutesText={t("home.shared_routes")} setRoute={props.setRoute} changeEditForm={props.changeEditForm}> 
        </RouteList>
        <ButtonGroup style={{boxShadow: "none"}} className={classes.ButtonGroup} variant="contained" color="primary" size="small"> 
          <Button startIcon={<AddIcon />} onClick={() => props.changeForm()}>
          {t("home.add_route")}
          </Button>
          <Button color="secondary" startIcon={<DeleteIcon />} onClick={async () => {
            await manejadorPODs.deleteRoutes(false, true);
            await manejadorPODs.deleteRoutes(true);
            window.location.reload();}}>
            {t("home.delete_route")}
          </Button>
        </ButtonGroup>
      </Paper>

      <HomeBody className="home-body">
         {(props.needEditForm ? loadEditForm(props.route) : props.needForm ? loadForm() : loadMap(props, t))}
      </HomeBody>
    </HomeWrapper>
  );
};

// Styles for Material UI
const useStyles = makeStyles(() => ({
  ButtonGroup: {
    display: 'flex',
    justifyContent: 'center'
  },
}));
