import React from 'react';
import '../style/Canvas.css';

export default class Canvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { props } = this;
    const { contextRef } = props;

    return (
      <canvas
        style={{ width: '100%', height: '500px' }}
        ref={node => (node ? contextRef(node.getContext('2d')) : null)}
      />
    );
  }
}
