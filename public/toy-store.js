// Invariant data

var StoreInventory = [
  new Item({name: "Toy Soldier", price: 599}),
  new Item({name: "Buzzy Bee", price: 1099})
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
    this.addItem(new Item(items[i]));
  }
}

List.prototype.findByName = function(name) {
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].name === name) {
      return this.items[i];
    }
  }
}

List.prototype.totalPrice = function() {
  var total = 0.0;
  for (var i = 0; i < this.items.length; i++) {
    total += this.items[i].price;
  }
  return total.toFixed(2);
}

// Item model

function Item(options) {
  this.id = options.id;
  this.name = options.name;
  this.price = (parseInt(options.price) / 100);
}

// App controller

function Controller() {
  this.storeList = new List({});
  this.shoppingList = new List({});
  this.shoppingListView = new ShoppingListView(this, ViewData.shoppingContainer);
  this.storeListView = new StoreListView(this, ViewData.storeContainer);
  this.loadStoreDataFromServer();
  this.loadShoppingDataFromServer();
}

Controller.prototype.nameClicked = function(name) {
  var item = this.storeList.findByName(name);
  this.shoppingList.addItem(item);
  $.post("/cart", {toy_id: item.id}, function(response) { console.log("successfully saved " + item.name) })
  this.shoppingListView.append(item);
  this.shoppingListView.updateTotalPrice(this.shoppingList.totalPrice());
}

Controller.prototype.loadStoreDataFromServer = function() {
  $.get("/toys").done(function(toys) {
    this.storeList.addItems(JSON.parse(toys))
    this.storeListView.refresh(this.storeList.items);
  }.bind(this));
}

Controller.prototype.loadShoppingDataFromServer = function() {
  $.get("/cart").done(function(toys) {
    this.shoppingList.addItems(JSON.parse(toys))
    this.shoppingListView.refresh(this.shoppingList.items);
    this.shoppingListView.updateTotalPrice(this.shoppingList.totalPrice());
  }.bind(this));
}

// Views

// Shopping List view

function ShoppingListView(controller, container) {
  this.controller = controller;
  this.$container = $(container);
  this.init();
}

ShoppingListView.prototype.init = function() {
  this.$container.prepend("<tr><th>Total price:</th><th id='total-price'>0</th><tr>");
}

ShoppingListView.prototype.refresh = function(items) {
  for (var i = 0; i < items.length; i++) {
    this.append(items[i]);
  }
}

ShoppingListView.prototype.append = function(item) {
  this.$container.append("<tr><td>" + item.name + "</td><td>" + item.price.toFixed(2) +"</td></tr>");
}

ShoppingListView.prototype.updateTotalPrice = function(totalPrice) {
  $("#total-price").text(totalPrice);
}

// Store List view

function StoreListView(controller, container, items) {
  this.controller = controller;
  this.$container = $(container);
  this.refresh(items || []);
}

StoreListView.prototype.refresh = function(items) {
  for (var i = 0; i < items.length; i++) {
    this.buildItem(items[i]);
  }
}

StoreListView.prototype.buildItem = function(item) {
  var item = $("<tr><td>" + item.name + "</td><td>" + item.price.toFixed(2) +"</td></tr>").appendTo(this.$container)
  $(item).on("click", this.nameClicked.bind(this));
}

StoreListView.prototype.nameClicked = function(event) {
  this.controller.nameClicked(event.currentTarget.firstChild.innerText);
}

var shop = new Controller
