class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def show
    museums = {
      mfa: 'POINT(-71.093925 42.3397555555556)',
      met: 'POINT(-73.963199 40.779350)'
    }

    @photos = Photo.where("
      ST_DWithin(
        location,
        ST_GeographyFromText('#{museums[:met]}'),
        500
      )
    ")
  end
end
