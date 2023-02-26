export function getBaseServerUrl(): string {
  if (process.env.NODE_ENV == "production") {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL ?? ""}`;
  }

  return "http://localhost:3000";
}

export function getOnDemandRevalidateUrl(): string {
  // caution : process.env.REVALIDATE_SECRET_TOKEN is not availeable on the client
  // i had to disable the check on it
  // but may be it should be access only from the server

  return `${getBaseServerUrl()}/api/revalidate?secret=${
    process.env.REVALIDATE_SECRET_TOKEN
  }`;
}
