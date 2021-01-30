require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "sign in with invalid email" do
    post '/api/signin',
      params: { session: { email: "", password: "foobar" } }
    decoded_response = JSON.parse(response.body)
    assert_equal decoded_response['error'], "Invalid Email/Password combination"
  end

  test "sign in with invalid password" do
    post '/api/signin',
      params: { session: { email: "example@example.com", password: "" } }
    decoded_response = JSON.parse(response.body)
    assert_equal decoded_response['error'], "Invalid Email/Password combination"
  end
end
