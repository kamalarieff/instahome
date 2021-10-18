import { NORMAL_PRICE } from "./constants";

// TODO: if possible, create a function that builds this from an API
const rules = {
  // this may change so just work with it for now
  // TODO: don't match against string. Use an id instead
  "uem sunrise": {
    // not sure if this would work if you passed in the already totaled for all products
    // maybe you would have to group them up first, the problem with that
    // is that it could be not performant, because you would have to do this on every input and output
    // one way to do it is to store it already grouped up. No need to store it as an array
    standard: function (cartCount) {
      const isEligible = cartCount >= 3;

      if (!isEligible) {
        // remember, there might be a bug here
        return cartCount * NORMAL_PRICE["standard"];
      }

      return (cartCount - 1) * NORMAL_PRICE["standard"];
    },
  },
  "sime darby": {
    featured: function (cartCount) {
      return cartCount * 299.99;
    },
  },
  "igb berhad": {
    premium: function (cartCount) {
      const isEligible = cartCount >= 4;

      if (!isEligible) {
        // remember, there might be a bug here
        return cartCount * NORMAL_PRICE["premium"];
      }

      return cartCount * 379.99;
    },
  },
};

const normalRules = {
  standard: function (cartCount) {
    return cartCount * NORMAL_PRICE["standard"];
  },
  featured: function (cartCount) {
    return cartCount * NORMAL_PRICE["featured"];
  },
  premium: function (cartCount) {
    return cartCount * NORMAL_PRICE["premium"];
  },
};

function groupById(cart) {
  return cart.reduce((previous, current) => {
    return {
      ...previous,
      [current]:
        typeof previous[current] == "undefined" ? 1 : previous[current] + 1,
    };
  }, {});
}

function calculateTotal(companyId, cart) {
  cart = groupById(cart);
  const companyRules = rules[companyId];
  let sum = 0;

  for (const property in cart) {
    sum +=
      // TODO: find a better way to do this
      companyRules[property] != null
        ? companyRules[property](cart[property])
        : normalRules[property](cart[property]);
  }
  return sum;
}

export { rules, calculateTotal };
