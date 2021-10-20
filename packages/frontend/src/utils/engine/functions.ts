import { specialRules, normalRules } from "./rules";
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
 * @description Get the sum from of the cart based on the company id
 *
 * @param companyId Company id
 * @param cart List of products
 * @example
 * calculateTotal("uem sunrise", [
 *   "standard",
 *   "featured",
 *   "premium",
 * ])
 * //=> 999.99
 */
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

// type guard to check for valid ad type
function isAdIdType(adId: unknown): adId is ADID_TYPE {
  // TODO: not sure if this is the best way to do this
  return (
    typeof adId === "string" &&
    ["standard", "featured", "premium"].includes(adId)
  );
}

function calculateTotalByRules(cart: string[], rules: NormalRulesType) {
  const groupedCart = groupCartCountById(cart);
  // this is to check if the companyId is given

  let sum = 0;

  for (const property in groupedCart) {
    // this is to guard yourself against unwanted ad types
    if (isAdIdType(property)) sum += rules[property](groupedCart[property]);
  }
  return sum;
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
function convertAPItoRules(rules: (XForY | Discount | DiscountConditional)[]) {
  return rules.reduce((previous, current) => {
    // this sorta acts like a type guard
    if (current.type == "xfory") {
      return {
        ...previous,
        ...{
          [current.adId]: function (cartCount: number) {
            const isEligible = cartCount >= current.eligibleLimit;

            if (!isEligible) {
              return cartCount * NORMAL_PRICE["standard"];
            }

            // what this means is that once the offer has been applied, it won't be applied again
            return (
              (cartCount - current.reduceCountBy) * NORMAL_PRICE["standard"]
            );
          },
        },
      };
    }
    if (current.type == "discount") {
      return {
        ...previous,
        ...{
          [current.adId]: function (cartCount: number) {
            return cartCount * current.newPrice;
          },
        },
      };
    }
    if (current.type == "discountconditional") {
      return {
        ...previous,
        ...{
          [current.adId]: function (cartCount: number) {
            const isEligible = cartCount >= current.eligibleLimit;

            if (!isEligible) {
              return cartCount * NORMAL_PRICE["premium"];
            }

            return cartCount * current.newPrice;
          },
        },
      };
    }
    return previous;
  }, normalRules);
}

export {
  specialRules,
  calculateTotal,
  calculateTotalByRules,
  convertAPItoRules,
};
