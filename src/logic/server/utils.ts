import chalk from "chalk";

export function getBaseServerUrl(): string {
  if (!process.env.VERCEL_URL) {
    return "http://localhost:3000";
  }

  if (process.env.NODE_ENV == "production") {
    return `https://${process.env.VERCEL_URL}`;
  }

  throw Error(`Unexpected process.env.NODE_ENV : ${process.env.NODE_ENV}`);
}

export function getOnDemandRevalidateUrl(): string {
  // caution : process.env.REVALIDATE_SECRET_TOKEN is not availeable on the client
  // i had to disable the check on it
  // but may be it should be access only from the server

  return `${getBaseServerUrl()}/api/revalidate?secret=${
    process.env.REVALIDATE_SECRET_TOKEN
  }`;
}

export function logRed(msg: string): void {
  console.log(chalk.red(msg));
}
