declare module "@instahome/types" {
  type ADID_TYPE = "standard" | "featured" | "premium";

  interface SpecialRulesType {
    [key: string]: {
      // TODO: make this key index to be constant
      [key: string]: (cartCount: number) => number;
    };
  }

  type NormalRulesType = {
    // TODO: make this key index to be constant
    [key in ADID_TYPE]: (cartCount: number) => number;
  };

  type OFFER_TYPE = "xfory" | "discount" | "discountconditional";

  interface XForY {
    adId: ADID_TYPE;
    type: "xfory";
    eligibleLimit: number;
    reduceCountBy: number;
  }

  interface Discount {
    adId: ADID_TYPE;
    type: "discount";
    newPrice: number;
  }

  interface DiscountConditional {
    adId: ADID_TYPE;
    type: "discountconditional";
    eligibleLimit: number;
    newPrice: number;
  }

  interface Company {
    id: number;
    name: string;
  }
}
