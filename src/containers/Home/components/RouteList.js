import React from "react";
import { Button, IconButton, CircularProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import gestorPOD from "../../../services/persistanceManagement";

export default class RouteList extends React.Component {

    constructor() {
        super();
        this.state = { loadingPrivate: true, loadingPublic: true, routes: [], publicRoutes: [] };
        this.loadingPrivate = this.loadingPrivate.bind(this);
        this.loadingPublic = this.loadingPublic.bind(this);
        this.loadingPrivateFinished = this.loadingPrivateFinished.bind(this);
        this.loadingPublicFinished = this.loadingPublicFinished.bind(this);
    }

    async componentDidMount() {
        this.setState({ loadingPrivate: true, loadingPublic: true }, async () => {
            gestorPOD.seeRoutes().then((routes) => this.setState({ routes: Array.from(routes), loadingPrivate: false }));
            gestorPOD.seeRoutes(false).then((routes) => this.setState({ publicRoutes: Array.from(routes), loadingPublic: false }));
        });
    }

    loadingPrivate() {
        return (
            <div>
                <h3>{this.props.privateRoutesText}</h3>
                <CircularProgress></CircularProgress>
            </div>
        );
    }

    loadingPublic() {
        return (
            <div>
                <h3>{this.props.publicRoutesText}</h3>
                <CircularProgress></CircularProgress>
            </div>
        );
    }

    loadingPublicFinished() {
        return (<div><h3>{this.props.publicRoutesText}</h3>
            <ul>
                {this.state.publicRoutes.map((route) => (
                    <li id="container_route" key={route.id}>
                        <Button color="primary" onClick={() => this.props.setRoute(route)}> {route.name} </Button>
                        <IconButton onClick={async () => {
                            await gestorPOD.deleteRoute(route.id, false);
                            window.location.reload(false);
                        }} aria-label="delete">
                            <DeleteIcon fontSize="small" />
                        </IconButton>

                        <IconButton onClick={() => {
                            this.props.changeEditForm();
                            gestorPOD.saveID(route.id);

                        }} aria-label="edit">
                            <BorderColorIcon fontSize="small" />
                        </IconButton>

                        <IconButton onClick={async () => {
                            await gestorPOD.saveID(route.id);
                            await gestorPOD.saveGPX(route);
                            await gestorPOD.downloadRoute();
                        }} aria-label="download">
                            <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                    </li>
                ))}
            </ul></div>);
    }

    loadingPrivateFinished() {
        return (<div>
            <h3>{this.props.privateRoutesText}</h3>
            <ul>
                {this.state.routes.map((route) => (
                    <li id="container_route" key={route.id}>
                        <Button color="primary" onClick={() => this.props.setRoute(route)}> {route.name} </Button>
                        <IconButton onClick={async () => {
                            await gestorPOD.deleteRoute(route.id);
                            window.location.reload(false);
                        }} aria-label="delete">
                            <DeleteIcon fontSize="small" />
                        </IconButton>

                        <IconButton onClick={async () => {
                            this.props.changeEditForm();
                            gestorPOD.saveID(route.id);
                            gestorPOD.saveName(route);
                            gestorPOD.saveDescrip(route);
                            gestorPOD.savePriv(route);

                        }} aria-label="edit">
                            <BorderColorIcon fontSize="small" />
                        </IconButton>

                        <IconButton onClick={async () => {
                            await gestorPOD.saveID(route.id);
                            await gestorPOD.saveGPX(route);
                            await gestorPOD.downloadRoute();
                        }} aria-label="download">
                            <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                    </li>
                ))}
            </ul>
        </div>);
    }

    render() {
        const { loadingPrivate, loadingPublic } = this.state;

        if (loadingPrivate && loadingPublic) {
            return (
                <div>
                    <this.loadingPrivate></this.loadingPrivate>
                    <this.loadingPublic></this.loadingPublic>
                </div>

            );
        } else if (loadingPrivate) {
            return (
                <div>
                    <this.loadingPublicFinished></this.loadingPublicFinished>
                    <this.loadingPrivate></this.loadingPrivate>
                </div>

            );
        } else if(loadingPublic) {
            return (<div>
                <this.loadingPrivateFinished></this.loadingPrivateFinished>
                <this.loadingPublic></this.loadingPublic>
            </div>);
        } else {
            return (<div>
                <this.loadingPrivateFinished></this.loadingPrivateFinished>
                <this.loadingPublicFinished></this.loadingPublicFinished>
            </div>);
        }
    }
}