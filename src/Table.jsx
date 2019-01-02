/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import './Table.css';

const Head = ({ children }) => (
  <td className="p-1" align="center" valign="center" width="45px" height="45px">
    {children}
  </td>
);

const ButtonCell = props => {
  const { className, onClick, i, j } = props;
  const name = className.split(' ').join('-'); // TODO Fix classnames
  return (
    <td className="p-1" width="45px" height="45px" align="center" valign="center">
      {<button className={name} type="button" onClick={onClick(i, j)} />}
    </td>
  );
};
export default class Table extends React.Component {
  static Head = Head;

  static ButtonCell = ButtonCell;

  constructor(props) {
    super(props);
    const { matrix } = this.props;
    this.state = {
      matrix,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      matrix: nextProps.matrix,
    });
  }

  onClick = (i, j) => e => {
    const { matrix } = this.state;
    const cell = matrix.getCell(i, j);
    cell.trigger();
    this.setState({
      matrix,
    });
  };

  renderCloumns = () => {
    const { matrix } = this.state;
    return matrix.getMatrix().map((row, i) => (
      <tr key={uniqueId()}>
        {row.map((cell, j) => {
          if (cell.isHeader()) {
            return <Head key={uniqueId()}>{cell.getState()}</Head>;
          }
          const className = classNames({
            btn: true,
            cell: true,
            active: cell.getState(),
          });
          return (
            <ButtonCell key={uniqueId()} i={i} j={j} className={className} onClick={this.onClick} />
          );
        })}
      </tr>
    ));
  };

  render() {
    return (
      <div className="table-borderless">
        <table className="table-borderless" width="60px" height="60px">
          <tbody align="center" valign="center">
            {this.renderCloumns()}
          </tbody>
        </table>
      </div>
    );
  }
}
