var StoreInventory = [
  new Item("Toy Soldier", 5.99),
  new Item("Buzzy Bee", 10.99)
]

var ViewData = {
  shoppingContainer: "#shopping-list-container",
  storeContainer: "#store-list-container"
}

function List() {
  this.items = [];
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

function Item(name, price) {
  this.name = name;
  this.price = price;
}



function ShoppingListView(controller, container) {
  this.controller = controller;
  this.$container = $(container)
}



ShoppingListView.prototype.append = function(item) {
  this.$container.append("<tr><td>" + item.name + "</td><td>" + item.price +"</td></tr>")
}

function StoreListView(controller, container) {
  this.controller = controller;
  this.$container = $(container)
}

StoreListView.prototype.setClickListeners = function() {
  // TKTKTK: choose what we want to bind to
  $("").on("click", this.getName.bind(this))
}

StoreListView.prototype.getName = function() {
  var name = $("").text() // TKTKTK: Debug this later... might be val()
  this.controller.nameClicked(name)
}

function Controller() {
  this.storeList = new List
  this.shoppingList = new List
  this.shoppingListView = new ShoppingListView(this, ViewData.shoppingContainer)
  this.storeListView = new StoreListView(this, ViewData.storeContainer)
  this.initializeStoreList()
}

Controller.prototype.nameClicked = function(name) {
  var item = this.storeList.findByName(name);
  this.shoppingList.addItem(item);
  this.shoppingListView.append(item);
}

Controller.prototype.initializeStoreList = function() {
  this.shoppingList.addItems(StoreInventory);
}

Controller.prototype.setViewListeners = function() {
  this.storeListView.$container.on("click", this.getNameFromView.bind(this))
}

Controller.prototype.getNameFromView = function(event) {
  var name = event.target.whatever
  this.nameClicked(name)
}
