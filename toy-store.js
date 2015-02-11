// Invariant data

var StoreInventory = [
  new Item("Toy Soldier", 5.99),
  new Item("Buzzy Bee", 10.99)
]

var ViewData = {
  shoppingContainer: "#shopping-list-container",
  storeContainer: "#store-list-container"
}

// List model

function List(options) {
  this.items = options.inventory || [];
}

List.prototype.addItem = function(item) {
  this.items.push(item);
}

List.prototype.addItems = function(items) {
  for (var i = 0; i < items.length; i++) {
    this.addItem(items[i])
  }
}

List.prototype.findByName = function(name) {
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].name === name) {
      return this.items[i];
    }
  }
}

// Item model

function Item(name, price) {
  this.name = name;
  this.price = price;
}

// App controller

function Controller() {
  this.storeList = new List({inventory: StoreInventory});
  this.shoppingList = new List({});
  this.shoppingListView = new ShoppingListView(this, ViewData.shoppingContainer);
  this.storeListView = new StoreListView(this, ViewData.storeContainer, this.storeList.items);
}

Controller.prototype.nameClicked = function(name) {
  var item = this.storeList.findByName(name);
  this.shoppingList.addItem(item);
  this.shoppingListView.append(item);
}

Controller.prototype.setViewListeners = function() {
  this.storeListView.$container.on("click", this.getNameFromView.bind(this))
}

Controller.prototype.getNameFromView = function(event) {
  var name = event.target.whatever
  this.nameClicked(name)
}

// Views

// Shopping List view

function ShoppingListView(controller, container) {
  this.controller = controller;
  this.$container = $(container)
}

ShoppingListView.prototype.append = function(item) {
  this.$container.append("<tr><td>" + item.name + "</td><td>" + item.price +"</td></tr>")
}

// Store List view

function StoreListView(controller, container, items) {
  this.controller = controller;
  this.$container = $(container);
  this.init(items)
}

StoreListView.prototype.init = function(items) {
  for (var i = 0; i < items.length; i++) {
    this.buildItem(items[i])
  }
}

StoreListView.prototype.buildItem = function(item) {
  var item = $("<tr><td>" + item.name + "</td><td>" + item.price +"</td></tr>").appendTo(this.$container)
  $(item).on("click", this.nameClicked.bind(this));
}

StoreListView.prototype.nameClicked = function(event) {
  this.controller.nameClicked(event.currentTarget.firstChild.innerText)
}

var shop = new Controller
