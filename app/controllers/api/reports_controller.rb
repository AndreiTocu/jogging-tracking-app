module Api
  class ReportsController < ApplicationController
    before_action :logged_in_user, only: :show
    before_action :validate_user, only: :show
    before_action :validate_date, only: :show

    def show
      user = User.find(params[:id])
      report = week_report(user, params[:date])

      render json: {
        success: 1,
        report: report
      }
    end

    private

      def validate_date
        date = params[:date]
        if Date.parse(date).nil?
          render json: {
            success: date,
            error: "Invalid date format"
          }
        end
      end
  end
end
