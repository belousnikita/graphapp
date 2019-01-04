/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
import React from 'react';
import Table from './Table';
import GraphMatrix from './GraphMatrix';
import './style/App.css';

// eslint-disable-next-line react/prefer-stateless-function
const MAX_FIELD = 8;
const MIN_FIELD = 2;
const Buttons = props => (
  <div className="btn-group text-center">
    <button type="button" className="btn btn-primary shadow-sm" does="add" onClick={props.onClick}>
      + Node
    </button>
    <button type="button" className="btn btn-primary shadow-sm" does="dec" onClick={props.onClick}>
      - Node
    </button>
  </div>
);
export default class App extends React.Component {
  static defaultProps = {
    resolution: 3,
    matrix: new GraphMatrix(3),
  };

  static Buttons = Buttons;

  constructor(props) {
    super(props);
    const { resolution, matrix } = this.props;
    this.state = {
      resolution,
      matrix,
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
          matrix: new GraphMatrix(newResolution),
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
          matrix: new GraphMatrix(newResolution),
        });
        break;
      }
      default:
        break;
    }
  };

  render() {
    const { matrix } = this.state;

    return (
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col">
              <h1 className="">Graph App</h1>
              <p className="lead">
                This is a simple app for drawing graph from markov chain matrix. Made on React.
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid" align="center">
          <div className="row">
            <div className="col" align="center">
              <Buttons onClick={this.onButtonClick} />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-4" align="center">
              <Table matrix={matrix} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
