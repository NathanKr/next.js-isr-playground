import { GoogleSpreadsheet } from "google-spreadsheet";
import { IPost } from "../types/i-post";
import { SPREAD_SHEET_ID, SPREAD_SHEET_TAB_NAME } from "./constants";

export async function loadSpreadSheetDoc(
  spreadSheetId: string
): Promise<GoogleSpreadsheet> {
  const doc = new GoogleSpreadsheet(spreadSheetId);

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    // --- check credential file under secret directory
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: process.env.GOOGLE_PRIVATE_KEY!,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  return doc;
}

export async function addPostToGoogleSheet(): Promise<void> {
  const newId = (await getPostsLastId()) + 1;

  const newPost: IPost = {
    id: newId,
    title: `json-server-updated${newId}`,
    author: `typicode-updated${newId}`,
  };
  const doc = await loadSpreadSheetDoc(SPREAD_SHEET_ID);

  // use doc.sheetsById[id] or doc.sheetsByTitle[title]
  // const secondSheet = doc.sheetsByIndex[1];
  const secondSheet = doc.sheetsByTitle[SPREAD_SHEET_TAB_NAME];
  secondSheet.addRow({ ...newPost });
}

export async function getPostsLastId(): Promise<number> {
  const posts = await getPostsFromGoogleSheet();
  return posts[posts.length - 1].id;
}

export async function getPostsFromGoogleSheet(): Promise<IPost[]> {
  const doc = await loadSpreadSheetDoc(SPREAD_SHEET_ID);

  // use doc.sheetsById[id] or doc.sheetsByTitle[title]
  // const secondSheet = doc.sheetsByIndex[1];
  const secondSheet = doc.sheetsByTitle[SPREAD_SHEET_TAB_NAME];

  // read rows
  const secondSheetRows = await secondSheet.getRows();

  const rows: IPost[] = secondSheetRows.map((it) => {
    return { id: Number(it.id), title: it.title, author: it.author };
  });

  return rows;
}
