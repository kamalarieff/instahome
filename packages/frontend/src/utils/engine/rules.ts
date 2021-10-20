import type { SpecialRulesType, NormalRulesType } from "@instahome/types";
import { NORMAL_PRICE } from "utils/constants";

const specialRules: SpecialRulesType = {
  // TODO: if possible, create a function that builds this from an API
  // this may change so just work with it for now
  // TODO: don't match against string. Use an id instead
  "uem sunrise": {
    // not sure if this would work if you passed in the already totaled for all products
    // maybe you would have to group them up first, the problem with that
    // is that it could be not performant, because you would have to do this on every input and output
    // one way to do it is to store it already grouped up. No need to store it as an array
    standard: function (cartCount: number) {
      const isEligible = cartCount >= 3;

      if (!isEligible) {
        // remember, there might be a bug here
        return cartCount * NORMAL_PRICE["standard"];
      }

      return (cartCount - 1) * NORMAL_PRICE["standard"];
    },
  },
  "sime darby": {
    featured: function (cartCount: number) {
      return cartCount * 299.99;
    },
  },
  "igb berhad": {
    premium: function (cartCount: number) {
      const isEligible = cartCount >= 4;

      if (!isEligible) {
        // remember, there might be a bug here
        return cartCount * NORMAL_PRICE["premium"];
      }

      return cartCount * 379.99;
    },
  },
};

const normalRules: NormalRulesType = {
  standard: function (cartCount: number) {
    return cartCount * NORMAL_PRICE["standard"];
  },
  featured: function (cartCount: number) {
    return cartCount * NORMAL_PRICE["featured"];
  },
  premium: function (cartCount: number) {
    return cartCount * NORMAL_PRICE["premium"];
  },
};

export { specialRules, normalRules };
