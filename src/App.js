import React, { Component } from 'react';
import DropboxFolderList from './DropboxFolderList';

class App extends Component {
  render() {
    return (
      <div>
        <DropboxFolderList folder="/camera uploads" />
      </div>
    );
  }
}

export default App;
