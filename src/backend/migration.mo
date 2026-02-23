import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldProductType = {
    #crystal;
    #bracelet;
  };

  type NewProductType = {
    #crystal;
    #bracelet;
    #pendulum;
  };

  type OldProduct = {
    id : Text;
    name : Text;
    description : Text;
    imageUrl : Text;
    price : Nat;
    productType : OldProductType;
  };

  type NewProduct = {
    id : Text;
    name : Text;
    description : Text;
    imageUrl : Text;
    price : Nat;
    productType : NewProductType;
    isTrending : Bool;
  };

  type OldActor = {
    products : Map.Map<Text, OldProduct>;
  };

  type NewActor = {
    products : Map.Map<Text, NewProduct>;
    services : Map.Map<Nat, { id : Nat; name : Text; description : Text; price : Nat }>;
    nextServiceId : Nat;
  };

  func toNewProductType(oldType : OldProductType) : NewProductType {
    switch (oldType) {
      case (#crystal) { #crystal };
      case (#bracelet) { #bracelet };
    };
  };

  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Text, OldProduct, NewProduct>(
      func(_id, oldProduct) {
        {
          oldProduct with
          productType = toNewProductType(oldProduct.productType : OldProductType);
          isTrending = false;
        };
      }
    );
    {
      products = newProducts;
      services = Map.empty<Nat, { id : Nat; name : Text; description : Text; price : Nat }>();
      nextServiceId = 0;
    };
  };
};
