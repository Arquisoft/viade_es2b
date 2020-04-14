import React, { Component } from 'react';
import { GroupsPageContent } from './groups.component';


/**
 * Container component for the Groups Page
 */
export class GroupsComponent extends Component<Props> {

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
      <GroupsPageContent {...{ empty}} />
    );
  }
}