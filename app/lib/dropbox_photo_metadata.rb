module DropboxPhotoMetadata
  @client = DropboxApi::Client.new(ENV['DROPBOX_ACCESS_TOKEN'])

  def self.accumulate_photos(cursor, all_photos)
    photos = @client.list_folder_continue(cursor)

    puts("  - Adding #{photos.entries.count} photos to #{all_photos.count} total photos")

    new_all_photos = all_photos.concat(photos.entries)

    if photos.has_more?
      accumulate_photos(photos.cursor, new_all_photos)
    else
      all_photos
    end
  end

  def self.download
    photos = @client.list_folder('/camera uploads', {
      include_media_info: true
    })

    if photos.has_more?
      accumulate_photos(photos.cursor, photos.entries)
    else
      photos
    end
  end
end
