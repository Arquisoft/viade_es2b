import React from "react";
import { IconButton, CircularProgress} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import gestorPOD from "../../../services/persistanceManagement";

import {List,ListSubheader,ListItem, ListItemText,Divider} from "@material-ui/core";


export default class RouteList extends React.Component {

    constructor() {
        super();
        this.state = { loadingPrivate: true, loadingPublic: true, loadingShared: true, routes: [], publicRoutes: [], sharedRoutes: [] };

        //Bind this to the methods of the class to allow access to props and state
        this.loadingPrivateFinished = this.loadingPrivateFinished.bind(this);
        this.loadingPublicFinished = this.loadingPublicFinished.bind(this);
        this.loadingSharedFinished = this.loadingSharedFinished.bind(this);
        this.generateRoutesCards = this.generateRoutesCards.bind(this);
    }

    async componentDidMount() {
        this.setState({ loadingPrivate: true, loadingPublic: true, loadingShared: true }, async () => {
            gestorPOD.seeRoutes().then((routes) => this.setState({ routes: Array.from(routes), loadingPrivate: false }));
            gestorPOD.seeRoutes(false).then((routes) => this.setState({ publicRoutes: Array.from(routes), loadingPublic: false }));
            gestorPOD.seeSharedRoutes().then((routes) => this.setState({ sharedRoutes: Array.from(routes), loadingShared: false}));
                });
    }

    loadingPublicFinished() {
        return (
            <div>
                <Divider />
                {this.state.publicRoutes.map((route) => this.generateRoutesCards(route))}
            </div>);
    }

    loadingSharedFinished() {
        return (
            <div>
                <Divider />
                {this.state.sharedRoutes.map((route) => this.generateRoutesCardsSh(route))}
            </div>);
    }

    loadingPrivateFinished() {
        return (
            <div>
                <Divider />
                {this.state.routes.map((route) => this.generateRoutesCards(route))}
            </div>);
    }

    generateRoutesCards(route) {
        return (
            <ListItem button onClick={() => this.props.setRoute(route)}> 
            <ListItemText primary={route.name}/>

            <IconButton onClick={async () => {
                await gestorPOD.deleteRoute(route.id, false);
                window.location.reload(false);} 
                } aria-label="delete">
                <DeleteIcon fontSize="small"/>
            </IconButton>

            {!route.shared ? <IconButton onClick={() => {
                this.props.changeEditForm();
                gestorPOD.saveID(route.id);
                gestorPOD.saveName(route);
                gestorPOD.saveDescrip(route);
                gestorPOD.savePriv(route); 
                gestorPOD.saveGPX(route);
                gestorPOD.savePurePriv(route);
            } } aria-label="edit">
                <BorderColorIcon fontSize="small" />
            </IconButton> : null}
            <IconButton onClick={async () => {
                await gestorPOD.saveID(route.id);
                await gestorPOD.saveGPX(route);
                await gestorPOD.savePurePriv(route);
                await gestorPOD.downloadRoute();
            } } aria-label="download">
                <ArrowDownwardIcon fontSize="small" />
            </IconButton>
        </ListItem>
        );
    }

    generateRoutesCardsSh(route) {
        return (
            <ListItem button onClick={() => this.props.setRoute(route)}> 
                <ListItemText primary={route.name}/>

                <IconButton onClick={async () => {
                    await gestorPOD.deleteRoute(route.id, false);
                    window.location.reload(false);
                    } } aria-label="delete">
                    <DeleteIcon fontSize="small" />
                </IconButton>

                {!route.shared ? <IconButton onClick={async () => {
                    await gestorPOD.saveID(route.id);
                    await gestorPOD.saveGPX(route);
                    await gestorPOD.savePurePriv(route);
                    await gestorPOD.downloadRoute();
                } } aria-label="download">
                    <ArrowDownwardIcon fontSize="small" />
                </IconButton> : null}
            </ListItem>);
    }

    render() {
        const { loadingPrivate, loadingPublic, loadingShared } = this.state;

        return(
            <List>
                <ListSubheader>
                    {this.props.privateRoutesText}
                </ListSubheader>
                {loadingPrivate ? <CircularProgress/> : <this.loadingPrivateFinished/>}
                <ListSubheader>
                    {this.props.publicRoutesText}
                </ListSubheader>
                {loadingPublic ? <CircularProgress/> : <this.loadingPublicFinished/>}
                <ListSubheader>
                    {this.props.sharedRoutesText}
                </ListSubheader>
                {loadingShared ? <CircularProgress/> : <this.loadingSharedFinished/>}
            </List>
        );
        
    }
}