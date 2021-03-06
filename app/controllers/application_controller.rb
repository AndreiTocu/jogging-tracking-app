class ApplicationController < ActionController::API
  include SessionsHelper
  include TrainingsHelper
  include ReportsHelper

  private

    def logged_in_user
      unless logged_in?
        render json: {
          success: 0
        }
      end
    end

    def manager_admin?
      if !(is_admin? || is_manager?)
        render json: {
          success: 0
        }
      end
    end

    def current_admin?
      if !(is_admin? || current_user?(User.find_by(id: params[:userId])))
        render json: {
          success: 0
        }
      end
    end

    def validate_user
      if !(User.exists?(params[:id]))
        render json: {
          success: 0,
          error: "User does not exists"
        }
      end
    end
end
