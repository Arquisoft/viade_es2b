import React from "react";
import { Button, IconButton, CircularProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import gestorPOD from "../../../services/persistanceManagement";

export default class RouteList extends React.Component {

    constructor() {
        super();
        this.state = { loading: true, routes: [], publicRoutes: []};
    }

    async componentDidMount() {
        this.setState( {loading: true }, async () => {
            await gestorPOD.seeRoutes().then((routes) => this.setState( {routes: Array.from(routes)}) );
            await gestorPOD.seeRoutes(false).then((routes) => this.setState( {publicRoutes: Array.from(routes)}) );
            this.setState({loading: false});
        });
    }

    loading() {
        return (
        <div>
            <h2>{this.props.loadingText}</h2>
            <CircularProgress></CircularProgress>
        </div>
        );
    }

    loadFinished() {
        console.log(this.state.routes);
        console.log(this.state.publicRoutes);
        return (<div>
                <h3>Rutas privadas</h3>
                <ul>
                    {this.state.routes.map( (route) => (
                        <li id="container_route" key={route.id}>
                            <Button color="primary" onClick={() => this.props.setRoute(route)}> {route.name} </Button>
                            <IconButton onClick={async () => { 
                                await gestorPOD.deleteRoute(route.id); 
                                window.location.reload(false); 
                            }} aria-label="delete">
                                <DeleteIcon fontSize="small" />
                            </IconButton>

			                <IconButton onClick={async () =>{
                                this.props.changeEditForm();
                                gestorPOD.saveID(route.id);
				                gestorPOD.saveName(route);
                		        gestorPOD.saveDescrip(route);
				                gestorPOD.savePriv(route);   
				
                            } } aria-label="edit">
                                <BorderColorIcon fontSize="small"/>
                            </IconButton>

                            <IconButton onClick={async () =>{
                                await gestorPOD.saveID(route.id);
                                await gestorPOD.saveGPX(route);
                                await gestorPOD.downloadRoute();
                            } } aria-label="download">
                                <ArrowDownwardIcon fontSize="small"/>
                            </IconButton>
                        </li>
                    ))}
                </ul>
                <h3>Rutas publicas</h3>
                <ul>
                    {this.state.publicRoutes.map( (route) => (
                        <li id="container_route" key={route.id}>
                            <Button color="primary" onClick={() => this.props.setRoute(route)}> {route.name} </Button>
                            <IconButton onClick={async () => { 
                                await gestorPOD.deleteRoute(route.id, false); 
                                window.location.reload(false); 
                            }} aria-label="delete">
                                <DeleteIcon fontSize="small" />
                            </IconButton>

			                <IconButton onClick={() =>{
                                this.props.changeEditForm();
                                gestorPOD.saveID(route.id);
				
                            } } aria-label="edit">
                                <BorderColorIcon fontSize="small"/>
                            </IconButton>

                            <IconButton onClick={async () =>{
                                await gestorPOD.saveID(route.id);
                                await gestorPOD.saveGPX(route);
                                await gestorPOD.downloadRoute();
                            } } aria-label="download">
                                <ArrowDownwardIcon fontSize="small"/>
                            </IconButton>
                        </li>
                    ))}
                </ul>
            </div>);
    }

    render() {
        const { loading } = this.state;

        return (
            loading ? this.loading() : this.loadFinished()
        );
    }
}