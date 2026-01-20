import { InstagramFollowReport } from "../types/instagram";

/** In memory store for most recently imported Instagram follow report */
let currentReport: InstagramFollowReport | null = null;

/**
 * Sets the current in memory report.
 *
 * @param {InstagramFollowReport | null} report Follow report to store
 * @returns {void}
 */
export const setReport = (report: InstagramFollowReport | null): void => {
  currentReport = report;
};

/**
 * Gets the current in memory report.
 *
 * @returns {InstagramFollowReport | null} Current stored report
 */
export const getReport = (): InstagramFollowReport | null => currentReport;
