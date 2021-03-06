# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171210012228) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "photos", force: :cascade do |t|
    t.string "photo_id"
    t.string "name"
    t.string "path_lower"
    t.geometry "location", limit: {:srid=>0, :type=>"st_point"}
    t.string "content_hash"
    t.integer "width"
    t.integer "height"
    t.datetime "time_taken"
    t.datetime "last_modified"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["time_taken"], name: "index_photos_on_time_taken"
  end

end
