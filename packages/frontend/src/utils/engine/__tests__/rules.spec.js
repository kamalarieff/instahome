import { convertAPItoRules, Checkout } from "../functions";

describe("Checkout implementation", () => {
  beforeEach(() => {
    Checkout.clear();
  });

  it("should return correct total with add and remove operations", () => {
    const co = Checkout.new();
    co.add("standard");
    expect(co.total()).toEqual(269.99);

    co.add("featured");
    expect(co.total()).toEqual(592.98);

    co.add("premium");
    expect(co.total()).toEqual(987.97);

    co.remove("premium");
    expect(co.total()).toEqual(592.98);

    co.remove("featured");
    expect(co.total()).toEqual(269.99);

    co.remove("standard");
    expect(co.total()).toEqual(0);
  });

  it("should return correct total with clear operation", () => {
    const co = Checkout.new();
    co.add("standard");
    co.add("featured");
    co.add("premium");
    expect(co.total()).toEqual(987.97);

    co.clear();
    expect(co.total()).toEqual(0);
  });

  describe("custom rules", () => {
    beforeEach(() => {
      Checkout.clear();
    });

    it("should return correct total for x for y offers", () => {
      const APIResponse = [
        {
          adId: "standard",
          type: "xfory",
          eligibleLimit: 3,
          reduceCountBy: 1,
        },
      ];

      const rules = convertAPItoRules(APIResponse);

      const co = Checkout.new(rules);

      co.add("standard");
      co.add("standard");
      expect(co.total()).toEqual(539.98);

      co.add("standard");
      expect(co.total()).toEqual(539.98);

      co.add("standard");
      expect(co.total()).toEqual(809.97);
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

      const co = Checkout.new(rules);

      co.add("featured");
      co.add("featured");
      co.add("featured");
      co.add("premium");
      expect(co.total()).toEqual(1294.96);
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

      const co = Checkout.new(rules);

      co.add("premium");
      co.add("premium");
      co.add("premium");
      expect(co.total()).toEqual(1184.97);

      co.add("premium");
      expect(co.total()).toEqual(1519.96);
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

      const co = Checkout.new(rules);
      co.add("premium");
      co.add("premium");
      co.add("premium");
      co.add("premium");
      co.add("featured");
      expect(co.total()).toEqual(1819.95);

      co.clear();
      co.add("standard");
      co.add("standard");
      expect(co.total()).toEqual(539.98);

      co.add("standard");
      expect(co.total()).toEqual(539.98);

      co.add("standard");
      expect(co.total()).toEqual(809.97);
    });
  });
});
