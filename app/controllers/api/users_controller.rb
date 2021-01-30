module Api
  class UsersController < ApplicationController
    def index
      users = User.all

      if users
        render json: {
          success: 1,
          users: users
        }
      else
        render json: {
          success: 0
        }
      end
    end

    def show
      user = User.find(params[:id])

      if user
        render json: {
          success: 1,
          user: user
        }
      else
        render json: {
          success: 0,
          error: "User not found"
        }
      end
    end

    def create
      user = User.new(user_params)

      if user.save
        render json: {
          success: 1,
          user: user
        }
      else
        render json: {
          error: user.errors.full_messages,
          status: 422,
          success: 0
        }
      end
    end

    def update
      user = User.find(params[:id])

      if user.update(user_params)
        render json: {
          success: 1,
          user: user
        }
      else
        render json: {
          error: user.errors.full_messages,
          status: 422,
          success: 0
        }
      end
    end

    def destroy
      user = User.find(params[:id])

      if user.destroy
        render json: {
          success: 1
        }
      else
        render json: {
          error: user.errors.full_messages,
          status: 422,
          success: 0
        }
      end
    end

    private

      def user_params
        params.require(:user).permit(:name, :email, :password,
                                      :password_confirmation)
      end
  end
end
