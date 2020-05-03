import React from "react";
import { Button, IconButton, CircularProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import gestorPOD from "../../../services/persistanceManagement";

export default class RouteList extends React.Component {

    constructor() {
        super();
        this.state = { loadingPrivate: true, loadingPublic: true, loadingShared: true, routes: [], publicRoutes: [], sharedRoutes: [] };

        //Bind this to the methods of the class to allow access to props and state
        this.loadingPrivate = this.loadingPrivate.bind(this);
        this.loadingPublic = this.loadingPublic.bind(this);
        this.loadingShared = this.loadingShared.bind(this);
        this.loadingPrivateFinished = this.loadingPrivateFinished.bind(this);
        this.loadingPublicFinished = this.loadingPublicFinished.bind(this);
        this.loadingSharedFinished = this.loadingSharedFinished.bind(this);
        this.generateRoutesCards = this.generateRoutesCards.bind(this);
    }

    async componentDidMount() {
        this.setState({ loadingPrivate: true, loadingPublic: true, loadingShared: true }, async () => {
            gestorPOD.seeRoutes().then((routes) => this.setState({ routes: Array.from(routes), loadingPrivate: false }));
            gestorPOD.seeRoutes(false).then((routes) => this.setState({ publicRoutes: Array.from(routes), loadingPublic: false }));
            gestorPOD.seeSharedRoutes().then((routes) => this.setState({ sharedRoutes: Array.from(routes), loadingShared: false }));
        });
    }

    loadingShared() {
        return (
            <div>
                <h3>{this.props.sharedRoutesText}</h3>
                <CircularProgress></CircularProgress>
            </div>
        );
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
                {this.state.publicRoutes.map((route) => this.generateRoutesCards(route))}
            </ul></div>);
    }

    loadingSharedFinished() {
        return (<div>
            <h3>{this.props.sharedRoutesText}</h3>
            <ul>
                {this.state.sharedRoutes.map((route) => this.generateRoutesCards(route))}
            </ul>
        </div>);
    }

    loadingPrivateFinished() {
        return (<div>
            <h3>{this.props.privateRoutesText}</h3>
            <ul>
                {this.state.routes.map((route) => this.generateRoutesCards(route))}
            </ul>
        </div>);
    }

    generateRoutesCards(route) {
        return (<li id="container_route" key={route.id}>
            <Button name={route.name} color="primary" onClick={() => this.props.setRoute(route)}> {route.name} </Button>
            <IconButton name={"delete_" + route.name} onClick={async () => {
                await gestorPOD.deleteRoute(route.id, route.priv, route.shared);
                window.location.reload(false);
            }} aria-label="delete">
                <DeleteIcon fontSize="small" />
            </IconButton>
            {!route.shared ? <IconButton name={"edit_" + route.name} onClick={() => {
                this.props.changeEditForm(route);
            }} aria-label="edit">
                <BorderColorIcon fontSize="small" />
            </IconButton> : null}
            <IconButton name={"download_" + route.name} onClick={async () => {
                await gestorPOD.downloadRoute(route);
            }} aria-label="download">
                <ArrowDownwardIcon fontSize="small" />
            </IconButton>
        </li>);
    }

    render() {
        const { loadingPrivate, loadingPublic, loadingShared } = this.state;

        return (
            <div>
                {loadingPrivate ? <this.loadingPrivate /> : <this.loadingPrivateFinished />}
                {loadingPublic ? <this.loadingPublic /> : <this.loadingPublicFinished />}
                {loadingShared ? <this.loadingShared /> : <this.loadingSharedFinished />}
            </div>
        );

    }
}