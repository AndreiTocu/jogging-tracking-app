require "test_helper"

class ReportsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:archer)
    @trainings = [trainings(:four), trainings(:five), trainings(:six)]
  end

  test "valid week report" do
    log_in_user(@user)
    post '/api/report', params: {
      id: @user.id,
      date: '2021-02-14'
    }

    decoded_response = JSON.parse(response.body)

    assert_equal decoded_response['report']['distance'].round(2), 61.65
    assert_equal decoded_response['report']['average_speed'].round(1),
      average_speed(61.65, @trainings)
  end
end
