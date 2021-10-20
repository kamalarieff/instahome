declare type ADID_TYPE = "standard" | "featured" | "premium";

declare interface SpecialRulesType {
  [key: string]: {
    // TODO: make this key index to be constant
    [key: string]: (cartCount: number) => number;
  };
}

declare type NormalRulesType = {
  // TODO: make this key index to be constant
  [key in ADID_TYPE]: (cartCount: number) => number;
};

declare type OFFER_TYPE = "xfory" | "discount" | "discountconditional";

declare interface XForY {
  adId: ADID_TYPE;
  type: "xfory";
  eligibleLimit: number;
  reduceCountBy: number;
}

declare interface Discount {
  adId: ADID_TYPE;
  type: "discount";
  newPrice: number;
}

declare interface DiscountConditional {
  adId: ADID_TYPE;
  type: "discountconditional";
  eligibleLimit: number;
  newPrice: number;
}
