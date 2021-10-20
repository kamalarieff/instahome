import type { NormalRulesType } from "@instahome/types";
import { NORMAL_PRICE } from "utils/constants";

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

export { normalRules };
