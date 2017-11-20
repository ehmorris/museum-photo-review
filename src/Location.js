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
        list: 'geosearch',
        gscoord: `${coordinates.latitude}|${coordinates.longitude}`,
        gsradius: 200,
        gslimit: 10,
      }
    }).then(callback);
  }

  getAllLocationInfo(ids, callback) {
    const pageIdsString = ids.join('|');

    this.mediaWiki.get('', {
      params: {
        pageids: pageIdsString,
        prop: 'categories',
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

  areWikiLocationsMuseum(pages) {
    const pagesArray = Object.values(pages);

    return !!pagesArray.find(page => {
      if (page.categories) {
        return page.categories.find(category => {
          return category.title.includes('museum');
        });
      }
    });
  }

  componentDidMount() {
    this.getNearbyLocations(this.props.coordinates, ({data: {query: {geosearch}}}) => {
      const idArray = geosearch.map(location => location.pageid);

      this.getAllLocationInfo(idArray, ({data}) => {
        if (data.query && data.query.pages) {
          this.setState({
            isMuseum: this.areWikiLocationsMuseum(data.query.pages),
          });
        }
      });

      this.setState({
        locations: geosearch,
      });
    });
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
