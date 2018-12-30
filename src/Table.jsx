/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { uniqueId } from 'lodash';

const Head = ({ children }) => <td className="p-3">{children}</td>;

const ButtonCell = ({ children }) => (
  <td className="p-3">
    {
      <button className="btn btn-primary" type="button">
        {children}
      </button>
    }
  </td>
);
export default class Table extends React.Component {
  static Head = Head;

  static ButtonCell = ButtonCell;

  renderCloumns = () => {
    const { matrix } = this.props;
    return matrix.map((row, i) => (
      <tr key={uniqueId()}>
        {row.map((cell, j) => {
          if (i === 0 || j === 0) {
            return <Head key={uniqueId()}>{cell}</Head>;
          }
          return <ButtonCell key={uniqueId()}>{cell}</ButtonCell>;
        })}
      </tr>
    ));
  };

  render() {
    return (
      <div className="table-borderless">
        <table className="table">
          <tbody>{this.renderCloumns()}</tbody>
        </table>
      </div>
    );
  }
}
