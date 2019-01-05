/* eslint-disable react/prop-types */
import React from 'react';
import '../style/Canvas.css';

export default class PureCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { contextRef } = this.props;
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    return (
      <canvas
        width={width}
        height={height}
        ref={node => (node ? contextRef(node.getContext('2d')) : null)}
      />
    );
  }
}
