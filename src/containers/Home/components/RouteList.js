import React from 'react';
import { IconButton, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import gestorPOD from '../../../persistanceManagement';

export default class RouteList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { routes: [] };
    }

    async componentDidMount() {
        const routes = Array.from(await gestorPOD.seeRoutes());
        this.setState({ routes: routes });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.routes.map(route => (
                        <li id="container_route" key={route.id}>
                            <Button color="primary" onClick={() => this.props.setRoute(route)}> {route.name} </Button>
                            <IconButton onClick={() => { Promise.resolve(gestorPOD.deleteRoute(route.id)).then(() => window.location.reload) }} aria-label="delete">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}