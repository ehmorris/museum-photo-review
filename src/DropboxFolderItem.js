import React, { Component } from 'react';
import Location from './Location';
const Dropbox = require('dropbox');

class DropboxFolderItem extends Component {
  constructor(props) {
    super(props);

    this.dropbox = new Dropbox({ accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN });

    this.item = this.props.item;

    if (this.item.media_info && this.item.media_info.metadata) {
      this.metadata = this.item.media_info.metadata;
    }

    this.state = { thumbnailBlob: null };
  }

  getThumbnail(path, callback) {
    this.dropbox.filesGetThumbnail({
      path: path,
      size: 'w128h128',
    }).then(callback);
  }

  renderThumbnail(fileBlob) {
    const url = window.URL.createObjectURL(fileBlob);

    return <img alt="" src={url} />;
  }

  componentDidMount() {
    if (this.metadata['.tag']) {
      this.getThumbnail(this.item.path_lower, ({fileBlob}) => {
        this.setState({ thumbnailBlob: fileBlob });
      });
    }
  }

  render() {
    return (
      <div style={{
        border: '2px solid #000',
        margin: '1rem',
        padding: '1rem',
        display: 'flex',
      }}>
        {this.state.thumbnailBlob &&
          <div style={{
            marginRight: '1rem',
          }}>
            {this.renderThumbnail(this.state.thumbnailBlob)}
          </div>
        }

        <div style={{
          flex: '1',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <strong>{this.item.name} | {this.metadata.time_taken}</strong>
            <span>{this.item.path_lower}</span>
          </div>

          {this.metadata && this.metadata.location &&
            <Location coordinates={this.metadata.location} />
          }
        </div>
      </div>
    );
  }
}

export default DropboxFolderItem;

