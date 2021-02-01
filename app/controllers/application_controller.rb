class ApplicationController < ActionController::API
  include SessionsHelper
  include TrainingsHelper
  
  private

    def logged_in_user
      unless logged_in?
        render json: {
          success: 0
        }
      end
    end
end
