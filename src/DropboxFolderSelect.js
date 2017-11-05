import React, { Component } from 'react';
import DropboxFolder from './DropboxFolder';
const Dropbox = require('dropbox');

class DropboxFolderSelect extends Component {
  constructor() {
    super();

    this.dropbox = new Dropbox({ accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN });

    this.state = { folders: null };
  }

  getFolders(path, callback) {
    this.dropbox.filesListFolder({path: path}).then(callback);
  }

  componentDidMount() {
    this.getFolders('', ({entries: folders}) => {
      this.setState({ folders: folders });
    });
  }

  renderFolders(folders) {
    return folders.map((folder) => {
      return (
        <DropboxFolder key={folder.name} folder={folder} />
      );
    });
  }

  render() {
    return (
      <div>
        {this.state.folders && this.renderFolders(this.state.folders)}
      </div>
    );
  }
}

export default DropboxFolderSelect;
