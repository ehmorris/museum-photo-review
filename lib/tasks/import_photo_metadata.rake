namespace :import_photo_metadata do
  desc "Import all photos or new photos from /camera uploads on Dropbox"
  task :import => :environment do
    client = DropboxApi::Client.new(ENV['DROPBOX_ACCESS_TOKEN'])

    result = client.list_folder('/camera uploads', {
      include_media_info: true
    })

    result.entries.each do |photo|
      if photo&.media_info
        media_info = photo.media_info
        taken_at = media_info.time_taken

        if media_info&.location
          longitude = media_info.location.longitude
          latitude = media_info.location.latitude 

          location = "POINT(#{longitude} #{latitude})"
        end

        if media_info&.dimensions
          width = media_info.dimensions.width
          height = media_info.dimensions.height
        end
      end

      Photo.create({
        :photo_id => photo.id,
        :name => photo.name,
        :path_lower => photo.path_lower,
        :location => location,
        :content_hash => photo.content_hash,
        :width => width,
        :height => height,
        :last_modified => photo.client_modified,
        :taken_at => taken_at 
      })
    end
  end
end
