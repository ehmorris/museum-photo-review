import React, { Component } from 'react';

class DropboxFolder extends Component {
  render() {
    return (
      <div>
        <strong>{this.props.folder.name}</strong>
        <span>{this.props.folder.path_lower}</span>
      </div>
    );
  }
}

export default DropboxFolder;

