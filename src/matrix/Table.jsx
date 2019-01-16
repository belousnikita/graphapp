/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import '../style/Table.css';

const Head = ({ children }) => (
  <td className="p-1" align="center" valign="center">
    {children}
  </td>
);

const ButtonCell = props => {
  const { className, onClick } = props;
  const name = className.split(' ').join('-'); // TODO Fix classnames
  return (
    <td className="p-1" align="center" valign="center">
      {<button className={name} type="button" onClick={onClick} />}
    </td>
  );
};
export default class Table extends React.Component {
  static Head = Head;

  static ButtonCell = ButtonCell;

  constructor(props) {
    super(props);
    const { table } = this.props;
    this.state = {
      table
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      table: nextProps.table
    });
  }

  onClick = (i, j) => () => {
    // TODO: Fix hover rehover issue
    const { table } = this.state;
    const cell = table.getCell(i, j);
    cell.trigger();
    this.setState({
      table
    });
  };

  renderCloumns = () => {
    const { table } = this.state;
    const { onClick } = this.props;
    return table.getTable().map((row, i) => (
      <tr key={uniqueId()}>
        {row.map((cell, j) => {
          if (cell.isHeader()) {
            return <Head key={uniqueId()}>{cell.getState()}</Head>;
          }
          const className = classNames({
            btn: true,
            cell: true,
            active: cell.getState()
          });
          return (
            <ButtonCell
              key={uniqueId()}
              className={className}
              onClick={onClick(i, j)}
            />
          );
        })}
      </tr>
    ));
  };

  render() {
    return (
      <div className="container-fluid" align="center">
        <table className="table-borderless" align="center">
          <tbody>{this.renderCloumns()}</tbody>
        </table>
      </div>
    );
  }
}
