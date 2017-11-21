import React, { Component } from 'react';
import axios from 'axios';

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: null,
      isMuseum: false,
    };

    this.mediaWiki = axios.create({
      baseURL: 'https://en.wikipedia.org/w/api.php',
      headers: {
        'Api-User-Agent': 'MuseumPhotoReview/0.0.1',
      },
      params: {
        action: 'query',
        format: 'json',
        origin: '*',
      },
    });
  }

  getNearbyLocations(coordinates, callback) {
    this.mediaWiki.get('', {
      params: {
        prop: 'categories',
        generator: 'geosearch',
        cllimit: 500,
        ggscoord: `${coordinates.latitude}|${coordinates.longitude}`,
        ggsradius: 200,
        ggslimit: 10,
      }
    }).then(callback);
  }

  componentDidMount() {
    this.getNearbyLocations(this.props.coordinates, ({data}) => {
      if (data.query && data.query.pages) {
        const pagesArray = Object.values(data.query.pages);
        const isMuseum = JSON.stringify(data.query.pages).includes('museum');

        this.setState({
          locations: pagesArray,
          isMuseum: isMuseum,
        });
      }
    });
  }

  renderLocations() {
    return (
      this.state.locations.map((location) => {
        return <div key={location.pageid}>{location.title}</div>
      })
    )
  }

  render() {
    return (
      <div>
        {this.state.isMuseum &&
          <div style={{
            margin: '1rem 0',
          }}>
            <strong>MUSEUM!</strong>
          </div>
        }

        {this.state.locations && this.renderLocations()}
      </div>
    )
  }
}

export default Location;
