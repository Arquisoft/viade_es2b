import React, { Component } from "react";
import { FriendsPageContent } from "./friends.component";


/**
 * Container component for the Friends Page
 */
export class FriendsComponent extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      friend: null
    };
  }

  componentDidUpdate(prevProps) {
    // todo
  }

  setFriend = (friends) => {
    this.setState({friend:friends});
  }

  render() {
    const { friend } = this.state;

    return (
      <FriendsPageContent {...{setFriend: this.setFriend, friend}} />
    );
  }
}