/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
import React from 'react';
import Table from './Table';
// eslint-disable-next-line react/prefer-stateless-function
const MAX_FIELD = 6;
const MIN_FIELD = 2;
export default class Hello extends React.Component {
  static defaultProps = {
    resolution: 3,
  };

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

  render() {
    const { resolution } = this.state;
    console.log(resolution);
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
        <div className="py-5">
          <div className="container">
            <div className="row">
              <div
                className="col-md-4 my-0 mb-2"
                style={{ transition: 'all 0.25s' }}
              >
                <div
                  className="btn-group m-0 shadow"
                  style={{ transform: 'translateX(180px)' }}
                >
                  {' '}
                  <a
                    href="#add"
                    className="btn btn-primary btn-lg text-center"
                    id="btn-add"
                    style={{ width: '45px', height: '45px' }}
                  >
                    +
                  </a>
                  <a
                    href="#dec"
                    className="btn btn-primary btn-lg text-center shadow-none"
                    id="btn-dec"
                    style={{ width: '45px', height: '45px' }}
                    contentEditable="true"
                  >
                    <b>-</b>
                  </a>
                </div>
              </div>
              <div
                className="col-md-6 my-1  offset-md-2"
                style={{ transition: 'all 0.25s' }}
              >
                <Table />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
