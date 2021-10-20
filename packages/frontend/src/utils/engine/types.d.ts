declare interface SpecialRulesType {
  [key: string]: {
    // TODO: make this key index to be constant
    [key: string]: (cartCount: number) => number;
  };
}

declare interface NormalRulesType {
  // TODO: make this key index to be constant
  [key: string]: (cartCount: number) => number;
}

