module TrainingsHelper

  # Converts time attribute to HH:MM:SS format, calculates the average speed
  # for each record
  def set_trainings(trainings)
    trainings.map{ |training|
      {
        id_training: training.id,
        distance: training.distance.round(2),
        time: training.time.strftime("%H:%M:%S"),
        date: training.date,
        average_speed: avg_speed(training.distance, training.time).round(2)
      }
    }
  end

  def set_training(training)
    {
      id_training: training.id,
      distance: training.distance.round(2),
      time: training.time.strftime("%H:%M:%S"),
      date: training.date,
      average_speed: avg_speed(training.distance, training.time).round(2)
    }
  end

  def avg_speed(distance, time)
    avg = distance / (time.seconds_since_midnight() / 3600);
  end
end
