import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type ProductId = Text;
  type ServiceId = Nat;

  // Access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserProfile = { name : Text };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

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

  type TarotService = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : ServiceCategory;
    isVoiceNote : Bool;
    isUrgent : Bool;
  };

  type ServiceCategory = {
    #miniReading;
    #loveRelationship;
    #careerMoneyLife;
    #deepDetailed;
    #premiumExclusive;
  };

  let products = Map.empty<ProductId, Product>();
  let tarotServices = Map.empty<Nat, TarotService>();
  var nextServiceId = 1;

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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
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

  public shared ({ caller }) func addTarotService(
    name : Text,
    description : Text,
    price : Nat,
    category : ServiceCategory,
    isVoiceNote : Bool,
    isUrgent : Bool,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add tarot services");
    };
    let service : TarotService = {
      id = nextServiceId;
      name;
      description;
      price;
      category;
      isVoiceNote;
      isUrgent;
    };
    tarotServices.add(nextServiceId, service);
    nextServiceId += 1;
  };

  public shared ({ caller }) func updateTarotService(
    id : Nat,
    name : Text,
    description : Text,
    price : Nat,
    category : ServiceCategory,
    isVoiceNote : Bool,
    isUrgent : Bool,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update tarot services");
    };
    switch (tarotServices.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?_) {
        let updatedService : TarotService = {
          id;
          name;
          description;
          price;
          category;
          isVoiceNote;
          isUrgent;
        };
        tarotServices.add(id, updatedService);
      };
    };
  };

  public shared ({ caller }) func deleteTarotService(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete tarot services");
    };
    if (not tarotServices.containsKey(id)) {
      Runtime.trap("Service not found");
    };
    tarotServices.remove(id);
  };

  public query ({ caller }) func getTarotService(id : Nat) : async TarotService {
    switch (tarotServices.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) { service };
    };
  };

  public query ({ caller }) func getAllTarotServices() : async [TarotService] {
    tarotServices.values().toArray();
  };

  public query ({ caller }) func getTarotServicesByCategory(category : ServiceCategory) : async [TarotService] {
    tarotServices.values().filter(
      func(service) {
        service.category == category;
      }
    ).toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : ProductType) : async [Product] {
    products.values().filter(
      func(product) {
        product.productType == category;
      }
    ).toArray().sort();
  };

  public query ({ caller }) func getTarotServiceCatalog() : async {
    miniReadings : [TarotService];
    loveRelationship : [TarotService];
    careerMoneyLife : [TarotService];
    deepDetailed : [TarotService];
    premiumExclusive : [TarotService];
  } {
    let miniReadings = List.empty<TarotService>();
    let loveRelationship = List.empty<TarotService>();
    let careerMoneyLife = List.empty<TarotService>();
    let deepDetailed = List.empty<TarotService>();
    let premiumExclusive = List.empty<TarotService>();

    for (service in tarotServices.values()) {
      switch (service.category) {
        case (#miniReading) { miniReadings.add(service) };
        case (#loveRelationship) { loveRelationship.add(service) };
        case (#careerMoneyLife) { careerMoneyLife.add(service) };
        case (#deepDetailed) { deepDetailed.add(service) };
        case (#premiumExclusive) { premiumExclusive.add(service) };
      };
    };

    {
      miniReadings = miniReadings.toArray();
      loveRelationship = loveRelationship.toArray();
      careerMoneyLife = careerMoneyLife.toArray();
      deepDetailed = deepDetailed.toArray();
      premiumExclusive = premiumExclusive.toArray();
    };
  };

  // APPOINTMENTS
  type Appointment = {
    fullName : Text;
    dateOfBirth : Text;
    phone : Text;
    email : Text;
    problemDescription : Text;
    selectedService : Text;
    selectedServicePrice : Nat;
    status : Text;
    createdAt : Int;
  };

  let appointments = List.empty<Appointment>();

  // Any user including guests can create an appointment (booking a service)
  public shared ({ caller }) func createAppointment(
    fullName : Text,
    dateOfBirth : Text,
    phone : Text,
    email : Text,
    problemDescription : Text,
    selectedService : Text,
    selectedServicePrice : Nat,
  ) : async () {
    let newAppointment = {
      fullName;
      dateOfBirth;
      phone;
      email;
      problemDescription;
      selectedService;
      selectedServicePrice;
      status = "pending";
      createdAt = Time.now();
    };
    appointments.add(newAppointment);
  };

  // Only admins can view all appointments (contains sensitive personal data)
  public query ({ caller }) func getAppointments() : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all appointments");
    };
    appointments.toArray();
  };
};
