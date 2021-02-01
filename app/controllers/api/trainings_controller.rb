module Api
  class TrainingsController < ApplicationController
    before_action :logged_in_user, only: [:show, :create, :destroy, :update]

    def show
      @user = User.find(params[:id])
      @trainings = set_trainings(@user.trainings)
      render json: {
        success: 1,
        trainings: @trainings
      }
    end

    def create
      training = current_user.trainings.create(trainings_params)

      if training.save
        render json: {
          success: 1,
          training: training
        }
      else
        render json: {
          success: 0,
          error: training.error.full_messages,
          status: 422,
        }
      end
    end

    def destroy
      training = Training.find(params[:id])

      if training.destroy
        render json: {
          success: 1
        }
      else
        render json: {
          error: training.error.full_messages,
          status: 422,
        }
      end
    end

    def update
      training = Training.find(params[:id])

      if training.update(trainings_params)
        training = set_training(training)
        render json: {
          success: 1,
          training: training
        }
      else
        render json: {
          success: 0,
          error: "Could not update the training record"
        }
      end
    end

    private

    def trainings_params
      params.require(:training).permit(:date, :distance, :time)
    end
  end
end
