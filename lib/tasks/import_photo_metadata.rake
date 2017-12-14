namespace :import_photo_metadata do
  desc "Import all photo metadata from Dropbox"
  task :import => :environment do
    include DropboxPhotoMetadata

    puts('Beginning photo metadata download')

    photos = DropboxPhotoMetadata.download

    puts('Download complete, beginning database insert')

    photos.entries.each do |photo|
      if photo&.media_info
        media_info = photo.media_info
        time_taken = media_info.time_taken

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
        :time_taken => time_taken
      })
    end

    puts('Database insert complete')
  end
end
