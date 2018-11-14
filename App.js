import React, { Component } from 'react';
import { Group } from './src/models/Group';
import Index from './Index';

let initialState = { users: [] };

const group = Group.create(initialState);
//group.load(); automatically load as afterCreate() is invoked


export default class App extends Component {

  render() {
    return (
      <Index group={group} />
    );
  }
}
