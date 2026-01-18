import * as DocumentPicker from "expo-document-picker";
import JSZip from "jszip";

/**
 * Result of extracting Instagram follower and following JSON files
 * from an Instagram data export ZIP.
 */
export type InstagramZipExtract = {
  /** Raw JSON text files containing follower data */
  followerJsonTexts: string[];
  /** Raw JSON text files containing following data */
  followingJsonTexts: string[];
};

/**
 * Determines whether a ZIP entry path likely corresponds to
 * an Instagram followers JSON file.
 *
 * Excludes paths that also contain "following" to avoid false positives.
 *
 * @param {string} path - ZIP entry file path
 * @returns {boolean} True if the path likely represents followers data
 */
const isFollowersPath = (path: string): boolean => {
  const p = path.toLowerCase();
  return p.includes("followers") && !p.includes("following");
};

/**
 * Determines whether a ZIP entry path likely corresponds to
 * an Instagram following JSON file.
 *
 * @param {string} path - ZIP entry file path
 * @returns {boolean} True if the path likely represents following data
 */
const isFollowingPath = (path: string): boolean => {
  const p = path.toLowerCase();
  return p.includes("following") && !p.includes("followers");
};

/**
 * Opens the system document picker and allows the user to select
 * an Instagram data export ZIP file.
 *
 * @returns {Promise<string | null>} An object containing the local URI of the 
 * selected ZIP file, or null if the user cancels the picker
 * @throws If the document picker returns an invalid asset
 */
export const pickInstagramExportZip = async (): Promise<{ uri: string } | null> => {
  // load zip file from app
  const pick = await DocumentPicker.getDocumentAsync({
    type: ["application/zip", "application/x-zip-compressed", "application/octet-stream"],
    multiple: false,
    copyToCacheDirectory: true
  });

  if (pick.canceled) return null;

  const asset = pick.assets?.[0];
  if (!asset?.uri) throw new Error("No file URI returned from the document picker.");

  return { uri: asset.uri };
};

/**
 * Reads an Instagram export ZIP file and extracts the raw JSON text
 * for follower and following datasets.
 * 
 * - Loads the ZIP file into memory
 * - Searches recursively for JSON files related to followers and following
 * - Supports multi-part follower files (e.g., followers_1.json)
 *
 * No Instagram-specific JSON parsing occurs here. This function only
 * extracts candidate JSON text files for further processing.
 *
 * @param {string} zipUri - Local URI of the Instagram export ZIP file
 * @returns {InstagramZipExtract} Raw follower and following JSON text contents
 * @throws If the ZIP file cannot be read or required datasets are missing
 */
export const extractFollowersAndFollowingJsonTexts = async (zipUri: string): Promise<InstagramZipExtract> => {
  const response = await fetch(zipUri);
  if (!response.ok) throw new Error("Failed to read zip file.");

  // read zip file from stream
  const arrayBuffer = await response.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  const followerJsonTexts: string[] = [];
  const followingJsonTexts: string[] = [];

  for (const entry of Object.values(zip.files)) {
    if (entry.dir) continue;

    const path = entry.name;
    if (!path.toLowerCase().endsWith(".json")) continue;

    // skip anything that isn't follow-related
    if (!isFollowersPath(path) && !isFollowingPath(path)) continue;

    const text = await zip.file(path)!.async("string");

    if (isFollowersPath(path)) followerJsonTexts.push(text);
    if (isFollowingPath(path)) followingJsonTexts.push(text)
  }

  if (followerJsonTexts.length === 0 || followingJsonTexts.length === 0) {
    throw new Error(
      "Could not find followers or following from JSON in this zip file. When requesting your Instagram download, ensure you select Connections and Followers and following, and choose JSON."
    )
  };

  return { followerJsonTexts, followingJsonTexts };
};
