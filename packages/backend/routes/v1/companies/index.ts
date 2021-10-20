import express from "express";
const router = express.Router();

const companies = [
  { id: 1, name: "uem sunrise" },
  { id: 2, name: "sime darby" },
  { id: 3, name: "igb berhad" },
  { id: 4, name: "mah sing group" },
];

// TODO: this is copied from the front end
// Maybe you can put this in a lerna package instead
type ADID_TYPE = "standard" | "featured" | "premium";

interface XForY {
  adId: ADID_TYPE;
  type: "xfory";
  eligibleLimit: number;
  reduceCountBy: number;
}

interface Discount {
  adId: ADID_TYPE;
  type: "discount";
  newPrice: number;
}

interface DiscountConditional {
  adId: ADID_TYPE;
  type: "discountconditional";
  eligibleLimit: number;
  newPrice: number;
}

type DataType = { [key: number]: (XForY | Discount | DiscountConditional)[] };

const data: DataType = {
  1: [
    {
      adId: "standard",
      type: "xfory",
      eligibleLimit: 3,
      reduceCountBy: 1,
    },
  ],
  2: [
    {
      adId: "featured",
      type: "discount",
      newPrice: 299.99,
    },
  ],
  3: [
    {
      adId: "premium",
      type: "discountconditional",
      eligibleLimit: 4,
      newPrice: 379.99,
    },
  ],
  4: [
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
  ],
};

/* GET companies offer details. */
router.get("/", function (_, res) {
  res.json(companies);
});

router.get("/:id", function (req, res) {
  res.json(data[parseInt(req.params.id)]);
});

export default router;
