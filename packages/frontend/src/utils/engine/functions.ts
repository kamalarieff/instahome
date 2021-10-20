import { specialRules, normalRules } from "./rules";

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
