class PagesController < ApplicationController::Base
  def index
    render file: 'public/index.html'
  end
end
