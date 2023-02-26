import type { NextApiRequest, NextApiResponse } from "next";
import { getBaseServerUrl } from "../../src/logic/utils";

// --- This is relevant to on - demand ISR
// --- call this with https://<your-site.com>/api/revalidate?secret=<token>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("server handle on demand revalidation");

  // Check for secret to confirm this is a valid request

  // --- todo nath not working !!!! check and bring back
  // if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const urlRelativePathToRevalidate = "/posts-ondemand-validation";
    await res.revalidate(urlRelativePathToRevalidate);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
