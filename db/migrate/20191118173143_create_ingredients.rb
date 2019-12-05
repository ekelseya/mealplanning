class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients do |t|
      t.string :amount
      t.string :name
      t.belongs_to :recipe, foreign_key: true

      t.timestamps
    end
  end
end
