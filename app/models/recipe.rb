class Recipe < ApplicationRecord
  has_many :ingredients, dependent: :destroy
  has_many :meals

  accepts_nested_attributes_for :ingredients, allow_destroy: true
end
