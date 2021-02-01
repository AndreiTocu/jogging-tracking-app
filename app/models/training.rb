class TrainingValidator < ActiveModel::Validator

  def validate(record)
    if !record.date.methods.include?(:strftime)
      record.errors.add :base, "Invalid date format"
    end
    if !record.time.methods.include?(:strftime)
      record.errors.add :base, "Invalid time format"
    end
  end
end

class Training < ApplicationRecord
  belongs_to :user
  validates :distance, presence: true, numericality: true
  validates_with TrainingValidator
end
