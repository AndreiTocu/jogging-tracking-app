module ReportsHelper

  def week_report(user, date)
    monday = Date.parse(date).beginning_of_week
    sunday = monday + 6
    trainings = user.trainings.where("date >= ? AND date <= ?", monday, sunday)
    total_distance = total_time = 0

    trainings.map{|training|
      total_distance += training.distance
      total_time += training.time.seconds_since_midnight
    }

    return report = {
      distance: total_distance,
      average_speed: (total_time != 0) ? total_distance / (total_time / 3600) :
        0.00
    }
  end
end
