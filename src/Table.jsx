import React from 'react';
import { uniqueId } from 'lodash';
export default class Table extends React.Component {
  renderCloumns = () => {
    const { resolution } = this.props;
    const arr = [];
    for (let i = 1; i <= resolution; i += 1) {
      arr.push(i);
    }
    return arr.map(column => {
      return (
        <tr key={uniqueId()}>
          {arr.map(cell => (
            <td key={uniqueId()} className="p-3">
              <button type="button" className="btn btn-primary btn-sm">
                1
              </button>
            </td>
          ))}
        </tr>
      );
    });
  };
  render() {
    return (
      <table className="table-bordered table-hover">
        <tbody>{this.renderCloumns()}</tbody>
      </table>
    );
  }
}
