class CreatePhotos < ActiveRecord::Migration[5.1]
  def change
    create_table :photos do |t|
      t.string :photo_id
      t.string :name
      t.string :path_lower
      t.st_point :location
      t.string :content_hash
      t.integer :width
      t.integer :height
      t.timestamp :taken_at
      t.timestamp :last_modified

      t.timestamps
    end
  end
end
