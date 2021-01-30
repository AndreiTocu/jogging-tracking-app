module Api
  class SessionsController < ApplicationController

    def create
      user = User.find_by(email: params[:session][:email].downcase)

      if user&.authenticate(params[:session][:password])
        log_in user
        render json: {
          success: 1,
          session: {
            user: user,
            logged_in: 1,
          }
        }
      else
        render json: {
          success: 0,
          error: "Invalid Email/Password combination"
        }
      end
    end

    def destroy
      log_out

      render json: {
        success: 1,
        session: {
          id: nil
        },
        logged_in: 0
      }
    end

    def session_data
      if logged_in?
        render json: {
          success: 1,
          session: {
            id: session[:user_id]
          },
          logged_in: 1
        }
      else
        render json: {
          success: 1,
          session: {
            id: session[:user_id]
          },
          logged_in: 0
        }
      end
    end
  end
end
