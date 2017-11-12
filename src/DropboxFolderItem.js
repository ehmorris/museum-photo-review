import React, { Component } from 'react';

class DropboxFolderItem extends Component {
  render() {
    const item = this.props.item;
    let metadata = false;

    if (item.media_info && item.media_info.metadata) {
      metadata = item.media_info.metadata;
    }

    return (
      <div style={{
        border: '2px solid #000',
        margin: '1rem',
        padding: '1rem',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <strong>{item.name}</strong>
          <span>{item.path_lower}</span>
        </div>
        {metadata &&
          <div style={{ marginTop: '1rem' }}>
            {metadata.location &&
              <div>
                {metadata.location.latitude},
                {metadata.location.longitude}
              </div>
            }

            <div>
              {metadata.time_taken}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default DropboxFolderItem;

