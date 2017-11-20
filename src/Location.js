import React, { Component } from 'react';
import axios from 'axios';

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = { locations: null }
  }

  getLocationInfo(coordinates, callback) {
    axios.get('https://en.wikipedia.org/w/api.php', {
      headers: {
        'Api-User-Agent': 'MuseumPhotoReview/0.0.1',
      },
      params: {
        action: 'query',
        list: 'geosearch',
        gscoord: `${coordinates.latitude}|${coordinates.longitude}`,
        gsradius: 1000,
        gslimit: 10,
        format: 'json',
        origin: '*',
      }
    }).then(callback);
  }

  renderLocations() {
    return (
      this.state.locations.map((location) => {
        return <div key={location.pageid}>{location.title}</div>
      })
    )
  }

  componentDidMount() {
    this.getLocationInfo(this.props.coordinates, ({data: {query: {geosearch}}}) => {
      this.setState({
        locations: geosearch,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.locations && this.renderLocations()}
      </div>
    )
  }
}

export default Location;
