import React from 'react';
import i18n from '../../../../i18n'
import { Button } from '@material-ui/core';
import { ShareWrapper } from './ShareComponent.style';

//import gestorPOD from '../../../persistanceManagement';

export default class ShareComponent extends React.Component {

    constructor() {
        super();
        this.state = { loading: true};
    }

    async componentDidMount() {
        /* this.setState( {loading: true }, () => {
            gestorPOD.seeRoutes().then((routes) => this.setState( {loading: false, routes: Array.from(routes)}) )
        }); */
    }

    render() {
        return (
            this.props.route === undefined ? <ShareWrapper id = "share"></ShareWrapper> : 
            <ShareWrapper id = "share">
                <div>
                    <p>{i18n.t('home.share_text')}</p>
                    <select>
                        <option value="volvo">Amigo 1</option>
                        <option value="saab">Amigo 2</option>
                        <option value="mercedes">Amigo 3</option>
                        <option value="audi">Amigo 4</option>
                    </select>
                    <Button variant="contained" color="primary">{i18n.t('home.share_route')}</Button>
                </div>
            </ShareWrapper>
        );
    }
}