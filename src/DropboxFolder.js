import React, { Component } from 'react';

class DropboxFolder extends Component {
  render() {
    return (
      <div style={{
        border: '2px solid #000',
        margin: '1rem',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <strong>{this.props.folder.name}</strong>
        <span>{this.props.folder.path_lower}</span>
      </div>
    );
  }
}

export default DropboxFolder;

