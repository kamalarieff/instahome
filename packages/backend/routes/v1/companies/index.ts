import express from "express";
import { param, validationResult } from "express-validator";

import { companies, companyOffers } from "../../../data";

const router = express.Router();

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
router.get(
  "/:id",
  param("id").exists().isNumeric().withMessage("id must be a number"),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const offerData = companyOffers[parseInt(req.params?.id)] ?? [];
    res.json(offerData);
  }
);

export default router;
