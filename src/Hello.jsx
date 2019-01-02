/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
import React from 'react';
import Table from './Table';
import GraphMatrix from './GraphMatrix';
import './Hello.css';
// eslint-disable-next-line react/prefer-stateless-function
const MAX_FIELD = 6;
const MIN_FIELD = 2;
const Buttons = props => (
  <div className="btn-group text-center pl-5 ml-5">
    <a href="#add" className="btn btn-primary" does="add" onClick={props.onClick}>
      + Node
    </a>
    <a href="#dec" className="btn btn-primary" does="dec" onClick={props.onClick}>
      - Node
    </a>
  </div>
);
export default class Hello extends React.Component {
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
      <div className="container">
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
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-6 align-self-center .ml-md-auto">
              <Buttons onClick={this.onButtonClick} />
            </div>
            <div className="col-md-6 align-self-center .ml-md-auto">
              <Table matrix={matrix} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
