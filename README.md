# Museum Photo Review

When I visit a museum I take photos of the art I like, and usually the placard. This app is an attempt to group all those photos into museum-level (and piece-level) buckets for an easy review at some later time.

I’m starting with the readme.

[React readme](https://github.com/facebookincubator/create-react-app#create-react-app-).

## Steps

1. Get token

2. [List folders](https://dropbox.github.io/dropbox-api-v2-explorer/#files_list_folder) and get Camera Uploads folder path (/camera uploads)

3. [Iterate through folder](https://dropbox.github.io/dropbox-api-v2-explorer/#files_list_folder) and gather up image metadata (include media info in request)

*response example*:
``` json
	
{
  ".tag": "file",
  "name": "2014-06-21 15.40.05.jpg",
  "path_lower": "/camera uploads/2014-06-21 15.40.05.jpg",
  "path_display": "/Camera Uploads/2014-06-21 15.40.05.jpg",
  "id": "id:Z_YP-WdBGCAAAAAAAAAytw",
  "client_modified": "2014-06-21T19:40:05Z",
  "server_modified": "2014-06-23T00:49:59Z",
  "rev": "453842630020281b",
  "size": 2138138,
  "media_info": {
    ".tag": "metadata",
    "metadata": {
      ".tag": "photo",
      "dimensions": {
        "height": 2448,
        "width": 3264
      },
      "location": {
        "latitude": 42.339755555555556,
        "longitude": -71.093925
      },
      "time_taken": "2014-06-21T15:40:05Z"
    }
  },
  "content_hash": "5c4bebb1723aa0113a921ddf9d648f80cf124731680fbd77eecfe10fe9a9ae26"
}
```

4. Group photos by time taken, then lat/long, and try applying some heuristic like “most photos in the grouping should appear in pairs taken a few seconds apart”

5. ~~See if average lat/long from set [is near a museum](https://www.mapbox.com/api-documentation/#geocoding )~~ Turns out Mapbox is not reliable here, as it doesn’t even return the Met for its exact coordinates on Google maps, just the obelisk outside the Met.

**Update** Wikipedia has a [pretty good reverse geocoding API](https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=41.308079%7C-72.930791&gsradius=1000&gslimit=10).

*request would have looked like this*:
```
https://api.mapbox.com/geocoding/v5/mapbox.places/-72.9315435,41.308242.json?types=poi.landmark&access_token=ACCESS_TOKEN
```

5. Show some photos from each grouping and ask the user if it’s a museum

## Testing

- Grab a few sets of museum photos and see if there’s a good heuristic
