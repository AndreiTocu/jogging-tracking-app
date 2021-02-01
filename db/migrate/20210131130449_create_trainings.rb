class CreateTrainings < ActiveRecord::Migration[6.1]
  def change
    create_table :trainings do |t|
      t.float :distance
      t.date :date
      t.time :time
      t.integer :user_id

      t.timestamps
    end
  end
end
