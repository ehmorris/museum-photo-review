import React, { Component } from 'react';
import DropboxFolderItem from './DropboxFolderItem';
const Dropbox = require('dropbox');

class DropboxFolderList extends Component {
  constructor(props) {
    super(props);

    this.dropbox = new Dropbox({ accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN });

    this.state = { entries: null };
  }

  getFolderContents(path, callback) {
    this.dropbox.filesListFolder({
      path: path,
      include_media_info: true,
      limit: 20,
    }).then(callback);
  }

  componentDidMount() {
    this.getFolderContents(this.props.folder, ({entries}) => {
      this.setState({ entries: entries });
    });
  }

  renderEntries(entries) {
    return entries.map((entry) => {
      return (
        <DropboxFolderItem key={entry.id} item={entry} />
      );
    });
  }

  render() {
    return (
      <div>
        {this.state.entries && this.renderEntries(this.state.entries)}

        {!this.state.entries &&
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
            Loading
          </div>
        }
      </div>
    );
  }
}

export default DropboxFolderList;
