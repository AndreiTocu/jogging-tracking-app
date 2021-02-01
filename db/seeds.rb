# Create a main sample user.
User.create!(name: "Example User",
             email: "example@railstutorial.org",
             password: "foobar",
             password_confirmation: "foobar")
# Generate a bunch of additional users.
99.times do |n|
  name = Faker::Name.name
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  User.create!(name: name,
               email: email,
               password: password,
               password_confirmation: password)
end


# Generate trainings for a subset of users
users = User.order(:created_at).take(6)
50.times do
  date = Faker::Date.between('2014-09-23', '2014-09-25')
  distance = Faker::Number.normal(1000, 2)
  time = "#{Faker::Number.within(0..23)}: #{Faker::Number.within(0..59)}:" +
    "#{Faker::Number.within(0..59)}"
  users.each{ |user| user.trainings.create!(date: date, distance: distance,
                                             time: time) }
end
