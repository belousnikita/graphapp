/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { uniqueId } from 'lodash';

export default class Table extends React.Component {
  renderCloumns = () => null;

  render() {
    return (
      <table className="table-bordered table-hover">
        <tbody>{this.renderCloumns()}</tbody>
      </table>
    );
  }
}
