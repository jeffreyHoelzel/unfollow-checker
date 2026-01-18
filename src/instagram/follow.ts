import type { InstagramFollowReport } from "../types/instagram";
import { uniqueSortedUsernames } from "../utils/normalize";
import type { InstagramZipExtract } from "./zip";

/**
 * Safely parses a JSON string.
 *
 * @param {string} text Raw JSON text
 * @returns {unknown | null} Parsed JSON, or null if parsing fails
 */
const safeJsonParse = (text: string): unknown | null => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

/**
 * Recursively traverses an unknown JSON structure and collects usernames from
 * Instagram export objects that contain "string_list_data".
 *
 * Instagram exports commonly store usernames at:
 * string_list_data[0].value
 *
 * This function intentionally searches broadly to tolerate variations in export structure.
 *
 * @param {unknown} node Current JSON node being inspected
 * @param {string[]} out Accumulator for usernames
 * @returns {void}
 */
const collectUsernamesFromUnknown = (node: unknown, out: string[]): void => {
  if (!node) return;

  // recursively traverse nodes to find JSON data
  if (Array.isArray(node)) {
    for (const item of node) {
      collectUsernamesFromUnknown(item, out);
    }
    return;
  }

  if (typeof node !== "object") return;

  // found one username
  const obj = node as Record<string, unknown>;
  const stringListData = obj["string_list_data"];
  if (Array.isArray(stringListData)) {
    for (const entry of stringListData) {
      if (!entry || typeof entry !== "object") continue;

      // should be full username
      const value = (entry as Record<string, unknown>)["value"]
      if (typeof value === "string" && value.length > 0) {
        out.push(value);
      }
    }
  }

  // search at object instead of item
  for (const value of Object.values(obj)) {
    collectUsernamesFromUnknown(value, out);
  }
};

/**
 * Extracts usernames from an array of Instagram export JSON texts.
 *
 * @param {string[]} jsonTexts Raw JSON texts from the export
 * @returns {string[]} Unique, normalized, sorted usernames
 */
const extractUsernamesFromJsonTexts = (jsonTexts: string[]): string[] => {
  const rawUsernames: string[] = [];

  // parse and build list of usernames
  for (const text of jsonTexts) {
    const parsed = safeJsonParse(text);
    collectUsernamesFromUnknown(parsed, rawUsernames);
  }

  return uniqueSortedUsernames(rawUsernames);
};

/**
 * Computes the list of accounts not following the user back.
 *
 * @param {string[]} following Usernames the user follows
 * @param {string[]} followers Usernames that follow the user
 * @returns {string[]} Usernames not following back
 */
const computeNotFollowingBack = (following: string[], followers: string[]): string[] => {
  const followersSet = new Set(followers);
  // any users in following but not in followers do not follow back
  return following.filter((user) => !followersSet.has(user));
};

/**
 * Builds an InstagramFollowReport from extracted follower and following JSON texts.
 *
 * This function expects that zip extraction has already filtered relevant JSON files.
 *
 * @param {InstagramZipExtract} extracted Raw JSON text datasets extracted from the export zip
 * @returns {InstagramFollowReport} Report containing followers, following, not following back, and summary stats
 */
export const buildFollowReportFromZipExtract = (extracted: InstagramZipExtract): InstagramFollowReport => {
  const followers = extractUsernamesFromJsonTexts(extracted.followerJsonTexts);
  const following = extractUsernamesFromJsonTexts(extracted.followingJsonTexts);

  const notFollowingBack = computeNotFollowingBack(following, followers);

  return {
    followers,
    following,
    notFollowingBack,
    stats: {
      followerCount: followers.length,
      followingCount: following.length,
      notFollowingBackCount: notFollowingBack.length,
      followerFilesFound: extracted.followerJsonTexts.length,
      followingFilesFound: extracted.followingJsonTexts.length
    }
  };
};
