import React from 'react';

import gestorPOD from '../../../persistanceManagement';

export default class RouteList extends React.Component {

    constructor() {
        super();
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
                        <li>
                            <a href="#routes" key={route.name} > {route.name} </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}