class CreateMeals < ActiveRecord::Migration[5.2]
  def change
    create_table :meals do |t|
      t.date :date
      t.belongs_to :recipe, foreign_key: true

      t.timestamps
    end
  end
end
