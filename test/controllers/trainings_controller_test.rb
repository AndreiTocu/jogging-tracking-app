require "test_helper"

class TrainingsControllerTest < ActionDispatch::IntegrationTest
  include TrainingsHelper
  def setup
    @user = users(:example)
    @admin = users(:lana)
    @manager = users(:malory)
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
    get "/api/feed/#{users(:archer).id}?userId=#{users(:archer).id}"

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

  test "should return trainings between 2021-02-11 and 2021-02-17 " +
    "of archer user" do
    log_in_user(users(:archer))
    filtered_trainings = [trainings(:four), trainings(:five), trainings(:six)]
    get "/api/feed/#{users(:archer).id}?from='2021-02-01'&to='2021-02-17'"

    correct_response = set_trainings(filtered_trainings)
    decoded_response = JSON.parse(response.body)

    assert_equal decoded_response['success'], 1
    for i in 0..2 do
      assert_equal decoded_response['trainings'][i]['average_speed'],
        correct_response[i][:average_speed]
      assert_equal decoded_response['trainings'][i]['distance'],
        correct_response[i][:distance]
      assert_equal decoded_response['trainings'][i]['date'],
        correct_response[i][:date].strftime("%Y-%m-%e")
      assert_equal decoded_response['trainings'][i]['time'],
        correct_response[i][:time]
    end
  end

  test "should not delete training when not logged-in" do
    assert_no_difference "Training.count" do
      delete "/api/trainings/#{@user.trainings.first.id }"
    end
  end

  test "should delete training when logged-in" do
    log_in_user(@user)
    assert_difference "Training.count", -1 do
      delete "/api/trainings/#{@user.trainings.first.id}?userId=#{@user.id}"
    end
  end

  test "should not create if current user's role is MANAGER" do
    log_in_user(@manager)
    assert_no_difference 'Training.count' do
      post "/api/trainings?userId=#{@user.id}", params: {
        training: {
          time: Time.zone.now,
          distance: 50,
          date: '2021.01.01'
        }
      }
    end
  end

  test "should not destroy if current user's role is MANAGER" do
    log_in_user(@manager)
    assert_no_difference 'Training.count' do
      delete "/api/trainings/#{@user.trainings.first.id}?userId=#{@user.id}"
    end
  end

  test "should not update if current user's role is MANAGER" do
    log_in_user(@manager)
    training = @user.trainings.first
    time = training.time.strftime("%H:%M:%S")
    distance = training.distance.round(2)
    date = training.date.strftime("%Y-%m-%e")
    patch "/api/trainings/#{@user.trainings.first.id}?userId=#{@user.id}",
      params: {
        training: {
          time: Time.zone.now,
          distance: 1000.22,
          date: Date.today
        }
      }
    decoded_response = JSON.parse(response.body)

    assert_equal decoded_response['success'], 0
    assert decoded_response['training'].nil?
  end

  test "should create if current user's role is ADMIN" do
    log_in_user(@admin)
    assert_difference 'Training.count', 1 do
      post "/api/trainings?userId=#{@user.id}", params: {
        training: {
          time: Time.zone.now,
          distance: 50,
          date: '2021.01.01'
        }
      }
    end
  end

  test "should destroy if current user's role is ADMIN" do
    log_in_user(@admin)
    assert_difference 'Training.count', -1 do
      delete "/api/trainings/#{@user.trainings.first.id}?userId=#{@user.id}"
    end
  end

  test "shoudl update if current user's role is ADMIN" do
    log_in_user(@admin)
    training = @user.trainings.first
    time = training.time.strftime("%H:%M:%S")
    distance = training.distance.round(2)
    date = training.date.strftime("%Y-%m-%e")
    patch "/api/trainings/#{@user.trainings.first.id}?userId=#{@user.id}",
      params: {
        training: {
          time: Time.zone.now,
          distance: 1000.22,
          date: Date.today
        }
      }
    decoded_response = JSON.parse(response.body)

    assert_equal decoded_response['success'], 1
    assert_not_equal time, decoded_response['training']['time']
    assert_not_equal distance, decoded_response['training']['distance']
    assert_not_equal date, decoded_response['training']['date']
  end
end
