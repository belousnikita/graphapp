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
  onButtonClick = e => {
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
        <div class="py-4">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <h1 class="">Heading 1</h1>
                <p class="lead">
                  Lead paragraph. A wonderful serenity has taken possession of
                  my entire soul.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="py-5">
          <div class="container">
            <div class="row">
              <div
                class="col-md-4 my-0 mb-2"
                style={{ transition: 'all 0.25s' }}
              >
                <div
                  class="btn-group m-0 shadow"
                  style={{ transform: 'translateX(180px)' }}
                >
                  {' '}
                  <a
                    href="#add"
                    class="btn btn-primary btn-lg text-center"
                    id="btn-add"
                    style={{ width: '45px', height: '45px' }}
                  >
                    +
                  </a>{' '}
                  <a
                    href="#dec"
                    class="btn btn-primary btn-lg text-center shadow-none"
                    id="btn-dec"
                    style={{ width: '45px', height: '45px' }}
                    contenteditable="true"
                  >
                    <b>-</b>
                  </a>{' '}
                </div>
              </div>
              <div
                class="col-md-6 my-1  offset-md-2"
                style={{ transition: 'all 0.25s' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
