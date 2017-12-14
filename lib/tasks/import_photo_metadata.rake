namespace :import_photo_metadata do
  desc "Import all photo metadata from Dropbox"
  task :import => :environment do
    include DropboxPhotoMetadata

    puts('1/4 Clearing existing photos')

    Photo.delete_all

    puts('2/4 Beginning photo metadata download')

    photos = DropboxPhotoMetadata.download

    puts('3/4 Download complete, beginning database insert')

    photos.entries.each do |photo|
      if photo.instance_of? DropboxApi::Metadata::File
        media_info = photo&.media_info
        time_taken = media_info&.time_taken

        if media_info&.location
          longitude = media_info.location.longitude
          latitude = media_info.location.latitude 

          location = "POINT(#{longitude} #{latitude})"
        end

        if media_info&.dimensions
          width = media_info.dimensions.width
          height = media_info.dimensions.height
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
    end

    puts('4/4 Database insert complete')
  end
end
