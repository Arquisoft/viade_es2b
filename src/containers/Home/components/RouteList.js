import React from "react";
import { Button, IconButton, CircularProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import gestorPOD from "../../../services/persistanceManagement";

export default class RouteList extends React.Component {

    constructor() {
        super();
        this.state = { loading: true};
    }

    async componentDidMount() {
        this.setState( {loading: true }, () => {
            gestorPOD.seeRoutes().then((routes) => this.setState( {loading: false, routes: Array.from(routes)}) );
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
        return (<div>
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