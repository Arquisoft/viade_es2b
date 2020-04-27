import React, { Component } from "react";
import { HomePageContent } from "./home.component";


/**
 * Container component for the Home Page, containing example of how to fetch data from a POD
 */
export class HomeComponent extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = { needForm: false, needEditForm: false };

  }

  componentDidUpdate(prevProps) {

    if (this.state.route && this.state.route.description !== this.state.routeDescription){
      this.updateRouteData();
    } 
  }

  updateRouteData = async () => {

    this.setState({ isLoading: true });

    let route = this.state.route;

    this.setState({ routeDescription: route.description, routeGPX: route.gpx, isLoading: false, routeImages: route.images});

  }

  setRoute = (route) => {

    this.setState({route});

  }

  changeForm = () => {
    this.setState({ needForm: !this.state.needForm});
  }

  changeEditForm = () => {
    this.setState({ needEditForm: !this.state.needEditForm});
  }

  render() {
    const { routeDescription, routeGPX, routeImages, needForm, needEditForm } = this.state;

    return (
      <HomePageContent {...{ changeForm: this.changeForm, changeEditForm: this.changeEditForm, setRoute: this.setRoute, routeDescription, routeGPX, route: this.state.route, routeImages, needForm, needEditForm}} />
    );
  }
}