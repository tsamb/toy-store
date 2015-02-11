require 'sinatra'
require 'active_record'
require 'sqlite3'

# Connect to the database

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

# Routes

get '/' do
  send_file "index.html"
end

post '/cart' do
  user = User.where(name: "Sam").first_or_create
  toy = Toy.find(params[:toy_id])
  user.toys << toy
  {id: toy.id, name: toy.name, price: toy.price}.to_json
end
