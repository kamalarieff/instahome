import { specialRules } from "../rules";
import { calculateTotalByRules, convertAPItoRules } from "../functions";

it.skip("should have the correct structure for the special rules object", () => {
  expect(specialRules).toMatchInlineSnapshot(`
    Object {
      "igb berhad": Object {
        "premium": [Function],
      },
      "sime darby": Object {
        "featured": [Function],
      },
      "uem sunrise": Object {
        "standard": [Function],
      },
    }
  `);
});

it("should transform API response to correct rules structure for xfory", () => {
  const APIResponse = [
    {
      adId: "standard",
      type: "xfory",
      eligibleLimit: 3,
      reduceCountBy: 1,
    },
  ];

  const rules = convertAPItoRules(APIResponse);

  let input = ["standard", "standard"];
  expect(calculateTotalByRules(input, rules)).toEqual(539.98);

  input = ["standard", "standard", "standard"];
  expect(calculateTotalByRules(input, rules)).toEqual(539.98);

  input = ["standard", "standard", "standard", "standard"];
  expect(calculateTotalByRules(input, rules)).toEqual(809.97);

  input = ["standard", "standard", "standard", "premium"];
  expect(calculateTotalByRules(input, rules)).toEqual(934.97);
});

it("should transform API response to correct rules structure for discount", () => {
  const APIResponse = [
    {
      adId: "featured",
      type: "discount",
      newPrice: 299.99,
    },
  ];
  const rules = convertAPItoRules(APIResponse);

  let input = ["featured", "featured", "featured", "premium"];
  expect(calculateTotalByRules(input, rules)).toEqual(1294.96);
});

it("should transform API response to correct rules structure for discountconditional", () => {
  const APIResponse = [
    {
      adId: "premium",
      type: "discountconditional",
      eligibleLimit: 4,
      newPrice: 379.99,
    },
  ];
  const rules = convertAPItoRules(APIResponse);

  let input = ["premium", "premium", "premium", "premium"];
  expect(calculateTotalByRules(input, rules)).toEqual(1519.96);
});

it("should transform API response to correct rules structure for multiple offers", () => {
  const APIResponse = [
    {
      adId: "standard",
      type: "xfory",
      eligibleLimit: 3,
      reduceCountBy: 1,
    },
    {
      adId: "featured",
      type: "discount",
      newPrice: 299.99,
    },
    {
      adId: "premium",
      type: "discountconditional",
      eligibleLimit: 3,
      newPrice: 379.99,
    },
  ];
  const rules = convertAPItoRules(APIResponse);

  let input = ["premium", "premium", "premium", "premium", "featured"];
  expect(calculateTotalByRules(input, rules)).toEqual(1819.95);

  input = ["standard", "standard"];
  expect(calculateTotalByRules(input, rules)).toEqual(539.98);

  input = ["standard", "standard", "standard"];
  expect(calculateTotalByRules(input, rules)).toEqual(539.98);

  input = ["standard", "standard", "standard", "standard"];
  expect(calculateTotalByRules(input, rules)).toEqual(809.97);
});