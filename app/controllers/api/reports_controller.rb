module Api
  class ReportsController < ApplicationController
    before_action :logged_in_user, only: :show

    def show
      user = User.find(params[:id])
      report = week_report(user, params[:date])

      render json: {
        success: 1,
        report: report
      }
    end
  end
end
