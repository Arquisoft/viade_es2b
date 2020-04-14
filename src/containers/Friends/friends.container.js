import React, { Component } from 'react';
import { FriendsPageContent } from './friends.component';


/**
 * Container component for the Friends Page
 */
export class FriendsComponent extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = { empty: true };

  }

  componentDidUpdate(prevProps) {
    // todo
  }

  render() {
    const { empty } = this.state;

    return (
      <FriendsPageContent {...{ empty}} />
    );
  }
}