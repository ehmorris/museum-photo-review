import React, { Component } from 'react';
import DropboxFolder from './DropboxFolder';
const Dropbox = require('dropbox');

class DropboxFolderList extends Component {
  constructor(props) {
    super(props);

    this.dropbox = new Dropbox({ accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN });

    this.state = { entries: null };
  }

  getFolderContents(path, callback) {
    this.dropbox.filesListFolder({path: path}).then(callback);
  }

  componentDidMount() {
    this.getFolderContents(this.props.folder, ({entries}) => {
      this.setState({ entries: entries });
    });
  }

  renderEntries(entries) {
    return entries.map((folder) => {
      return (
        <DropboxFolder key={folder.name} folder={folder} />
      );
    });
  }

  render() {
    return (
      <div>
        {this.state.entries && this.renderEntries(this.state.entries)}
      </div>
    );
  }
}

export default DropboxFolderList;
