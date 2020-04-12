import React, { Component } from 'react';
import { HomePageContent } from './home.component';

const defaultProfilePhoto = './img/icon/empty-profile.svg';

/**
 * Container component for the Home Page, containing example of how to fetch data from a POD
 */
export class HomeComponent extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image: defaultProfilePhoto,
      isLoading: false,
      hasImage: false,
      isEmpty:true
    };

  }

  componentDidUpdate(prevProps) {
    if (this.state.route && this.state.route.description !== this.state.routeDescription){
      this.updateRouteData();
    }
  }

  updateRouteData = async () => {
    this.setState({ isLoading: true });
    let route = this.state.route;
    this.setState({ routeDescription: route.description, routeGPX: route.gpx, isLoading: false, isEmpty:false});

  }

  setRoute = (route) => {
    this.setState({route: route});
  }

  render() {
    const { name, image, isEmpty, isLoading, routeDescription, routeGPX} = this.state;
    const { webId} = this.props;

    return (
      <HomePageContent {...{ name, image, isLoading, isEmpty, webId, setRoute: this.setRoute, routeDescription, routeGPX}} />
    );
  }
}
