/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
import React from 'react';
import Table from './matrix/Table';
import GraphMatrix from './matrix/GraphMatrix';
import GraphCanvas from './drawing/GraphCanvas';
import './style/App.css';

// eslint-disable-next-line react/prefer-stateless-function
var w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  x = w.innerWidth || e.clientWidth || g.clientWidth;

let MAX_FIELD = 1;
if (x <= 320) {
  MAX_FIELD = 6;
} else if (x <= 375) {
  MAX_FIELD = 7;
} else if (x <= 425) {
  MAX_FIELD = 8;
} else if (x <= 768) {
  MAX_FIELD = 15;
} else MAX_FIELD = 18;

const MIN_FIELD = 1;
const Buttons = props => (
  <div className="btn-group text-center">
    <button
      type="button"
      className="btn btn-primary shadow-sm"
      does="dec"
      onClick={props.onClick}
    >
      - Node
    </button>
    <button
      type="button"
      className="btn btn-primary shadow-sm"
      does="add"
      onClick={props.onClick}
    >
      + Node
    </button>
  </div>
);
export default class App extends React.Component {
  static defaultProps = {
    resolution: 3,
    table: new GraphMatrix(3)
  };

  static Buttons = Buttons;

  constructor(props) {
    super(props);
    const { resolution, table } = this.props;
    this.state = {
      resolution,
      table
    };
  }

  onButtonClick = e => {
    e.preventDefault();
    const does = e.target.getAttribute('does');
    const { resolution } = this.state;

    switch (does) {
      case 'add': {
        if (resolution === MAX_FIELD) {
          break;
        }
        const newResolution = resolution + 1;
        this.setState({
          resolution: newResolution,
          table: new GraphMatrix(newResolution)
        });
        break;
      }
      case 'dec': {
        if (resolution === MIN_FIELD) {
          break;
        }
        const newResolution = resolution - 1;
        this.setState({
          resolution: newResolution,
          table: new GraphMatrix(newResolution)
        });
        break;
      }
      default:
        break;
    }
  };

  onClick = (i, j) => e => {
    // TODO: Fix hover rehover issue
    const { table } = this.state;
    const cell = table.getCell(i, j);
    cell.trigger();
    this.setState({
      table
    });
  };

  render() {
    const { table } = this.state;
    return (
      <div className="container-main">
        <div className="container-header">
          <div className="row justify-content-center">
            <div className="col">
              <h1 className="">Graph App</h1>
              <p className="lead">
                This is a simple app for drawing graph from markov chain matrix.
                Made on React.
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid container-content" align="center">
          <div className="row">
            <div className="col" align="center">
              <Buttons onClick={this.onButtonClick} />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col" align="center">
              <Table table={table} onClick={this.onClick} />
            </div>
          </div>
          <br />
          <div className="row">
            <GraphCanvas nodes={table.getNodes()} />
          </div>
        </div>
      </div>
    );
  }
}
