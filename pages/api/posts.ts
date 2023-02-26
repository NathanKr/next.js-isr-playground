// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  addPostToGoogleSheet,
  getPostsFromGoogleSheet,
} from "../../src/logic/google-spreadsheet-utils";
import { getOnDemandRevalidateUrl } from "../../src/logic/utils";
import { IOnDemand } from "../../src/types/i-on-demand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const posts = await getPostsFromGoogleSheet();
      return res.status(200).json({ posts });

    case "POST":
      const body: IOnDemand = req.body;
      await addPostToGoogleSheet();
      if (body.onDemand) {
        const url = getOnDemandRevalidateUrl();
        await axios.get(url); //
      }
      return res.status(201).send({});

    default:
      throw `Unexpected req.method : ${req.method}`;
      break;
  }
}
