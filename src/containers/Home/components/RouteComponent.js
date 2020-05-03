import {React, Suspense} from "react";
import {
    HomeCard,
    RouteMap,
    RouteInfo
  } from "../home.style";
import gestorPOD from "../../../services/persistanceManagement";
import { useTranslation } from "react-i18next";

const Map = React.lazy(() => import("../../../Map"));
export default class RouteComponent extends React.Component {

    constructor() {
        super();
        this.state = { form: false };
    }

    async componentDidMount() {
        this.setState( {form: false }, () => {
            gestorPOD.seeRoutes().then((routes) => this.setState( { loading: false, routes: Array.from(routes)}) );
            
        });
    }

    loading() {
        return (
        <div>
            <h2>{this.props.loadingText}</h2>
        </div>
        );
    }

    loadFinished(props, t) {
    return(
        
        <HomeCard className="card">
          <RouteMap id="map">
            <Suspense fallback={<div>{t("home.loading_routes")}</div>}>
              <Map gpx={props.routeGPX}></Map>
            </Suspense>
          </RouteMap>
          <RouteInfo>
            <h2> {t("home.information")} </h2>
            <p id = {props.routeDescription}>
              {props.routeDescription}
            </p>
          </RouteInfo>
        </HomeCard> );
    }

    render() {
        const { loading } = this.state;
        const { t } = useTranslation(); 
        return (
            loading ? this.loading() : this.loadFinished(t)
        );
    }
}