class AddTimeTakenIndex < ActiveRecord::Migration[5.1]
  def change
    add_index :photos, :time_taken
  end
end
