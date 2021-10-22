import type { ADID_TYPE, NormalRulesType, Offers } from "@instahome/types";
import { normalRules } from "./rules";
import { NORMAL_PRICE } from "utils/constants";

/**
 * @description get the count of products based on the id
 *
 * @param cart List of products
 * @example
 * groupCartCountById([
 *   "standard",
 *   "featured",
 *   "premium",
 *   "standard",
 * ])
 * //=> { standard: 2, featured: 1, premium: 1 }
 */
function groupCartCountById(cart: string[]) {
  return cart.reduce((previous: Record<string, number>, current) => {
    return {
      ...previous,
      [current]:
        typeof previous[current] == "undefined" ? 1 : previous[current] + 1,
    };
  }, {});
}

/**
 * @description Type guard to check for valid ad type
 *
 * @param adId Ad id that is unknown during compile time
 */
function isAdIdType(adId: unknown): adId is ADID_TYPE {
  // TODO: not sure if this is the best way to do this
  return (
    typeof adId === "string" &&
    ["standard", "featured", "premium"].includes(adId)
  );
}

/**
 * @description Takes a list of rules and combine them to be an object rules. This object rules structure
 * makes it easy to find and apply the offer. It builds on the normal rules object which means it will override
 * any old ad id with its own. The shape of the rules in the list has to adhere to a certain contract.
 *
 * @param rules List of rules
 * @example
 * convertAPItoRules([
 *   {
 *     adId: "standard"
 *     type: "xfory",
 *     eligibleLimit: 3,
 *     reduceCountBy: 1
 *   }
 * ])
 * //=> {
 *   standard: function specialStandardRule(),
 *   featured: function normalFeaturedRule(),
 *   premium: function normalPremiumRule()
 * }
 *
 * @example
 * You can give multiple rules here
 * convertAPItoRules([
 *   {
 *     adId: "standard"
 *     type: "xfory",
 *     eligibleLimit: 3,
 *     reduceCountBy: 1
 *   },
 *   {
 *     adId: "featured"
 *     type: "discount",
 *     newPrice: 400,
 *   }
 * ])
 * //=> {
 *   standard: function specialStandardRule(),
 *   featured: function specialFeaturedRule(),
 *   premium: function normalPremiumRule()
 * }
 *
 * @todo I'm not sure if we have to implement multiple rules for the same ad type.
 * For example, if you pass in a list of rules like this:
 * @example
 * convertAPItoRules([
 *   {
 *     adId: "standard"
 *     type: "xfory",
 *     eligibleLimit: 3,
 *     reduceCountBy: 1
 *   },
 *   {
 *     adId: "standard"
 *     type: "discount",
 *     newPrice: 400,
 *   }
 * ])
 * //=> {
 *   standard: function specialStandardRule(),
 *   featured: function normalFeaturedRule(),
 *   premium: function normalPremiumRule()
 * }
 *
 * The final rule object will not apply both standard rule. Instead, the second rule will
 * override the first one
 */
function convertAPItoRules(rules: Offers[]) {
  return rules.reduce((previous, current) => {
    // this sorta acts like a type guard
    switch (current.type) {
      case "xfory": {
        return {
          ...previous,
          ...{
            [current.adId]: function (cartCount: number) {
              const isEligible = cartCount >= current.eligibleLimit;

              if (!isEligible) {
                return cartCount * NORMAL_PRICE[current.adId];
              }

              // what this means is that once the offer has been applied, it won't be applied again
              return (
                (cartCount - current.reduceCountBy) * NORMAL_PRICE[current.adId]
              );
            },
          },
        };
      }
      case "discount": {
        return {
          ...previous,
          ...{
            [current.adId]: function (cartCount: number) {
              return cartCount * current.newPrice;
            },
          },
        };
      }
      case "discountconditional": {
        return {
          ...previous,
          ...{
            [current.adId]: function (cartCount: number) {
              const isEligible = cartCount >= current.eligibleLimit;

              if (!isEligible) {
                return cartCount * NORMAL_PRICE[current.adId];
              }

              return cartCount * current.newPrice;
            },
          },
        };
      }
      default: {
        return previous;
      }
    }
  }, normalRules);
}

const Checkout = {
  /**
   * private cart variable
   **/
  _cart: [] as ADID_TYPE[],
  /**
   * private rules
   **/
  _rules: normalRules,
  /**
   * @function
   * @description Sets the rules. Will default to the normal rules
   **/
  new: function (rules: NormalRulesType = normalRules) {
    this._rules = rules;
    return this;
  },
  /**
   * @function
   * @description Adds item to cart
   * @param item Cart item. Only "standard", "featured", "premium" is allowed
   **/
  add: function (item: ADID_TYPE) {
    this._cart.push(item);
  },
  /**
   * @function
   * @description Removes item from cart
   * @param item Cart item. Only "standard", "featured", "premium" is allowed
   **/
  remove: function (item: ADID_TYPE) {
    const index = this._cart.indexOf(item);
    if (index == -1) return;
    this._cart.splice(index, 1);
  },
  /**
   * @function
   * @description Clear the cart
   **/
  clear: function () {
    this._cart = [];
  },
  /**
   * @function
   * @description Calculate the total
   **/
  total: function () {
    const groupedCart = groupCartCountById(this._cart);
    let sum = 0;

    for (const property in groupedCart) {
      // this is to guard yourself against unwanted ad types
      if (isAdIdType(property))
        sum += this._rules[property](groupedCart[property]);
    }
    return sum;
  },
};

export { convertAPItoRules, Checkout };
