class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def show
    @photos = Photo.last(4)
  end
end
