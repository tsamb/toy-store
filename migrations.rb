require 'sqlite3'
require 'active_record'

ActiveRecord::Base.establish_connection(
  :adapter => 'sqlite3',
  :database =>  'toy_store.sqlite3.db'
)

ActiveRecord::Migration.create_table :toys do |t|
  t.string :name
  t.integer :price
end

ActiveRecord::Migration.create_table :carts do |t|
  t.integer :toy_id
  t.integer :user_id
end

ActiveRecord::Migration.create_table :users do |t|
  t.string :name
end

ActiveRecord::Migration.verbose = true
ActiveRecord::Migrator.migrate("db/migrate")

