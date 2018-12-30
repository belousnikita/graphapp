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
    <a
      href="#add"
      className="btn btn-primary"
      does="add"
      onClick={props.onClick}
    >
      Add node
    </a>
    <a
      href="#dec"
      className="btn btn-primary"
      does="dec"
      onClick={props.onClick}
    >
      Remove node
    </a>
  </div>
);
export default class Hello extends React.Component {
  static defaultProps = {
    resolution: 3,
  };

  static Buttons = Buttons;

  constructor(props) {
    super(props);
    const { resolution } = this.props;
    this.state = { resolution };
  }

  onButtonClick = (e) => {
    e.preventDefault();
    const does = e.target.getAttribute('does');
    const { resolution } = this.state;

    switch (does) {
      case 'add': {
        if (resolution === MAX_FIELD) {
          break;
        }
        this.setState({ resolution: this.state.resolution + 1 });
        break;
      }
      case 'dec': {
        if (resolution === MIN_FIELD) {
          break;
        }
        this.setState({ resolution: this.state.resolution - 1 });
        break;
      }
      default:
        break;
    }
  };

  createMatrix = () => {
    const { resolution } = this.state;
    const matrix = new GraphMatrix(resolution);
    return matrix.getMatrix();
  };

  render() {
    const matrix = this.createMatrix();
    console.log(this.state);
    return (
      <div className="container-fluid">
        <div className="py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="">Heading 1</h1>
                <p className="lead">
                  Lead paragraph. A wonderful serenity has taken possession of
                  my entire soul.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-1">
          <div className="container">
            <div className="row">
              <div className="col-md-5" style={{ transition: 'all 2.25s' }}>
                <Buttons onClick={this.onButtonClick} />
              </div>
              <div
                className="col-md-6 my-1  offset-md-1"
                style={{ transition: 'all 2.25s' }}
              >
                <Table matrix={matrix} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
