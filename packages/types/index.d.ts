declare module "@instahome/types" {
  type ADID_TYPE = "standard" | "featured" | "premium";

  type NormalRulesType = {
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

  type Offers = XForY | Discount | DiscountConditional;
}
