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
    // TODO: need to add a check here to check against the ADID_TYPE
    if (isAdIdType(property)) sum += rules[property](groupedCart[property]);
  }
  return sum;
}

function convertAPItoRules(input: (XForY | Discount | DiscountConditional)[]) {
  return input.reduce((previous, current) => {
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

            // this wouldn't work for more than 3 items
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
