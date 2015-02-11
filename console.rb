require 'active_record'
require 'sqlite3'
require 'pry'

ActiveRecord::Base.establish_connection(
  :adapter => 'sqlite3',
  :database =>  'toy_store.sqlite3.db'
)

# ActiveRecord models

class Toy < ActiveRecord::Base
  has_many :carts
  has_many :users, through: :carts
end

class Cart < ActiveRecord::Base
  belongs_to :toy
  belongs_to :user
end

class User < ActiveRecord::Base
  has_many :carts
  has_many :toys, through: :carts
end

binding.pry
