import express from "express";
import type { Offers, Company } from "@instahome/types";

const router = express.Router();

const companies: Company[] = [
  { id: 1, name: "uem sunrise" },
  { id: 2, name: "sime darby" },
  { id: 3, name: "igb berhad" },
  { id: 4, name: "mah sing group" },
  { id: 5, name: "yoghirt" },
];

type DataType = { [key: number]: Offers[] };

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

/**
 * @swagger
 *
 * /api/v1/companies:
 *   get:
 *     summary: Get the list of companies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: json list of companies
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                    description: id of company
 *                    example: 1
 *                  name:
 *                    type: string
 *                    description: name of company
 *                    example: uem sunrise
 */
router.get("/", function (_, res) {
  res.json(companies);
});

/**
 * @swagger
 *
 * /api/v1/companies/{id}:
 *   get:
 *     summary: Get companies offer details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: company id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: json list of offer rules
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  adId:
 *                    type: number
 *                    description: type of ad id
 *                    example: standard
 *                  type:
 *                    type: string
 *                    description: type of offer
 *                    example: discount
 *                  eligibleLimit:
 *                    type: number
 *                    description: number where this offer will become eligible
 *                    example: 4
 *                  reduceCountBy:
 *                    type: number
 *                    description: this is for those x for y offers
 *                    example: 4
 *                  newPrice:
 *                    type: number
 *                    description: offered price
 *                    example: 420
 */
router.get("/:id", function (req, res) {
  const offerData = data[parseInt(req.params.id)] ?? [];
  res.json(offerData);
});

export default router;
