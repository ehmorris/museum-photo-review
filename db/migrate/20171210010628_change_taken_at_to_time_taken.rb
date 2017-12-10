class ChangeTakenAtToTimeTaken < ActiveRecord::Migration[5.1]
  def self.up
    rename_column :photos, :taken_at, :time_taken
  end
end
