import { NORMAL_PRICE } from "utils/constants";

interface SpecialRulesType {
  [key: string]: {
    // TODO: make this key index to be constant
    [key: string]: (cartCount: number) => number;
  };
}

// TODO: if possible, create a function that builds this from an API
const specialRules: SpecialRulesType = {
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

interface NormalRulesType {
  // TODO: make this key index to be constant
  [key: string]: (cartCount: number) => number;
}

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

function groupCartCountById(cart: string[]) {
  return cart.reduce((previous: Record<string, number>, current) => {
    return {
      ...previous,
      [current]:
        typeof previous[current] == "undefined" ? 1 : previous[current] + 1,
    };
  }, {});
}

function calculateTotal(companyId: string | undefined, cart: string[]) {
  const groupedCart = groupCartCountById(cart);
  // this is to check if the companyId is given
  let rules = companyId ? specialRules[companyId] : normalRules;
  // this is to check if the company exists
  // TODO: make this better
  if (rules == null) {
    rules = normalRules;
  }

  let sum = 0;

  for (const property in groupedCart) {
    sum +=
      // TODO: find a better way to do this
      rules[property] != null
        ? rules[property](groupedCart[property])
        : normalRules[property](groupedCart[property]);
  }
  return sum;
}

export { specialRules, calculateTotal };
