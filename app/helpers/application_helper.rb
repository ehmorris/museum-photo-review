module ApplicationHelper
  def coordinates_are_near_museum(latitude, longitude)
    RestClient.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        prop: 'categories',
        generator: 'geosearch',
        cllimit: 500,
        ggscoord: "#{latitude}|#{longitude}",
        ggsradius: 200,
        ggslimit: 10,
        format: 'json',
        origin: '*'
      },
      headers: {
        'Api-User-Agent': 'MuseumPhotoReview/0.0.1'
      }
    }) { |response|
      locations = JSON.parse(response)

      if locations['query'] && locations['query']['pages']
        pages = locations['query']['pages']
      end

      pages ? pages.to_s.downcase().include?('museum') : false
    }
  end

  def thumbnail(path)
    client = DropboxApi::Client.new(ENV['DROPBOX_ACCESS_TOKEN'])

    client.get_thumbnail(path, :format => :jpeg) do |data|
      return data
    end
  end
end
