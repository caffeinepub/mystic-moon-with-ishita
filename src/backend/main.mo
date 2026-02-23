import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Migration "migration";

(with migration = Migration.run)
actor {
  type ProductId = Text;
  type ServiceId = Nat;

  type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    imageUrl : Text;
    price : Nat;
    productType : ProductType;
    isTrending : Bool;
  };

  type ProductType = {
    #crystal;
    #bracelet;
    #pendulum;
  };

  module Product {
    public func compare(left : Product, right : Product) : Order.Order {
      Text.compare(left.id, right.id);
    };
  };

  type Service = {
    id : ServiceId;
    name : Text;
    description : Text;
    price : Nat;
  };

  let products = Map.empty<ProductId, Product>();
  let services = Map.empty<ServiceId, Service>();
  var nextServiceId = 0;

  let basePrice = 500;
  let markup = 400;

  public shared ({ caller }) func addProduct(
    id : ProductId,
    name : Text,
    description : Text,
    imageUrl : Text,
    productType : ProductType,
    isTrending : Bool,
  ) : async () {
    if (products.containsKey(id)) {
      Runtime.trap("Product with this ID already exists");
    };

    let price = basePrice + markup;

    let product : Product = {
      id;
      name;
      description;
      imageUrl;
      productType;
      price;
      isTrending;
    };

    products.add(id, product);
  };

  public shared ({ caller }) func updateProduct(
    id : ProductId,
    name : Text,
    description : Text,
    imageUrl : Text,
    productType : ProductType,
    price : Nat,
    isTrending : Bool,
  ) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let updatedProduct : Product = {
          id;
          name;
          description;
          imageUrl;
          productType;
          price;
          isTrending;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : ProductId) : async () {
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  public query ({ caller }) func getProduct(id : ProductId) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByType(productType : ProductType) : async [Product] {
    products.values().filter(
      func(product) {
        product.productType == productType;
      }
    ).toArray();
  };

  public query ({ caller }) func getTrendingProducts() : async [Product] {
    products.values().filter(
      func(product) {
        product.isTrending;
      }
    ).toArray();
  };

  public shared ({ caller }) func addService(name : Text, description : Text, price : Nat) : async () {
    let service : Service = {
      id = nextServiceId;
      name;
      description;
      price;
    };
    services.add(nextServiceId, service);
    nextServiceId += 1;
  };

  public shared ({ caller }) func updateService(id : ServiceId, name : Text, description : Text, price : Nat) : async () {
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?_) {
        let updatedService : Service = {
          id;
          name;
          description;
          price;
        };
        services.add(id, updatedService);
      };
    };
  };

  public shared ({ caller }) func deleteService(id : ServiceId) : async () {
    if (not services.containsKey(id)) {
      Runtime.trap("Service not found");
    };
    services.remove(id);
  };

  public query ({ caller }) func getService(id : ServiceId) : async Service {
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) { service };
    };
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : ProductType) : async [Product] {
    products.values().filter(
      func(product) {
        product.productType == category;
      }
    ).toArray().sort();
  };
};
