require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest

  def setup
    @admin = users(:lana)
    @manager = users(:malory)
    @normal = users(:example)
    @users = User.all
  end

  test "should not delete if current user's role is NORMAL" do
    log_in_user(@normal)
    assert_no_difference "User.count" do
      delete "/api/users/#{users(:archer).id}"
    end
  end

  test "should not update if current user's role is NORMAL" do
    log_in_user(@normal)
    user = users(:example)
    user_name = user.name
    user_email = user.email
    patch "/api/users/#{user.id}", params: {
      user: {
        name: "ExampleChanged", email: "example.changed@gmail.com",
        password: "", password_confirmation: ""
      }
    }

    assert_equal user_name, user.reload.name
    assert_equal user_email, user.reload.email
  end

  test "should not get all the users if current user's role is NORMAL" do
    log_in_user(@normal)
    get '/api/users'
    decoded_response = JSON.parse(response.body)

    assert decoded_response['users'].nil?
  end

  test "should delete if current user's role is MANAGER" do
    log_in_user(@manager)
    assert_difference "User.count", -1 do
      delete "/api/users/#{users(:archer).id}"
    end
  end

  test "should update if current user's role is MANAGER" do
    log_in_user(@manager)
    user = users(:example)
    user_name = user.name
    user_email = user.email
    patch "/api/users/#{user.id}", params: {
      user: {
        name: "ExampleChanged", email: "example.changed@gmail.com",
        password: "", password_confirmation: ""
      }
    }

    assert_not_equal user_name, user.reload.name
    assert_not_equal user_email, user.reload.email
  end

  test "should get all the users if current user's role is MANAGER" do
    log_in_user(@manager)
    get '/api/users'
    decoded_response = JSON.parse(response.body)

    assert_equal decoded_response['users'].count, @users.count
  end

  test "should delete if current user's role is ADMIN" do
    log_in_user(@admin)
    assert_difference "User.count", -1 do
      delete "/api/users/#{users(:archer).id}"
    end
  end

  test "should update if current user's role is ADMIN" do
    log_in_user(@admin)
    user = users(:example)
    user_name = user.name
    user_email = user.email
    patch "/api/users/#{user.id}", params: {
      user: {
        name: "ExampleChanged", email: "example.changed@gmail.com",
        password: "", password_confirmation: ""
      }
    }

    assert_not_equal user_name, user.reload.name
    assert_not_equal user_email, user.reload.email
  end

  test "should get all the users if current user's role is ADMIN" do
    log_in_user(@admin)
    get '/api/users'
    decoded_response = JSON.parse(response.body)

    assert_equal decoded_response['users'].count, @users.count
  end
end
