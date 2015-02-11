require 'active_record'
require 'sqlite3'

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

# Seed data

Toy.create(name:"Toy Soldier", price: 550)
Toy.create(name:"Risk", price: 4000)
Toy.create(name:"Spinning Top", price: 300)
Toy.create(name:"Yoyo", price: 500)
Toy.create(name:"Marble Machine", price: 2000)
