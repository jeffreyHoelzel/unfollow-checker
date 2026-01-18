import type { InstagramFollowReport } from "../types/instagram";
import { buildFollowReportFromZipExtract } from "./follow";
import { extractFollowersAndFollowingJsonTexts, pickInstagramExportZip } from "./zip";

/**
 * End to end import and analysis workflow:
 * - Prompts user to select an Instagram export zip
 * - Extracts followers and following JSON datasets
 * - Parses usernames and computes not following back
 *
 * @returns {Promise<InstagramFollowReport | null>} Follow report, or null if user cancels file selection
 * @throws If the selected zip cannot be read or does not contain follower and following datasets
 */
export const importInstagramExportZip = async (): Promise<InstagramFollowReport | null> => {
  const picked = await pickInstagramExportZip();
  if (!picked) return null;

  const extracted = await extractFollowersAndFollowingJsonTexts(picked.uri);
  return buildFollowReportFromZipExtract(extracted);
};

export type { InstagramFollowReport } from "../types/instagram";

