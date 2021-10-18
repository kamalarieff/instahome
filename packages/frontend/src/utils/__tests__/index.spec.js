import { calculateTotal } from "..";

describe("rules for all companies", () => {
  it("should return the correct sum for no company", () => {
    let input = ["standard", "featured", "premium"];
    expect(calculateTotal(null, input)).toEqual(987.97);
  });

  it("should return the correct sum for company that does not exist in the rules", () => {
    let input = ["standard", "featured", "premium"];
    expect(calculateTotal("fake company", input)).toEqual(987.97);
  });

  it("should return the correct sum for uem sunrise", () => {
    let input = ["standard", "standard"];
    expect(calculateTotal("uem sunrise", input)).toEqual(539.98);

    input = ["standard", "standard", "standard"];
    expect(calculateTotal("uem sunrise", input)).toEqual(539.98);

    // if you add one more item, it should just be cart-1
    input = ["standard", "standard", "standard", "standard"];
    expect(calculateTotal("uem sunrise", input)).toEqual(809.97);

    input = ["standard", "standard", "standard", "premium"];
    expect(calculateTotal("uem sunrise", input)).toEqual(934.97);

    // Now, what would happen if you have 6
    // Should the final count be 4 or 5?
    input = [
      "standard",
      "standard",
      "standard",
      "standard",
      "standard",
      "standard",
    ];
    expect(calculateTotal("uem sunrise", input)).toEqual(1349.95);
  });

  it("should return the correct sum for sime darby", () => {
    let input = ["featured", "featured", "featured", "premium"];
    expect(calculateTotal("sime darby", input)).toEqual(1294.96);
  });

  it("should return the correct sum for igb berhad", () => {
    let input = ["premium", "premium", "premium", "premium"];
    expect(calculateTotal("igb berhad", input)).toEqual(1519.96);
  });
});
