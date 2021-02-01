require "test_helper"

class TrainingTest < ActiveSupport::TestCase

  def setup
    user = users(:example)
    @training = user.trainings.build(distance: 5.22, time: Time.zone.now,
                                     date: '2020.01.01')
  end

  test "should be valid" do
    assert @training.valid?
  end

  test "distance should be present" do
    @training.distance = ""
    assert_not @training.valid?
  end

  test "time should be present" do
    @training.time = ""
    assert_not @training.valid?
  end

  test "date should be present" do
    @training.date = ""
    assert_not @training.valid?
  end
end
