ENV['RAILS_ENV'] ||= 'test'
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...

  # Logs in given user
  def log_in_user(user, password: "password")
    post '/api/signin', params: {
      session: {
        email: user.email,
        password: password
      }
    }
  end

  def average_speed(distance, trainings)
    total_time = 0
    trainings.each do |training|
      total_time += training.time.seconds_since_midnight
    end

    return (distance / (total_time / 3600)).round(1)
  end
end
