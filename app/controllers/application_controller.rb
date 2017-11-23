class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include ApplicationHelper

  def show
    client = DropboxApi::Client.new(ENV['DROPBOX_ACCESS_TOKEN'])

    photo_urls = [
      '/camera uploads/2014-06-21 15.40.05.jpg',
      '/camera uploads/2014-06-20 17.27.09.jpg',
      '/camera uploads/2014-06-19 23.50.00.jpg',
      '/camera uploads/2014-06-17 05.45.54.jpg'
    ]

    @photos = []

    photo_urls.each do |photo_url|
      photo = [client.get_metadata(photo_url, {
        include_media_info: true
      })]

      if photo.first&.media_info&.location
        location = photo.first.media_info.location
        latitude = location.latitude
        longitude = location.longitude

        is_near_museum = coordinates_are_near_museum(latitude, longitude)

        photo.push("Is near museum: #{is_near_museum}")
      end

      @photos.push(photo)
    end
  end
end
