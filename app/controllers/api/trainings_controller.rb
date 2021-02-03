module Api
  class TrainingsController < ApplicationController
    before_action :logged_in_user, only: [:show, :create, :destroy, :update]
    before_action :current_admin?, only: [:create, :destroy, :update]
    before_action :validate_from_to, only: [:show]
    before_action :validate_user, only: [:show]
    before_action :validate_training, only: [:update, :destroy]

    def show
      @user = User.find(params[:id])
      fromDate = params[:from]
      toDate = params[:to]
      @trainings = set_trainings(@user.trainings)

      if !(fromDate == "" || toDate == "" || fromDate.nil? || toDate.nil?)
        @trainings = set_trainings(@user.trainings.where("date >= ? AND date " +
          "<= ?", fromDate, toDate))
      end

      render json: {
        success: 1,
        trainings: @trainings
      }
    end

    def create
      user = User.find(params[:userId])
      training = user.trainings.create(trainings_params)

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
          error: training.errors.full_messages,
          status: 422,
        }
      end
    end

    def update
      training = Training.find(params[:id])

      if training.update(trainings_params)
        training = format_training(training)
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

      def validate_from_to
        fromDate = params[:from]
        toDate = params[:to]
        regex = /^\d{4}-\d{2}-\d{2}$/
        if (!(fromDate == "" || fromDate.nil?) && !(toDate == "" || toDate.nil?))
          if (regex.match(fromDate).nil? && regex.match(fromDate).nil?)
            render json: {
              success: 0,
              error: "Filter dates invalid"
            }
          end
        end
      end

      def validate_training
        if !Training.exists?(params[:id])
          render json: {
            success: 0,
            error: "Training does not exist"
          }
        end
      end
  end
end
