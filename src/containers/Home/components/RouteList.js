import React from "react";
import { IconButton, CircularProgress} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import i18n from "../../../i18n";

import gestorPOD from "../../../services/persistanceManagement";

import { List, ListSubheader, ListItem, ListItemText, Divider } from "@material-ui/core";


export default class RouteList extends React.Component {

    constructor() {
        super();
        this.state = { loadingPrivate: true, loadingPublic: true, loadingShared: true, loadingPublicFriends: true, routes: [], publicRoutes: [], publicFriendsRoutes: [], sharedRoutes: [] };

        //Bind this to the methods of the class to allow access to props and state
        this.loadingPrivateFinished = this.loadingPrivateFinished.bind(this);
        this.loadingPublicFinished = this.loadingPublicFinished.bind(this);
        this.loadingPublicFriendsFinished = this.loadingPublicFriendsFinished.bind(this);
        this.loadingSharedFinished = this.loadingSharedFinished.bind(this);
        this.generateRoutesCards = this.generateRoutesCards.bind(this);
    }

    getSnapshotBeforeUpdate(prevProps) {
        return { changeRequired: prevProps.friendsList !== this.props.friendsList };
      }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot.changeRequired) {
            this.setState({ loadingPublicFriends: true }, async () => {
                gestorPOD.seeFriendsRoutes(this.props.friendsList).then((routes) => this.setState({ publicFriendsRoutes: Array.from(routes), loadingPublicFriends: false }));
            });
        }
    }

    async componentDidMount() {
        this.setState({ loadingPrivate: true, loadingPublic: true, loadingShared: true }, async () => {
            gestorPOD.seeRoutes().then((routes) => this.setState({ routes: Array.from(routes), loadingPrivate: false }));
            gestorPOD.seeRoutes(false).then((routes) => this.setState({ publicRoutes: Array.from(routes), loadingPublic: false }));
            gestorPOD.seeSharedRoutes().then((routes) => this.setState({ sharedRoutes: Array.from(routes), loadingShared: false }));
        });
    }

    loadingPublicFinished() {
        return (
            <div>
                <Divider />
                {this.state.publicRoutes.map((route) => this.generateRoutesCards(route))}
            </div>);
    }

    loadingPublicFriendsFinished() {
        if (this.state.publicFriendsRoutes.length === 0)
            return (
            <div>
                <Divider />
                <ListItem name={"No routes"}>
                <ListItemText>{i18n.t("home.no_routes")}</ListItemText>
                </ListItem>
            </div>);
        const routesArray = [];
        this.state.publicFriendsRoutes.forEach(array => array.forEach(route => {route.shared = true; routesArray.push(route)}));
        return (
            <div>
                <Divider />
                {routesArray.map((route) => this.generateRoutesCards(route))}
            </div>);
    }

    loadingSharedFinished() {
        return (
            <div>
                <Divider />
                {this.state.sharedRoutes.map((route) => this.generateRoutesCards(route))}
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
            <ListItem name={route.name} key={route.id} button onClick={() => this.props.setRoute(route)}> 
            {route.owner ? <ListItemText primary={route.name} secondary={route.owner.slice(0, -15)}/> : <ListItemText primary={route.name}/>}

            {!route.owner ? <IconButton name={"delete_" + route.name} onClick={async () => {
                await gestorPOD.deleteRoute(route.id, route.priv, route.shared);
                window.location.reload(false);
            }} aria-label="delete">
                <DeleteIcon fontSize="small"/>
            </IconButton> : null}
            {!route.shared ? <IconButton name={"edit_" + route.name} onClick={() => {
                this.props.changeEditForm(route);
            } } aria-label="edit">
                <BorderColorIcon fontSize="small" />
            </IconButton> : null}
            {!route.owner ? <IconButton name={"download_" + route.name} onClick={async () => {
                await gestorPOD.downloadRoute(route);
            } } aria-label="download">
                <ArrowDownwardIcon fontSize="small" />
            </IconButton> : null}
        </ListItem>
        );
    }

    render() {
        const { loadingPrivate, loadingPublic, loadingPublicFriends, loadingShared } = this.state;

        //TODO
        return(
            <List>
                <ListSubheader style={{fontSize: "1.1rem"}}>
                    {this.props.privateRoutesText}
                </ListSubheader>
                {loadingPrivate ? <CircularProgress style={{margin: "20px"}} /> : <this.loadingPrivateFinished/>}
                <ListSubheader style={{fontSize: "1.1rem"}}>
                    {this.props.publicRoutesText}
                </ListSubheader>
                {loadingPublic ? <CircularProgress style={{margin: "20px"}} /> : <this.loadingPublicFinished/>}
                <ListSubheader style={{fontSize: "1.1rem"}}>
                    {this.props.publicFriendsRoutesText}
                </ListSubheader>
                {loadingPublicFriends ? <CircularProgress style={{margin: "20px"}} /> : <this.loadingPublicFriendsFinished/>}
                <ListSubheader style={{fontSize: "1.1rem"}}>
                    {this.props.sharedRoutesText}
                </ListSubheader>
                {loadingShared ? <CircularProgress style={{margin: "20px"}} /> : <this.loadingSharedFinished/>}
            </List>
        );

    }
}