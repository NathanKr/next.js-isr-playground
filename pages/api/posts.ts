// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addPostToGoogleSheet, getPostsFromGoogleSheet } from "../../src/logic/server/google-spreadsheet-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const posts = await getPostsFromGoogleSheet();
      return res.status(200).json({ posts });

    case "POST":
      await addPostToGoogleSheet();
      return res.status(201).send({});

    default:
      throw `Unexpected req.method : ${req.method}`;
  }
}
