require "test_helper"

class TrainingsControllerTest < ActionDispatch::IntegrationTest
  include TrainingsHelper
  def setup
    @user = users(:example)
    @trainings = [trainings(:one), trainings(:two), trainings(:three)]
  end

  test "should create with valid data" do
    training = @user.trainings.create(distance: 5.11, time: Time.zone.now,
                                      date: '2020.01.01')

    assert training.save
  end

  test "should not create with invalid distance" do
    training = @user.trainings.create(distance: "a" * 5, time: Time.zone.now,
                                      date: '2020.01.01')

    assert_not training.save
  end

  test "should not create with invalid time" do
    training = @user.trainings.create(distance: 5.22, time: 'a' * 3,
                                      date: '2020.01.01')

    assert_not training.save
  end

  test "should not create with invalid date" do
    training = @user.trainings.create(distance: 5.22, time: Time.zone.now,
                                      date: 'a' * 3)
    assert_not training.save
  end

  test "should return all trainings of archer user" do
    log_in_user(users(:archer))
    get "/api/feed/#{users(:archer).id}"

    correct_response = set_trainings(@trainings)
    decoded_response = JSON.parse(response.body)

    assert_equal decoded_response['success'], 1
    assert_equal decoded_response['trainings'][0]['average_speed'],
      correct_response[0][:average_speed]
    assert_equal decoded_response['trainings'][0]['distance'],
      correct_response[0][:distance]
    assert_equal decoded_response['trainings'][0]['date'],
      correct_response[0][:date].strftime("%Y-%m-%e")
    assert_equal decoded_response['trainings'][0]['time'],
      correct_response[0][:time]
  end

  test "should not delete training when not logged-in" do
    assert_no_difference "Training.count" do
      delete "/api/trainings/#{@user.trainings.first.id }"
    end
  end

  test "should delete training when logged-in" do
    log_in_user(@user)
    assert_difference "Training.count", -1 do
      delete "/api/trainings/#{@user.trainings.first.id }"
    end
  end
end
