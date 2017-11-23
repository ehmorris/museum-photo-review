class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def show
    client = DropboxApi::Client.new(ENV['DROPBOX_ACCESS_TOKEN'])

    @result = client.list_folder('/camera uploads', {
      include_media_info: true
    })
  end
end
